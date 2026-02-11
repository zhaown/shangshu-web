# 商澍科技 - 企业官网

一个基于 Next.js 16 的现代化、响应式企业官网，部署在 Cloudflare Pages 上。

## ✨ 特性

- 🌍 **国际化支持** - 中文/英文双语切换
- 📱 **响应式设计** - 完美适配桌面端和移动端
- ⚡ **静态优化** - Next.js 静态导出，快速加载
- 🔒 **表单数据存储** - 使用 Cloudflare D1 数据库
- 🎨 **现代化 UI** - Tailwind CSS 4.0 + Lucide Icons
- 🚀 **边缘部署** - Cloudflare Pages + Functions

## 🛠️ 技术栈

- **框架**: Next.js 16.1.6 (App Router)
- **语言**: TypeScript 5
- **样式**: Tailwind CSS 4.0
- **国际化**: next-intl 4.8.2
- **图标**: Lucide React
- **部署**: Cloudflare Pages
- **数据库**: Cloudflare D1 (SQLite)
- **API**: Cloudflare Pages Functions

## 📁 项目结构

```
shangshu-web/
├── app/                      # Next.js App Router
│   ├── [locale]/            # 国际化路由
│   │   ├── page.tsx        # 首页
│   │   ├── about/          # 关于我们
│   │   ├── services/       # 服务介绍
│   │   └── contact/        # 联系我们
│   └── layout.tsx          # 根布局
├── components/              # React 组件
│   ├── Header.tsx          # 导航栏
│   └── Footer.tsx          # 页脚
├── functions/               # Cloudflare Pages Functions
│   └── api/
│       └── contact.js      # 表单提交 API
├── i18n/                    # 国际化配置
│   ├── routing.ts          # 路由配置
│   └── request.ts          # 请求配置
├── messages/                # 翻译文件
│   ├── zh.json             # 中文
│   └── en.json             # 英文
├── public/                  # 静态资源
│   └── _routes.json        # Cloudflare 路由配置
├── middleware.ts            # Next.js 中间件
├── schema.sql              # 数据库表结构
├── wrangler.toml           # Cloudflare 配置
└── D1_SETUP.md            # 数据库部署指南
```

## 🚀 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 本地开发

```bash
npm run dev
```

访问 http://localhost:3000

**注意**: 本地开发服务器不支持表单提交功能（需要 Cloudflare Pages Functions）

### 3. 构建项目

```bash
npm run build
```

### 4. 部署到 Cloudflare Pages

```bash
npm run deploy
```

## 📊 数据库配置

项目使用 Cloudflare D1 数据库存储联系表单数据。

### 初始化数据库

```bash
# 1. 登录 Cloudflare
npx wrangler login

# 2. 创建 D1 数据库
npx wrangler d1 create shangshu-contacts

# 3. 初始化表结构
npx wrangler d1 execute shangshu-contacts --file=./schema.sql
```

### 配置数据库绑定

1. 将数据库 ID 填入 `wrangler.toml`
2. 在 Cloudflare Dashboard 中绑定数据库到 Pages 项目

详细步骤请参考 [D1_SETUP.md](./D1_SETUP.md)

## 📝 可用命令

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 构建生产版本 |
| `npm run lint` | 运行 ESLint 检查 |
| `npm run deploy` | 构建并部署到 Cloudflare Pages |

## 🌐 国际化

项目支持以下语言：
- 中文 (zh) - 默认语言
- 英文 (en)

翻译文件位于 `messages/` 目录。

## 📄 许可证

© 2024 商澍科技. 保留所有权利.

## 📚 更多文档

- [D1_SETUP.md](./D1_SETUP.md) - 数据库部署和配置指南
- [FIXES_SUMMARY_V2.md](./FIXES_SUMMARY_V2.md) - 技术架构和实现细节
