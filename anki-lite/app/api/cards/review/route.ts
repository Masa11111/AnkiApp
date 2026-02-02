import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { calculateNextInterval } from "../../../lib/reviewLogic";

export async function POST(req: Request) {
  const body = await req.json();

  const nextInterval = calculateNextInterval(body.result, body.currentInterval);

  const nextReviewAt = new Date();
  nextReviewAt.setDate(nextReviewAt.getDate() + nextInterval);

  await prisma.card.update({
    where: { id: body.cardId },
    data: {
      intervalDays: nextInterval,
      nextReviewAt,
    },
  });

  return NextResponse.json({ success: true });
}
