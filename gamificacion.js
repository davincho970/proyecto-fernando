// Proyecto Fernando — gamificación: personaje, niveles por competencia, retos, recompensas, logros y puntos.
// Depende de window.CURSO (videos.js) y window.PERFILES (perfiles.js). Expone window.GAMI.
(function () {
  "use strict";

  var PIEL = { clara: "#f3d2b3", triguena: "#e9bd93", media: "#d9a066", morena: "#a8703f", oscura: "#6b4423" };
  var PELO = { negro: "#1f1a17", "castano-oscuro": "#2b1f18", castano: "#5a3a22", rubio: "#c9a45c", gris: "#9a9a9a" };
  // Camisa por tramo visual: 0 la del perfil, 1-2 azul, 3 morado Obsidian, 4+ saco oscuro
  var CAMISA = [null, "#2f6fde", "#2f6fde", "#5b3fbf", "#1c2333", "#1c2333", "#1c2333"];

  // =====================================================================
  // 1. NIVELES  (nivel = número de competencias completadas, 0..10)
  // =====================================================================
  var NIVELES = [
    { n: 0,  titulo: "Rookie",             tituloF: "Rookie",             frase: "Todavía no sabes qué es un LLM. Todo el mundo empieza aquí." },
    { n: 1,  titulo: "Aprendiz",           tituloF: "Aprendiz",           frase: "Ya entiendes la herramienta. Ahora toca usarla." },
    { n: 2,  titulo: "Iniciado",           tituloF: "Iniciada",           frase: "Sabes pedir. La IA empieza a devolverte cosas útiles." },
    { n: 3,  titulo: "Practicante",        tituloF: "Practicante",        frase: "Distingues un chat de un agente. El salto real está cerca." },
    { n: 4,  titulo: "Operador",           tituloF: "Operadora",          frase: "Diriges un agente en tu computador. Ya no trabajas sola ni solo." },
    { n: 5,  titulo: "Constructor",        tituloF: "Constructora",       frase: "Tienes dónde guardar lo que sabes." },
    { n: 6,  titulo: "Arquitecto",         tituloF: "Arquitecta",         frase: "Tu conocimiento tiene estructura y se puede consultar." },
    { n: 7,  titulo: "Estratega",          tituloF: "Estratega",          frase: "Tu segundo cerebro trabaja mientras tú decides." },
    { n: 8,  titulo: "Analista aumentado", tituloF: "Analista aumentada", frase: "Produces el trabajo de tres y decides con mejor información." },
    { n: 9,  titulo: "Experto",            tituloF: "Experta",            frase: "Simulas escenarios antes de que ocurran." },
    { n: 10, titulo: "Director de IA",     tituloF: "Directora de IA",    frase: "Dominas el flujo completo y puedes enseñarlo." }
  ];
  function tituloNivel(n) { return perfil.genero === "f" ? NIVELES[n].tituloF : NIVELES[n].titulo; }

  // =====================================================================
  // 2. COMPETENCIAS: capacidad + reto + recompensa. `variantes.juliana` adapta el texto a su dominio.
  // =====================================================================
  var L = function (arr) { return arr.join("\n"); };

  var CATALOGO = [
    { id: "fundamentos", modulos: ["fundamentos"], logro: "Alfabetizado en IA", logroF: "Alfabetizada en IA", icono: "🧠",
      capacidad: "Explicar qué es un LLM, por qué alucina y por qué debes exigir la fuente de cada cifra.",
      reto: "Pídele a ChatGPT o Claude tres cifras de una empresa que conozcas bien y verifica cuáles son falsas.",
      recompensa: { nombre: "Glosario de bolsillo", desc: "Diez términos que vas a oír todos los días, explicados en una línea.", contenido: L([
        "GLOSARIO DE BOLSILLO — IA para profesionales",
        "",
        "LLM: modelo de lenguaje. Predice la siguiente palabra a partir de todo lo anterior. No consulta una base de datos.",
        "Token: unidad mínima de texto que procesa el modelo (≈ ¾ de una palabra en español).",
        "Ventana de contexto: cuánto texto puede 'tener en mente' a la vez. Si se llena, olvida el inicio.",
        "Alucinación: respuesta plausible pero falsa. Se combate exigiendo fuente y verificando.",
        "Prompt: el encargo. Contexto + objetivo + formato + restricciones + criterio de éxito.",
        "Instrucciones permanentes: reglas que el modelo lee siempre (CLAUDE.md, AGENTS.md, proyectos).",
        "Agente: modelo que usa herramientas (leer archivos, ejecutar código, navegar) en un bucle hasta terminar la tarea.",
        "MCP: estándar para conectar un modelo con datos y aplicaciones (archivos, bases de datos, Excel).",
        "RAG: técnica para que el modelo responda con base en tus documentos y no en su memoria.",
        "Modelo que 'piensa': razona paso a paso antes de responder. Más lento; mejor en cálculos y consistencia."
      ]) },
      variantes: { juliana: { reto: "Pídele a ChatGPT o Claude tres estadísticas de un activo que sigas de cerca y verifica cuáles son falsas." } } },

    { id: "prompting", modulos: ["prompting"], logro: "Briefing perfecto", icono: "📝",
      capacidad: "Escribir un encargo completo: contexto, objetivo, formato, restricciones y criterio de éxito.",
      reto: "Escribe un briefing con la plantilla y úsalo en un análisis real de esta semana.",
      recompensa: { nombre: "Plantilla de briefing para análisis de crédito", desc: "Cópiala, llena los corchetes y pégala en ChatGPT, Claude o Codex.", contenido: L([
        "ROL: Eres asistente de un analista de crédito corporativo senior. Tú preparas; yo decido.",
        "",
        "CONTEXTO: Empresa [nombre], sector [sector], país [país]. Solicitud: [tipo de crédito, monto, plazo].",
        "Adjunto: estados financieros [años], notas a los estados, [otros documentos].",
        "",
        "OBJETIVO: Calcula y presenta, para cada año: liquidez corriente, prueba ácida, endeudamiento (pasivo/activo),",
        "deuda financiera/EBITDA, cobertura de intereses (EBITDA/gastos financieros), margen EBITDA, DSO, DIO, DPO y ciclo de conversión de efectivo.",
        "",
        "FORMATO: Tabla (ratio × año) + cinco líneas de tendencia + lista de alertas frente a estos umbrales: [umbrales de tu política].",
        "",
        "RESTRICCIONES:",
        "- Cada cifra cita página y renglón de origen.",
        "- Si un dato no está, escribe NO DISPONIBLE. No lo estimes.",
        "- Antes de calcular, verifica que activo = pasivo + patrimonio en cada año. Si no cuadra, detente y repórtalo.",
        "",
        "CRITERIO DE ÉXITO: Puedo rastrear cualquier número hasta el documento en menos de un minuto.",
        "",
        "NO HAGAS: recomendación de aprobar o rechazar. Eso es mío."
      ]) },
      variantes: { juliana: {
        reto: "Escribe un briefing con la plantilla y úsalo para investigar una idea de estrategia esta semana.",
        recompensa: { nombre: "Plantilla de briefing para investigación cuantitativa", desc: "Cópiala, llena los corchetes y pégala en ChatGPT, Claude o Codex.", contenido: L([
          "ROL: Eres asistente de una quant senior. Tú propones y codificas; yo juzgo.",
          "",
          "CONTEXTO: Universo [activos/índice], frecuencia [diaria/intradía], periodo [desde-hasta], datos en [ruta/archivo].",
          "Hipótesis: [una frase: qué ineficiencia creo que existe y por qué debería persistir].",
          "",
          "OBJETIVO: Implementa la estrategia [reglas de entrada/salida/tamaño] y produce un backtest con:",
          "retorno anualizado, volatilidad, Sharpe, máximo drawdown, número de operaciones, exposición promedio y curva de capital.",
          "",
          "FORMATO: Script reproducible + tabla de métricas in-sample y out-of-sample + gráfico de la curva de capital.",
          "",
          "RESTRICCIONES:",
          "- Costos de transacción y slippage: [valor]. Sin costos no me sirve.",
          "- Prohibido usar información futura (look-ahead). Señala explícitamente dónde se alinea cada dato con la fecha en que era conocible.",
          "- Separa in-sample [periodo] de out-of-sample [periodo] antes de tocar un parámetro.",
          "- Máximo [N] parámetros; lista cuáles y qué valores probaste.",
          "",
          "CRITERIO DE ÉXITO: Puedo leer el código en 10 minutos y reproducir la tabla ejecutándolo.",
          "",
          "NO HAGAS: optimizar parámetros sin decírmelo, ni concluir que la estrategia 'funciona'. Esa conclusión es mía."
        ]) } } } },

    { id: "agentes", modulos: ["agentes"], logro: "Domador de agentes", logroF: "Domadora de agentes", icono: "🤖",
      capacidad: "Distinguir un chat de un agente y entender cómo MCP conecta la IA con tus archivos y datos.",
      reto: "Explícale a un colega, en dos minutos y sin leer, la diferencia entre un chat y un agente.",
      recompensa: { nombre: "Mapa: qué herramienta para qué", desc: "Cuándo usar chat, proyecto con instrucciones, agente, n8n o MCP.", contenido: L([
        "QUÉ HERRAMIENTA PARA QUÉ",
        "",
        "Chat (ChatGPT, Claude): preguntas sueltas, redacción, explicar un concepto, revisar un párrafo.",
        "Proyecto con instrucciones permanentes (Claude Projects, GPTs): trabajo repetido con las mismas reglas: informes, formato de la entidad, políticas.",
        "Agente en tu computador (Codex, Claude Code): tareas sobre carpetas y archivos: leer PDFs o datos, correr un script, escribir un borrador.",
        "n8n: pegamento entre aplicaciones que corre solo: cada mañana, cada correo, cada alerta. Sin programar.",
        "MCP: cuando el agente necesita llegar a datos que no están en la carpeta: una base de datos, Excel en la nube, un sistema interno.",
        "",
        "Regla práctica: si cabe en un mensaje, chat. Si se repite, proyecto. Si toca archivos, agente. Si debe correr solo, n8n. Si toca sistemas, MCP."
      ]) } },

    { id: "agente-vscode", modulos: ["codex", "claude-code"], cualquiera: true, logro: "Manos en la terminal", icono: "💻",
      capacidad: "Instalar un agente (Codex o Claude Code) en VS Code, hacerle leer una carpeta y ejecutar un script bajo tu supervisión.",
      reto: "Instala Codex o Claude Code, ponle una carpeta con un Excel y pídele que calcule un ratio.",
      recompensa: { nombre: "Instrucciones iniciales para el agente (CLAUDE.md / AGENTS.md)", desc: "Guárdalo en la carpeta de tus análisis. El agente lo lee siempre antes de trabajar.", contenido: L([
        "# Instrucciones para el agente",
        "(Guárdalo como CLAUDE.md para Claude Code o AGENTS.md para Codex, en la carpeta del análisis.)",
        "",
        "## Rol",
        "Eres asistente de un analista de crédito senior. Tú preparas; la decisión es del analista.",
        "",
        "## Reglas no negociables",
        "1. Nunca inventes una cifra. Toda cifra sale de un archivo de esta carpeta; si no está, dilo.",
        "2. Antes de calcular ratios, verifica que el balance cuadre (activo = pasivo + patrimonio). Si no cuadra, detente y repórtalo.",
        "3. Los umbrales de la política están en politica.json. No los cambies; propón cambios y espera aprobación.",
        "4. Todo memo lleva estas secciones: resumen, integridad de datos, ratios, alertas, tendencia, preguntas para la gerencia, recomendación (PENDIENTE hasta que el analista la escriba).",
        "5. Moneda: COP millones salvo que el archivo diga otra cosa.",
        "6. No copies datos fuera de esta carpeta ni los subas a servicios externos.",
        "",
        "## Cómo trabajamos",
        "- Datos crudos en /datos, scripts en /scripts, memos en /memos.",
        "- Antes de un cambio grande, muéstrame el plan y espera mi OK.",
        "- Al terminar, lista qué archivos creaste o cambiaste."
      ]) },
      variantes: { juliana: {
        capacidad: "Instalar un agente (Codex o Claude Code) en VS Code, hacerle leer tu carpeta de datos y correr un backtest bajo tu supervisión.",
        reto: "Instala Codex o Claude Code, ponle una carpeta con precios históricos y pídele que calcule el Sharpe de comprar y mantener.",
        recompensa: { nombre: "Instrucciones iniciales para el agente (CLAUDE.md / AGENTS.md)", desc: "Guárdalo en tu carpeta de investigación. El agente lo lee siempre antes de trabajar.", contenido: L([
          "# Instrucciones para el agente",
          "(Guárdalo como CLAUDE.md para Claude Code o AGENTS.md para Codex, en la carpeta de investigación.)",
          "",
          "## Rol",
          "Eres asistente de una quant senior. Tú implementas y pruebas; la conclusión sobre si una estrategia sirve es de ella.",
          "",
          "## Reglas no negociables",
          "1. Nunca inventes datos ni resultados. Todo sale de archivos de /datos o de una fuente que yo apruebe.",
          "2. Todo backtest incluye costos y slippage (valores en config.yaml) y separa in-sample de out-of-sample. Sin eso, no reportes métricas.",
          "3. Prohibido el look-ahead: documenta en el código en qué fecha era conocible cada dato que usas.",
          "4. No optimices parámetros sin decírmelo; si pruebas varios, reporta todos, no solo el mejor.",
          "5. Cada resultado va con: script, semilla, versión de datos y fecha, para que sea reproducible.",
          "6. No copies datos fuera de esta carpeta ni los subas a servicios externos.",
          "",
          "## Cómo trabajamos",
          "- Datos en /datos, estrategias en /estrategias, resultados en /resultados, notas en /notas.",
          "- Antes de un cambio grande, muéstrame el plan y espera mi OK.",
          "- Al terminar, lista qué archivos creaste o cambiaste y qué supuestos tomaste."
        ]) } } } },

    { id: "n8n", modulos: ["n8n"], logro: "Automatizador", logroF: "Automatizadora", icono: "⚙️",
      capacidad: "Construir un flujo en n8n que reciba datos (un correo, una API, una alerta), los pase por un modelo de IA y entregue el resultado donde lo necesitas (Telegram, correo, hoja de cálculo).",
      reto: "Monta un flujo que cada mañana te resuma en Telegram tres noticias de tu mercado.",
      recompensa: { nombre: "Plano de flujo n8n: resumen diario de mercado", desc: "Los nodos, en orden, para armarlo en 30 minutos; con qué cuidar en cada uno.", contenido: L([
        "PLANO DE FLUJO n8n — RESUMEN DIARIO DE MERCADO (Telegram, 7:00 a. m.)",
        "",
        "1. Schedule Trigger",
        "   Cron: 0 7 * * 1-5 (lunes a viernes, 7:00). Zona horaria: America/Bogota.",
        "",
        "2. RSS Read (o HTTP Request si la fuente tiene API)",
        "   URL del feed de noticias del mercado que sigues. Repite el nodo para 2-3 fuentes y únelas con un nodo Merge.",
        "",
        "3. Limit / Sort",
        "   Ordena por fecha descendente y deja las 10 más recientes. Sin esto, el modelo recibe demasiado texto.",
        "",
        "4. Aggregate",
        "   Junta título + resumen + enlace de las 10 en un solo texto para pasarlo al modelo en una llamada.",
        "",
        "5. OpenAI / Anthropic (Message a model) o AI Agent",
        "   Prompt: 'Eres analista de mercado. De estas noticias elige las 3 que más pueden mover [tu mercado] hoy.",
        "   Para cada una: titular en 10 palabras, por qué importa (1 línea), enlace. Si ninguna es relevante, dilo. Responde en español.'",
        "   Temperatura baja (0-0,3). Modelo económico: es un resumen, no un análisis.",
        "",
        "6. Telegram (Send Message)",
        "   Chat ID tuyo; parse_mode Markdown. Prueba primero con 'Execute step' antes de activar el flujo.",
        "",
        "Cuidados: guarda las credenciales en n8n (Credentials), nunca en el prompt; agrega un nodo Error Trigger que te avise por Telegram si el flujo falla;",
        "revisa el costo semanal de la API (10 noticias × 5 días es poco, pero crece si agregas fuentes)."
      ]) },
      variantes: { juliana: {
        reto: "Monta un flujo que cada mañana te resuma en Telegram tres noticias relevantes para tus estrategias, y otro que te avise si un script de backtest falla."
      } } },

    { id: "obsidian", modulos: ["obsidian"], logro: "Bóveda abierta", icono: "💎",
      capacidad: "Mantener una bóveda de notas Markdown enlazadas: empresas, sectores, políticas de crédito.",
      reto: "Crea tu bóveda y registra tres empresas con la plantilla de nota.",
      recompensa: { nombre: "Plantilla de nota 'Empresa analizada'", desc: "Una nota por empresa, con propiedades que después alimentan tus Bases.", contenido: L([
        "---",
        "tags: [empresa]",
        "empresa: ",
        "sector: ",
        "pais: Colombia",
        "fecha_analisis: 2026-09-10",
        "analista: Óscar Fernando",
        "calificacion: ",
        "monto_solicitado: ",
        "plazo_meses: ",
        "deuda_ebitda: ",
        "cobertura_intereses: ",
        "liquidez_corriente: ",
        "estado: en análisis",
        "---",
        "# {{empresa}}",
        "",
        "## Contexto",
        "Sector: [[Sector - {{sector}}]] · Grupo: [[Grupo económico]] · Relación previa: ",
        "",
        "## Cifras clave (fuente: estados financieros {{año}}, página X)",
        "| Ratio | 2023 | 2024 | 2025 |",
        "|---|---|---|---|",
        "| Deuda / EBITDA | | | |",
        "| Cobertura de intereses | | | |",
        "| Liquidez corriente | | | |",
        "",
        "## Alertas",
        "- ",
        "",
        "## Preguntas para la gerencia",
        "- ",
        "",
        "## Decisión",
        "Pendiente."
      ]) },
      variantes: { juliana: {
        capacidad: "Mantener una bóveda de notas Markdown enlazadas: estrategias, papers, mercados, decisiones.",
        reto: "Crea tu bóveda y registra tres estrategias (aunque sean ideas) con la plantilla de nota.",
        recompensa: { nombre: "Plantilla de nota 'Estrategia'", desc: "Una nota por estrategia o idea, con propiedades que después alimentan tus Bases.", contenido: L([
          "---",
          "tags: [estrategia]",
          "nombre: ",
          "mercado: ",
          "frecuencia: diaria",
          "hipotesis: ",
          "fecha: 2026-09-10",
          "periodo_is: ",
          "periodo_oos: ",
          "sharpe_is: ",
          "sharpe_oos: ",
          "max_drawdown: ",
          "n_parametros: ",
          "estado: idea",
          "---",
          "# {{nombre}}",
          "",
          "## Hipótesis (una frase: qué ineficiencia y por qué persistiría)",
          "",
          "## Reglas",
          "- Entrada: ",
          "- Salida: ",
          "- Tamaño / riesgo: ",
          "",
          "## Resultados (script: [[resultados/{{nombre}}]])",
          "| Métrica | In-sample | Out-of-sample |",
          "|---|---|---|",
          "| Sharpe | | |",
          "| Max drawdown | | |",
          "| Operaciones | | |",
          "",
          "## Qué podría estar mal",
          "- Look-ahead: ",
          "- Costos: ",
          "- Número de pruebas antes de esta: ",
          "",
          "## Decisión",
          "Pendiente. Relacionadas: [[ ]]"
        ]) } } } },

    { id: "bases", modulos: ["bases"], logro: "Arquitecto de datos", logroF: "Arquitecta de datos", icono: "🗃️",
      capacidad: "Crear bases de datos sobre tus notas: tablas de empresas con sector, ratios y calificación, y relaciones y correlaciones entre archivos Markdown.",
      reto: "Crea la base 'Cartera' y filtra las empresas con deuda/EBITDA mayor a 3,5.",
      recompensa: { nombre: "Base 'Cartera analizada' (archivo .base)", desc: "Convierte todas tus notas con #empresa en una tabla filtrable, con una vista de alertas.", contenido: L([
        "# Guárdalo como Cartera.base en tu bóveda de Obsidian.",
        "# Toma todas las notas con la etiqueta #empresa y las muestra como tabla.",
        "# Los nombres de propiedades deben coincidir con los de tu plantilla de nota.",
        "# Si un filtro no funciona, prueba con el prefijo note. (por ejemplo: note.deuda_ebitda > 3.5).",
        "filters:",
        "  and:",
        "    - file.hasTag(\"empresa\")",
        "views:",
        "  - type: table",
        "    name: Cartera",
        "    order:",
        "      - file.name",
        "      - sector",
        "      - calificacion",
        "      - deuda_ebitda",
        "      - cobertura_intereses",
        "      - fecha_analisis",
        "      - estado",
        "  - type: table",
        "    name: Alertas",
        "    filters:",
        "      or:",
        "        - deuda_ebitda > 3.5",
        "        - cobertura_intereses < 2",
        "    order:",
        "      - file.name",
        "      - deuda_ebitda",
        "      - cobertura_intereses"
      ]) },
      variantes: { juliana: {
        capacidad: "Crear bases de datos sobre tus notas: tablas de estrategias con mercado, Sharpe, drawdown y estado, y relaciones y correlaciones entre archivos Markdown.",
        reto: "Crea la base 'Estrategias' y filtra las que tengan Sharpe fuera de muestra menor a 1.",
        recompensa: { nombre: "Base 'Estrategias' (archivo .base)", desc: "Convierte todas tus notas con #estrategia en una tabla filtrable, con una vista de sospechosas de overfitting.", contenido: L([
          "# Guárdalo como Estrategias.base en tu bóveda de Obsidian.",
          "# Toma todas las notas con la etiqueta #estrategia y las muestra como tabla.",
          "# Los nombres de propiedades deben coincidir con los de tu plantilla de nota.",
          "# Si un filtro no funciona, prueba con el prefijo note. (por ejemplo: note.sharpe_oos < 1).",
          "filters:",
          "  and:",
          "    - file.hasTag(\"estrategia\")",
          "views:",
          "  - type: table",
          "    name: Estrategias",
          "    order:",
          "      - file.name",
          "      - mercado",
          "      - estado",
          "      - sharpe_is",
          "      - sharpe_oos",
          "      - max_drawdown",
          "      - n_parametros",
          "      - fecha",
          "  - type: table",
          "    name: Sospechosas de overfitting",
          "    filters:",
          "      or:",
          "        - sharpe_oos < 1",
          "        - n_parametros > 4",
          "    order:",
          "      - file.name",
          "      - sharpe_is",
          "      - sharpe_oos",
          "      - n_parametros"
        ]) } } } },

    { id: "obsidian-ia", modulos: ["obsidian-ia"], logro: "Segundo cerebro", icono: "🧩",
      capacidad: "Tener un agente que lee y escribe en tu bóveda: una memoria institucional que consultas en lenguaje natural.",
      reto: "Haz que el agente actualice una nota de empresa a partir de un PDF nuevo.",
      recompensa: { nombre: "Prompt: memo desde la bóveda", desc: "El encargo que convierte tu bóveda + un PDF nuevo en un borrador de memo.", contenido: L([
        "Estás en mi bóveda de Obsidian. Antes de escribir nada, lee:",
        "1. /Política/politica-credito.md (umbrales y formato de memo).",
        "2. /Empresas/{{empresa}}.md y todas las notas enlazadas desde ella.",
        "3. Los PDF nuevos en /Entradas/{{empresa}}/.",
        "",
        "Tarea: actualiza la nota de la empresa con las cifras nuevas (cita la página de cada una), recalcula los ratios,",
        "compara con el análisis anterior y escribe un borrador de memo en /Memos/{{empresa}}-{{fecha}}.md con las secciones de la política.",
        "",
        "Reglas: no inventes cifras; si algo no cuadra, para y pregúntame; la recomendación queda como PENDIENTE.",
        "Al final, lista qué notas cambiaste y por qué."
      ]) },
      variantes: { juliana: {
        capacidad: "Tener un agente que lee y escribe en tu bóveda de investigación: un diario de estrategias que consultas en lenguaje natural.",
        reto: "Haz que el agente actualice la nota de una estrategia a partir de los resultados nuevos de un backtest.",
        recompensa: { nombre: "Prompt: informe de investigación desde la bóveda", desc: "El encargo que convierte tu bóveda + resultados nuevos en un informe con tu formato.", contenido: L([
          "Estás en mi bóveda de Obsidian. Antes de escribir nada, lee:",
          "1. /Notas/checklist-backtest.md (mis criterios para creerle a un resultado).",
          "2. /Estrategias/{{estrategia}}.md y todas las notas enlazadas desde ella.",
          "3. Los resultados nuevos en /Resultados/{{estrategia}}/ (métricas, curva de capital, log de parámetros).",
          "",
          "Tarea: actualiza la nota de la estrategia con las métricas nuevas (in-sample y out-of-sample por separado),",
          "compara con la versión anterior, pasa la checklist punto por punto y escribe un informe en /Informes/{{estrategia}}-{{fecha}}.md",
          "con: hipótesis, cambios, resultados, qué podría estar mal, siguiente prueba sugerida.",
          "",
          "Reglas: no inventes métricas; si falta un dato, dilo; la conclusión sobre si la estrategia sirve queda como PENDIENTE.",
          "Al final, lista qué notas cambiaste y por qué."
        ]) } } } },

    { id: "finanzas", modulos: ["finanzas"], logro: "Analista aumentado", logroF: "Analista aumentada", icono: "📊",
      capacidad: "Producir ratios, modelos de tres estados y borradores de memo con IA, verificados por ti antes de firmar.",
      reto: "Pasa la checklist de verificación a un análisis hecho con IA y anota qué encontró.",
      recompensa: { nombre: "Checklist: verificar cifras generadas por IA", desc: "Diez comprobaciones antes de usar cualquier número que produjo un modelo.", contenido: L([
        "CHECKLIST — antes de usar un número que produjo la IA",
        "",
        "[ ] 1. ¿Cita página y renglón de origen? Si no, pídela.",
        "[ ] 2. Activo = pasivo + patrimonio en cada año.",
        "[ ] 3. Cambio en efectivo del flujo de caja = diferencia de efectivo en el balance.",
        "[ ] 4. La utilidad neta del estado de resultados es la misma que usa el flujo de caja.",
        "[ ] 5. Las partidas del activo corriente suman el total del activo corriente.",
        "[ ] 6. Recalculé a mano los ratios de un año (uno basta para detectar una fórmula equivocada).",
        "[ ] 7. Unidades y moneda consistentes (miles vs. millones; COP vs. USD).",
        "[ ] 8. Periodos correctos (no mezcla año fiscal con calendario; no confunde 2024 con 2025).",
        "[ ] 9. Dice NO DISPONIBLE donde no había dato, en lugar de estimarlo sin avisar.",
        "[ ] 10. Lo leí como si lo hubiera hecho un junior en su primer día. ¿Qué le preguntaría?"
      ]) } },

    { id: "quant", modulos: ["quant"], logro: "Quant aumentado", logroF: "Quant aumentada", icono: "📈",
      capacidad: "Usar un agente para investigar, codificar y backtestear una estrategia en minutos, y saber qué parte del resultado es ruido: overfitting, sesgo de selección, fugas, costos.",
      reto: "Pídele a un agente que backtestee una idea simple y luego rómpela: cambia el periodo, agrega costos, prueba fuera de muestra.",
      recompensa: { nombre: "Checklist anti-overfitting para backtests con IA", desc: "Diez preguntas antes de creerle a un backtest que un agente produjo en minutos.", contenido: L([
        "CHECKLIST — antes de creerle a un backtest generado con IA",
        "",
        "[ ] 1. ¿Incluye costos de transacción y slippage realistas? ¿Sigue siendo rentable con el doble?",
        "[ ] 2. ¿Hay look-ahead? Revisa cada dato: ¿era conocible en la fecha en que el código lo usa? (cierres, fundamentales, revisiones).",
        "[ ] 3. ¿Cuántas variantes se probaron antes de esta? Con 20 pruebas, una 'funciona' por azar. Pide el registro completo.",
        "[ ] 4. ¿In-sample y out-of-sample estaban separados ANTES de tocar parámetros? ¿El OOS se usó una sola vez?",
        "[ ] 5. ¿Cuántos parámetros tiene? Más de 3-4 en una estrategia simple es sospechoso.",
        "[ ] 6. ¿Sobrevive a cambios pequeños de parámetros (±20 %)? Si el resultado se derrumba, es ajuste al ruido.",
        "[ ] 7. ¿Funciona en otro activo o periodo con la misma lógica? ¿O solo en el que se diseñó?",
        "[ ] 8. ¿Hay sesgo de supervivencia en el universo (activos que ya no existen)?",
        "[ ] 9. ¿El número de operaciones es suficiente para que el Sharpe signifique algo? (Pocas operaciones = intervalo enorme.)",
        "[ ] 10. ¿Puedo explicar en una frase POR QUÉ debería existir esta ineficiencia y quién está del otro lado? Si no, no hay tesis; hay curva."
      ]) } },

    { id: "mirofish", modulos: ["mirofish"], logro: "Oráculo con criterio", icono: "🔮",
      capacidad: "Hacer análisis de mercado, simular escenarios y validar ideas de negocio con miles de agentes, sabiendo dónde falla la simulación.",
      reto: "Corre un escenario y su opuesto en MiroFish; anota en qué se contradicen.",
      recompensa: { nombre: "Plantilla de escenario para MiroFish", desc: "Cómo estructurar el documento que subes y cómo leer el reporte sin engañarte.", contenido: L([
        "# Escenario: {{título}}",
        "",
        "## Contexto (esto es lo que subes como documento)",
        "- Empresa, activo o idea: ",
        "- Mercado y tamaño: ",
        "- Actores: clientes (por segmento), competidores, proveedores, bancos, regulador, medios, participantes de mercado.",
        "- Situación actual en cinco líneas (cifras clave): ",
        "",
        "## Evento a simular (uno solo por corrida)",
        "Ejemplos: 'La empresa sube precios 12 % en enero' / 'Pierde a su cliente principal' / 'El banco central sube tasas 100 pb' / 'Lanza el producto X'.",
        "",
        "## Preguntas que quiero responder",
        "1. ¿Cómo reacciona cada grupo de actores a 30, 90 y 180 días?",
        "2. ¿Qué narrativa domina y cuál es la señal temprana de que va mal?",
        "3. ¿Qué decisión cambia más el resultado?",
        "",
        "## Cómo voy a leer el reporte",
        "- Busco dinámicas y puntos ciegos, no probabilidades.",
        "- Contrasto con datos reales antes de usarlo en una decisión.",
        "- Corro el escenario opuesto: si el modelo siempre me da la razón, no me está diciendo nada."
      ]) },
      variantes: { juliana: {
        capacidad: "Simular cómo reaccionan participantes, medios y reguladores ante un evento de mercado, y validar una tesis o idea de negocio, sabiendo dónde falla la simulación."
      } } },

    { id: "python", modulos: ["python"], logro: "Lee el código", icono: "🐍",
      capacidad: "Leer el script que un agente genera para tus ratios y verificar que hace exactamente lo que pediste.",
      reto: "Ejecuta el script base con tus datos y cambia un ratio por tu cuenta.",
      recompensa: { nombre: "Script base: leer Excel y calcular ratios", desc: "Veinte líneas de Python. Pídele al agente que lo adapte a tu archivo; tú ya sabrás leerlo.", contenido: L([
        "# ratios.py — requiere: pip install pandas openpyxl",
        "# Espera un Excel con filas = cuentas y columnas = años (hoja 'Balance').",
        "import pandas as pd",
        "",
        "df = pd.read_excel(\"estados_financieros.xlsx\", sheet_name=\"Balance\", index_col=0)",
        "",
        "def ratio(numerador, denominador):",
        "    return (df.loc[numerador] / df.loc[denominador]).round(2)",
        "",
        "resultado = pd.DataFrame({",
        "    \"liquidez_corriente\": ratio(\"activo_corriente\", \"pasivo_corriente\"),",
        "    \"endeudamiento\": ratio(\"pasivo_total\", \"activo_total\"),",
        "    \"cobertura_intereses\": ratio(\"ebitda\", \"gastos_financieros\"),",
        "    \"deuda_ebitda\": ((df.loc[\"deuda_financiera_cp\"] + df.loc[\"deuda_financiera_lp\"]) / df.loc[\"ebitda\"]).round(2),",
        "})",
        "",
        "print(resultado)",
        "resultado.to_excel(\"ratios.xlsx\")"
      ]) } }
  ];

  // Resuelve una competencia para el perfil activo (aplica variantes de texto)
  function resolver(def) {
    var v = (def.variantes && def.variantes[perfil.id]) || {};
    return {
      id: def.id, modulos: def.modulos, cualquiera: !!def.cualquiera, icono: def.icono,
      logro: perfil.genero === "f" && def.logroF ? def.logroF : def.logro,
      capacidad: v.capacidad || def.capacidad,
      reto: v.reto || def.reto,
      recompensa: v.recompensa || def.recompensa
    };
  }

  // =====================================================================
  // 3. LOGROS EXTRA
  // =====================================================================
  var EXTRAS = [
    { id: "primer-paso",   nombre: "Primer paso",        icono: "🚀", desc: "Viste tu primer video.",
      cond: function (s) { return s.vistosArr.length >= 1; } },
    { id: "bilingue",      nombre: "Bilingüe",           icono: "🌎", desc: "Viste al menos un video en español y uno en inglés.",
      cond: function (s) { return s.vistosArr.some(function (v) { return v.lang === "es"; }) && s.vistosArr.some(function (v) { return v.lang === "en"; }); } },
    { id: "maraton",       nombre: "Maratón",            icono: "🏃", desc: "Tres o más videos en un mismo día.",
      cond: function (s) { return s.maxPorDia >= 3; } },
    { id: "practica",      nombre: "Práctica constante", icono: "🛠️", desc: "Completaste cinco retos prácticos.",
      cond: function (s) { return s.retosOk >= 5; } },
    { id: "doble-agente",  nombre: "Doble agente",       icono: "🕶️", desc: "Completaste Codex y Claude Code.",
      cond: function (s) { return s.porModulo.codex && s.porModulo["claude-code"]; } },
    { id: "ruta-completa", nombre: "Ruta completa",      icono: "⭐", desc: "Viste todos los videos de la ruta ★.",
      cond: function (s) { return s.ruta.length > 0 && s.ruta.every(function (v) { return s.vistos[v.id]; }); } },
    { id: "director",      nombre: "Director de IA",     icono: "👑", desc: "100 % del curso. Ya puedes enseñarlo.",
      cond: function (s) { return s.todos.length > 0 && s.vistosArr.length === s.todos.length; } }
  ];

  var PTS_VIDEO = 50, PTS_MIN = 5, PTS_COMPETENCIA = 200, PTS_RETO = 150, PTS_EXTRA = 100;
  var DATA, perfil, competencias = [], notify, todos = [], ultimoVistos = {}, retos = {};
  function key(k) { return "proyecto-fernando:" + perfil.id + ":" + k; }

  // =====================================================================
  // 4. SPRITE PIXEL ART  (16 columnas x 24 filas)
  // =====================================================================
  var BASE = [
    "................",
    "................",
    "......sssss.....",
    "....sssssssss...",
    "...sssssssssss..",
    "...sssssssssss..",
    "...sssssssssss..",
    "..ssssssssssss..",
    "..ssswessswess..",
    "..ssssssssssss..",
    "...ssssssssss...",
    "...ssssssssss...",
    "...bbbbbbbbbb...",
    "....bbbbbbbb....",
    ".....ssssss.....",
    "...tttttttttt...",
    "..tttttttttttt..",
    ".tttttttttttttt.",
    ".tt.tttttttt.tt.",
    ".tt.tttttttt.tt.",
    ".ss.pppppppp.ss.",
    "....pppppppp....",
    "....ppp..ppp....",
    "....kkk..kkk...."
  ];
  var PELO_ONDULADO = {
    1: ".....hh.hh......",
    2: "....hhhhhhhh....", 3: "...hhhhhhhhhh...", 4: "..hhhhhhhhhhhh..", 5: "..hhhhhhhhhhhh..",
    6: "..hhhhh......h..", 7: "..hh.........h..", 8: "..h...........h.", 9: "..h............."
  };
  var PELO_CORTO = {
    2: "......hhhhh.....", 3: "....hhhhhhhhh...", 4: "...hhhhhhhhhhh..", 5: "...hhhhhhhhhhh..",
    6: "...hh.......hh..", 7: "..hh........hh..", 8: "..hh........hh..", 9: "..h..........h.."
  };
  var PELO_RAPADO = { 3: "....hhhhhhhhh...", 4: "...hhhhhhhhhhh..", 5: "...hh.......hh.." };
  // Pelo largo: raya al medio, cae por ambos lados hasta los hombros
  var PELO_LARGO = {
    2: ".....hhhhhhh....", 3: "....hhhhhhhhh...", 4: "...hhhhhhhhhhh..", 5: "..hhhh.hhh.hhh..",
    6: "..hhh.......hh..", 7: ".hhh.........hh.", 8: ".hh...........h.", 9: ".hh...........h.",
    10: ".hh..........hh.", 11: ".hh..........hh.", 12: ".hh..........hh.", 13: ".hh..........hh.",
    14: ".hh..........hh.", 15: ".hh..........hh.", 16: ".hh..........hh.", 17: "..h..........h..", 18: "..h..........h.."
  };
  var CEJAS   = { 7: ".....hh...hh...." };
  var SONRISA_GRANDE = { 11: ".....mWWWWm.....", 12: "......mmmm......" };
  var SONRISA_NORMAL = { 11: "......mmm......." };
  var GAFAS   = { 7: "....gggg.gggg...", 8: "....g..ggg..g...", 9: "....gggg.gggg..." };
  var ARETES  = { 10: "...R........R...", 11: "...R........R..." };
  var AURICULARES = {
    0: ".....AAAAAA.....", 1: "....A......A....", 2: "...A........A...", 3: "..A..........A..",
    4: "..A..........A..", 5: "..A..........A..", 6: ".A............A.",
    7: ".AA..........AA.", 8: ".AA..........AA.", 9: ".AA..........AA.",
    10: "..A.............", 11: "...A............", 12: "....M..........."
  };
  var LAPTOP  = { 17: "...llllllllll...", 18: "...lccccccccl...", 19: "...llllllllll..." };
  var GEMA    = { 15: "..........oo....", 16: "..........oo...." };
  var CORBATA = { 15: ".....WWyyWW.....", 16: ".......yy......." };
  var ORBE    = { 3: ".z..............", 4: "zzz.............", 5: ".z.............." };
  var CORONA  = { 0: ".....Y.Y.Y.Y....", 1: ".....YYYYYYY...." };
  var BRILLOS = { 2: "..............x.", 6: ".x..............", 10: "..............x." };

  function tierVisual(nivel) {
    return nivel >= 10 ? 6 : nivel >= 9 ? 5 : nivel >= 7 ? 4 : nivel >= 5 ? 3 : nivel >= 3 ? 2 : nivel >= 1 ? 1 : 0;
  }
  function paleta(look, tier) {
    var pelo = PELO[look.colorPelo] || PELO.negro, piel = PIEL[look.piel] || PIEL.media;
    return {
      s: piel, h: pelo, b: look.barba === "corta" ? pelo : piel,
      w: "#ffffff", e: "#1f1a17", m: "#a34a34", g: "#1f1a17", W: "#ffffff", R: "#e0b84a",
      A: "#2b2b2e", M: "#4a4a50",
      t: CAMISA[tier] || look.camisa || "#8b8f96", p: "#3a4250", k: "#1f1a17",
      l: "#c8cbd0", c: "#58c4ff", o: "#8b6cff", y: "#c62828", z: "#37d0b0", Y: "#f2b632", x: "#ffd75e"
    };
  }
  function componer(look, tier) {
    var rows = BASE.map(function (r) { return r.split(""); });
    function overlay(layer) {
      Object.keys(layer).forEach(function (ri) {
        layer[ri].split("").forEach(function (ch, ci) { if (ch !== ".") rows[ri][ci] = ch; });
      });
    }
    if (look.pelo === "ondulado") overlay(PELO_ONDULADO);
    if (look.pelo === "corto") overlay(PELO_CORTO);
    if (look.pelo === "rapado") overlay(PELO_RAPADO);
    if (look.pelo === "largo") overlay(PELO_LARGO);
    overlay(CEJAS);
    overlay(look.sonrisa === "grande" ? SONRISA_GRANDE : SONRISA_NORMAL);
    if (look.gafas) overlay(GAFAS);
    if (look.aretes) overlay(ARETES);
    if (look.auriculares) overlay(AURICULARES);
    if (tier >= 2) overlay(LAPTOP);
    if (tier >= 3) overlay(GEMA);
    if (tier >= 4) overlay(CORBATA);
    if (tier >= 5) overlay(ORBE);
    if (tier >= 6) { overlay(CORONA); overlay(BRILLOS); }
    return rows;
  }
  function avatarSVG(nivel, p) {
    p = p || perfil;
    var tier = tierVisual(nivel), pal = paleta(p.look, tier), rows = componer(p.look, tier), rects = [];
    rows.forEach(function (row, y) {
      row.forEach(function (ch, x) {
        if (ch !== "." && pal[ch]) rects.push('<rect class="px-' + ch + '" x="' + x + '" y="' + y + '" width="1" height="1" fill="' + pal[ch] + '"/>');
      });
    });
    return '<svg class="avatar-svg tier-' + tier + '" viewBox="0 0 16 24" shape-rendering="crispEdges" role="img" aria-label="Personaje de ' + p.nombre + ', nivel ' + nivel + '">' + rects.join("") + "</svg>";
  }

  // =====================================================================
  // 5. ESTADO
  // =====================================================================
  function cargarRetos() { try { return JSON.parse(localStorage.getItem(key("retos")) || "{}"); } catch (e) { return {}; } }
  function guardarRetos() { try { localStorage.setItem(key("retos"), JSON.stringify(retos)); } catch (e) {} }

  function calcular(vistos) {
    var s = { vistos: vistos, todos: todos };
    s.vistosArr = todos.filter(function (v) { return vistos[v.id]; });
    s.ruta = todos.filter(function (v) { return v.ruta; });
    s.porModulo = {};
    DATA.modulos.forEach(function (m) { s.porModulo[m.id] = m.videos.every(function (v) { return vistos[v.id]; }); });
    s.competencias = competencias.map(function (c) {
      var ok = c.cualquiera ? c.modulos.some(function (id) { return s.porModulo[id]; }) : c.modulos.every(function (id) { return s.porModulo[id]; });
      return { def: c, ok: ok, reto: !!retos[c.id] };
    });
    s.nivel = s.competencias.filter(function (c) { return c.ok; }).length;
    s.retosOk = s.competencias.filter(function (c) { return c.reto; }).length;
    var porDia = {};
    s.vistosArr.forEach(function (v) {
      var ts = vistos[v.id]; var d = typeof ts === "number" ? new Date(ts).toDateString() : "?";
      porDia[d] = (porDia[d] || 0) + 1;
    });
    s.maxPorDia = Object.keys(porDia).reduce(function (a, k) { return Math.max(a, porDia[k]); }, 0);
    s.extras = EXTRAS.map(function (e) { return { def: e, ok: !!e.cond(s) }; });
    s.puntos = s.vistosArr.reduce(function (a, v) { return a + PTS_VIDEO + PTS_MIN * v.min; }, 0)
      + s.nivel * PTS_COMPETENCIA + s.retosOk * PTS_RETO
      + s.extras.filter(function (e) { return e.ok; }).length * PTS_EXTRA;
    s.logros = s.competencias.map(function (c) { return { id: "comp:" + c.def.id, nombre: c.def.logro, icono: c.def.icono, desc: c.def.capacidad, ok: c.ok }; })
      .concat(s.extras.map(function (e) {
        var nombre = e.def.id === "director" && perfil.genero === "f" ? "Directora de IA" : e.def.nombre;
        return { id: "extra:" + e.def.id, nombre: nombre, icono: e.def.icono, desc: e.def.desc, ok: e.ok };
      }));
    s.siguiente = s.competencias.filter(function (c) { return !c.ok; })[0] || null;
    return s;
  }

  function moduloDe(id) { return DATA.modulos.filter(function (m) { return m.id === id; })[0]; }
  function compDe(id) { return competencias.filter(function (c) { return c.id === id; })[0]; }
  function esc(t) { return String(t).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function setText(id, v) { var el = document.getElementById(id); if (el) el.textContent = v; }
  function numModulo(m) { return (window.APP && APP.numModulo) ? APP.numModulo(m) : m.num; }

  // =====================================================================
  // 6. RENDER
  // =====================================================================
  function renderTarjeta(s) {
    var av = document.getElementById("avatar");
    if (av) av.innerHTML = avatarSVG(s.nivel);
    setText("nivel-num", s.nivel);
    setText("nivel-titulo", tituloNivel(s.nivel));
    setText("nivel-frase", NIVELES[s.nivel].frase);
    setText("p-pts", s.puntos.toLocaleString("es-CO"));
    setText("p-comp", s.nivel + " de " + competencias.length);
    var sig = document.getElementById("nivel-siguiente");
    if (sig) {
      if (s.siguiente) {
        var m = moduloDe(s.siguiente.def.modulos[0]);
        sig.innerHTML = "Siguiente competencia: <b>" + esc(s.siguiente.def.logro) + "</b> · completa <a href=\"#m-" + m.id + "\">Módulo " + numModulo(m) + "</a>";
      } else {
        sig.innerHTML = "<b>Curso completo.</b> Tu certificado está en la pestaña Tu nivel.";
      }
    }
  }

  function renderPerfil(s) {
    var cont = document.getElementById("perfil-contenido");
    if (!cont) return;
    var fuertes = s.competencias.filter(function (c) { return c.ok; }), debiles = s.competencias.filter(function (c) { return !c.ok; });
    var balance = '<div class="balance">' +
      '<div class="bal-col"><h4>💪 Fortalezas <span>' + fuertes.length + "</span></h4>" +
        (fuertes.length ? "<ul>" + fuertes.map(function (c) { return "<li>" + c.def.icono + " " + esc(c.def.logro) + (c.reto ? ' <em>verificado</em>' : "") + "</li>"; }).join("") + "</ul>" : '<p class="hint">Todavía ninguna. La primera está a un módulo de distancia.</p>') +
      "</div>" +
      '<div class="bal-col"><h4>🎯 Por fortalecer <span>' + debiles.length + "</span></h4>" +
        (debiles.length ? "<ul>" + debiles.map(function (c) { var m = moduloDe(c.def.modulos[0]); return "<li>" + c.def.icono + " " + esc(c.def.logro) + ' <a href="#m-' + m.id + '">Módulo ' + numModulo(m) + "</a></li>"; }).join("") + "</ul>" : '<p class="hint">Nada. Ya lo tienes todo.</p>') +
      "</div></div>";

    var ladder = '<ol class="ladder">' + NIVELES.map(function (n) {
      var cls = n.n < s.nivel ? "done" : n.n === s.nivel ? "current" : "todo";
      return '<li class="' + cls + '"><span class="n">' + n.n + '</span><span class="t">' + esc(tituloNivel(n.n)) + "</span></li>";
    }).join("") + "</ol>";

    var comps = '<div class="comp-grid">' + s.competencias.map(function (c) {
      var mods = c.def.modulos.map(moduloDe);
      var req = mods.map(function (m) { return '<a href="#m-' + m.id + '">Módulo ' + numModulo(m) + "</a>"; }).join(c.def.cualquiera ? " o " : " y ");
      return '<article class="comp ' + (c.ok ? "ok" : "locked") + '">' +
        '<div class="comp-icon" aria-hidden="true">' + c.def.icono + "</div>" +
        "<div><h4>" + esc(c.def.logro) + (c.ok ? ' <span class="tick">✓</span>' : "") + (c.reto ? ' <span class="verificado">verificado en la práctica</span>' : "") + "</h4>" +
        '<p class="cap"><b>' + (c.ok ? "Ahora puedes" : "Podrás") + ":</b> " + esc(c.def.capacidad) + "</p>" +
        (c.ok ? "" : '<p class="req">Se desbloquea al completar ' + req + "</p>") +
        '<label class="reto"><input type="checkbox" data-reto="' + c.def.id + '"' + (c.reto ? " checked" : "") + '> <span><b>Reto práctico (+' + PTS_RETO + ' pts):</b> ' + esc(c.def.reto) + "</span></label>" +
        '<p class="recompensa">' + (c.ok
          ? '🎁 <button type="button" class="link" data-recompensa="' + c.def.id + '">' + esc(c.def.recompensa.nombre) + "</button>"
          : '🔒 <span>Recompensa: ' + esc(c.def.recompensa.nombre) + "</span>") + "</p>" +
        "</div></article>";
    }).join("") + "</div>";

    var logros = '<ul class="logro-grid">' + s.logros.map(function (l) {
      return '<li class="logro ' + (l.ok ? "ok" : "locked") + '" title="' + esc(l.desc) + '">' +
        '<span class="ic" aria-hidden="true">' + l.icono + '</span><span class="nm">' + esc(l.nombre) + "</span>" +
        '<span class="ds">' + esc(l.desc) + "</span></li>";
    }).join("") + "</ul>";

    var cert = s.nivel >= competencias.length
      ? '<div class="cert-cta"><b>🎓 Recompensa final desbloqueada:</b> tu certificado. <button type="button" class="btn primary" data-certificado>Ver e imprimir certificado</button></div>'
      : '<p class="hint">🔒 Recompensa final: certificado de ' + esc(tituloNivel(10)) + ', al completar las ' + competencias.length + " competencias.</p>";

    cont.innerHTML =
      '<div class="perfil-block"><h3>Fortalezas y puntos por fortalecer</h3>' + balance + "</div>" +
      '<div class="perfil-block"><h3>Escalera de niveles</h3><p class="hint">Subes un nivel por cada competencia completada, en el orden que quieras. Nivel actual: <b>' + s.nivel + " · " + esc(tituloNivel(s.nivel)) + "</b>.</p>" + ladder + "</div>" +
      '<div class="perfil-block"><h3>Capacidades, retos y recompensas</h3><p class="hint">Lo que ya deberías poder hacer con lo aprendido. Cada competencia trae un reto práctico (para comprobarlo de verdad) y una recompensa: una plantilla o herramienta lista para usar. ' + s.nivel + " de " + competencias.length + " desbloqueadas · " + s.retosOk + " retos hechos.</p>" + comps + cert + "</div>" +
      '<div class="perfil-block"><h3>Logros</h3><p class="hint">' + s.logros.filter(function (l) { return l.ok; }).length + " de " + s.logros.length + " · Cada video vale " + PTS_VIDEO + " pts + " + PTS_MIN + " por minuto; cada competencia " + PTS_COMPETENCIA + "; cada reto " + PTS_RETO + "; cada logro extra " + PTS_EXTRA + ".</p>" + logros + "</div>";
  }

  function renderChips(s) {
    document.querySelectorAll("[data-chip]").forEach(function (el) {
      var id = el.getAttribute("data-chip");
      var c = s.competencias.filter(function (x) { return x.def.modulos.indexOf(id) !== -1; })[0];
      if (!c) { el.innerHTML = ""; return; }
      el.className = "comp-chip " + (c.ok ? "ok" : "locked");
      el.innerHTML = '<span aria-hidden="true">' + (c.ok ? c.def.icono : "🔒") + "</span> " +
        (c.ok ? "Logro desbloqueado: " : "Al completar: ") + "<b>" + esc(c.def.logro) + "</b>" +
        (c.ok ? "" : " · recompensa: " + esc(c.def.recompensa.nombre));
    });
  }

  // =====================================================================
  // 7. CELEBRACIONES
  // =====================================================================
  function celebrar(s) {
    var prev = null;
    try { prev = JSON.parse(localStorage.getItem(key("celebrados")) || "null"); } catch (e) { prev = null; }
    var ahora = { nivel: s.nivel, logros: s.logros.filter(function (l) { return l.ok; }).map(function (l) { return l.id; }) };
    if (prev) {
      var nuevosComp = [];
      ahora.logros.forEach(function (id) {
        if (prev.logros.indexOf(id) === -1) {
          var l = s.logros.filter(function (x) { return x.id === id; })[0];
          if (id.indexOf("comp:") === 0) nuevosComp.push(id.slice(5)); else if (notify) notify("🏆 Logro desbloqueado: " + l.nombre);
        }
      });
      if (s.nivel > prev.nivel) {
        var wrap = document.querySelector(".avatar-wrap");
        if (wrap) { wrap.classList.remove("bounce"); void wrap.offsetWidth; wrap.classList.add("bounce"); }
        confeti();
        modalNivel(s, nuevosComp);
      }
    }
    try { localStorage.setItem(key("celebrados"), JSON.stringify(ahora)); } catch (e) {}
  }

  function modalNivel(s, nuevosComp) {
    var dlg = document.getElementById("dlg-nivel");
    if (!dlg || typeof dlg.showModal !== "function") { if (notify) notify("⬆️ Subiste a nivel " + s.nivel + ": " + tituloNivel(s.nivel)); return; }
    var comp = nuevosComp.length ? compDe(nuevosComp[nuevosComp.length - 1]) : null;
    dlg.innerHTML =
      '<div class="dlg-body">' +
        '<div class="dlg-avatar">' + avatarSVG(s.nivel) + "</div>" +
        '<p class="label">Subiste de nivel</p>' +
        '<h3>Nivel ' + s.nivel + " · " + esc(tituloNivel(s.nivel)) + "</h3>" +
        '<p class="frase">' + esc(NIVELES[s.nivel].frase) + "</p>" +
        (comp ? '<div class="dlg-unlock"><p><b>' + comp.icono + " Nueva capacidad:</b> " + esc(comp.capacidad) + "</p>" +
          '<p><b>🎁 Recompensa desbloqueada:</b> ' + esc(comp.recompensa.nombre) + "</p></div>" : "") +
        '<div class="dlg-actions">' +
          (comp ? '<button type="button" class="btn primary" data-recompensa="' + comp.id + '" data-cierra>Ver recompensa</button>' : "") +
          (s.nivel >= competencias.length ? '<button type="button" class="btn primary" data-certificado data-cierra>Ver certificado</button>' : "") +
          '<button type="button" class="btn" data-cierra>Seguir</button>' +
        "</div>" +
      "</div>";
    dlg.showModal();
  }

  function modalRecompensa(id) {
    var c = compDe(id), dlg = document.getElementById("dlg-recompensa");
    if (!c || !dlg || typeof dlg.showModal !== "function") return;
    dlg.innerHTML =
      '<div class="dlg-body wide">' +
        '<p class="label">🎁 Recompensa · ' + esc(c.logro) + "</p>" +
        "<h3>" + esc(c.recompensa.nombre) + "</h3>" +
        '<p class="frase">' + esc(c.recompensa.desc) + "</p>" +
        "<pre>" + esc(c.recompensa.contenido) + "</pre>" +
        '<div class="dlg-actions"><button type="button" class="btn primary" data-copiar>Copiar</button><button type="button" class="btn" data-cierra>Cerrar</button></div>' +
      "</div>";
    dlg.showModal();
  }

  function certificado(s) {
    var el = document.getElementById("certificado");
    if (!el) return;
    var fecha = new Date().toLocaleDateString("es-CO", { year: "numeric", month: "long", day: "numeric" });
    el.innerHTML =
      '<div class="cert">' +
        '<div class="cert-avatar">' + avatarSVG(s.nivel) + "</div>" +
        '<p class="cert-eyebrow">Proyecto Fernando · ' + esc(perfil.titulo) + "</p>" +
        "<h2>Certificado</h2>" +
        '<p class="cert-text">Se certifica que</p>' +
        '<p class="cert-name">' + esc(perfil.nombreCompleto) + "</p>" +
        '<p class="cert-text">completó las ' + competencias.length + " competencias del curso y alcanzó el nivel</p>" +
        '<p class="cert-level">10 · ' + esc(tituloNivel(10)) + "</p>" +
        '<p class="cert-caps">' + competencias.map(function (c) { return c.icono + " " + esc(c.logro); }).join(" · ") + "</p>" +
        '<p class="cert-meta">' + s.puntos.toLocaleString("es-CO") + " puntos · " + s.retosOk + " de " + competencias.length + " retos prácticos · " + fecha + "</p>" +
        '<p class="cert-foot">Curso curado y construido por David con Claude Code. Los conocimientos los puso ' + esc(perfil.nombre) + ".</p>" +
      "</div>" +
      '<div class="dlg-actions no-print"><button type="button" class="btn primary" data-imprimir>Imprimir o guardar como PDF</button><button type="button" class="btn" data-cierra-cert>Cerrar</button></div>';
    el.hidden = false;
    document.body.classList.add("cert-open");
  }

  function confeti() {
    var cv = document.getElementById("confetti");
    if (!cv || (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches)) return;
    var ctx = cv.getContext("2d"), W = cv.width = window.innerWidth, H = cv.height = window.innerHeight;
    var colores = ["#f2b632", "#37d0b0", "#2f6fde", "#8b6cff", "#c62828", "#ffd75e"], parts = [];
    for (var i = 0; i < 140; i++) parts.push({ x: W / 2 + (Math.random() - .5) * 200, y: H * .35, vx: (Math.random() - .5) * 14, vy: -Math.random() * 12 - 4, w: 6 + Math.random() * 6, h: 4 + Math.random() * 4, c: colores[i % colores.length], r: Math.random() * Math.PI, vr: (Math.random() - .5) * .3 });
    var t0 = null;
    cv.classList.add("on");
    function frame(t) {
      if (!t0) t0 = t;
      var dt = (t - t0) / 1000;
      ctx.clearRect(0, 0, W, H);
      parts.forEach(function (p) {
        p.vy += .35; p.x += p.vx; p.y += p.vy; p.vx *= .99; p.r += p.vr;
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.fillStyle = p.c; ctx.globalAlpha = Math.max(0, 1 - dt / 1.8);
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h); ctx.restore();
      });
      if (dt < 1.8) requestAnimationFrame(frame); else { ctx.clearRect(0, 0, W, H); cv.classList.remove("on"); }
    }
    requestAnimationFrame(frame);
  }

  function copiar(texto) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(texto);
    return new Promise(function (res, rej) {
      var ta = document.createElement("textarea");
      ta.value = texto; ta.setAttribute("readonly", ""); ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); res(); } catch (e) { rej(e); }
      document.body.removeChild(ta);
    });
  }

  // =====================================================================
  // 8. EVENTOS
  // =====================================================================
  var bound = false;
  function bind() {
    if (bound) return; bound = true;
    document.addEventListener("change", function (e) {
      var cb = e.target.closest && e.target.closest("[data-reto]");
      if (!cb) return;
      var id = cb.getAttribute("data-reto");
      if (cb.checked) retos[id] = Date.now(); else delete retos[id];
      guardarRetos();
      var s = GAMI.actualizar(ultimoVistos);
      if (cb.checked && notify) notify("🛠️ Reto hecho: +" + PTS_RETO + " pts · " + s.puntos.toLocaleString("es-CO") + " en total");
    });
    document.addEventListener("click", function (e) {
      var t = e.target.closest ? e.target : null;
      if (!t) return;
      var b;
      if ((b = t.closest("[data-recompensa]"))) {
        var dlgN = document.getElementById("dlg-nivel"); if (dlgN && dlgN.open) dlgN.close();
        modalRecompensa(b.getAttribute("data-recompensa")); return;
      }
      if ((b = t.closest("[data-certificado]"))) {
        var dn = document.getElementById("dlg-nivel"); if (dn && dn.open) dn.close();
        certificado(calcular(ultimoVistos)); return;
      }
      if (t.closest("[data-copiar]")) {
        var pre = t.closest(".dlg-body").querySelector("pre");
        copiar(pre.textContent).then(function () { if (notify) notify("Copiado. Pégalo donde lo necesites."); }, function () { if (notify) notify("No se pudo copiar automáticamente."); });
        return;
      }
      if (t.closest("[data-cierra]")) { var d = t.closest("dialog"); if (d) d.close(); return; }
      if (t.closest("[data-imprimir]")) { window.print(); return; }
      if (t.closest("[data-cierra-cert]")) { document.getElementById("certificado").hidden = true; document.body.classList.remove("cert-open"); return; }
      if (t.tagName === "DIALOG" && t.open) t.close();
    });
  }

  // =====================================================================
  // 9. API
  // =====================================================================
  window.GAMI = {
    // init se llama cada vez que cambia el perfil activo
    init: function (opts) {
      DATA = opts.data; perfil = opts.perfil; notify = opts.notify; todos = [];
      DATA.modulos.forEach(function (m) { m.videos.forEach(function (v) { todos.push(v); }); });
      competencias = perfil.competencias.map(function (id) {
        return resolver(CATALOGO.filter(function (c) { return c.id === id; })[0]);
      });
      retos = cargarRetos();
      bind();
    },
    actualizar: function (vistos) {
      ultimoVistos = vistos;
      var s = calcular(vistos);
      renderTarjeta(s); renderPerfil(s); renderChips(s); celebrar(s);
      return s;
    },
    avatar: function (nivel, p) { return avatarSVG(nivel, p); },
    reiniciar: function () { retos = {}; guardarRetos(); try { localStorage.removeItem(key("celebrados")); } catch (e) {} },
    exportar: function () { var c = null; try { c = JSON.parse(localStorage.getItem(key("celebrados")) || "null"); } catch (e) {} return { retos: retos, celebrados: c }; },
    importar: function (obj) {
      retos = (obj && obj.retos) || {}; guardarRetos();
      try { if (obj && obj.celebrados) localStorage.setItem(key("celebrados"), JSON.stringify(obj.celebrados)); else localStorage.removeItem(key("celebrados")); } catch (e) {}
    },
    markdown: function (vistos) {
      var s = calcular(vistos);
      var out = ["**Nivel " + s.nivel + " · " + tituloNivel(s.nivel) + "** · " + s.puntos + " pts · " + s.nivel + "/" + competencias.length + " competencias · " + s.retosOk + " retos", ""];
      out.push("### Capacidades");
      s.competencias.forEach(function (c) { out.push("- [" + (c.ok ? "x" : " ") + "] " + c.def.icono + " " + c.def.logro + " — " + c.def.capacidad + (c.reto ? " *(reto hecho)*" : "")); });
      out.push("", "### Logros");
      s.logros.forEach(function (l) { out.push("- [" + (l.ok ? "x" : " ") + "] " + l.icono + " " + l.nombre + " — " + l.desc); });
      return out.join("\n");
    },
    niveles: NIVELES
  };
})();
