import connectDB from "@/lib/db"
import Product from "@/models/Product"
import Link from "next/link"

async function ProductsPage() {
  await connectDB()
  const products = await Product.find().lean()

  return (
    <main className="p-4">
      <h1>Products</h1>

      <div className="flex flex-wrap gap-4">
        {products.map((product) => (
          <article
            key={product._id.toString()}
            className="shadow border border-gray-200 p-4 rounded-md"
          >
            <h2>{product.name}</h2>

            <p>SKU: {product.sku}</p>

            <p>Price: ₹{product.price}</p>

            <p>Stock: {product.quantity}</p>

            <p>Category: {product.category}</p>
            <Link href={`/products/${product._id}`} className="hover:underline">
              View
            </Link>
          </article>
        ))}
      </div>
    </main>
  )
}

export default ProductsPage
