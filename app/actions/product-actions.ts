"use server"

import { z } from "zod"
import connectDB from "@/lib/db"
import { createProductSchema } from "@/lib/validations/product"
import Product from "@/models/Product"

type CreateProductState = {
  success: boolean
  errors?: {
    name?: string[]
    sku?: string[]
    price?: string[]
    quantity?: string[]
    category?: string[]
  }
}

export async function createProduct(_prevState: CreateProductState, formData: FormData): Promise<CreateProductState> {
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

  return {
    success: true,
  }
}
