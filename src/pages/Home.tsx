import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import FeaturedStories from '@/components/FeaturedStories';
import LatestStories from '@/components/LatestStories';
import NewsletterSection from '@/components/NewsletterSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <HeroSection />
        <FeaturedStories />
        <LatestStories />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
}
