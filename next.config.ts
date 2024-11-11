import type { NextConfig } from "next";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const nextConfig: NextConfig = {
  /* config options here */
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  sassOptions: {
    includePaths: [join(__dirname, "app/styles")],
  },
  pageExtensions: ["js", "ts", "tsx", "jsx", "md"],
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
