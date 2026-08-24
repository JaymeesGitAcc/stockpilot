import dns from "node:dns/promises"
import mongoose from "mongoose"

dns.setServers(["1.1.1.1", "8.8.8.8"])

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined in .env.local")
}

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return
  }

  try {
    await mongoose.connect(MONGODB_URI)
    console.log("MongoDB connected successfully!")
  } catch (error) {
    console.error("MongoDB connection failed:", error)
    throw error
  }
}

export default connectDB
