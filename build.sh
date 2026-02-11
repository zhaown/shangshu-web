#!/bin/bash

# 构建脚本 - 准备 Cloudflare Pages 部署

set -e

echo "🔨 Building Next.js application..."
npm run build

echo "📋 Copying _routes.json to output directory..."
cp public/_routes.json out/_routes.json

echo "✅ Build complete! Output directory: ./out"
echo ""
echo "📦 Ready to deploy to Cloudflare Pages!"
echo "Run: npx wrangler pages deploy out"
