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
  } catch (error) {
    console.error("Failed to create product:", error)
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
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

    const product = await Product.findByIdAndUpdate(id, result.data, {
      returnDocument: "after",
    })
  } catch (error) {
    console.log("Product Update Error::", error)
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    }
  }
  redirect("/products")
}

export async function deleteProduct(
  formData: FormData,
): Promise<ProductFormState> {
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
    const product = await Product.findByIdAndDelete(productId)

    if (!product) {
      return {
        success: false,
        message: "Product Not found",
      }
    }
  } catch (error) {
    console.log("Something went wrong", error)
    return {
      success: false,
      message: "Something went wrong, Please try again later",
    }
  }
  revalidatePath("/products")
  return {
    success: true,
  }
}
