// Proyecto Fernando — perfiles. Cada perfil tiene su personaje, sus módulos, sus competencias y sus textos.
// Los módulos viven en videos.js; las competencias (capacidad, reto, recompensa) en gamificacion.js.
window.PERFILES = {
  fernando: {
    id: "fernando",
    nombre: "Fernando",
    nombreCompleto: "Óscar Fernando",
    rol: "Analista de crédito corporativo",
    genero: "m",
    titulo: "Ruta de aprendizaje en IA para un analista de crédito",
    lede: "desde entender qué es un modelo de lenguaje hasta tener un agente (Codex o Claude Code) trabajando sobre tu base de conocimiento en Obsidian y simular escenarios con MiroFish.",
    etiquetaAplicado: "Para tu trabajo de crédito",
    // Apariencia del personaje (ajustada con su foto)
    look: { piel: "triguena", pelo: "ondulado", colorPelo: "castano-oscuro", barba: "ninguna", gafas: false, auriculares: true, aretes: false, sonrisa: "grande", camisa: "#f2f1ed" },
    modulos: ["fundamentos", "prompting", "agentes", "codex", "claude-code", "obsidian", "bases", "obsidian-ia", "finanzas", "mirofish", "python"],
    competencias: ["fundamentos", "prompting", "agentes", "agente-vscode", "obsidian", "bases", "obsidian-ia", "finanzas", "mirofish", "python"]
  },
  juliana: {
    id: "juliana",
    nombre: "Juliana",
    nombreCompleto: "Juliana",
    rol: "Quant · trading cuantitativo",
    genero: "f",
    titulo: "Ruta de aprendizaje en IA para una quant",
    lede: "desde entender qué es un modelo de lenguaje hasta automatizar tu día con n8n, tener un agente (Codex o Claude Code) corriendo backtests sobre tu carpeta de datos y simular escenarios con MiroFish.",
    etiquetaAplicado: "Para tu trabajo como quant",
    // Apariencia del personaje (ajustada con su foto)
    look: { piel: "triguena", pelo: "largo", colorPelo: "negro", barba: "ninguna", gafas: false, auriculares: false, aretes: true, sonrisa: "grande", camisa: "#d9342b" },
    modulos: ["fundamentos", "prompting", "agentes", "codex", "claude-code", "n8n", "obsidian", "bases", "obsidian-ia", "quant", "mirofish"],
    competencias: ["fundamentos", "prompting", "agentes", "agente-vscode", "n8n", "obsidian", "bases", "obsidian-ia", "quant", "mirofish"]
  }
};
