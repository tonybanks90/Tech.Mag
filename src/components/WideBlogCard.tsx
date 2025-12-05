import { Link } from 'wouter';
import { Clock, Heart, Bookmark } from 'lucide-react';
import { Card } from '@/components/ui/card';
import type { BlogPostPreview } from '@/lib/types';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface WideBlogCardProps {
    post: BlogPostPreview;
}

export default function WideBlogCard({ post }: WideBlogCardProps) {
    const [liked, setLiked] = useState(false);
    const [bookmarked, setBookmarked] = useState(false);
    const [likes, setLikes] = useState(post.reactions.likes);
    const [bookmarks, setBookmarks] = useState(post.reactions.bookmarks);

    const handleLike = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setLiked(!liked);
        setLikes(liked ? likes - 1 : likes + 1);
    };

    const handleBookmark = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setBookmarked(!bookmarked);
        setBookmarks(bookmarked ? bookmarks - 1 : bookmarks + 1);
    };

    return (
        <Link href={`/blog/${post.slug}`} className="block h-full">
            <Card className="group flex flex-row overflow-hidden hover-elevate active-elevate-2 transition-all duration-200 cursor-pointer h-full border border-border/60 hover:border-primary/40 bg-card text-card-foreground">

                {/* Left: Image (Fixed Width, Full Height) */}
                <div className="w-40 md:w-56 shrink-0 relative overflow-hidden bg-muted">
                    <img
                        src={post.coverImage}
                        alt={post.coverImageAlt}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                </div>

                {/* Right: Content */}
                <div className="flex-1 p-5 flex flex-col justify-between min-h-[140px]">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            {post.category && (
                                <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                                    {post.category.name}
                                </span>
                            )}
                            <span className="text-xs text-muted-foreground">• {new Date(post.publishedAt).toLocaleDateString()}</span>
                        </div>

                        <h3 className="font-serif text-lg md:text-xl font-bold leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-2">
                            {post.title}
                        </h3>

                        <p className="text-sm text-muted-foreground line-clamp-1 md:line-clamp-2 mb-3 leading-relaxed hidden md:block">
                            {post.excerpt}
                        </p>
                    </div>

                    <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            <span>{post.readTime} min</span>
                        </div>

                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={handleLike}>
                                <Heart className={`w-3.5 h-3.5 ${liked ? 'fill-red-500 text-red-500' : ''}`} />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={handleBookmark}>
                                <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-primary text-primary' : ''}`} />
                            </Button>
                        </div>
                    </div>
                </div>

            </Card>
        </Link>
    );
}
