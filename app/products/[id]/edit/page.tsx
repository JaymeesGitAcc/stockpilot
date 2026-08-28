import { updateProduct } from "@/app/actions/product-actions"
import ProductForm from "@/components/products/ProductForm"
import connectDB from "@/lib/db"
import Product from "@/models/Product"
import mongoose from "mongoose"
import { notFound } from "next/navigation"

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    notFound()
  }

  connectDB()

  const product = await Product.findById(id).lean()

  if (!product) {
    notFound()
  }

  const productData = {
    id: product._id.toString(),
    name: product.name,
    sku: product.sku,
    price: product.price,
    quantity: product.quantity,
    category: product.category,
  }

  return (
    <main>
      <h1>Edit Product</h1>

      <ProductForm
        product={productData}
        action={updateProduct}
      />
    </main>
  )
}
