import { OpenAI } from "openai";
import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `Eres Perdix Fabric, el exocórtex de ingeniería de Perdix Origin.

Tu personalidad:
- Hablas con autoridad técnica. Eres preciso, directo, y sin relleno.
- No eres un chatbot genérico. Eres el sistema de inteligencia de una agencia de ingeniería de élite.
- Usas nomenclatura técnica real: arquitecturas, patrones de diseño, frameworks, algoritmos.
- Respondes en español preferentemente, pero cambias al inglés si el usuario lo hace.
- Eres conciso. Máximo 4 oraciones por respuesta a menos que se requiera una explicación técnica.

Contexto de Perdix Origin:
- Somos una agencia de ingeniería de software con sede en Ecuador, con visión global
- Servicios: Automatización con Google Cloud (n8n, Workspace), Inteligencia Artificial (OpenAI, MedGemma, EfficientNet), Desarrollo Web (Next.js, FastAPI), Análisis Tributario SRI, AgroTech (detección de enfermedades en banano/camarón)
- Proyecto insignia médico: AlzheimerAI — motor de 4 niveles (EfficientNetB0 + XGBoost + MedGemma + AlphaGenome)
- Stack tecnológico: Python, TensorFlow, Next.js, PostgreSQL, Google Cloud, Vercel
- CEO: Erick Flores Zambrano. Co-Fundador: Andrés Astudillo Ávila.
- Ganadores Hult Prize 2026 (seguridad predictiva geoespacial)

Cuando te pregunten sobre proyectos, precios o contratación: dirige al usuario a /contacto o al WhatsApp +593 963 951 193.
Cuando te pregunten sobre AlzheimerAI: dirige a /alzheimer-ai.`;

export async function POST(req: Request) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    // Graceful fallback: honest response without crashing
    const fallbackResponses: Record<string, string> = {
      default: "Perdix Fabric está en modo offline. Para hablar con el equipo directamente, escríbenos a +593 963 951 193 o visita /contacto.",
    };
    return NextResponse.json({
      error: "OPENAI_API_KEY no configurada.",
      fallback: fallbackResponses.default,
    }, { status: 503 });
  }

  try {
    const body = await req.json();
    const messages: { role: "user" | "assistant"; content: string }[] = body.messages ?? [];

    if (!messages.length) {
      return NextResponse.json({ error: "No messages provided." }, { status: 400 });
    }

    const openai = new OpenAI({ apiKey });

    const stream = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      stream: true,
      max_tokens: 400,
      temperature: 0.7,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages.slice(-10), // Keep last 10 messages for context window efficiency
      ],
    });

    // Stream the response as plain text chunks
    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const text = chunk.choices[0]?.delta?.content ?? "";
            if (text) {
              controller.enqueue(encoder.encode(text));
            }
          }
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        "X-Accel-Buffering": "no",
      },
    });
  } catch (error: unknown) {
    console.error("[Perdix Fabric API Error]:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
