"use client"

import { useEffect, useState } from "react"
import { ReviewResult } from "../lib/reviewLogic"

type Card = {
  id: number
  front: string
  back: string
  intervalDays: number
}

export default function ReviewPage() {
  const [cards, setCards] = useState<Card[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showBack, setShowBack] = useState(false)
  const [loading, setLoading] = useState(true)

  // Fetch today's cards on component mount
  useEffect(() => {
    fetch("/api/cards/today")
      .then((res) => res.json())
      .then((data) => {
        setCards(data)
        setLoading(false)
      })
  }, [])

  // Show loading state
  if (loading) {
    return <p style={{ padding: "2rem" }}>Loading...</p>
  }

  // Get the current card
  const currentCard = cards[currentIndex]

  // Handle review result
  async function handleReview(result: ReviewResult) {

    const card = currentCard

    // Calculate next interval
    await fetch("/api/cards/review", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        cardId: card.id,
        result,
        currentInterval: card.intervalDays
      })
    })


    setShowBack(false)
    setCurrentIndex((prev) => prev + 1)
  }

  if (!currentCard) {
    return (
      <main style={{ padding: "2rem", textAlign: "center" }}>
        <h1>Review</h1>
        <p>今日はここまで 🎉</p>
      </main>
    )
  }

  return (
    <main style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Review</h1>
      <p>
        {currentIndex + 1} / {cards.length}
      </p>

      <div
        onClick={() => setShowBack(true)}
        style={{
          marginTop: "2rem",
          padding: "2rem",
          border: "1px solid #ccc",
          borderRadius: "8px",
          cursor: "pointer",
          minHeight: "120px"
        }}
      >
        <p style={{ fontSize: "1.2rem" }}>
          {showBack ? currentCard.back : currentCard.front}
        </p>
      </div>

      {showBack && (
        <div style={{ marginTop: "1.5rem", display: "flex", gap: "1rem" }}>
          <button onClick={() => handleReview("AGAIN")}>Again</button>
          <button onClick={() => handleReview("GOOD")}>Good</button>
          <button onClick={() => handleReview("EASY")}>Easy</button>
        </div>
      )}
    </main>
  )
}
