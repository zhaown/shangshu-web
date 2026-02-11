# 语言切换问题修复（最终版）

## 🐛 问题描述

用户报告的问题：
1. 点击切换英文按钮后，URL 变成 `/en/xxx`，但**内容仍然是中文**
2. 在 `/en/` 路径下，按钮仍显示"切换到英文"（EN），而不是"切换到中文"（中文）
3. 再次点击会变成 `/en/en/xxx`，导致 404

## 🔍 根本原因

### 问题根源：静态导出 + React Context 的局限性

在 Next.js 静态导出模式下：

```typescript
// ❌ 问题代码
const locale = useLocale();  // next-intl 的 hook
const pathname = usePathname();  // Next.js 的 hook
```

**为什么会失败？**

1. **静态 HTML**：每个语言版本在构建时生成独立的静态 HTML
   ```
   /zh/services/index.html  → 中文内容
   /en/services/index.html  → 英文内容
   ```

2. **React Context 固化**：`useLocale()` 从 React Context 读取语言
   - Context 在构建时就确定了（'zh' 或 'en'）
   - 即使 URL 变了，Context 还是初始值
   - 导致组件认为当前还是中文

3. **客户端路由失效**：虽然 URL 变了，但：
   - React 的 hydration 保持初始状态
   - Context Provider 没有更新
   - `useLocale()` 返回的还是 'zh'

### 具体流程

```
用户在 /zh/services/ 页面
    ↓
点击 "EN" 按钮
    ↓
<a href="/en/services/">  → 完整页面刷新 ✓
    ↓
浏览器加载 /en/services/index.html  → 这是英文 HTML ✓
    ↓
但是！React hydration 后
    ↓
useLocale() 从旧的 Context 读取  → 返回 'zh' ❌
    ↓
按钮计算：locale === 'zh' ? 'EN' : '中文'  → 显示 'EN' ❌
    ↓
switchLocalePath = `/en` + `/services/`  → `/en/services/` ❌
    ↓
点击后 → `/en/en/services/`  → 404 ❌
```

## ✅ 解决方案

### 核心思路：直接从 URL 读取语言

不依赖 React Context，直接从浏览器 `window.location.pathname` 读取当前语言。

### 实现代码

```typescript
// ✅ 修复后的代码
// 从 URL 路径中提取当前语言
function getCurrentLocale(): 'zh' | 'en' {
  if (typeof window === 'undefined') return 'zh';
  const path = window.location.pathname;
  const localeMatch = path.match(/^\/(zh|en)(\/|$)/);
  return (localeMatch?.[1] as 'zh' | 'en') || 'zh';
}

// 从 URL 路径中提取当前路径（不包含语言前缀）
function getCurrentPath(): string {
  if (typeof window === 'undefined') return '/';
  const path = window.location.pathname;
  return path.replace(/^\/(zh|en)/, '') || '/';
}

export default function Header() {
  const currentLocale = getCurrentLocale();  // 从 URL 读取！
  const currentPath = getCurrentPath();
  const switchLocale = currentLocale === 'zh' ? 'en' : 'zh';
  const switchLocalePath = `/${switchLocale}${currentPath}`;

  // ...
}
```

### 工作流程（修复后）

```
用户在 /zh/services/ 页面
    ↓
getCurrentLocale() → 检查 window.location.pathname → '/zh/services/'
    ↓
提取语言 → 'zh'
    ↓
按钮显示：currentLocale === 'zh' ? 'EN' : '中文' → 'EN' ✓
    ↓
点击 "EN"
    ↓
<a href="/en/services/">  → 完整页面刷新
    ↓
浏览器加载 /en/services/index.html（英文内容）✓
    ↓
React hydration
    ↓
getCurrentLocale() → 检查 window.location.pathname → '/en/services/'
    ↓
提取语言 → 'en' ✓
    ↓
按钮显示：currentLocale === 'en' ? 'EN' : '中文' → '中文' ✓
    ↓
switchLocalePath = '/zh' + '/services/' → '/zh/services/' ✓
```

## 🔧 技术细节

### 为什么这种方式有效？

1. **直接读取 DOM**：`window.location.pathname` 永远是最新的
2. **不依赖 Context**：绕过 React Context 的限制
3. **每次渲染都重新计算**：确保语言始终正确

### SSR 安全性

```typescript
if (typeof window === 'undefined') return 'zh';
```
在服务器端渲染时（构建时），window 不存在，返回默认值 'zh'。

### 性能考虑

- `getCurrentLocale()` 只做简单的字符串匹配
- 没有复杂的 state 更新
- 不会触发额外的重渲染

## 📝 修改文件

**文件**: `components/Header.tsx`

**主要变更**:
1. 移除 `useLocale()` 和 `usePathname()` hooks
2. 添加 `getCurrentLocale()` 和 `getCurrentPath()` 工具函数
3. 直接从 URL 读取当前语言和路径

## ✅ 测试验证

### 测试场景

1. **中文页面点击 EN**
   - URL: `/zh/services/` → `/en/services/`
   - 按钮: "EN" → "中文"
   - 内容: 中文 → 英文

2. **英文页面点击中文**
   - URL: `/en/about/` → `/zh/about/`
   - 按钮: "中文" → "EN"
   - 内容: 英文 → 中文

3. **多次切换**
   - 不会出现 `/en/en/xxx` 的问题
   - URL 始终正确

4. **直接访问**
   - 直接访问 `/en/contact/` → 按钮显示"中文"
   - 直接访问 `/zh/` → 按钮显示"EN"

## 🎯 经验教训

### 静态导出的限制

在使用 `output: 'export'` 时：
- ❌ 不能依赖服务器端的动态路由
- ❌ React Context 在构建时固化
- ❌ `useRouter()` 等 hooks 功能受限
- ✅ 应该从 DOM/URL 直接读取状态

### 最佳实践

对于静态站点的国际化：
1. **URL 作为唯一真实来源** - 从 URL 读取语言
2. **完整页面刷新** - 使用 `<a>` 标签而不是 `<Link>`
3. **简单直接** - 避免复杂的状态管理

## 🚀 部署

```bash
# 构建
npm run build

# 部署
npm run deploy
```

构建和 ESLint 检查都通过 ✅

---

## 📋 总结

| 问题 | 原因 | 解决方案 |
|-----|------|---------|
| 内容不切换 | 页面已切换，但 Context 未更新 | 使用完整页面刷新（`<a>` 标签）✅ |
| 按钮显示错误 | `useLocale()` 返回旧值 | 从 URL 直接读取语言 ✅ |
| URL 重复（/en/en/） | 语言检测错误 | 正确解析当前语言 ✅ |

**核心原则**：在静态导出模式下，**URL 是唯一可靠的真实来源**。
