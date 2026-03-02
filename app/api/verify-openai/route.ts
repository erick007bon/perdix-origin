import { NextResponse } from "next/server";

export async function POST(req: Request) {
  return NextResponse.json({ error: "This feature is disabled." }, { status: 404 });
}
