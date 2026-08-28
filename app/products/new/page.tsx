import { createProduct } from "@/app/actions/product-actions"
import ProductForm from "@/components/products/ProductForm"
import Link from "next/link"

export default function CreateProductPage() {
  return (
    <main>
      <h1>Add Product</h1>
      <ProductForm action={createProduct} />
      <Link href="/products">Go to products</Link>
    </main>
  )
}
