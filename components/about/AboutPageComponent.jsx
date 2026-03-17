'use client';

import { useEffect } from 'react';
import AboutHero from './AboutHero';
import Mission from './Mission';
import Values from './Values';
import Journey from './Journey';
import Team from './Team';
import Commitment from './Commitment';

export const metadata = {
  title: 'About Talukdar - Premium Bathroom & Kitchen Fixtures',
  description:
    "Discover Talukdar's journey of crafting luxury bathrooms and kitchens. Learn about our mission, values, team, and commitment to excellence in craftsmanship and customer satisfaction.",
  keywords:
    'luxury bathrooms, kitchen fixtures, premium design, bathroom design, kitchen remodeling, luxury fixtures, craftsmanship',
  openGraph: {
    title: 'About Talukdar - Premium Bathroom & Kitchen Fixtures',
    description:
      'Excellence in luxury bathroom and kitchen design. Discover our story, mission, and commitment to transforming your spaces.',
    url: 'https://talukdar.com/about',
    type: 'website',
  },
};

export default function AboutPageComponent() {
  useEffect(() => {
    // Set page metadata dynamically
    document.title = metadata.title;
    
    // Update meta tags
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', metadata.description);
    }

    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', metadata.keywords);
    }
  }, []);

  return (
    <main className="bg-white dark:bg-[#0f1219] transition-colors duration-300">
      {/* Page Header Meta Info - Hidden but important for SEO */}
      <div className="sr-only">
        <h1>{metadata.title}</h1>
        <p>{metadata.description}</p>
      </div>

      {/* About Page Sections */}
      <AboutHero />
      <Mission />
      <Values />
      <Journey />
      <Team />
      <Commitment />
    </main>
  );
}
