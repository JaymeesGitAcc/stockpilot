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
  message?: string
}

export type DeleteProductState = {
  success: boolean
  message?: string
}

export async function createProduct(
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

  const result = createProductSchema.safeParse(data)

  if (!result.success) {
    const flattened = z.flattenError(result.error)

    return {
      success: false,
      errors: flattened.fieldErrors,
    }
  }

  try {
    await connectDB()
    await Product.create(result.data)
  } catch (error: unknown) {
    console.error("Failed to create product:", error)

    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === 11000
    ) {
      return {
        success: false,
        message: "A product with this SKU already exists.",
      }
    }

    return {
      success: false,
      message: "Failed to create product. Please try again.",
    }
  }

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

  try {
    await connectDB()

    await Product.findByIdAndUpdate(id, result.data)
  } catch (error: unknown) {
    console.log("Product Update Error::", error)
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === 11000
    ) {
      return {
        success: false,
        message: "A product with this SKU already exists.",
      }
    }
    return {
      success: false,
      message: "Failed to update the product. Please try again later.",
    }
  }
  redirect("/products")
}

export async function deleteProduct(
  _prevState: DeleteProductState,
  formData: FormData,
): Promise<DeleteProductState> {
  const productId = formData.get("productId")
  if (typeof productId !== "string" || !productId)
    return {
      success: false,
      message: "Invalid Product Id",
    }

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return {
      success: false,
      message: "Invalid Product Id",
    }
  }

  try {
    await connectDB()
    await Product.findByIdAndDelete(productId)
  } catch (error) {
    console.log("Product Delete Error: ", error)
    return {
      success: false,
      message: "Unable to delete product. Please try again later",
    }
  }
  revalidatePath("/products")
  return {
    success: true,
  }
}
