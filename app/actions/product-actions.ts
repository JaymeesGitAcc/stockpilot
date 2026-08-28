"use server"

import { z } from "zod"
import connectDB from "@/lib/db"
import { createProductSchema } from "@/lib/validations/product"
import Product from "@/models/Product"
import { redirect } from "next/navigation"
import mongoose from "mongoose"
import { revalidatePath } from "next/cache"

export type ProductFormState = {
  success: boolean
  errors?: {
    name?: string[]
    sku?: string[]
    price?: string[]
    quantity?: string[]
    category?: string[]
  }
}

export async function createProduct(
  _prevState: ProductFormState,
  formData: FormData,
): Promise<ProductFormState> {
  await connectDB()

  const data = {
    name: formData.get("name"),
    price: formData.get("price"),
    sku: formData.get("sku"),
    quantity: formData.get("quantity"),
    category: formData.get("category"),
  }

  const result = createProductSchema.safeParse(data)

  if (!result.success) {
    const flattened = z.flattenError(result.error)

    return {
      success: false,
      errors: flattened.fieldErrors,
    }
  }

  await connectDB()

  await Product.create(result.data)

  redirect("/products")
}

export async function updateProduct(
  _prevState: ProductFormState,
  formData: FormData,
): Promise<ProductFormState> {
  const data = {
    name: formData.get("name"),
    price: formData.get("price"),
    sku: formData.get("sku"),
    quantity: formData.get("quantity"),
    category: formData.get("category"),
  }

  const id = formData.get("id")

  const result = createProductSchema.safeParse(data)

  if (!result.success) {
    const flattened = z.flattenError(result.error)

    return {
      success: false,
      errors: flattened.fieldErrors,
    }
  }

  await connectDB()

  await Product.findByIdAndUpdate(id, result.data, { new: true })

  redirect("/products")
}

export async function deleteProduct(formData: FormData) {
  const productId = formData.get("productId")
  if (typeof productId !== "string" || !productId) return

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return
  }

  try {
    await connectDB()
    const product = await Product.findByIdAndDelete(productId)

    if (!product) {
      return
    }
    revalidatePath("/products")
  } catch (error) {
    console.log(error)
  }
}
