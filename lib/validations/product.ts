import { z } from "zod"

export const createProductSchema = z.object({
  name: z.string().trim().min(1, "Product Name is required"),
  price: z.coerce.number().min(0, "Price cannot be negative"),
  sku: z.string().trim().min(1, "SKU is required"),
  quantity: z.coerce
    .number()
    .int("Quantity must be a whole number")
    .min(0, "Quantity cannot be negative"),
  category: z.string().trim().min(1, "Category is required"),
})
