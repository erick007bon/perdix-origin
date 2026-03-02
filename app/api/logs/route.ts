import { NextResponse } from 'next/server';

// In-memory store for demo purposes (resets on cold start)
const logs: Array<{ id: string; timestamp: string; level: string; message: string }> = [];

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const log = {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      level: body.level || 'info',
      message: body.message
    };
    logs.unshift(log);
    if (logs.length > 50) logs.pop();
    return NextResponse.json(log);
  } catch {
    return NextResponse.json({ error: "Error creating log" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json(logs.slice(0, 50));
}
