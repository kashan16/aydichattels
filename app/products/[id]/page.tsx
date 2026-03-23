import ProductInfoPage from "@/components/ProductsInfoPage";
import { getProductById, products } from "@/lib/products";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

// ─── Static params ────────────────────────────────────────────

export async function generateStaticParams() {
    return products.map((p) => ({ id: String(p.id) }));
}

// ─── Metadata ────────────────────────────────────────────

export async function generateMetadata({
    params,
}:{
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
    const { id } = await params; // ✅ FIX

    const product = getProductById(Number(id));
    if (!product) return { title: "Product Not Found" };

    return {
        title: `${product.name} — Aydi Chattels by Jashifa`,
        description: product.description.slice(0, 160),
    };
}

// ─── Page ────────────────────────────────────────────

export default async function ProductDetailRoute({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params; // ✅ FIX

    const product = getProductById(Number(id));

    if (!product) notFound();

    return (
        <main>
        <ProductInfoPage product={product} />
        </main>
    );
}