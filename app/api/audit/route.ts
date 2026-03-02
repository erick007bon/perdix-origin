import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';

const execAsync = promisify(exec);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { docId } = body;

    // Ejecutar el motor de auditoría real (Python)
    const scriptPath = path.join(process.cwd(), 'skills/sri-intelligence/scripts/audit_sri_engine.py');
    const { stdout } = await execAsync(`python "${scriptPath}"`);
    
    const result = JSON.parse(stdout);

    return NextResponse.json({
      success: true,
      data: result,
      message: "Auditoría completada por Agente Senior SRI"
    });
  } catch (error: any) {
    console.error("SRI Audit Error:", error);
    return NextResponse.json({ 
      success: false, 
      error: "Error en el motor de auditoría",
      details: error.message 
    }, { status: 500 });
  }
}
