import { useRoute } from 'wouter';
import { useState } from 'react';
import { Clock, Heart, Bookmark, ArrowLeft } from 'lucide-react';
import { Link } from 'wouter';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BLOG_POSTS, CATEGORIES } from '../../shared/data';
import NotFound from './not-found';

export default function BlogPost() {
  const [, params] = useRoute('/blog/:slug');
  const post = BLOG_POSTS.find(p => p.slug === params?.slug);
  
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [likes, setLikes] = useState(post?.reactions.likes || 0);
  const [bookmarks, setBookmarks] = useState(post?.reactions.bookmarks || 0);

  if (!post) {
    return <NotFound />;
  }

  const category = CATEGORIES.find(c => c.id === post.categoryId);

  const handleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
    setBookmarks(bookmarked ? bookmarks - 1 : bookmarks + 1);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <article>
          <div className="relative h-[50vh] min-h-[400px] max-h-[600px] w-full overflow-hidden">
            <img
              src={post.coverImage}
              alt={post.coverImageAlt}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          </div>

          <div className="max-w-4xl mx-auto px-6 lg:px-8 -mt-32 relative z-10">
            <div className="bg-background rounded-lg p-8 md:p-12 shadow-xl">
              <Link href="/" data-testid="link-back-home">
                <Button variant="ghost" size="sm" className="mb-6 gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Home
                </Button>
              </Link>

              {category && (
                <Badge className="mb-4 bg-primary text-primary-foreground">
                  {category.name}
                </Badge>
              )}

              <h1 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-6">
                {post.title}
              </h1>

              <div className="flex items-center justify-between pb-6 mb-8 border-b border-border">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">{post.readTime} min read</span>
                  <span className="text-sm">•</span>
                  <span className="text-sm">
                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`gap-1 ${liked ? 'text-primary' : ''}`}
                    onClick={handleLike}
                    data-testid="button-like-post"
                  >
                    <Heart className={`h-4 w-4 ${liked ? 'fill-current' : ''}`} />
                    <span className="text-sm">{likes}</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`gap-1 ${bookmarked ? 'text-primary' : ''}`}
                    onClick={handleBookmark}
                    data-testid="button-bookmark-post"
                  >
                    <Bookmark className={`h-4 w-4 ${bookmarked ? 'fill-current' : ''}`} />
                    <span className="text-sm">{bookmarks}</span>
                  </Button>
                </div>
              </div>

              <div 
                className="prose prose-lg max-w-none
                  prose-headings:font-serif prose-headings:text-foreground
                  prose-h2:text-3xl prose-h2:font-semibold prose-h2:mt-12 prose-h2:mb-4
                  prose-h3:text-2xl prose-h3:font-semibold prose-h3:mt-8 prose-h3:mb-3
                  prose-p:text-foreground prose-p:leading-relaxed prose-p:mb-6
                  prose-a:text-primary prose-a:no-underline hover:prose-a:underline"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>
          </div>
        </article>
      </main>
      <div className="mt-16">
        <Footer />
      </div>
    </div>
  );
}
