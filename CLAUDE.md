# Perdix Origin - Engineering Rules & Agents

## Build Commands
- Dev Server: `npm run dev`
- Build: `npm run build`
- Lint: `npm run lint`

## Agent Ecosystem (ECC Integrated)
Perdix now uses the Everything Claude Code suite for specialized tasks:
- **Architect**: System design and technology selection. (`.claude/agents/architect.md`)
- **Code Reviewer**: Quality, security, and maintainability audit. (`.claude/agents/code-reviewer.md`)
- **Planner**: Task breakdown and implementation planning. (`.claude/agents/planner.md`)
- **Security Reviewer**: Vulnerability scanning and mitigation. (`.claude/agents/security-reviewer.md`)
- **TDD Guide**: Test Driven Development orchestration. (`.claude/agents/tdd-guide.md`)
- **Refactor Cleaner**: Technical debt reduction and cleanup. (`.claude/agents/refactor-cleaner.md`)

## Core Guidelines
- **UI/UX**: Always prioritize high-density, premium engineering aesthetics.
- **Responsiveness**: All components must be 100% responsive (Zoom 100% ready).
- **Security**: Mandatory audit for any database or API interaction.
- **Documentation**: All new features must be documented in `walkthrough.md`.

## Quality Gates
- No duplicate footers.
- No extreme font sizes (>9xl) without responsive scaling.
- Clean imports (no duplicate Navbar imports).

## Technical Patterns (ECC Rules)
Refer to `.claude/rules/` for detailed coding patterns for TypeScript, Security, and Testing.
