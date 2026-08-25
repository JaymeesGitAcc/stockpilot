import Link from "next/link"

export default function ProductNotFoundPage() {
  return (
    <main>
      <h1>Product not found</h1>

      <p>
        The product you're looking for doesn't exist or may have been removed.
      </p>

      <Link href="/products" className="text-blue-300 hover:underline">
        Back to products
      </Link>
    </main>
  )
}
