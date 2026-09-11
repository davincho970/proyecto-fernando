// Proyecto Fernando — gamificación: personaje, niveles por competencia, retos, recompensas, logros y puntos.
// Depende de window.CURSO (videos.js). Expone window.GAMI.
(function () {
  "use strict";

  var NOMBRE = "Óscar Fernando";

  // =====================================================================
  // 1. APARIENCIA DEL PERSONAJE  (ajustada con la foto de Óscar Fernando)
  //    piel: clara | triguena | media | morena | oscura
  //    pelo: ondulado | corto | rapado | calvo      colorPelo: negro | castano-oscuro | castano | rubio | gris
  //    barba: ninguna | corta     gafas: true|false     auriculares: true|false     sonrisa: grande | normal
  // =====================================================================
  var LOOK = { piel: "triguena", pelo: "ondulado", colorPelo: "castano-oscuro", barba: "ninguna", gafas: false, auriculares: true, sonrisa: "grande" };

  var PIEL = { clara: "#f3d2b3", triguena: "#e9bd93", media: "#d9a066", morena: "#a8703f", oscura: "#6b4423" };
  var PELO = { negro: "#1f1a17", "castano-oscuro": "#2b1f18", castano: "#5a3a22", rubio: "#c9a45c", gris: "#9a9a9a" };
  // Camisa por tramo visual: 0 camiseta blanca (como en la foto), 1-2 azul, 3 morado Obsidian, 4+ saco oscuro
  var CAMISA = ["#f2f1ed", "#2f6fde", "#2f6fde", "#5b3fbf", "#1c2333", "#1c2333", "#1c2333"];

  // =====================================================================
  // 2. NIVELES  (nivel = número de competencias completadas, 0..10)
  // =====================================================================
  var NIVELES = [
    { n: 0,  titulo: "Rookie",             frase: "Todavía no sabes qué es un LLM. Todo el mundo empieza aquí." },
    { n: 1,  titulo: "Aprendiz",           frase: "Ya entiendes la herramienta. Ahora toca usarla." },
    { n: 2,  titulo: "Iniciado",           frase: "Sabes pedir. La IA empieza a devolverte cosas útiles." },
    { n: 3,  titulo: "Practicante",        frase: "Distingues un chat de un agente. El salto real está cerca." },
    { n: 4,  titulo: "Operador",           frase: "Diriges un agente en tu computador. Ya no trabajas solo." },
    { n: 5,  titulo: "Constructor",        frase: "Tienes dónde guardar lo que sabes." },
    { n: 6,  titulo: "Arquitecto",         frase: "Tu conocimiento tiene estructura y se puede consultar." },
    { n: 7,  titulo: "Estratega",          frase: "Tu segundo cerebro trabaja mientras tú decides." },
    { n: 8,  titulo: "Analista aumentado", frase: "Produces el trabajo de tres y decides con mejor información." },
    { n: 9,  titulo: "Experto",            frase: "Simulas escenarios antes de que ocurran." },
    { n: 10, titulo: "Director de IA",     frase: "Dominas el flujo completo y puedes enseñarlo." }
  ];

  // =====================================================================
  // 3. COMPETENCIAS: capacidad + reto práctico + recompensa (se desbloquea con la competencia)
  // =====================================================================
  var L = function (arr) { return arr.join("\n"); };

  var COMPETENCIAS = [
    { id: "fundamentos", modulos: ["fundamentos"], logro: "Alfabetizado en IA", icono: "🧠",
      capacidad: "Explicar qué es un LLM, por qué alucina y por qué debes exigir la fuente de cada cifra.",
      reto: "Pídele a ChatGPT o Claude tres cifras de una empresa que conozcas bien y verifica cuáles son falsas.",
      recompensa: { nombre: "Glosario de bolsillo", desc: "Diez términos que vas a oír todos los días, explicados en una línea.", contenido: L([
        "GLOSARIO DE BOLSILLO — IA para analistas",
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
      ]) } },
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
      ]) } },
    { id: "agentes", modulos: ["agentes"], logro: "Domador de agentes", icono: "🤖",
      capacidad: "Distinguir un chat de un agente y entender cómo MCP conecta la IA con tus archivos y datos.",
      reto: "Explícale a un colega, en dos minutos y sin leer, la diferencia entre un chat y un agente.",
      recompensa: { nombre: "Mapa: qué herramienta para qué", desc: "Cuándo usar chat, proyecto con instrucciones, agente o MCP.", contenido: L([
        "QUÉ HERRAMIENTA PARA QUÉ",
        "",
        "Chat (ChatGPT, Claude): preguntas sueltas, redacción, explicar un concepto, revisar un párrafo.",
        "Proyecto con instrucciones permanentes (Claude Projects, GPTs): trabajo repetido con las mismas reglas: memos, formato de la entidad, política de crédito.",
        "Agente en tu computador (Codex, Claude Code): tareas sobre carpetas y archivos: leer 12 PDFs, extraer balances, correr un script, escribir un borrador.",
        "MCP: cuando el agente necesita llegar a datos que no están en la carpeta: una base de datos, Excel en la nube, un sistema interno.",
        "",
        "Regla práctica: si la tarea cabe en un mensaje, chat. Si se repite, proyecto. Si toca archivos, agente. Si toca sistemas, MCP."
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
      ]) } },
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
        "analista: " + NOMBRE,
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
      ]) } },
    { id: "bases", modulos: ["bases"], logro: "Arquitecto de datos", icono: "🗃️",
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
      ]) } },
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
      ]) } },
    { id: "finanzas", modulos: ["finanzas"], logro: "Analista aumentado", icono: "📊",
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
    { id: "mirofish", modulos: ["mirofish"], logro: "Oráculo con criterio", icono: "🔮",
      capacidad: "Hacer análisis de mercado, simular escenarios y validar ideas de negocio con miles de agentes, sabiendo dónde falla la simulación.",
      reto: "Corre un escenario y su opuesto en MiroFish; anota en qué se contradicen.",
      recompensa: { nombre: "Plantilla de escenario para MiroFish", desc: "Cómo estructurar el documento que subes y cómo leer el reporte sin engañarte.", contenido: L([
        "# Escenario: {{título}}",
        "",
        "## Contexto (esto es lo que subes como documento)",
        "- Empresa o idea: ",
        "- Mercado y tamaño: ",
        "- Actores: clientes (por segmento), competidores, proveedores, bancos, regulador, medios.",
        "- Situación actual en cinco líneas (cifras clave): ",
        "",
        "## Evento a simular (uno solo por corrida)",
        "Ejemplos: 'La empresa sube precios 12 % en enero' / 'Pierde a su cliente principal (30 % de ventas)' / 'Lanza el producto X a precio Y'.",
        "",
        "## Preguntas que quiero responder",
        "1. ¿Cómo reacciona cada grupo de actores a 30, 90 y 180 días?",
        "2. ¿Qué narrativa domina y cuál es la señal temprana de que va mal?",
        "3. ¿Qué decisión de la empresa cambia más el resultado?",
        "",
        "## Cómo voy a leer el reporte",
        "- Busco dinámicas y puntos ciegos, no probabilidades.",
        "- Contrasto con datos reales antes de usarlo en una decisión.",
        "- Corro el escenario opuesto: si el modelo siempre me da la razón, no me está diciendo nada."
      ]) } },
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

  // =====================================================================
  // 4. LOGROS EXTRA
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
  var KEY_CELEBRADOS = "proyecto-fernando:celebrados";
  var KEY_RETOS = "proyecto-fernando:retos";
  var DATA, notify, todos = [], ultimoVistos = {}, retos = {};

  // =====================================================================
  // 5. SPRITE PIXEL ART  (16 columnas x 24 filas)
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
  // Pelo con volumen y flequillo hacia un lado (como en la foto)
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
  var CEJAS   = { 7: ".....hh...hh...." };
  var SONRISA_GRANDE = { 11: ".....mWWWWm.....", 12: "......mmmm......" };
  var SONRISA_NORMAL = { 11: "......mmm......." };
  var GAFAS   = { 7: "....gggg.gggg...", 8: "....g..ggg..g...", 9: "....gggg.gggg..." };
  // Audífonos con micrófono: diadema, dos copas y brazo del micrófono hacia la boca
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
  function paleta(tier) {
    var pelo = PELO[LOOK.colorPelo] || PELO.negro, piel = PIEL[LOOK.piel] || PIEL.media;
    return {
      s: piel, h: pelo, b: LOOK.barba === "corta" ? pelo : piel,
      w: "#ffffff", e: "#1f1a17", m: "#a34a34", g: "#1f1a17", W: "#ffffff",
      A: "#2b2b2e", M: "#4a4a50",
      t: CAMISA[tier], p: "#3a4250", k: "#1f1a17",
      l: "#c8cbd0", c: "#58c4ff", o: "#8b6cff", y: "#c62828", z: "#37d0b0", Y: "#f2b632", x: "#ffd75e"
    };
  }
  function componer(tier) {
    var rows = BASE.map(function (r) { return r.split(""); });
    function overlay(layer) {
      Object.keys(layer).forEach(function (ri) {
        layer[ri].split("").forEach(function (ch, ci) { if (ch !== ".") rows[ri][ci] = ch; });
      });
    }
    if (LOOK.pelo === "ondulado") overlay(PELO_ONDULADO);
    if (LOOK.pelo === "corto") overlay(PELO_CORTO);
    if (LOOK.pelo === "rapado") overlay(PELO_RAPADO);
    overlay(CEJAS);
    overlay(LOOK.sonrisa === "grande" ? SONRISA_GRANDE : SONRISA_NORMAL);
    if (LOOK.gafas) overlay(GAFAS);
    if (LOOK.auriculares) overlay(AURICULARES);
    if (tier >= 2) overlay(LAPTOP);
    if (tier >= 3) overlay(GEMA);
    if (tier >= 4) overlay(CORBATA);
    if (tier >= 5) overlay(ORBE);
    if (tier >= 6) { overlay(CORONA); overlay(BRILLOS); }
    return rows;
  }
  function avatarSVG(nivel) {
    var tier = tierVisual(nivel), pal = paleta(tier), rows = componer(tier), rects = [];
    rows.forEach(function (row, y) {
      row.forEach(function (ch, x) {
        if (ch !== "." && pal[ch]) rects.push('<rect class="px-' + ch + '" x="' + x + '" y="' + y + '" width="1" height="1" fill="' + pal[ch] + '"/>');
      });
    });
    return '<svg class="avatar-svg tier-' + tier + '" viewBox="0 0 16 24" shape-rendering="crispEdges" role="img" aria-label="Personaje de ' + NOMBRE + ', nivel ' + nivel + '">' + rects.join("") + "</svg>";
  }

  // =====================================================================
  // 6. ESTADO
  // =====================================================================
  function cargarRetos() { try { return JSON.parse(localStorage.getItem(KEY_RETOS) || "{}"); } catch (e) { return {}; } }
  function guardarRetos() { try { localStorage.setItem(KEY_RETOS, JSON.stringify(retos)); } catch (e) {} }

  function calcular(vistos) {
    var s = { vistos: vistos, todos: todos };
    s.vistosArr = todos.filter(function (v) { return vistos[v.id]; });
    s.ruta = todos.filter(function (v) { return v.ruta; });
    s.porModulo = {};
    DATA.modulos.forEach(function (m) { s.porModulo[m.id] = m.videos.every(function (v) { return vistos[v.id]; }); });
    s.competencias = COMPETENCIAS.map(function (c) {
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
      .concat(s.extras.map(function (e) { return { id: "extra:" + e.def.id, nombre: e.def.nombre, icono: e.def.icono, desc: e.def.desc, ok: e.ok }; }));
    s.siguiente = s.competencias.filter(function (c) { return !c.ok; })[0] || null;
    return s;
  }

  function moduloDe(id) { return DATA.modulos.filter(function (m) { return m.id === id; })[0]; }
  function compDe(id) { return COMPETENCIAS.filter(function (c) { return c.id === id; })[0]; }
  function esc(t) { return String(t).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function setText(id, v) { var el = document.getElementById(id); if (el) el.textContent = v; }

  // =====================================================================
  // 7. RENDER
  // =====================================================================
  function renderTarjeta(s) {
    var av = document.getElementById("avatar");
    if (av) av.innerHTML = avatarSVG(s.nivel);
    var niv = NIVELES[s.nivel];
    setText("nivel-num", s.nivel);
    setText("nivel-titulo", niv.titulo);
    setText("nivel-frase", niv.frase);
    setText("p-pts", s.puntos.toLocaleString("es-CO"));
    setText("p-comp", s.nivel + " de " + COMPETENCIAS.length);
    var sig = document.getElementById("nivel-siguiente");
    if (sig) {
      if (s.siguiente) {
        var m = moduloDe(s.siguiente.def.modulos[0]);
        sig.innerHTML = "Siguiente competencia: <b>" + esc(s.siguiente.def.logro) + "</b> · completa <a href=\"#m-" + m.id + "\">Módulo " + m.num + "</a>";
      } else {
        sig.innerHTML = "<b>Curso completo.</b> Tu certificado está en la sección Tu nivel.";
      }
    }
  }

  function renderPerfil(s) {
    var cont = document.getElementById("perfil-contenido");
    if (!cont) return;
    var ladder = '<ol class="ladder">' + NIVELES.map(function (n) {
      var cls = n.n < s.nivel ? "done" : n.n === s.nivel ? "current" : "todo";
      return '<li class="' + cls + '"><span class="n">' + n.n + '</span><span class="t">' + esc(n.titulo) + "</span></li>";
    }).join("") + "</ol>";

    var comps = '<div class="comp-grid">' + s.competencias.map(function (c) {
      var mods = c.def.modulos.map(moduloDe);
      var req = mods.map(function (m) { return '<a href="#m-' + m.id + '">Módulo ' + m.num + "</a>"; }).join(c.def.cualquiera ? " o " : " y ");
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

    var cert = s.nivel >= COMPETENCIAS.length
      ? '<div class="cert-cta"><b>🎓 Recompensa final desbloqueada:</b> tu certificado de Director de IA. <button type="button" class="btn primary" data-certificado>Ver e imprimir certificado</button></div>'
      : '<p class="hint">🔒 Recompensa final: certificado de Director de IA, al completar las 10 competencias.</p>';

    cont.innerHTML =
      '<div class="perfil-block"><h3>Escalera de niveles</h3><p class="hint">Subes un nivel por cada competencia completada, en el orden que quieras. Nivel actual: <b>' + s.nivel + " · " + esc(NIVELES[s.nivel].titulo) + "</b>.</p>" + ladder + "</div>" +
      '<div class="perfil-block"><h3>Capacidades, retos y recompensas</h3><p class="hint">Lo que ya deberías poder hacer con lo aprendido. Cada competencia trae un reto práctico (para comprobarlo de verdad) y una recompensa: una plantilla o herramienta lista para usar. ' + s.nivel + " de " + COMPETENCIAS.length + " desbloqueadas · " + s.retosOk + " retos hechos.</p>" + comps + cert + "</div>" +
      '<div class="perfil-block"><h3>Logros</h3><p class="hint">' + s.logros.filter(function (l) { return l.ok; }).length + " de " + s.logros.length + " · Cada video vale " + PTS_VIDEO + " pts + " + PTS_MIN + " por minuto; cada competencia " + PTS_COMPETENCIA + "; cada reto " + PTS_RETO + "; cada logro extra " + PTS_EXTRA + ".</p>" + logros + "</div>";
  }

  function renderChips(s) {
    document.querySelectorAll("[data-chip]").forEach(function (el) {
      var id = el.getAttribute("data-chip");
      var c = s.competencias.filter(function (x) { return x.def.modulos.indexOf(id) !== -1; })[0];
      if (!c) return;
      el.className = "comp-chip " + (c.ok ? "ok" : "locked");
      el.innerHTML = '<span aria-hidden="true">' + (c.ok ? c.def.icono : "🔒") + "</span> " +
        (c.ok ? "Logro desbloqueado: " : "Al completar: ") + "<b>" + esc(c.def.logro) + "</b>" +
        (c.ok ? "" : " · recompensa: " + esc(c.def.recompensa.nombre));
    });
  }

  // =====================================================================
  // 8. CELEBRACIONES: toast por logro, modal + confeti por subida de nivel
  // =====================================================================
  function celebrar(s) {
    var prev = null;
    try { prev = JSON.parse(localStorage.getItem(KEY_CELEBRADOS) || "null"); } catch (e) { prev = null; }
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
    try { localStorage.setItem(KEY_CELEBRADOS, JSON.stringify(ahora)); } catch (e) {}
  }

  function modalNivel(s, nuevosComp) {
    var dlg = document.getElementById("dlg-nivel");
    if (!dlg || typeof dlg.showModal !== "function") { if (notify) notify("⬆️ Subiste a nivel " + s.nivel + ": " + NIVELES[s.nivel].titulo); return; }
    var niv = NIVELES[s.nivel];
    var comp = nuevosComp.length ? compDe(nuevosComp[nuevosComp.length - 1]) : null;
    dlg.innerHTML =
      '<div class="dlg-body">' +
        '<div class="dlg-avatar">' + avatarSVG(s.nivel) + "</div>" +
        '<p class="label">Subiste de nivel</p>' +
        '<h3>Nivel ' + s.nivel + " · " + esc(niv.titulo) + "</h3>" +
        '<p class="frase">' + esc(niv.frase) + "</p>" +
        (comp ? '<div class="dlg-unlock"><p><b>' + comp.icono + " Nueva capacidad:</b> " + esc(comp.capacidad) + "</p>" +
          '<p><b>🎁 Recompensa desbloqueada:</b> ' + esc(comp.recompensa.nombre) + "</p></div>" : "") +
        '<div class="dlg-actions">' +
          (comp ? '<button type="button" class="btn primary" data-recompensa="' + comp.id + '" data-cierra>Ver recompensa</button>' : "") +
          (s.nivel >= COMPETENCIAS.length ? '<button type="button" class="btn primary" data-certificado data-cierra>Ver certificado</button>' : "") +
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
        '<p class="cert-eyebrow">Proyecto Fernando · Ruta de aprendizaje en IA para un analista de crédito</p>' +
        "<h2>Certificado</h2>" +
        '<p class="cert-text">Se certifica que</p>' +
        '<p class="cert-name">' + esc(NOMBRE) + "</p>" +
        '<p class="cert-text">completó las 10 competencias del curso y alcanzó el nivel</p>' +
        '<p class="cert-level">10 · Director de IA</p>' +
        '<p class="cert-caps">' + COMPETENCIAS.map(function (c) { return c.icono + " " + esc(c.logro); }).join(" · ") + "</p>" +
        '<p class="cert-meta">' + s.puntos.toLocaleString("es-CO") + " puntos · " + s.retosOk + " de " + COMPETENCIAS.length + " retos prácticos · " + fecha + "</p>" +
        '<p class="cert-foot">Curso curado y construido por David con Claude Code. Los conocimientos los puso Fernando.</p>' +
      "</div>" +
      '<div class="dlg-actions no-print"><button type="button" class="btn primary" data-imprimir>Imprimir o guardar como PDF</button><button type="button" class="btn" data-cierra-cert>Cerrar</button></div>';
    el.hidden = false;
    document.body.classList.add("cert-open");
  }

  // Confeti: partículas en canvas, ~1,6 s. Se omite si el usuario prefiere menos movimiento.
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
  // 9. EVENTOS (retos, recompensas, certificado, cierre de modales)
  // =====================================================================
  function bind() {
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
      // clic fuera del contenido de un dialog lo cierra
      if (t.tagName === "DIALOG" && t.open) t.close();
    });
  }

  // =====================================================================
  // 10. API
  // =====================================================================
  window.GAMI = {
    init: function (opts) {
      DATA = opts.data; notify = opts.notify; todos = []; retos = cargarRetos();
      DATA.modulos.forEach(function (m) { m.videos.forEach(function (v) { todos.push(v); }); });
      bind();
    },
    actualizar: function (vistos) {
      ultimoVistos = vistos;
      var s = calcular(vistos);
      renderTarjeta(s); renderPerfil(s); renderChips(s); celebrar(s);
      return s;
    },
    reiniciar: function () { retos = {}; guardarRetos(); try { localStorage.removeItem(KEY_CELEBRADOS); } catch (e) {} },
    exportar: function () { var c = null; try { c = JSON.parse(localStorage.getItem(KEY_CELEBRADOS) || "null"); } catch (e) {} return { retos: retos, celebrados: c }; },
    importar: function (obj) {
      retos = (obj && obj.retos) || {}; guardarRetos();
      try { if (obj && obj.celebrados) localStorage.setItem(KEY_CELEBRADOS, JSON.stringify(obj.celebrados)); else localStorage.removeItem(KEY_CELEBRADOS); } catch (e) {}
    },
    markdown: function (vistos) {
      var s = calcular(vistos);
      var out = ["**Nivel " + s.nivel + " · " + NIVELES[s.nivel].titulo + "** · " + s.puntos + " pts · " + s.nivel + "/" + COMPETENCIAS.length + " competencias · " + s.retosOk + " retos", ""];
      out.push("### Capacidades");
      s.competencias.forEach(function (c) { out.push("- [" + (c.ok ? "x" : " ") + "] " + c.def.icono + " " + c.def.logro + " — " + c.def.capacidad + (c.reto ? " *(reto hecho)*" : "")); });
      out.push("", "### Logros");
      s.logros.forEach(function (l) { out.push("- [" + (l.ok ? "x" : " ") + "] " + l.icono + " " + l.nombre + " — " + l.desc); });
      return out.join("\n");
    },
    competencias: COMPETENCIAS, niveles: NIVELES, look: LOOK
  };
})();
