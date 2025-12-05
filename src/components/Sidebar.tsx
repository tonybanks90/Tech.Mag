import { Link } from 'wouter';
import { useFeaturedBlogPosts } from '@/lib/hooks';
import { TrendingUp, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AdUnit from './AdUnit';

export default function Sidebar() {
    const { data: posts = [] } = useFeaturedBlogPosts(10); // Fetch more to simulate different lists

    // Split posts for different sections
    const editorsChoice = posts.slice(0, 3);
    const hotStories = posts.slice(3, 8);

    return (
        <div className="space-y-12">
            {/* Ad Slot 1 (Top) */}
            <AdUnit
                format="rectangle"
                testMode={true} // TODO: remove when real ID available
                className="shadow-sm bg-background border-border"
            />

            {/* Newsletter Widget */}
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-primary/10 rounded-full text-primary">
                        <Mail className="h-5 w-5" />
                    </div>
                    <h3 className="font-serif text-lg font-bold">Tech Daily</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                    Get the latest tech news and insights delivered straight to your inbox.
                </p>
                <div className="space-y-3">
                    <Input placeholder="Enter your email" className="bg-background" />
                    <Button className="w-full font-bold">Subscribe</Button>
                </div>
                <p className="text-[10px] text-muted-foreground mt-3 text-center">
                    No spam. Unsubscribe anytime.
                </p>
            </div>

            {/* Editor's Choice */}
            <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                <h3 className="font-serif text-xl font-bold mb-6 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                    Editor's Choice
                </h3>
                <div className="space-y-6">
                    {editorsChoice.map((post) => (
                        <Link key={post._id} href={`/blog/${post.slug}`} className="group block">
                            <div className="flex gap-4 items-start">
                                <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                                    <img
                                        src={post.coverImage}
                                        alt={post.coverImageAlt}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                </div>
                                <div>
                                    {post.category && (
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-primary mb-1 block">
                                            {post.category.name}
                                        </span>
                                    )}
                                    <h4 className="text-sm font-bold leading-snug group-hover:text-primary transition-colors line-clamp-3">
                                        {post.title}
                                    </h4>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Ad Slot 2 (Tall) */}
            <div className="sticky top-24">
                <AdUnit
                    format="vertical"
                    testMode={true}
                    className="shadow-sm bg-background border-border"
                />
            </div>

            {/* Hot Stories */}
            <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                <h3 className="font-serif text-xl font-bold mb-6 flex items-center gap-2 text-red-500">
                    <TrendingUp className="h-5 w-5" />
                    Hot Stories
                </h3>
                <div className="space-y-4">
                    {hotStories.map((post, idx) => (
                        <Link key={post._id} href={`/blog/${post.slug}`} className="group flex items-start gap-4 pb-4 border-b border-border/50 last:border-0 last:pb-0">
                            <span className="text-2xl font-bold text-muted-foreground/30 font-serif leading-none min-w-[1.5rem]">
                                {idx + 1}
                            </span>
                            <h4 className="text-sm font-bold leading-tight group-hover:text-primary transition-colors">
                                {post.title}
                            </h4>
                        </Link>
                    ))}
                </div>
            </div>

        </div>
    );
}
