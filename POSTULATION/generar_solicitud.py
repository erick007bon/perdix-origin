from docx import Document
from docx.shared import Pt, Cm
from docx.enum.text import WD_ALIGN_PARAGRAPH
import os

doc = Document()

for section in doc.sections:
    section.top_margin = Cm(2.5)
    section.bottom_margin = Cm(2.5)
    section.left_margin = Cm(3)
    section.right_margin = Cm(2.5)

style = doc.styles['Normal']
style.font.name = 'Times New Roman'
style.font.size = Pt(12)

def bp(text, align=WD_ALIGN_PARAGRAPH.LEFT, size=12, sa=0):
    p = doc.add_paragraph()
    p.alignment = align
    r = p.add_run(text)
    r.bold = True
    r.font.name = 'Times New Roman'
    r.font.size = Pt(size)
    p.paragraph_format.space_after = Pt(sa)
    return p

def np(text, align=WD_ALIGN_PARAGRAPH.JUSTIFY, sa=6):
    p = doc.add_paragraph()
    p.alignment = align
    r = p.add_run(text)
    r.font.name = 'Times New Roman'
    r.font.size = Pt(12)
    p.paragraph_format.space_after = Pt(sa)
    return p

def mp(parts, align=WD_ALIGN_PARAGRAPH.JUSTIFY, sa=6):
    p = doc.add_paragraph()
    p.alignment = align
    for text, bold in parts:
        r = p.add_run(text)
        r.bold = bold
        r.font.name = 'Times New Roman'
        r.font.size = Pt(12)
    p.paragraph_format.space_after = Pt(sa)
    return p

def bl(text, prefix="", sa=2):
    p = doc.add_paragraph(style='List Bullet')
    p.paragraph_format.space_after = Pt(sa)
    if prefix:
        r = p.add_run(prefix)
        r.bold = True
        r.font.name = 'Times New Roman'
        r.font.size = Pt(11)
        r2 = p.add_run(text)
        r2.font.name = 'Times New Roman'
        r2.font.size = Pt(11)
    else:
        r = p.add_run(text)
        r.font.name = 'Times New Roman'
        r.font.size = Pt(11)
    return p

# === HEADER ===
bp("Guayaquil, 20 de febrero de 2026", WD_ALIGN_PARAGRAPH.RIGHT, 12, 12)
bp("MSc. Juan Ernesto Fernandez Escobar", sa=0)
bp("Decano de Vinculacion con la Sociedad y Bienestar Estudiantil", sa=0)
bp("Universidad de Guayaquil", sa=0)
bp("Ciudad.-", sa=18)
np("De mi consideracion:", sa=12)

# === INTRO ===
mp([
    ("Reciba un cordial y respetuoso saludo. Yo, ", False),
    ("ERICK REINALDO FLORES ZAMBRANO", True),
    (", con cedula de ciudadania No. ", False),
    ("1206064006", True),
    (", estudiante regular de la ", False),
    ("Facultad de Ciencias Matematicas y Fisicas", True),
    (", de la carrera de ", False),
    ("Ingenieria en Ciencia de Datos e Inteligencia Artificial", True),
    (", cursando actualmente el ", False),
    ("4to semestre", True),
    (", me dirijo a usted para solicitar la revision de mi postulacion al beneficio de ", False),
    ("Ayuda Economica", True),
    (" en la categoria de ", False),
    ("EMPRENDIMIENTOS INNOVADORES", True),
    (", correspondiente al periodo academico ", False),
    ("2025-2026 CII", True),
    (".", False),
], sa=12)

# === I. NATURALEZA ===
bp("I. NATURALEZA DEL EMPRENDIMIENTO", sa=8)

mp([
    ("Fundamento esta solicitud en la creacion y direccion ejecutiva de ", False),
    ("Perdix Origin", True),
    (' (anteriormente "Perdix Intelligence"), una ', False),
    ("Plataforma de Infraestructura Digital e Inteligencia Artificial", True),
    (" que opera como agencia tecnologica de alto impacto. No se trata de un proyecto academico aislado, sino de un ", False),
    ("ecosistema integral", True),
    (" que ya se encuentra ", False),
    ("desplegado, operativo y verificable en produccion", True),
    (".", False),
], sa=8)

np("Nuestra plataforma web (enlaces verificables al final de esta carta) alberga actualmente un portafolio de mas de 15 soluciones tecnologicas distribuidas en las siguientes verticales:", sa=10)

# A
bp("A. Inteligencia Artificial Aplicada", sa=4)
bl(" Sistema de vision por computadora con Deep Learning para la deteccion temprana de enfermedades en plantaciones de banano y camaron, contribuyendo a la reduccion de perdidas agricolas en un estimado del 45%.", "AgroTech Vision (AgroScan AI): ")
bl(" Motor de analisis tributario automatizado de alta precision, capaz de procesar y optimizar declaraciones fiscales mediante algoritmos propietarios.", "SRI Intelligence: ")
bl(" Despliegue de agentes inteligentes personalizados con GPT-4 y sistemas RAG (Retrieval-Augmented Generation) corporativos, incluyendo chatbots con memoria persistente.", "OpenAI Brains: ")
bl(" Modelo geoespacial predictivo de criminalidad basado en datos historicos, con impacto directo en la mejora de tiempos de respuesta policial (estimado del 30%).", "Safety Analytics (UrbanShield): ")

# B
bp("B. Automatizacion e Infraestructura Empresarial", sa=4)
bl(" Automatizacion nativa usando Google Apps Script, GCP y Workspace.", "Google Automate Ecosystem: ")
bl(" Agentes autonomos que razonan y ejecutan tareas complejas.", "Orquestacion OpenAI: ")
bl(" Flujos de trabajo que eliminan tareas repetitivas y errores humanos.", "Procesos On-Demand: ")
bl(" Despliegue en AWS, Google Cloud y Vercel con seguridad total.", "Infraestructura Cloud: ")
bl(" Gestion de clientes inteligente adaptada a flujos de ventas reales.", "CRM Personalizado: ")
bl(" PostgreSQL, MongoDB y sistemas de almacenamiento escalables.", "Bases de Datos de Alto Rendimiento: ")
bl(" Desarrollo de aplicaciones web y plataformas de clase mundial.", "Web Factory: ")

# C
bp("C. Producto Insignia: Perdix Talent (Caballo de Batalla)", sa=4)
mp([
    ("Nuestro producto estrella es ", False),
    ("Perdix Talent", True),
    (', la primera plataforma de "AI Proof-of-Work" del mundo. Este sistema verifica, en tiempo real, las capacidades cognitivas de profesionales de IA conectandose directamente a la API de OpenAI. Perdix Talent no solo simula: ', False),
    ("ejecuta verificaciones reales", True),
    (' con claves API autenticas, generando un score de eficiencia verificable (ej: "Certified Expert - 98/100 Efficiency"). El objetivo es ', False),
    ("revolucionar la contratacion tecnologica", True),
    (" al ofrecer una herramienta que certifica talento de IA de forma objetiva, eliminando la ambiguedad de los curriculos tradicionales.", False),
], sa=12)

# === II. RECONOCIMIENTO ===
bp("II. RECONOCIMIENTO INTERNACIONAL", sa=8)
mp([
    ("Perdix Origin ha sido ", False),
    ("seleccionado y registrado para competir en la Hult Prize 2026 Global Competition", True),
    (", el concurso de emprendimiento social mas grande del mundo, donde participan las ", False),
    ("mejores universidades del planeta", True),
    (" (MIT, Stanford, Oxford, Universidad de Guayaquil, entre otras). Esta seleccion valida la relevancia y escalabilidad de nuestra propuesta a nivel global.", False),
], sa=12)

# === III. ODS ===
bp("III. ALINEACION CON LOS ODS DE LAS NACIONES UNIDAS", sa=8)
np("Nuestro trabajo se alinea directamente con tres Objetivos de Desarrollo Sostenible:", sa=4)
bl(" AgroScan AI protege cultivos de banano, sector estrategico del Ecuador.", "ODS 2 - Hambre Cero: ")
bl(" UrbanShield mejora la seguridad ciudadana con ciencia de datos.", "ODS 16 - Paz y Justicia: ")
bl(" La automatizacion democratiza herramientas para PYMEs, incrementando su productividad 10x.", "ODS 8 - Trabajo Decente: ", sa=12)

# === IV. EQUIPO ===
bp("IV. EQUIPO FUNDADOR", sa=8)
bl(" CEO & Fundador, Ing. en Ciencia de Datos e IA (4to Semestre, UG).", "Erick Reinaldo Flores Zambrano - ")
bl(" Co-Fundador & CTO.", "Andres Ricardo Astudillo Avila - ", sa=12)

# === V. STACK ===
bp("V. STACK TECNOLOGICO", sa=8)
np("Python - TensorFlow - Google Cloud - n8n - Next.js - PostgreSQL - MongoDB - OpenAI API - Vercel - AWS", sa=12)

# === VI. VERIFICACION ===
bp("VI. VERIFICACION INMEDIATA", sa=8)
np("Invito respetuosamente a su Decanato a verificar la existencia y funcionamiento real de todo lo expuesto visitando los siguientes enlaces:", sa=6)
bl(" https://ingenieria-platform.vercel.app/", "Plataforma Web Operativa: ")
bl(" https://www.linkedin.com/in/erick-flores-zambrano-69075b198", "Perfil Profesional (LinkedIn): ")
bl(" https://github.com/erick6655", "Repositorios de Codigo (GitHub): ", sa=12)

# === CIERRE ===
np("Adjunto a esta comunicacion la documentacion habilitante requerida por el Reglamento de Ayudas Economicas vigente, reafirmando mi compromiso absoluto con la excelencia academica y la innovacion tecnologica en beneficio de nuestra Alma Mater y del Ecuador.", sa=8)
np("Por la atencion favorable que se digne dar a la presente, anticipo mi sincero agradecimiento.", sa=24)
np("Atentamente,", WD_ALIGN_PARAGRAPH.LEFT, sa=36)

# Signature
np("_________________________________", WD_ALIGN_PARAGRAPH.LEFT, sa=0)
bp("ERICK REINALDO FLORES ZAMBRANO", sa=0)
np("C.I. 1206064006", WD_ALIGN_PARAGRAPH.LEFT, sa=0)
np("Celular: 0963951193", WD_ALIGN_PARAGRAPH.LEFT, sa=0)
np("Correo: erick.floreszam@ug.edu.ec", WD_ALIGN_PARAGRAPH.LEFT, sa=0)

# === SAVE ===
out = os.path.join(os.path.dirname(os.path.abspath(__file__)), "SOLICITUD_AYUDA_ECONOMICA_PERDIX.docx")
doc.save(out)
print(f"Word generado: {out}")
print(f"Tamano: {os.path.getsize(out) / 1024:.1f} KB")
