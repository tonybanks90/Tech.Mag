import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"
import sitemap from "vite-plugin-sitemap"
import { createClient } from "@sanity/client"

// Sanity Config
const sanity = createClient({
  projectId: '6fuj4etd',
  dataset: 'production',
  apiVersion: '2024-03-12',
  useCdn: true,
})

export default defineConfig(async () => {
  // Fetch dynamic routes
  const [posts, categories] = await Promise.all([
    sanity.fetch(`*[_type == "blogPost"]{ "slug": slug.current, _updatedAt, publishedAt }`),
    sanity.fetch(`*[_type == "category"]{ "slug": slug.current }`)
  ]);

  // Map to sitemap format
  const dynamicRoutes = [
    ...posts.map((post: any) => ({
      loc: `/blog/${post.slug}`,
      lastmod: post._updatedAt || post.publishedAt || new Date().toISOString(),
      priority: 0.8
    })),
    ...categories.map((cat: any) => ({
      loc: `/category/${cat.slug}`,
      priority: 0.6
    }))
  ];

  return {
    base: "/",
    plugins: [
      react(),
      sitemap({
        hostname: "https://prometheustech.vercel.app",
        dynamicRoutes: dynamicRoutes.map(r => r.loc),
        exclude: ['/404'],
      })
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      outDir: "dist",
      sourcemap: false,
    },
  }
})
