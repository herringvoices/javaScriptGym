import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mdx from "@mdx-js/rollup";
import remarkGfm from "remark-gfm";
import remarkFrontmatter from "remark-frontmatter";
import rehypeSlug from "rehype-slug";
import mkcert from "vite-plugin-mkcert";
export default defineConfig(({ command }) => ({
  plugins: [
    react(),
    mdx({
      remarkPlugins: [remarkGfm, remarkFrontmatter],
      rehypePlugins: [rehypeSlug],
      providerImportSource: "@mdx-js/react",
    }),
    ...(command === "serve" ? [mkcert()] : []),
  ],
  server: command === "serve" ? { host: true, https: true } : undefined,
  build: {
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom", "react-router-dom"],
          sandpack: ["@codesandbox/sandpack-react", "@codesandbox/sandpack-themes"],
          markdown: ["react-markdown", "remark-gfm", "rehype-slug"],
        },
      },
    },
  },
}));
