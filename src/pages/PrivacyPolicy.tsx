import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 py-16 bg-background">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <Link href="/" data-testid="link-back-home">
            <Button variant="ghost" size="sm" className="mb-6 gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>

          <h1 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-8">
            Privacy Policy
          </h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground mb-6">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <h2 className="font-serif text-2xl font-semibold text-foreground mt-8 mb-4">
              Information We Collect
            </h2>
            <p className="text-foreground mb-4">
              We collect information you provide directly to us, such as when you subscribe to our newsletter, 
              contact us, or interact with our content.
            </p>

            <h2 className="font-serif text-2xl font-semibold text-foreground mt-8 mb-4">
              How We Use Your Information
            </h2>
            <p className="text-foreground mb-4">
              We use the information we collect to provide, maintain, and improve our services, 
              send you updates and marketing communications (which you can opt out of at any time), 
              and respond to your comments and questions.
            </p>

            <h2 className="font-serif text-2xl font-semibold text-foreground mt-8 mb-4">
              Affiliate Links
            </h2>
            <p className="text-foreground mb-4">
              Our website contains affiliate links to products we recommend. When you make a purchase through these links, 
              we may receive a commission at no additional cost to you.
            </p>

            <h2 className="font-serif text-2xl font-semibold text-foreground mt-8 mb-4">
              Contact Us
            </h2>
            <p className="text-foreground">
              If you have any questions about this Privacy Policy, please contact us at hello@havenandhearth.com
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
