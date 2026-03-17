import AboutPageComponent from '@/components/about/AboutPageComponent';

export const metadata = {
  title: 'About Talukdar - Premium Bathroom & Kitchen Fixtures',
  description:
    "Discover Talukdar's journey of crafting luxury bathrooms and kitchens. Learn about our mission, values, team, and commitment to excellence in craftsmanship and customer satisfaction.",
  keywords:
    'luxury bathrooms, kitchen fixtures, premium design, bathroom design, kitchen remodeling, luxury fixtures, craftsmanship, interior design',
  openGraph: {
    title: 'About Talukdar - Premium Bathroom & Kitchen Fixtures',
    description:
      'Excellence in luxury bathroom and kitchen design. Discover our story, mission, and commitment to transforming your spaces.',
    url: 'https://talukdar.com/about',
    type: 'website',
    image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1200&h=630&fit=crop',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function AboutPage() {
  return <AboutPageComponent />;
}
