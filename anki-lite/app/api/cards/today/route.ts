import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET() {
  const now = new Date();

  const cards = await prisma.card.findMany({
    where: {
      nextReviewAt: {
        lte: now,
      },
    },
    orderBy: {
      nextReviewAt: "asc",
    },
  });

  return NextResponse.json(cards);
}
