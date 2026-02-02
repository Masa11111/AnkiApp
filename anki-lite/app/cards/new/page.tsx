"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

export default function NewCardPage() {
  const [front, setFront] = useState("")
  const [back, setBack] = useState("")
  const router = useRouter()

  async function handleSubmit() {
    if (!front || !back) return

    await fetch("/api/cards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ front, back })
    })

    router.push("/review")
  }

  return (
    <main style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <h1>New Card</h1>

      <div style={{ marginTop: "1rem" }}>
        <label>Front</label>
        <textarea
          value={front}
          onChange={(e) => setFront(e.target.value)}
          rows={3}
          style={{ width: "100%" }}
        />
      </div>

      <div style={{ marginTop: "1rem" }}>
        <label>Back</label>
        <textarea
          value={back}
          onChange={(e) => setBack(e.target.value)}
          rows={3}
          style={{ width: "100%" }}
        />
      </div>

      <button style={{ marginTop: "1.5rem" }} onClick={handleSubmit}>
        Save
      </button>
    </main>
  )
}
