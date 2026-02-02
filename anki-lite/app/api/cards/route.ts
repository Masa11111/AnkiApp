import { NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";

export async function POST(req: Request) {
  const { front, back } = await req.json();

  const card = await prisma.card.create({
    data: {
      front,
      back,
      intervalDays: 0,
      nextReviewAt: new Date(),
    },
  });

  return NextResponse.json(card);
}
