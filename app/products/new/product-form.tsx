"use client"

import { useActionState } from "react"
import { createProduct } from "@/app/actions/product-actions"

const initialState = {
  success: false,
  errors: {},
}

export default function ProductForm() {
  const [state, formAction, isPending] = useActionState(
    createProduct,
    initialState,
  )

  return (
    <form action={formAction}>
      <div>
        <label htmlFor="name">Name</label>

        <input id="name" name="name" />

        {state.errors?.name?.map((error) => (
          <p key={error} className="text-red-500">{error}</p>
        ))}
      </div>

      <div>
        <label htmlFor="sku">SKU</label>

        <input id="sku" name="sku" />

        {state.errors?.sku?.map((error) => (
          <p key={error} className="text-red-500">{error}</p>
        ))}
      </div>

      <div>
        <label htmlFor="price">Price</label>

        <input id="price" name="price" type="number" />

        {state.errors?.price?.map((error) => (
          <p key={error} className="text-red-500">{error}</p>
        ))}
      </div>

      <div>
        <label htmlFor="quantity">Quantity</label>

        <input id="quantity" name="quantity" type="number" />

        {state.errors?.quantity?.map((error) => (
          <p key={error} className="text-red-500">{error}</p>
        ))}
      </div>

      <div>
        <label htmlFor="category">Category</label>

        <input id="category" name="category" />

        {state.errors?.category?.map((error) => (
          <p key={error} className="text-red-500">{error}</p>
        ))}
      </div>

      <button type="submit" disabled={isPending}>
        {isPending ? "Creating..." : "Create Product"}
      </button>
    </form>
  )
}
