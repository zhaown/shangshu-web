# Cloudflare D1 数据库部署说明

本项目使用 Cloudflare D1 数据库存储联系表单数据，并使用 Cloudflare Pages Functions 处理 API 请求。

## 架构说明

- **静态页面**: 使用 Next.js 静态导出 (`output: 'export'`)
- **API 接口**: 使用 Cloudflare Pages Functions (位于 `functions/` 目录)
- **数据库**: Cloudflare D1 (SQLite)
- **路由处理**: Cloudflare Pages 自动处理 (通过 `_routes.json`)

## 1. 创建 D1 数据库

在命令行中运行：

```bash
# 登录 Cloudflare（如果还没登录）
npx wrangler login

# 创建 D1 数据库
npx wrangler d1 create shangshu-contacts
```

这将返回数据库的 ID，类似：
```
✅ Successfully created DB 'shangshu-contacts' in region APAC
Created your database using D1's new storage backend.
database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
```

## 2. 更新 wrangler.toml

将返回的 `database_id` 复制到 `wrangler.toml` 文件中：

```toml
[[d1_databases]]
binding = "DB"
database_name = "shangshu-contacts"
database_id = "你的数据库ID"  # 替换为上一步返回的 database_id
```

## 3. 初始化数据库表

运行以下命令创建数据库表：

```bash
npx wrangler d1 execute shangshu-contacts --file=./schema.sql
```

## 4. 部署到 Cloudflare Pages

### 方法 A: 使用 npm script（推荐）

```bash
npm run deploy
```

这个命令会：
1. 构建 Next.js 项目
2. 复制路由配置文件
3. 部署到 Cloudflare Pages

### 方法 B: 手动部署

```bash
# 构建项目
npm run build

# 部署
npx wrangler pages deploy out
```

## 5. 在 Cloudflare Pages 中绑定数据库

部署后，需要在 Cloudflare Pages 中绑定 D1 数据库：

### 通过 Cloudflare Dashboard

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 进入你的 Pages 项目
3. 点击 **Settings** > **Functions** > **D1 database bindings**
4. 添加绑定：
   - Variable name: `DB`
   - D1 database: `shangshu-contacts`
5. 保存设置

### 通过 wrangler.toml（自动）

如果你的 `wrangler.toml` 配置正确，Wrangler 在部署时会自动绑定数据库。

## 6. 验证部署

### 测试语言切换
访问你的网站：
- 中文版：`https://你的域名.pages.dev/zh`
- 英文版：`https://你的域名.pages.dev/en`
- 点击右上角的语言切换按钮测试

### 测试表单提交
1. 访问联系页面
2. 填写表单并提交
3. 应该看到成功提示消息

### 查看数据库记录

```bash
# 查看所有联系记录
npx wrangler d1 execute shangshu-contacts --command "SELECT * FROM contacts ORDER BY created_at DESC"

# 查看最近 10 条记录
npx wrangler d1 execute shangshu-contacts --command "SELECT * FROM contacts ORDER BY created_at DESC LIMIT 10"

# 导出为 JSON 格式
npx wrangler d1 execute shangshu-contacts --command "SELECT * FROM contacts" --json
```

## 故障排除

### 问题 1: 表单提交返回 "Database configuration error"

**原因**: D1 数据库绑定未配置

**解决**:
1. 检查 `wrangler.toml` 中的 `database_id` 是否正确
2. 在 Cloudflare Dashboard 中确认 D1 绑定已添加
3. 重新部署项目

### 问题 2: 语言切换不工作

**原因**: 路由配置问题

**解决**:
1. 确认 `middleware.ts` 文件存在
2. 确认 `out/_routes.json` 文件已生成
3. 清除浏览器缓存并重试

### 问题 3: API 路由 404

**原因**: Pages Functions 未正确部署

**解决**:
1. 确认 `functions/api/contact.js` 文件存在
2. 重新部署：`npm run deploy`
3. 检查 Cloudflare Dashboard 中的 Functions 日志

## 本地开发

在本地开发时，表单提交功能需要使用 Wrangler 进行本地测试：

```bash
# 使用 Wrangler Pages 本地开发服务器
npx wrangler pages dev out --d1 DB=shangshu-contacts
```

注意：Next.js 的 `npm run dev` 不支持 Cloudflare Pages Functions，只能用于页面开发。

## 注意事项

- Cloudflare D1 免费版每天有 5 GB 的读取限额和 100,000 次写入
- Pages Functions 免费版每天有 100,000 次请求
- 数据库位置会自动选择最近的区域
- 生产环境建议定期备份数据
- 确保 `public/_routes.json` 在每次构建时都被复制到 `out/` 目录

## 文件结构

```
shangshu-web/
├── functions/              # Cloudflare Pages Functions
│   └── api/
│       └── contact.js     # 联系表单 API
├── public/
│   └── _routes.json       # Cloudflare Pages 路由配置
├── middleware.ts          # Next.js 国际化中间件
├── wrangler.toml          # Cloudflare 配置
├── schema.sql             # D1 数据库表结构
└── D1_SETUP.md           # 本文档
```
