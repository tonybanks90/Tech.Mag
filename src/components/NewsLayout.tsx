import { Link } from 'wouter';
import { useFeaturedBlogPosts } from '@/lib/hooks';
import { Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function NewsLayout() {
    // Fetch more posts to fill the slots: 1 main + 3-4 side
    const { data: posts = [] } = useFeaturedBlogPosts(5);

    if (posts.length === 0) return null;

    const mainPost = posts[0];
    const sidePosts = posts.slice(1);

    return (
        <section className="py-12 bg-background">
            <div className="max-w-7xl mx-auto px-4 lg:px-8">
                <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
                    <span className="w-2 h-8 bg-primary rounded-full inline-block"></span>
                    Trending Now
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Main Column (Left/Center) - 8 cols */}
                    <div className="lg:col-span-8 group relative overflow-hidden rounded-xl bg-card shadow-sm border border-border/50 hover:shadow-md transition-all">
                        <Link href={`/blog/${mainPost.slug}`}>
                            <div className="relative aspect-[16/9] w-full overflow-hidden">
                                <img
                                    src={mainPost.coverImage}
                                    alt={mainPost.coverImageAlt}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90" />

                                <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full">
                                    {mainPost.category && (
                                        <Badge className="mb-3 hover:bg-primary/90">
                                            {mainPost.category.name}
                                        </Badge>
                                    )}
                                    <h3 className="text-2xl md:text-4xl font-bold text-white mb-3 leading-tight">
                                        {mainPost.title}
                                    </h3>
                                    <div className="flex items-center text-white/80 text-sm gap-4">
                                        <span className="flex items-center gap-1">
                                            <Clock className="w-4 h-4" /> {mainPost.readTime} min read
                                        </span>
                                        <span>
                                            {new Date(mainPost.publishedAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>

                    {/* Side Column (Right) - 4 cols */}
                    <div className="lg:col-span-4 flex flex-col gap-4">
                        {sidePosts.map((post) => (
                            <div key={post._id} className="group flex gap-4 bg-card rounded-xl p-3 border border-border/50 hover:border-primary/50 transition-colors cursor-pointer shadow-sm">
                                <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                                    <img
                                        src={post.coverImage}
                                        alt={post.coverImageAlt}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                </div>
                                <div className="flex flex-col justify-center">
                                    {post.category && (
                                        <span className="text-xs font-semibold text-primary mb-1 uppercase tracking-wider">
                                            {post.category.name}
                                        </span>
                                    )}
                                    <Link href={`/blog/${post.slug}`}>
                                        <h4 className="font-bold text-sm md:text-base line-clamp-2 leading-snug group-hover:text-primary transition-colors">
                                            {post.title}
                                        </h4>
                                    </Link>
                                    <div className="mt-2 flex items-center text-xs text-muted-foreground gap-2">
                                        <Clock className="w-3 h-3" /> {post.readTime} min
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
