import { Playfair_Display, Inter } from "next/font/google";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { AppProvider } from "@/components/context/AppContext";
import CartSidebar from "@/components/cart/CartSidebar";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "Talukdar - Luxury Bathrooms & Kitchens",
  description:
    "Transform your spaces with premium bathrooms and kitchens by Talukdar. Luxury design meets craftsmanship.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${inter.variable} antialiased bg-white`}
      >
        <AppProvider>
          <Navbar />
          {children}
          <Footer />
          <CartSidebar />
        </AppProvider>
      </body>
    </html>
  );
}
