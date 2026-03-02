# AGENTS.md

Este archivo proporciona orientación a los agentes de codificación de IA que trabajan en la base de código CLI de `skills`.

## Descripción General del Proyecto

`skills` es la CLI (Interfaz de Línea de Comandos) para el ecosistema abierto de habilidades (skills) de agentes.

## Comandos

| Comando              | Descripción                                         |
| -------------------- | --------------------------------------------------- |
| `skills`             | Muestra el banner con los comandos disponibles      |
| `skills init [nombre]`| Crea una nueva plantilla SKILL.md                   |
| `skills add [paquete]`| Instala skills desde repos git, URLs o rutas locales|
| `skills list`        | Lista las skills instaladas (alias: `ls`)           |
| `skills check`       | Busca actualizaciones disponibles para las skills   |
| `skills update`      | Actualiza todas las skills a sus últimas versiones  |

Alias: `skills a`, `skills i`, `skills install` funcionan igual que `add`. `skills ls` funciona igual que `list`.

## Arquitectura

```
src/
├── cli.ts           # Punto de entrada principal, enrutamiento de comandos, init/check/update
├── cli.test.ts      # Pruebas de CLI
├── add.ts           # Lógica central del comando add
├── add.test.ts      # Pruebas del comando add
├── list.ts          # Comando para listar skills instaladas
├── list.test.ts     # Pruebas del comando list
├── agents.ts        # Definiciones y detección de agentes
├── installer.ts     # Lógica de instalación de skills (symlink/copia) + listInstalledSkills
├── skills.ts        # Descubrimiento y análisis de skills
├── skill-lock.ts    # Gestión de archivos de bloqueo (lock files)
├── source-parser.ts # Analizador de URLs de git, abreviaturas de GitHub, rutas locales
├── git.ts           # Operaciones de clonación de Git
├── telemetry.ts     # Seguimiento de uso anónimo
├── types.ts         # Tipos TypeScript
├── mintlify.ts      # Obtención de skills de Mintlify (legado)
├── providers/       # Proveedores remotos de skills (GitHub, HuggingFace, Mintlify)
│   ├── index.ts
│   ├── registry.ts
│   ├── types.ts
│   ├── huggingface.ts
│   └── mintlify.ts
├── init.test.ts     # Pruebas del comando Init
└── test-utils.ts    # Utilidades de prueba

tests/
├── sanitize-name.test.ts     # Pruebas para sanitizeName (prevención de path traversal)
├── skill-matching.test.ts    # Pruebas para filterSkills (coincidencia de nombres de skill de varias palabras)
├── source-parser.test.ts     # Pruebas para análisis de URL/rutas
├── installer-symlink.test.ts # Pruebas para instalación con symlink
├── list-installed.test.ts    # Pruebas para listar skills instaladas
├── skill-path.test.ts        # Pruebas para manejo de rutas de skills
├── wellknown-provider.test.ts # Pruebas para proveedores conocidos
└── dist.test.ts              # Pruebas para distribución construida
```

## Sistema de Verificación de Actualizaciones

### Cómo funcionan `skills check` y `skills update`

1.  Lee `~/.agents/.skill-lock.json` para las skills instaladas.
2.  Para cada skill, obtiene `skillFolderHash` del archivo de bloqueo.
3.  Envía POST a `https://add-skill.vercel.sh/check-updates` con:
    ```json
    {
      "skills": [{ "name": "...", "source": "...", "skillFolderHash": "..." }],
      "forceRefresh": true
    }
    ```
4.  La API obtiene contenido fresco de GitHub, calcula el hash y compara.
5.  Devuelve una lista de skills con hashes diferentes (actualizaciones disponibles).

### ¿Por qué `forceRefresh: true`?

Tanto `check` como `update` envían siempre `forceRefresh: true`. Esto asegura que la API obtenga contenido fresco de GitHub en lugar de usar su caché de Redis.

**Sin forceRefresh:** Los usuarios veían "actualizaciones disponibles" fantasma debido a hashes en caché obsoletos. La solución fue siempre obtener datos frescos.

**Compromiso:** Ligeramente más lento (llamada a API de GitHub por skill), pero siempre preciso.

### Compatibilidad del Archivo de Bloqueo

El formato del archivo de bloqueo es v3. Campo clave: `skillFolderHash` (SHA del árbol de GitHub para la carpeta de la skill).

Si se lee una versión anterior del archivo de bloqueo, se borra. Los usuarios deben reinstalar las skills para poblar el nuevo formato.

## Puntos Clave de Integración

| Característica   | Implementación                              |
| ---------------- | ------------------------------------------- |
| `skills add`     | `src/add.ts` - implementación completa      |
| `skills check`   | API `POST /check-updates`                   |
| `skills update`  | `POST /check-updates` + reinstalación por skill |

## Desarrollo

```bash
# Instalar dependencias
pnpm install

# Construir
pnpm build

# Probar localmente
pnpm dev add vercel-labs/agent-skills --list
pnpm dev check
pnpm dev update
pnpm dev init my-skill

# Ejecutar todas las pruebas
pnpm test

# Ejecutar archivo(s) de prueba específico(s)
pnpm test tests/sanitize-name.test.ts
pnpm test tests/skill-matching.test.ts tests/source-parser.test.ts

# Verificación de tipos
pnpm type-check

# Formatear código
pnpm format
```

## Estilo de Código

Este proyecto usa Prettier para formateo de código. **Ejecuta siempre `pnpm format` antes de confirmar cambios** para asegurar un formato consistente.

```bash
# Formatear todos los archivos
pnpm format

# Verificar formato sin arreglar
pnpm prettier --check .
```

CI fallará si el código no está formateado correctamente.

## Publicación

```bash
# 1. Incrementar versión en package.json
# 2. Construir
pnpm build
# 3. Publicar
npm publish
```

## Agregar un Nuevo Agente

1.  Agrega la definición del agente a `src/agents.ts`
2.  Ejecuta `pnpm run -C scripts validate-agents.ts` para validar
3.  Ejecuta `pnpm run -C scripts sync-agents.ts` para actualizar README.md
