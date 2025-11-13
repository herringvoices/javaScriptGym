import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mdx from "@mdx-js/rollup";
import remarkGfm from "remark-gfm";
import remarkFrontmatter from "remark-frontmatter";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
const prettyCodeOptions = {
  theme: "dracula",
  keepBackground: false,
  defaultLang: "js",
  onVisitLine(node) {
    // Ensure empty lines render with proper height
    if (node.children.length === 0) {
      node.children = [{ type: "text", value: " " }];
    }
  },
};

export default defineConfig(({ command }) => ({
  plugins: [
    react(),
    mdx({
      remarkPlugins: [remarkGfm, remarkFrontmatter],
      rehypePlugins: [rehypeSlug, [rehypePrettyCode, prettyCodeOptions]],
      providerImportSource: "@mdx-js/react",
    }),
  ],
  server: command === "serve" ? { host: true } : undefined,
  build: {
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom", "react-router-dom"],
          markdown: ["react-markdown", "remark-gfm", "rehype-slug"],
        },
      },
    },
  },
}));
