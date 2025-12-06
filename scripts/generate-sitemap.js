import { createClient } from '@sanity/client';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Config - Hardcoded for simplicity as env vars might not be available in script context easily without dotenv
const PROJECT_ID = '6fuj4etd';
const DATASET = 'production';
const API_VERSION = '2024-03-12';
// TODO: Replace with actual production URL or make it configurable
const SITE_URL = 'https://tech-mag.com';

const client = createClient({
    projectId: PROJECT_ID,
    dataset: DATASET,
    apiVersion: API_VERSION,
    useCdn: true, // Use CDN for sitemap generation to be fast
});

async function generateSitemap() {
    console.log('Generating sitemap...');

    try {
        // Fetch all posts and categories
        const postsQuery = `*[_type == "post"]{ "slug": slug.current, publishedAt, _updatedAt }`;
        const categoriesQuery = `*[_type == "category"]{ "slug": slug.current }`;

        const [posts, categories] = await Promise.all([
            client.fetch(postsQuery),
            client.fetch(categoriesQuery)
        ]);

        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Static Pages -->
  <url>
    <loc>${SITE_URL}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${SITE_URL}/shop</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${SITE_URL}/privacy-policy</loc>
    <changefreq>monthly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>${SITE_URL}/terms</loc>
    <changefreq>monthly</changefreq>
    <priority>0.3</priority>
  </url>

  <!-- Categories -->
  ${categories.map(cat => `
  <url>
    <loc>${SITE_URL}/category/${cat.slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('')}

  <!-- Blog Posts -->
  ${posts.map(post => `
  <url>
    <loc>${SITE_URL}/blog/${post.slug}</loc>
    <lastmod>${post._updatedAt || post.publishedAt || new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`).join('')}
</urlset>`;

        // Correct path to public directory from scripts/
        const publicPath = path.resolve(__dirname, '../public/sitemap.xml');

        await fs.writeFile(publicPath, sitemap);
        console.log(`✅ Sitemap generated at ${publicPath}`);
        console.log(`   - ${posts.length} posts`);
        console.log(`   - ${categories.length} categories`);

    } catch (error) {
        console.error('Error generating sitemap:', error);
        process.exit(1);
    }
}

generateSitemap();
