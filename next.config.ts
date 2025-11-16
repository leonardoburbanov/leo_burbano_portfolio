import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';
import { withContentCollections } from "@content-collections/next";

const nextConfig: NextConfig = {
  output: 'standalone',
};

const withNextIntl = createNextIntlPlugin();
// withContentCollections must be the outermost plugin
export default withContentCollections(withNextIntl(nextConfig));
