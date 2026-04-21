import Hero from "@/components/home/Hero";
import CategorySpotlight from "@/components/home/CategorySpotlight";
import Features from "@/components/home/Features";
import Testimonials from "@/components/home/Testimonials";
import CTA from "@/components/home/CTA";
import Map from "@/components/home/Map";
import Marquee from "../components/home/Marquee";
import NewArrivalsSection from "@/components/home/NewArrivalsSection";
import BestSellingSection from "@/components/home/BestSellingSection";
import BathroomCollectionSection from "@/components/home/BathroomCollectionSection";
import KitchenCollectionSection from "@/components/home/KitchenCollectionSection";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <CategorySpotlight />
      <BathroomCollectionSection />
      <Features />
      <KitchenCollectionSection />
      <Marquee/>
      <NewArrivalsSection />
      <BestSellingSection />
      <Testimonials />
      <CTA />
      <Map />
    </main>
  );
}
