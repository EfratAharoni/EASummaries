import { NextResponse } from "next/server";
import { createSummary } from "@/lib/summaries";

export async function POST(request) {
  try {
    const payload = await request.json();
    const summary = await createSummary(payload);
    return NextResponse.json({ summary }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Failed to create summary" },
      { status: 400 }
    );
  }
}
