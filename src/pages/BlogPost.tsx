import { useRoute } from 'wouter';
import { useState, useEffect, useRef } from 'react';
// Removed unused icons and components
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useBlogPosts, useCategories } from '@/lib/hooks';
import CollapsibleWebBanner from '@/components/CollapsibleWebBanner';
// import WideBlogCard from '@/components/WideBlogCard'; // Unused
import ArticleLoader from '@/components/ArticleLoader'; // Added


export default function BlogPost() {
  const [, params] = useRoute('/blog/:slug');
  const initialSlug = params?.slug || '';

  // We keep track of all displayed slugs. Start with the one from the route.
  const [displayedSlugs, setDisplayedSlugs] = useState<string[]>([]);

  // Access global data for determining the "next" post
  const { data: allPosts = [] } = useBlogPosts();
  const { data: categories = [] } = useCategories();

  // Ref for the "Load More" trigger at the bottom
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Sync route changes to the displayed list (handle navigation from outside)
  useEffect(() => {
    if (initialSlug) {
      setDisplayedSlugs(prev => {
        // If the new slug is already in our list, don't reset (preserves scroll context)
        // This handles the case where we update the URL via replaceState and wouter might re-render,
        // or if the user navigates back/forward to a loaded post.
        if (prev.includes(initialSlug)) {
          return prev;
        }
        // If it's a completely new slug (e.g. clicked a link), reset the view
        return [initialSlug];
      });
    }
  }, [initialSlug]);

  // Logic to find the next post
  const getNextSlug = (currentSlug: string): string | null => {
    if (!allPosts.length || !categories.length) return null;

    const currentPost = allPosts.find(p => p.slug === currentSlug);
    if (!currentPost) return null;

    // 1. Try to find next post in SAME category
    const sameCategoryPosts = allPosts.filter(p => p.category?.slug === currentPost.category?.slug);
    const currentIndex = sameCategoryPosts.findIndex(p => p.slug === currentSlug);

    if (currentIndex !== -1 && currentIndex < sameCategoryPosts.length - 1) {
      return sameCategoryPosts[currentIndex + 1].slug;
    }

    // 2. If no more in same category, find NEXT category
    const currentCategoryIndex = categories.findIndex(c => c.slug === currentPost.category?.slug);

    // Wrap around or stop? User said "next category".
    // Let's go to the next category in the list.
    if (currentCategoryIndex !== -1) {
      let nextCategoryIndex = currentCategoryIndex + 1;

      // Loop through categories until we find one with posts
      while (nextCategoryIndex < categories.length) {
        const nextCategory = categories[nextCategoryIndex];
        const nextCategoryPosts = allPosts.filter(p => p.category?.slug === nextCategory.slug);

        if (nextCategoryPosts.length > 0) {
          return nextCategoryPosts[0].slug;
        }
        nextCategoryIndex++;
      }
    }

    // If we are at the very end of all categories, maybe cycle back to start?
    // Or just stop. Let's stop for now to be safe.
    return null;
  };

  // Infinite Scroll Trigger
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setDisplayedSlugs(prev => {
          const lastSlug = prev[prev.length - 1];
          const nextSlug = getNextSlug(lastSlug);

          if (nextSlug && !prev.includes(nextSlug)) {
            return [...prev, nextSlug];
          }
          return prev;
        });
      }
    }, { threshold: 0.1 });

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [allPosts, categories, displayedSlugs]); // Dependencies crucial for getNextSlug

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans text-foreground">
      <Navigation />

      <main className="flex-1 w-full bg-background">
        {displayedSlugs.map(slug => (
          <ArticleLoader key={slug} slug={slug} />
        ))}
      </main>

      {/* Sentinel element for Infinite Scroll */}
      <div ref={loadMoreRef} className="h-20 w-full flex items-center justify-center">
        {/* Optional: Loading spinner if we are fetching the Next slug decision? 
             Actually getNextSlug is sync, so this is just a trigger area. 
             If we run out of posts, this remains but does nothing. 
         */}
      </div>

      <CollapsibleWebBanner />
      <Footer />
    </div>
  );
}


