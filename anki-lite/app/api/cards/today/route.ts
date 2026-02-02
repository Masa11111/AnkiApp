import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json([
    {
      id: 1,
      front: "What does latency mean?",
      back: "The delay before data transfer begins.",
      intervalDays: 0
    },
    {
      id: 2,
      front: "What is an API?",
      back: "An interface that allows different software systems to communicate.",
      intervalDays: 1
    }
  ])
}
