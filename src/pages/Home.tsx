import Navigation from '@/components/Navigation';
import HomeCarousel from '@/components/HomeCarousel';
import NewsLayout from '@/components/NewsLayout';
import LatestStories from '@/components/LatestStories';
import NewsletterSection from '@/components/NewsletterSection';
import Footer from '@/components/Footer';
import AdUnit from '@/components/AdUnit';

import SEO from "@/components/SEO";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Home"
        description="Tech.Mag - Your source for the latest technology news, innovation, and trends."
      />
      <Navigation />

      <div className="max-w-7xl mx-auto w-full px-4 lg:px-8 pt-4">
        <AdUnit format="horizontal" testMode={true} className="my-4" />
      </div>

      <main className="flex-1">
        <HomeCarousel />
        <NewsLayout />

        <div className="bg-background py-6">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <AdUnit format="auto" testMode={true} label="Sponsored Content" />
          </div>
        </div>

        <LatestStories />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
}
