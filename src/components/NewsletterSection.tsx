import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { NEWSLETTER_SECTION } from '../../shared/data';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      console.log('Newsletter subscription:', email);
      toast({
        title: 'Successfully subscribed!',
        description: 'Thank you for joining our community.',
      });
      setEmail('');
    }
  };

  return (
    <section className="relative py-20 overflow-hidden">
      <img
        src={NEWSLETTER_SECTION.backgroundImage}
        alt={NEWSLETTER_SECTION.imageAlt}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/50" />
      
      <div className="relative max-w-3xl mx-auto px-6 lg:px-8 text-center">
        <h2 className="font-serif text-4xl md:text-5xl font-semibold text-white mb-4">
          {NEWSLETTER_SECTION.heading}
        </h2>
        <p className="text-lg text-white/90 mb-8">
          {NEWSLETTER_SECTION.description}
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 bg-white text-foreground"
            data-testid="input-newsletter-email"
          />
          <Button
            type="submit"
            size="lg"
            data-testid="button-newsletter-subscribe"
          >
            {NEWSLETTER_SECTION.cta}
          </Button>
        </form>
      </div>
    </section>
  );
}
