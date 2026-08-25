import Link from "next/link"

export default async function Home() {
  return (
    <main>
      <h1>StockPilot</h1>
      <Link href="/products">Go to Products Page</Link>
    </main>
  )
}
