"use client"

import { ProductFormState } from "@/app/actions/product-actions"
import { useActionState } from "react"

const initialState = {
  success: false,
  errors: {},
}

type Product = {
  id: string
  name: string
  price: number
  sku: string
  quantity: number
  category: string
}

type ProductAction = (
  prevState: ProductFormState,
  formData: FormData,
) => Promise<ProductFormState>

interface ProductFormProps {
  action: ProductAction
  product?: Product
}

export default function ProductForm({ product, action }: ProductFormProps) {
  const [state, formAction, isPending] = useActionState(action, initialState)

  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={product?.id.toString()} />
      <div>
        <label htmlFor="name">Name</label>

        <input id="name" name="name" defaultValue={product?.name} />

        {state.errors?.name?.map((error) => (
          <p key={error} className="text-red-500">
            {error}
          </p>
        ))}
      </div>

      <div>
        <label htmlFor="sku">SKU</label>

        <input id="sku" name="sku" defaultValue={product?.sku} />

        {state.errors?.sku?.map((error) => (
          <p key={error} className="text-red-500">
            {error}
          </p>
        ))}
      </div>

      <div>
        <label htmlFor="price">Price</label>

        <input
          id="price"
          name="price"
          type="number"
          defaultValue={product?.price}
        />

        {state.errors?.price?.map((error) => (
          <p key={error} className="text-red-500">
            {error}
          </p>
        ))}
      </div>

      <div>
        <label htmlFor="quantity">Quantity</label>

        <input
          id="quantity"
          name="quantity"
          type="number"
          defaultValue={product?.quantity}
        />

        {state.errors?.quantity?.map((error) => (
          <p key={error} className="text-red-500">
            {error}
          </p>
        ))}
      </div>

      <div>
        <label htmlFor="category">Category</label>

        <input id="category" name="category" defaultValue={product?.category} />

        {state.errors?.category?.map((error) => (
          <p key={error} className="text-red-500">
            {error}
          </p>
        ))}
      </div>

      <button type="submit" disabled={isPending}>
        {isPending ? "Creating..." : "Create Product"}
      </button>
    </form>
  )
}
