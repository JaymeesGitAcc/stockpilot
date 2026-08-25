import ProductForm from "@/app/products/new/product-form"
import Link from "next/link"

export default function CreateProductPage() {
  return (
    <main>
      <h1>Add Product</h1>
      <ProductForm />
      <Link href="/products">Go to products</Link>
    </main>
  )
}
