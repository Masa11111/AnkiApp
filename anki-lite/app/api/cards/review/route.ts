import { NextResponse } from "next/server";
import { calculateNextInterval } from "../../../lib/reviewLogic";

type ReviewRequest = {
  cardId: number;
  result: "AGAIN" | "GOOD" | "EASY";
  currentInterval: number;
};

export async function POST(req: Request) {
  const body: ReviewRequest = await req.json();

  const nextInterval = calculateNextInterval(body.result, body.currentInterval);

  console.log("Review result received:", {
    cardId: body.cardId,
    result: body.result,
    nextInterval,
  });

  return NextResponse.json({
    cardId: body.cardId,
    nextInterval,
  });
}
