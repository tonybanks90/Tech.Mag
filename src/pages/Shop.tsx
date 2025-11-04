import Navigation from '@/components/Navigation';
import ProductCard from '@/components/ProductCard';
import Footer from '@/components/Footer';
import { PRODUCTS } from '../../shared/data';
import { AlertCircle } from 'lucide-react';

export default function Shop() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-8">
              <h1 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-4">
                Shop Our Favorites
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Thoughtfully curated products to elevate your home and lifestyle
              </p>
            </div>

            <div className="bg-card border border-card-border rounded-lg p-6 mb-12 flex items-start gap-4">
              <AlertCircle className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-muted-foreground italic">
                  <strong className="text-foreground">Affiliate Disclaimer:</strong> This page contains affiliate links. 
                  When you purchase through these links, we may earn a commission at no additional cost to you. 
                  We only recommend products we genuinely love and believe will enhance your home.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {PRODUCTS.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
