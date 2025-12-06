import React, { useEffect, useRef } from 'react';
import { useBlogPostBySlug, useBlogPosts } from '@/lib/hooks';
import ArticleContent from './ArticleContent';

interface ArticleLoaderProps {
    slug: string;
}

const ArticleLoader = React.memo(function ArticleLoader({ slug }: ArticleLoaderProps) {
    const { data: post, isLoading } = useBlogPostBySlug(slug);
    const { data: allPosts = [] } = useBlogPosts();

    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!post) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        window.history.replaceState({ isInfiniteScroll: true }, '', `/blog/${slug}`);
                        if (document.title !== post.title) {
                            document.title = post.title;
                        }
                    }
                });
            },
            {
                rootMargin: '-40% 0px -40% 0px'
            }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, [slug, post]);

    if (isLoading) {
        return (
            <div className="min-h-[50vh] flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!post) {
        return null;
    }

    return (
        <div ref={containerRef} className="min-h-screen relative">
            <div className="w-full h-px bg-border/40 my-0"></div>
            <ArticleContent
                post={post}
                allPosts={allPosts}
            />
        </div>
    );
});

export default ArticleLoader;
