import { Link } from 'wouter';
import useEmblaCarousel from 'embla-carousel-react';
import { Button } from '@/components/ui/button';
import { useFeaturedBlogPosts } from '@/lib/hooks';

export default function HomeCarousel() {
    const { data: posts = [] } = useFeaturedBlogPosts(3);
    const [emblaRef] = useEmblaCarousel({ loop: true });

    if (!posts.length) return null;

    return (
        <section className="relative overflow-hidden bg-background py-8">
            <div className="max-w-7xl mx-auto px-4 lg:px-8">
                <div className="overflow-hidden rounded-xl shadow-2xl" ref={emblaRef}>
                    <div className="flex">
                        {posts.map((post) => (
                            <div key={post._id} className="relative flex-[0_0_100%] min-w-0">
                                <div className="relative h-[60vh] min-h-[400px] w-full">
                                    <img
                                        src={post.coverImage}
                                        alt={post.coverImageAlt}
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                                    <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white">
                                        <div className="max-w-3xl">
                                            {post.category && (
                                                <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-white uppercase bg-primary rounded-full">
                                                    {post.category.name}
                                                </span>
                                            )}

                                            <Link href={`/blog/${post.slug}`}>
                                                <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-4 hover:text-primary transition-colors cursor-pointer">
                                                    {post.title}
                                                </h2>
                                            </Link>

                                            <p className="text-lg text-gray-200 mb-6 line-clamp-2 md:line-clamp-3">
                                                {post.excerpt}
                                            </p>

                                            <div className="flex gap-4">
                                                <Link href={`/blog/${post.slug}`}>
                                                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 rounded-full">
                                                        Read Story
                                                    </Button>
                                                </Link>
                                                <Link href={`/category/${post.category?.slug}`}>
                                                    <Button variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/20 font-semibold px-8 py-6 rounded-full backdrop-blur-sm">
                                                        {post.category?.name}
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
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
