from openai import OpenAI
import os

# Configuración basada en tu Antigravity Manager
client = OpenAI(
    base_url="http://127.0.0.1:8045/v1",
    api_key="sk-e208015b5fc8449fae88fd046f1e9661"
)

try:
    print("🚀 Probando conexión con Antigravity Manager (Puerto 8045)...")
    response = client.chat.completions.create(
        model="claude-sonnet-4-6", 
        messages=[{"role": "user", "content": "Hola, ¿estás funcionando correctamente?"}]
    )
    print("\n✅ Respuesta de la IA:")
    print(response.choices[0].message.content)
except Exception as e:
    print(f"\n❌ Error al conectar: {e}")
