import Hero from "@/components/home/Hero";
import ProductSection from "@/components/home/ProductSection";
import Features from "@/components/home/Features";
import Testimonials from "@/components/home/Testimonials";
import CTA from "@/components/home/CTA";
import Map from "@/components/home/Map";

const bathroomProducts = [
  {
    id: "1",
    name: "Marble Elegance Sink",
    category: "Fixtures",
    price: 2500,
    image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=500&h=500&fit=crop",
    rating: 4.8,
  },
  {
    id: "2",
    name: "Rainfall Shower System",
    category: "Showers",
    price: 1800,
    image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=500&h=500&fit=crop",
    rating: 4.9,
  },
  {
    id: "3",
    name: "Heated Towel Rack",
    category: "Accessories",
    price: 950,
    image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=500&h=500&fit=crop",
    rating: 4.7,
  },
  {
    id: "10",
    name: "Luxury Vanity Unit",
    category: "Cabinets",
    price: 3200,
    image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=500&h=500&fit=crop",
    rating: 4.9,
  },
  {
    id: "13",
    name: "Freestanding Bathtub",
    category: "Bathtubs",
    price: 4200,
    image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=500&h=500&fit=crop",
    rating: 5.0,
  },
  {
    id: "14",
    name: "Wall-Mounted Toilet",
    category: "Fixtures",
    price: 1350,
    image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=500&h=500&fit=crop",
    rating: 4.6,
  },
  {
    id: "15",
    name: "Double Basin Vanity",
    category: "Vanities",
    price: 3600,
    image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=500&h=500&fit=crop",
    rating: 4.8,
  },
  {
    id: "16",
    name: "Smart Shower Panel",
    category: "Showers",
    price: 2800,
    image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=500&h=500&fit=crop",
    rating: 4.9,
  },
  {
    id: "17",
    name: "Brass Towel Ring",
    category: "Accessories",
    price: 320,
    image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=500&h=500&fit=crop",
    rating: 4.5,
  },
  {
    id: "18",
    name: "LED Bathroom Mirror",
    category: "Mirrors",
    price: 1100,
    image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=500&h=500&fit=crop",
    rating: 4.7,
  },
];

const kitchenProducts = [
  {
    id: "4",
    name: "Premium Faucet",
    category: "Faucets",
    price: 1200,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=500&fit=crop",
    rating: 4.8,
  },
  {
    id: "5",
    name: "Island Cooktop",
    category: "Ranges",
    price: 4500,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=500&fit=crop",
    rating: 5.0,
  },
  {
    id: "6",
    name: "Custom Cabinetry",
    category: "Cabinets",
    price: 3800,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=500&fit=crop",
    rating: 4.9,
  },
  {
    id: "11",
    name: "Quartz Countertop",
    category: "Counters",
    price: 2200,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=500&fit=crop",
    rating: 4.8,
  },
  {
    id: "19",
    name: "Under-Mount Kitchen Sink",
    category: "Fixtures",
    price: 980,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=500&fit=crop",
    rating: 4.7,
  },
  {
    id: "20",
    name: "Range Hood Ventilation",
    category: "Ventilation",
    price: 1650,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=500&fit=crop",
    rating: 4.8,
  },
  {
    id: "21",
    name: "Pull-Down Sprayer Faucet",
    category: "Faucets",
    price: 890,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=500&fit=crop",
    rating: 4.6,
  },
  {
    id: "22",
    name: "Butcher Block Island",
    category: "Counters",
    price: 2800,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=500&fit=crop",
    rating: 4.9,
  },
  {
    id: "23",
    name: "Glass Backsplash Tiles",
    category: "Tiles",
    price: 750,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=500&fit=crop",
    rating: 4.5,
  },
  {
    id: "24",
    name: "Built-In Microwave Unit",
    category: "Appliances",
    price: 1400,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=500&fit=crop",
    rating: 4.7,
  },
];

const accessoryProducts = [
  {
    id: "7",
    name: "Luxury Mirror Collection",
    category: "Mirrors",
    price: 1500,
    image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=500&h=500&fit=crop",
    rating: 4.7,
  },
  {
    id: "8",
    name: "Premium Hardware Set",
    category: "Hardware",
    price: 680,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=500&fit=crop",
    rating: 4.6,
  },
  {
    id: "9",
    name: "Luxury Bath Lighting",
    category: "Lighting",
    price: 920,
    image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=500&h=500&fit=crop",
    rating: 4.8,
  },
  {
    id: "12",
    name: "Designer Faucet Handles",
    category: "Hardware",
    price: 450,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=500&fit=crop",
    rating: 4.7,
  },
  {
    id: "25",
    name: "Soap Dispenser Set",
    category: "Accessories",
    price: 280,
    image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=500&h=500&fit=crop",
    rating: 4.5,
  },
  {
    id: "26",
    name: "Cabinet Knob Collection",
    category: "Hardware",
    price: 390,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=500&fit=crop",
    rating: 4.6,
  },
  {
    id: "27",
    name: "Recessed Ceiling Lights",
    category: "Lighting",
    price: 1100,
    image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=500&h=500&fit=crop",
    rating: 4.8,
  },
  {
    id: "28",
    name: "Frameless Wall Mirror",
    category: "Mirrors",
    price: 850,
    image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=500&h=500&fit=crop",
    rating: 4.7,
  },
  {
    id: "29",
    name: "Towel Bar & Hook Set",
    category: "Accessories",
    price: 420,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=500&fit=crop",
    rating: 4.4,
  },
  {
    id: "30",
    name: "Pendant Kitchen Lights",
    category: "Lighting",
    price: 1350,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=500&fit=crop",
    rating: 4.9,
  },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <ProductSection
        title="Bathroom Collections"
        subtitle="Premium Bathroom"
        id="bathrooms"
        products={bathroomProducts}
      />
      <Features />
      <ProductSection
        title="Kitchen Collections"
        subtitle="Luxury Kitchens"
        id="kitchens"
        products={kitchenProducts}
      />
      <ProductSection
        title="Accessories & Finishing"
        subtitle="Complete Your Design"
        products={accessoryProducts}
      />
      <Testimonials />
      <CTA />
      <Map />
    </main>
  );
}
