import type { NextConfig } from "next"
import WorkboxWebpackPlugin from "workbox-webpack-plugin"
import path from "path"

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Ajout de la configuration webpack pour générer le service worker
  webpack: (config, { isServer, dev }) => {
    if (!isServer && !dev) {
      config.plugins.push(
        new WorkboxWebpackPlugin.InjectManifest({
          swSrc: path.join(__dirname, "app", "sw.ts"),
          swDest: path.join(__dirname, "public", "sw.js"),
          exclude: [
            // useless files for cache
            /\.map$/,
            /manifest\.json$/,
            /next-assets\//,
          ],
        })
      )
    }
    return config
  },
}

export default nextConfig
