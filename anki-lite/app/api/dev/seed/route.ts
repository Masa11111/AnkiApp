import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function POST() {
  await prisma.card.createMany({
    data: [
      {
        front: "What does latency mean?",
        back: "The delay before data transfer begins.",
        intervalDays: 0,
        nextReviewAt: new Date(),
      },
      {
        front: "What is an API?",
        back: "An interface that allows different software systems to communicate.",
        intervalDays: 0,
        nextReviewAt: new Date(),
      },
    ],
  });

  return NextResponse.json({ seeded: true });
}
