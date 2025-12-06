import { useState, useEffect } from 'react';
import { Heart, Bookmark, Share2, Eye, Calendar, User, ArrowRight } from 'lucide-react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PortableText } from '@/components/PortableText';
import Sidebar from '@/components/Sidebar';
import WideBlogCard from '@/components/WideBlogCard';
import type { BlogPost, BlogPostPreview } from '@/lib/types';

interface ArticleContentProps {
    post: BlogPost;
    allPosts: BlogPostPreview[];
}

export default function ArticleContent({ post, allPosts }: ArticleContentProps) {
    const [liked, setLiked] = useState(false);
    const [bookmarked, setBookmarked] = useState(false);
    const [likes, setLikes] = useState(0);
    const [bookmarks, setBookmarks] = useState(0);

    useEffect(() => {
        if (post) {
            setLikes(post.reactions.likes);
            setBookmarks(post.reactions.bookmarks);
        }
    }, [post]);

    const handleLike = () => {
        setLiked(!liked);
        setLikes(liked ? likes - 1 : likes + 1);
    };

    const handleBookmark = () => {
        setBookmarked(!bookmarked);
        setBookmarks(bookmarked ? bookmarks - 1 : bookmarks + 1);
    };

    return (
        <div className="w-full max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 py-16 border-b border-border/40">

            {/* Header */}
            <header className="mb-10 max-w-5xl">
                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 text-foreground tracking-tight text-left">
                    {post.title}
                </h1>

                {/* Meta & Tags */}
                <div className="flex flex-wrap items-center justify-between gap-6 py-4 border-y border-border/50 text-muted-foreground text-sm font-medium mb-8">
                    <div className="flex items-center flex-wrap gap-6">
                        {post.category && (
                            <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 rounded text-sm font-bold uppercase tracking-wider px-3 py-1.5">
                                {post.category.name}
                            </Badge>
                        )}
                        <div className="flex items-center gap-2 text-foreground">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                <User className="w-4 h-4" />
                            </div>
                            <span className="font-bold">Prometheus Tech</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <TimerIcon className="w-4 h-4" />
                            <span className="tabular-nums">{post.readTime} min read</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Eye className="w-4 h-4" />
                            <span className="tabular-nums">2,453 Views</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span className="tabular-nums">{new Date(post.publishedAt).toLocaleDateString()}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" onClick={handleLike} className={liked ? 'text-red-500' : ''}>
                            <Heart className={`w-5 h-5 mr-1.5 ${liked ? 'fill-current' : ''}`} />
                            <span className="tabular-nums">{likes}</span>
                        </Button>
                        <Button variant="ghost" size="sm" onClick={handleBookmark} className={bookmarked ? 'text-primary' : ''}>
                            <Bookmark className={`w-5 h-5 mr-1.5 ${bookmarked ? 'fill-current' : ''}`} />
                            <span className="tabular-nums">{bookmarks}</span>
                        </Button>
                        <Button variant="outline" size="sm" className="gap-2 rounded-full border-border hover:bg-muted">
                            <Share2 className="w-4 h-4" />
                            Share
                        </Button>
                    </div>
                </div>
            </header>

            {/* 2-Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                {/* Main Content Column */}
                <div className="lg:col-span-8">

                    {/* Hero Image */}
                    <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden mb-10 shadow-lg border border-border/50">
                        <img
                            src={post.coverImage}
                            alt={post.coverImageAlt}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    </div>

                    {/* Article Body */}
                    <article className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-serif prose-headings:font-bold prose-headings:tracking-tight prose-p:leading-relaxed prose-img:rounded-xl">
                        <p className="lead text-xl md:text-2xl text-foreground font-medium mb-8 leading-relaxed border-l-4 border-primary pl-6 italic">
                            {post.excerpt}
                        </p>

                        {/* In-content Ad Placeholder */}
                        <div className="not-prose my-12 p-8 bg-muted/20 rounded-lg border border-dashed border-border/60 flex items-center justify-center min-h-[150px]">
                            <div className="text-center">
                                <span className="text-xs font-mono text-muted-foreground block mb-2">Advertisement</span>
                                <span className="text-lg font-semibold text-muted-foreground/60">Horizontal Banner Ad</span>
                            </div>
                        </div>

                        <PortableText value={post.content} />
                    </article>

                    <div className="my-12 py-8 border-t border-border">
                        <h3 className="text-2xl font-serif font-bold mb-6">Related Topics</h3>
                        <div className="flex flex-wrap gap-2">
                            {['Technology', 'Innovation', 'Future', 'Tech Trends'].map(tag => (
                                <Badge key={tag} variant="secondary" className="px-4 py-2 text-sm hover:bg-primary hover:text-white cursor-pointer transition-colors">
                                    #{tag}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    {/* ======================================================= */}
                    {/* RELATED / MORE CATEGORIES */}
                    {/* ======================================================= */}
                    <div className="mt-20 space-y-24">
                        {/* 1. Same Category First */}
                        <CategorySection
                            categoryName={`More in ${post.category?.name}`}
                            slug={post.category?.slug || ''}
                            posts={allPosts.filter(p => p.category?.slug === post.category?.slug && p._id !== post._id)}
                        />

                        {/* 2. All Other Categories (displaying one other category for now to keep it sane?) */}
                        {/* User said: "blogpost after each blog and immedeatlfy after more of the fist blog"
                 Wait, if we render *every* category here, the user has to scroll through ALL category previews before reaching the next blog?
                 That seems excessive for infinite scroll.
                 Usually you show "More in [This Category]" 
                 AND THEN the next blog starts.
                 If I render ALL categories here, it will be huge. 
                 The original file map()'d categories.
                 User said: "display the next blog of nex category using the above method"
                 I believe the intention is:
                 [Article A]
                 [More in Category A]  <-- Just this one section
                 [Article B]
                 [More in Category B]
                 
                 I will COMMENT OUT the "All Other Categories" loop here, and only show "More in Same Category".
                 The "next category" article will effectively handle the "next category" visibility.
             */}
                    </div>

                </div>

                {/* Sidebar Column (Sticky) */}
                <aside className="hidden lg:block lg:col-span-4 pl-8 border-l border-border/40 relative">
                    <div className="sticky top-24 h-fit">
                        <Sidebar />
                    </div>
                </aside>
            </div>
        </div>
    );
}

// Sub-component for Category Feeds
function CategorySection({ categoryName, slug, posts }: { categoryName: string, slug: string, posts: any[] }) {
    if (posts.length === 0) return null;

    // Display top 4 posts from category
    const displayPosts = posts.slice(0, 4);

    return (
        <section className="border-t-4 border-primary/20 pt-8 animate-in slide-in-from-bottom-10 duration-700 fade-in-20">

            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <h2 className="font-serif text-2xl font-bold flex items-center gap-2 text-foreground">
                        More in <span className="text-primary">{categoryName.replace('More in ', '')}</span>
                    </h2>
                </div>
                <Link href={`/category/${slug}`}>
                    <Button variant="ghost" className="text-muted-foreground hover:text-primary gap-1">
                        View All <ArrowRight className="w-4 h-4" />
                    </Button>
                </Link>
            </div>

            {/* Wide Rectangular Cards */}
            <div className="grid grid-cols-1 gap-6">
                {displayPosts.map(post => (
                    <WideBlogCard key={post._id} post={post} />
                ))}
            </div>
        </section>
    );
}

function TimerIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
        </svg>
    )
}
