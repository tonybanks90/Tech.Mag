import { useState } from 'react';
import { Button } from '@/components/ui/button';
import BlogCard from './BlogCard';
import { BLOG_POSTS, CATEGORIES } from '../../shared/data';

export default function LatestStories() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredPosts = selectedCategory === 'all'
    ? BLOG_POSTS
    : BLOG_POSTS.filter(post => post.categoryId === selectedCategory);

  return (
    <section className="py-16 mt-8 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-4">
            Latest Stories
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <Button
            variant={selectedCategory === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory('all')}
            data-testid="button-filter-all"
            className={selectedCategory === 'all' ? 'bg-primary text-primary-foreground' : ''}
          >
            All Stories
          </Button>
          {CATEGORIES.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              data-testid={`button-filter-${category.slug}`}
              className={selectedCategory === category.id ? 'bg-primary text-primary-foreground' : ''}
            >
              {category.name}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
