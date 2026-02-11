import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // 跳过 middleware 的静态检查，因为我们在 Cloudflare Pages 上运行
  skipMiddlewareUrlNormalize: true,
};

export default withNextIntl(nextConfig);
