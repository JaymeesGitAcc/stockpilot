"use client"

import { deleteProduct } from "@/app/actions/product-actions"

interface DeleteProductButtonProps {
  id: string
}

export default function DeleteProductButton({ id }: DeleteProductButtonProps) {
  return (
    <form action={deleteProduct}>
      <input type="hidden" name="productId" value={id} />
      <button type="submit">Delete</button>
    </form>
  )
}
