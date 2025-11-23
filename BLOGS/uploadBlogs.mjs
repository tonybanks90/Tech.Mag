/**
 * To run this script:
 * 1. Make sure you have Node.js installed.
 * 2. Run `npm install @sanity/client` in your terminal in this directory.
 * 3. Fill in your Sanity project ID and dataset in the client configuration below.
 * 4. Make sure you have a Sanity token with write permissions. You can create one at https://www.sanity.io/manage/personal/tokens
 *    It's recommended to set this as an environment variable, e.g., `SANITY_AUTH_TOKEN`.
 * 5. Run the script from your terminal: `node uploadBlogs.mjs`
 */
import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';

// Sanity client configuration
const client = createClient({
  // ** REPLACE WITH YOUR PROJECT ID **
  projectId: 'YOUR_PROJECT_ID',
  // ** REPLACE WITH YOUR DATASET **
  dataset: 'YOUR_DATASET',
  // Make sure to set this environment variable, or replace it with your token directly.
  // We recommend using an environment variable for security.
  token: process.env.SANITY_AUTH_TOKEN,
  useCdn: false, // `false` if you want to ensure fresh data
  apiVersion: '2023-05-03', // use a UTC date string
});

const blogPosts = JSON.parse(fs.readFileSync('./blog_posts_to_upload.json', 'utf-8'));
const assetsDir = '../attached_assets/';

async function uploadBlogs() {
  console.log('Starting blog post upload...');

  for (const post of blogPosts) {
    console.log(`Processing blog post: "${post.title}"`);

    // 1. Upload the image asset
    const imageFileName = post.coverImage.asset._ref.replace('image-', '');
    const imagePath = path.join(assetsDir, imageFileName);

    if (fs.existsSync(imagePath)) {
      try {
        const imageAsset = await client.assets.upload('image', fs.createReadStream(imagePath), {
          filename: imageFileName,
        });

        // 2. Replace the placeholder asset reference with the actual one
        post.coverImage.asset._ref = imageAsset._id;
        console.log(`  - Successfully uploaded image and got asset ID: ${imageAsset._id}`);

      } catch (err) {
        console.error(`  - Error uploading image for post "${post.title}":`, err);
        // Skip this post if image upload fails
        continue;
      }
    } else {
      console.warn(`  - Image not found for post "${post.title}": ${imagePath}. Skipping image upload.`);
      // Remove the coverImage field if the image doesn't exist, to avoid a broken reference
      delete post.coverImage;
    }

    // 3. Create the blog post document
    try {
      const createdPost = await client.create(post);
      console.log(`  - Successfully created blog post with ID: ${createdPost._id}`);
    } catch (err) {
      console.error(`  - Error creating blog post "${post.title}":`, err);
    }
  }

  console.log('Blog post upload complete.');
}

uploadBlogs().catch(err => {
  console.error('An unexpected error occurred:', err);
});