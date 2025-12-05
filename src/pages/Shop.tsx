import Navigation from '@/components/Navigation';
import ProductCard from '@/components/ProductCard';
import Footer from '@/components/Footer';
import { useProducts } from '@/lib/hooks';
import { AlertCircle, ShoppingBag, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function Shop() {
  const { data: products = [] } = useProducts();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      <main className="flex-1">
        {/* Header Banner */}
        <section className="bg-muted/30 py-20 border-b border-border">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">Curated Tech</Badge>
            <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6 tracking-tight">
              The Tech.Mag Shop
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Hand-picked gadgets and gear for the modern innovator. Tested by our editors, loved by tech enthusiasts.
            </p>
          </div>
        </section>

        <section className="py-16 max-w-7xl mx-auto px-6 lg:px-8">
          {/* Disclaimer */}
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mb-12 flex items-start gap-3 max-w-3xl mx-auto">
            <AlertCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <p className="text-sm text-foreground/80 leading-relaxed">
              <strong className="text-primary font-semibold">Transparency Note:</strong> We may earn a commission from links on this page, but we only recommend products we truly believe in. Your support helps us keep Tech.Mag running.
            </p>
          </div>

          {/* Filter / Sort Bar */}
          <div className="flex flex-wrap items-center justify-between mb-8 pb-6 border-b border-border gap-4">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-primary" />
              <span className="font-bold text-lg">{products.length} Products</span>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="w-4 h-4" /> Filter
              </Button>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div key={product._id} className="group">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
