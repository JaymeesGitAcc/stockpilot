import connectDB from "@/lib/db"
import Product from "@/models/Product"
import mongoose from "mongoose"
import Link from "next/link"
import { notFound } from "next/navigation"

async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    notFound()
  }

  await connectDB()

  const product = await Product.findById(id).lean()

  if (!product) notFound()

  return (
    <article>
      <p>Name: {product.name}</p>
      <p>Price: {product.price}</p>
      <p>Stock: {product.quantity}</p>
      <p>Product Code: {product.sku}</p>
      <Link href="/products" className="hover:underline text-blue-300">
        All products
      </Link>
    </article>
  )
}

export default ProductPage
