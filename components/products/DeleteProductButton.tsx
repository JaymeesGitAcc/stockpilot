"use client"

import { deleteProduct } from "@/app/actions/product-actions"
import { useActionState } from "react"

interface DeleteProductButtonProps {
  id: string
}

const initialState = {
  success: false,
}

export default function DeleteProductButton({ id }: DeleteProductButtonProps) {
  const [_, formAction, isPending] = useActionState(
    deleteProduct,
    initialState,
  )
  return (
    <form
      action={formAction}
      onSubmit={(e) => {
        if (!confirm("Are you sure you want to delete this product?")) {
          e.preventDefault()
        }
      }}
    >
      <input type="hidden" name="productId" value={id} />
      <button type="submit" disabled={isPending}>
        {isPending ? "Deleting..." : "Delete"}
      </button>
    </form>
  )
}
