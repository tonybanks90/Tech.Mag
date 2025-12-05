import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCategories, useSiteSettings } from '@/lib/hooks';

import MobileMenu from './MobileMenu';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();

  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const { data: siteSettings, isLoading: settingsLoading } = useSiteSettings();
  const siteName = siteSettings?.siteName || 'Prometheus Tech';

  const isActive = (path: string) => location === path;
  const isLoading = categoriesLoading || settingsLoading;

  return (
    <>
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-xl border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 z-50">
              <h1 className="font-serif text-2xl font-bold tracking-tight text-foreground hover:text-primary transition-colors">
                {siteName}
              </h1>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
              ) : (
                <>
                  {categories?.map((category) => (
                    <Link key={category._id} href={`/category/${category.slug}`}>
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`text-sm font-medium transition-colors ${isActive(`/category/${category.slug}`)
                          ? 'bg-primary/10 text-primary hover:bg-primary/20'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                          }`}
                      >
                        {category.name}
                      </Button>
                    </Link>
                  ))}
                  <Link href="/shop">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`text-sm font-medium transition-colors ${isActive('/shop') ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                    >
                      Shop
                    </Button>
                  </Link>
                  <div className="ml-4 pl-4 border-l border-border h-6 flex items-center">
                    <Button size="sm" className="hidden lg:flex">Subscribe</Button>
                  </div>
                </>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <div className="flex items-center gap-2 md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(true)}
                className="relative z-50 hover:bg-muted rounded-full"
                aria-label="Open Menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        categories={categories || []}
        siteName={siteName}
        isActive={isActive}
        isLoading={isLoading}
      />
    </>
  );
}