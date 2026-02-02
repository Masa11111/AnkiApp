export type ReviewResult = "AGAIN" | "GOOD" | "EASY"

export function calculateNextInterval(
  result: ReviewResult,
  currentInterval: number
): number {
  switch (result) {
    case "AGAIN":
      return 0
    case "GOOD":
      return Math.max(1, currentInterval * 2)
    case "EASY":
      return Math.max(3, currentInterval * 3)
    default:
      return currentInterval
  }
}