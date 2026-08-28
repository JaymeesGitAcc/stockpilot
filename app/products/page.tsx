import DeleteProductButton from "@/components/products/DeleteProductButton"
import connectDB from "@/lib/db"
import Product from "@/models/Product"
import Link from "next/link"

async function ProductsPage() {
  await connectDB()
  const products = await Product.find().lean()

  return (
    <main className="p-4">
      <h1>Products</h1>

      <Link href="/products/new">Add a product</Link>

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
            <div className="flex items-center gap-4">
              <Link
                href={`/products/${product._id}`}
                className="hover:underline"
              >
                View
              </Link>
              <Link
                href={`/products/${product._id}/edit`}
                className="hover:underline"
              >
                Update
              </Link>
              <DeleteProductButton id={product._id.toString()} />
            </div>
          </article>
        ))}
      </div>
    </main>
  )
}

export default ProductsPage
