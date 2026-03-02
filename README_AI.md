# Perdix Origin - AI Context Injector (README_AI)

> [!IMPORTANT]
> This document is designed to be pasted directly into a new AI session (like Claude, GPT, or Antigravity) to provide immediate context for the **Perdix Origin** project. Use this when switching PCs or starting fresh.

## 🎯 Project Overview
**Perdix Origin** (Ingenieria Platform) is a multi-faceted AI ecosystem that combines specialized diagnostic tools with a modular "skills" architecture for autonomous agents.

### Core Pillars:
1.  **Ingenieria Platform**: A Next.js 15+ web application serving as the hub for all diagnostic tools.
2.  **Skills CLI Ecosystem**: A custom CLI (`skills`) for managing and deploying agent capabilities.
3.  **Specialized AI Modules**:
    - **Alzheimer AI**: Detection and analysis tool.
    - **Banana Disease Detection**: Agricultural vision AI.
    - **Hult Prize Pitch**: Strategic storytelling and pitch decking tools.

## 📚 The "Two Books" (Foundational Context)
The project is governed by two main documentation files that define how AI agents should interact with this codebase:

1.  **[AGENTS.md](file:///c:/Users/Erick%20Zambrano/Desktop/linkedin/PROYECTOS/ingenieria-platform/AGENTS.md)**: Defines the `skills` CLI architecture, commands (`init`, `add`, `list`, `check`, `update`), and the agentic plugin system.
2.  **[CLAUDE.md](file:///c:/Users/Erick%20Zambrano/Desktop/linkedin/PROYECTOS/ingenieria-platform/CLAUDE.md)**: Defines the **Perdix Engineering Rules**, tech stack standards (Next.js, Tailwind 4, AI SDK), and the Integrated ECC (Everything Claude Code) agent roles.
3.  **[alzheimer-expert.md](file:///c:/Users/Erick%20Zambrano/Desktop/linkedin/PROYECTOS/ingenieria-platform/.claude/agents/alzheimer-expert.md)**: Specialized agent for **AlzheimerAI**. Contains research context for Colab/Drive environments (No path dependency).

## 🛠 Tech Stack
- **Frontend**: Next.js 16 (App Router), React 19, Framer Motion, Lucid React.
- **Styling**: Tailwind CSS 4+ (using high-density engineering aesthetics).
- **AI Integration**: OpenAI SDK, Vercel AI SDK.
- **Backend / Persistence**: SQLite (`dev.db`), Next.js API Routes.
- **Tooling**: `skills` CLI, `gh` CLI, `vercel` CLI.

## 📂 Key Architecture
```bash
/
├── app/                  # Next.js App Router (Platform UI)
├── skills/               # Local repository of 3000+ agent skills
├── .agents/              # Agent configuration and skill lockfiles
├── alzheimer-ai/         # Specialized AI module
├── 03_banana_disease_detection/ # Agricultural AI module
├── POSTULATION/          # Task-specific scripts (e.g., PDF compression)
├── AGENTS.md             # Book 1: Systems Architecture
└── CLAUDE.md             # Book 2: Engineering Rules
```

## 🚀 Execution Rules for AI Agents
1.  **Always refer to `CLAUDE.md`** before suggesting UI/UX changes. We prioritize high-density, "Perdix" premium style.
2.  **Use `AGENTS.md`** as the source of truth for CLI operations and skill management.
3.  **Real Project Clause**: This is a production-ready repository. All code must be validated, tested, and follow the specified patterns (TDD, Responsive scaling).
4.  **No Placeholders**: Never use placeholder images; use `generate_image` or provide real diagnostic data.

## ⚡ Skill Orchestration Protocol
This project utilizes the **Antigravity Superpowers** ecosystem.
1.  **The 1% Rule**: If there is a 1% chance a skill applies (e.g., `ai-engineer`, `nextjs-best-practices`), **INVOKE IT** before proceeding.
2.  **Process First**: Always use `brainstorming` or `concise-planning` before writing code.
3.  **Active Skill Sets**:
    - **Architecture**: `senior-architect`, `monorepo-architect`.
    - **Development**: `nextjs-best-practices`, `tailwind-patterns`, `ai-engineer`, `clean-code`.
    - **Quality**: `lint-and-validate`, `tdd-workflow`, `security-review`.
    - **Specialized**: `alzheimer-expert` (Internal), `3d-web-experience`.

## 🧠 Mental Model Sync (MM-SYNC)
- **Operative Mode**: PLAN-EXECUTE-CRITIC (PEC).
- **Style**: High-density engineering, no placeholders, real diagnostic data.
- **Context Source**: `README_AI.md` -> `CLAUDE.md` -> `AGENTS.md`.

---
*Created and Orchestrated per user request for Maximum AI Performance.*
