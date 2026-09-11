// Proyecto Fernando — catálogo del curso.
// Principio: un video por concepto e idioma, ninguno mayor a 40 minutos. Se valora el tiempo de quien aprende.
// Cada video fue verificado contra YouTube (título, canal, duración y que permita embebido) el 10-sep-2026.
// Para agregar uno: copia un objeto, cambia el id (lo que va después de watch?v=) y el resto.
// lang: "es" | "en"   nivel: "basico" | "intermedio" | "avanzado"   ruta: true = parte de la ruta corta ★

window.CURSO = {
  titulo: "Ruta de aprendizaje en IA para un analista de crédito",
  modulos: [
    {
      id: "fundamentos",
      num: 1,
      titulo: "Fundamentos: qué es un LLM y por qué se equivoca",
      intro: "El modelo mental mínimo: un LLM predice texto, no consulta una base de datos. De ahí vienen las alucinaciones. Los dos videos explican lo mismo; mira el de tu idioma.",
      credito: "Cuando entiendes que el modelo predice y no 'consulta', entiendes por qué debes exigir trazabilidad de cada cifra que te entregue.",
      videos: [
        { id: "FzpdRhwID2M", titulo: "Cómo funciona ChatGPT (y otros LLM) explicado con un viaje a Japón", canal: "Ester Serra", lang: "es", min: 24, nivel: "basico", ruta: true, anio: 2025,
          porque: "La explicación en español más clara y sin código de cómo un LLM genera respuestas. Con esto basta para empezar." },
        { id: "5sLYAQS9sWQ", titulo: "How Large Language Models Work", canal: "IBM Technology", lang: "en", min: 5, nivel: "basico", ruta: false, anio: 2023,
          porque: "Equivalente en inglés, en cinco minutos y de una fuente seria. Si prefieres inglés, este reemplaza al anterior." }
      ]
    },
    {
      id: "prompting",
      num: 2,
      titulo: "Prompting: el arte de delegar bien",
      intro: "Un prompt es un briefing: contexto, objetivo, formato, restricciones y criterio de éxito. Aquí aprendes a escribirlos bien.",
      credito: "La diferencia entre 'analiza esta empresa' y un encargo con ratios, fuentes citadas y umbrales es la diferencia entre relleno y un borrador de memo utilizable.",
      videos: [
        { id: "VrEp21-JmFk", titulo: "Curso ChatGPT completo: tutorial de prompt engineering en español", canal: "Joaquín Barberá", lang: "es", min: 40, nivel: "basico", ruta: true, anio: 2023,
          porque: "Curso gratuito en español, paso a paso, para estructurar instrucciones claras. Los principios aplican igual a Claude, Gemini o Codex." },
        { id: "qOvc9IUKEIc", titulo: "How Anthropic Engineers ACTUALLY Prompt Claude Code", canal: "Austin Marchese", lang: "en", min: 10, nivel: "intermedio", ruta: false, anio: 2026,
          porque: "Complemento, no repetición: cómo se le habla a un agente (no a un chat): contexto, verificación, iteración. Es lo que hace David con Claude Code." }
      ]
    },
    {
      id: "agentes",
      num: 3,
      titulo: "Agentes y MCP: de chatear a delegar tareas completas",
      intro: "Un agente es un modelo que puede usar herramientas: leer archivos, ejecutar código, navegar. MCP es el 'enchufe' estándar que conecta la IA con tus datos. Dos conceptos, un video por idioma para cada uno.",
      credito: "Aquí está el salto real: 'aquí hay 12 PDFs, extrae los balances, calcula los ratios y arma el borrador' deja de ser una tarde de trabajo.",
      videos: [
        { id: "Xh1Jv33RIKw", titulo: "¿Qué son los Agentes de IA? Explicación sencilla", canal: "Oliver Nabani", lang: "es", min: 9, nivel: "basico", ruta: true, anio: 2024,
          porque: "Qué es un agente, en español y en nueve minutos. Sostiene todo lo que sigue en el curso." },
        { id: "FwOTs4UxQS4", titulo: "AI Agents, Clearly Explained", canal: "Jeff Su", lang: "en", min: 10, nivel: "basico", ruta: false, anio: 2025,
          porque: "Equivalente en inglés, orientado a gente de negocio." },
        { id: "eP8VzUklMUo", titulo: "MCP (Model Context Protocol) bien explicado", canal: "Alexys Lozada", lang: "es", min: 4, nivel: "basico", ruta: true, anio: 2025,
          porque: "Qué es MCP en cuatro minutos. Suficiente para seguir cualquier conversación técnica." },
        { id: "cGuyrANVi4A", titulo: "How Model Context Protocol (MCP) actually works", canal: "Google Cloud Tech", lang: "en", min: 7, nivel: "intermedio", ruta: false, anio: 2026,
          porque: "Equivalente en inglés, oficial de Google Cloud: MCP es un estándar de la industria, no de un solo proveedor." }
      ]
    },
    {
      id: "codex",
      num: 4,
      titulo: "Codex (OpenAI): tu agente en la terminal y en VS Code",
      intro: "Codex es el agente de OpenAI. Funciona en la terminal (CLI), como extensión de VS Code y en la nube. Lo que quieres aprender es a dirigirlo, no a programar.",
      credito: "Codex puede leer tu carpeta de estados financieros, escribir el script que calcula los ratios y ejecutarlo. Tú revisas el resultado.",
      videos: [
        { id: "n_LhTlzYotI", titulo: "Codex NO ES SOLO PARA PROGRAMAR. Así puedes crear agentes", canal: "EDteam", lang: "es", min: 17, nivel: "basico", ruta: true, anio: 2026,
          porque: "El más importante para ti: Codex usado por alguien que no está programando software, sino automatizando trabajo." },
        { id: "UDY1kzUB8E4", titulo: "How to Install OpenAI Codex CLI on Windows 11 | Full Setup Guide (2026)", canal: "ProgrammingKnowledge", lang: "en", min: 7, nivel: "basico", ruta: false, anio: 2026,
          porque: "Instalación exacta en Windows, paso a paso. Míralo con el computador al lado." },
        { id: "uTAsWu-pHbQ", titulo: "OpenAI Codex CLI: tutorial", canal: "Fazt Code", lang: "es", min: 13, nivel: "basico", ruta: false, anio: 2025,
          porque: "Primeros comandos en la terminal, en español. Cubre lo mismo que el anterior pero desde el uso, no la instalación." },
        { id: "bZ-5CfD2LRU", titulo: "OpenAI Codex Tutorial #7 - Codex IDE Extension", canal: "Net Ninja", lang: "en", min: 7, nivel: "basico", ruta: true, anio: 2025,
          porque: "Codex dentro de VS Code, que es como lo vas a usar a diario. Siete minutos." }
      ]
    },
    {
      id: "claude-code",
      num: 5,
      titulo: "Claude Code en VS Code: la herramienta con la que se construyó este curso",
      intro: "Claude Code es el agente de Anthropic; esta página se armó con él. Conocer Codex y Claude Code te da criterio para comparar. El flujo mental es idéntico.",
      credito: "Planear, delegar, revisar, iterar. Es el mismo flujo de un analista senior con un junior.",
      videos: [
        { id: "qSMkLIn-IL4", titulo: "CÓMO usar Claude Code desde CERO paso a paso", canal: "Bruno Veloso", lang: "es", min: 18, nivel: "basico", ruta: true, anio: 2026,
          porque: "Práctico, en español y pensado para gente sin experiencia programando." },
        { id: "6eBSHbLKuN0", titulo: "Mastering Claude Code in 30 minutes", canal: "Anthropic", lang: "en", min: 28, nivel: "intermedio", ruta: false, anio: 2025,
          porque: "El creador de la herramienta (Boris Cherny) explica cómo usarla. Video oficial de Anthropic; es el manual de uso, para cuando ya la tengas instalada." }
      ]
    },
    {
      id: "obsidian",
      num: 6,
      titulo: "Obsidian: tu base de conocimiento personal",
      intro: "Obsidian guarda notas en archivos Markdown locales (tuyos) y las enlaza entre sí. Es la base ideal para que después la IA lea y mantenga tu conocimiento. Un video por idioma; mira uno.",
      credito: "Cada empresa analizada, cada sector, cada política de crédito puede ser una nota enlazada. Con el tiempo tienes una memoria institucional que un agente puede consultar.",
      videos: [
        { id: "8xgv8dy6w1I", titulo: "OBSIDIAN paso a paso: de la primera nota a tu propio cerebro digital", canal: "XgamerCode", lang: "es", min: 17, nivel: "basico", ruta: true, anio: 2026,
          porque: "Reciente, en español y desde cero: instalar, crear la bóveda, enlazar notas." },
        { id: "d9KJbKtfWJo", titulo: "How to Get Started with Obsidian (2025)", canal: "Mike Schmitz", lang: "en", min: 14, nivel: "basico", ruta: false, anio: 2025,
          porque: "Equivalente en inglés por uno de los referentes de Obsidian. Lo esencial, sin plugins innecesarios." }
      ]
    },
    {
      id: "bases",
      num: 7,
      titulo: "Obsidian Bases: bases de datos sobre tus notas",
      intro: "Bases es la función nativa de Obsidian que convierte tus notas en tablas filtrables y ordenables: una base de datos sin programar, sobre archivos que siguen siendo tuyos.",
      credito: "Una tabla con todas las empresas que has analizado: sector, fecha, calificación, ratios clave, filtrable en un clic. Eso es Bases.",
      videos: [
        { id: "NT2LmhlU3A8", titulo: "Domina Bases en Obsidian: guía completa paso a paso", canal: "SniferL4bs", lang: "es", min: 14, nivel: "basico", ruta: true, anio: 2025,
          porque: "La guía en español más clara de Bases: propiedades, vistas, filtros." },
        { id: "qEbZy3gw90w", titulo: "Obsidian Bases: Your First Look and Complete Databases Guide", canal: "Paul's Obsidian Systems", lang: "en", min: 31, nivel: "intermedio", ruta: false, anio: 2025,
          porque: "Versión en inglés más completa, centrada en usar Bases como una base de datos real. Solo si el anterior te supo a poco." }
      ]
    },
    {
      id: "obsidian-ia",
      num: 8,
      titulo: "Obsidian + agentes: tu segundo cerebro mantenido por IA",
      intro: "Aquí se une todo: Claude Code o Codex leen y escriben en tu bóveda de Obsidian. La IA resume, enlaza, archiva y consulta tus notas; tú decides.",
      credito: "Un agente que lee tus análisis previos, tu política de crédito y los estados financieros nuevos, y arma el borrador con tu formato. Es lo que David hace en su proyecto, aplicado a tu dominio.",
      videos: [
        { id: "g6RbwxXBCqc", titulo: "Claude Code + Obsidian: tu segundo cerebro con IA (setup completo)", canal: "Andy Cruz", lang: "es", min: 15, nivel: "intermedio", ruta: true, anio: 2026,
          porque: "Setup completo en español, de principio a fin." },
        { id: "slkO_QAkqlc", titulo: "Obsidian AI Second Brain that ACTUALLY Works! (Codex, Claude Code)", canal: "Eric Michaud", lang: "en", min: 14, nivel: "intermedio", ruta: false, anio: 2026,
          porque: "Equivalente en inglés con un plus: muestra el mismo flujo con Codex y con Claude Code. La herramienta es intercambiable; el método, no." }
      ]
    },
    {
      id: "finanzas",
      num: 9,
      titulo: "IA aplicada a finanzas y análisis de crédito",
      intro: "Casos concretos: estados financieros, ratios, modelos de tres estados. El video en español es de 2023 (ChatGPT temprano): el método sigue vigente; las herramientas han mejorado mucho.",
      credito: "Este es tu terreno. Míralos con ojo crítico: dónde acierta la IA, dónde inventa, y qué verificarías tú antes de firmar.",
      videos: [
        { id: "L0tcl8h1D6k", titulo: "Tutorial para analizar los estados financieros con ChatGPT", canal: "Inteligencia artificial para todos", lang: "es", min: 10, nivel: "basico", ruta: false, anio: 2023,
          porque: "Primer contacto en español: subir un estado financiero y pedir análisis." },
        { id: "BX2PxxM15Zc", titulo: "Testing Claude in Excel: Building a Three-Statement Financial Model", canal: "Corporate Finance Institute", lang: "en", min: 19, nivel: "intermedio", ruta: true, anio: 2026,
          porque: "CFI (referencia en formación financiera) prueba Claude dentro de Excel construyendo un modelo de tres estados. Directamente tu mundo." },
        { id: "fKfid76co5U", titulo: "How to use ChatGPT for Analysts (Real World Use Cases)", canal: "Career Principles", lang: "en", min: 10, nivel: "basico", ruta: false, anio: 2025,
          porque: "Casos de uso reales para analistas de finanzas y consultoría; ideas para tu día a día, no técnica." }
      ]
    },
    {
      id: "mirofish",
      num: 10,
      titulo: "MiroFish: simular escenarios con miles de agentes",
      intro: "MiroFish (código abierto, 2026) construye un 'mundo digital' con miles de agentes de IA con personalidad y memoria, y simula cómo reaccionan a un escenario: una noticia, un cambio regulatorio, un lanzamiento, un choque financiero. Se le sube un informe o PDF y devuelve un reporte de la simulación.",
      credito: "Úsalo para estresar un análisis: ¿cómo reaccionan clientes, proveedores, bancos y competidores si la empresa sube precios o pierde su principal cliente? Ojo: es un simulador de dinámicas, no un pronosticador validado (no hay benchmarks públicos). Sirve para descubrir escenarios y puntos ciegos, no para sacar probabilidades.",
      videos: [
        { id: "1rlBDAaNu1w", titulo: "MiroFish: motor de predicción de IA mediante simulación de escenarios y agentes autónomos", canal: "Radio Brisas", lang: "es", min: 8, nivel: "basico", ruta: true, anio: 2026,
          porque: "Qué es MiroFish y cómo funciona la simulación con agentes, explicado en español en ocho minutos." },
        { id: "KIiI2IlOGK8", titulo: "MiroFish: valida tu negocio con IA multiagente", canal: "Nico Manzaneque", lang: "es", min: 10, nivel: "basico", ruta: true, anio: 2026,
          porque: "El caso de uso que pediste, en español: subir una idea de negocio, simular la reacción del mercado y leer el reporte." },
        { id: "QmdCkaTM1P4", titulo: "MiroFish Full Tutorial — Predict Any Scenario With AI", canal: "Tech With Tim", lang: "en", min: 20, nivel: "intermedio", ruta: true, anio: 2026,
          porque: "Tutorial completo para hacerlo tú: instalación, cargar un documento, definir el escenario, correr la simulación e interpretar el reporte." },
        { id: "lSklDad0LNo", titulo: "PREDICT ANYTHING with 10,000+ Agents (even oil price based on next attack) - MiroFish Demo", canal: "John Forfar", lang: "en", min: 16, nivel: "intermedio", ruta: false, anio: 2026,
          porque: "Demo con un escenario financiero (precio del petróleo ante un choque geopolítico) y 10.000 agentes. Útil para ver cómo se plantea un escenario económico." },
        { id: "gp8GIpXScKg", titulo: "MiroFish AI Trading System Breakdown: Why Swarms Fail in Markets", canal: "Alex Hitt", lang: "en", min: 6, nivel: "intermedio", ruta: true, anio: 2026,
          porque: "La crítica necesaria: por qué las simulaciones de enjambre fallan en mercados reales. Míralo antes de confiarle una decisión de crédito." }
      ]
    },
    {
      id: "python",
      num: 11,
      titulo: "Python + Excel: lo mínimo para dirigir (no para programar)",
      intro: "No vas a programar. Vas a saber qué es un script que abre un Excel y cómo se ve una tabla en pandas, para leer lo que el agente escribió y verificar que hace lo que pediste.",
      credito: "Catorce minutos en total. Bastan para revisar el código que Codex o Claude generen para tus ratios.",
      videos: [
        { id: "8HSGUkJhKF4", titulo: "Aprende Python en Excel desde cero", canal: "El Inge Francisco", lang: "es", min: 9, nivel: "basico", ruta: true, anio: 2025,
          porque: "Python dentro de Excel (función =PY). El puente más suave desde tu herramienta actual." },
        { id: "ThU4xXgkKmE", titulo: "Cómo leer Excel en Python con pandas", canal: "Rafa Gonzalez Gouveia", lang: "es", min: 5, nivel: "basico", ruta: false, anio: 2020,
          porque: "Cinco minutos: así se ve un Excel cuando lo abre Python. Lo verás en cada script que te genere un agente." }
      ]
    }
  ]
};
