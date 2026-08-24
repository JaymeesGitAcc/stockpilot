import mongoose, { Document, Schema } from "mongoose"

interface IProduct extends Document {
  name: string
  sku: string
  price: number
  quantity: number
  category: string
}

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    sku: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true },
)

const Product =
  mongoose.models.Product || mongoose.model<IProduct>("Product", productSchema)

export default Product
