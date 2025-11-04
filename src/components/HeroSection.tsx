import { Button } from '@/components/ui/button';
import { HERO_SECTION } from '../../shared/data';

export default function HeroSection() {
  const scrollToStories = () => {
    const storiesSection = document.getElementById('featured-stories');
    storiesSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-[70vh] min-h-[500px] max-h-[700px] w-full overflow-hidden">
      <img
        src={HERO_SECTION.image}
        alt={HERO_SECTION.imageAlt}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/30 to-black/20" />
      
      <div className="relative h-full max-w-7xl mx-auto px-6 lg:px-8 flex flex-col items-center justify-center text-center">
        <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-semibold text-white mb-4">
          {HERO_SECTION.heading}
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl">
          {HERO_SECTION.subheading}
        </p>
        <Button
          size="lg"
          onClick={scrollToStories}
          className="bg-primary/90 backdrop-blur-md hover:bg-primary border border-primary-border text-primary-foreground"
          data-testid="button-explore-stories"
        >
          Explore Our Stories
        </Button>
      </div>
    </section>
  );
}
