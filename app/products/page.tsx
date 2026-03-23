//app/products/page.tsx
import ProductsPage from "@/components/ProductsPage"

export const metadata = {
    title: 'All Collections — Aydi Chattels by Jashifa',
    description:
        'Browse our full range of artisan beddings, home décor, candles, and crockery.',
}

export default function ProductsRoute() {
    return (
        <>
        <main>
            <ProductsPage />
        </main>
        </>
    )
}