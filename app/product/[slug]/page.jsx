import ProductDetails from "@/components/product/ProductDetails";
import ProductPageClient from "@/components/product/ProductPageClient";

const BASE_URL = process.env.NEXT_PUBLIC_TALUKDAR_API_BASE_URL;

async function getProductBySlug(slug) {
  const url = `${BASE_URL}product/${slug}`;
  if (!BASE_URL) return null;

  const response = await fetch(url, {
    next: { revalidate: 60 },
  });

  if (!response.ok) return null;

  const json = await response.json();
  if (!json || typeof json !== "object") return null;

  // Supports both { data: {...} } and direct object payloads.
  const product = json?.data ?? json;
  return product?.id ? product : null;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found.",
    };
  }

  return {
    title: product.meta_title || product.name,
    description: product.meta_description || product.name,
    openGraph: {
      title: product.meta_title || product.name,
      description: product.meta_description || product.name,
      images: [product.thumbnail_image].filter(Boolean),
    },
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (product?.id) {
    return <ProductDetails product={product} />;
  }

  // Fallback to client-side fetch path to avoid false 404s when server env/network differs.
  return <ProductPageClient slug={slug} initialProduct={null} />;
}
