# Proyecto Fernando

Página estática con un curso curado de videos de YouTube (español e inglés) sobre IA, agentes,
Codex, Claude Code y Obsidian, pensada para un analista de crédito.

Sin frameworks ni build: cuatro archivos. Tipografía: Aptos (viene con Windows 11 / Microsoft 365; en otros equipos cae a Segoe UI o la fuente del sistema).

Principio del catálogo: un video por concepto e idioma, ninguno mayor a 40 minutos.

| Archivo      | Qué es                                                                 |
| ------------ | ---------------------------------------------------------------------- |
| `index.html` | La página. Solo estructura; el contenido se genera desde `videos.js`. |
| `videos.js`  | El catálogo: módulos y videos. **Aquí se agregan o quitan videos.**    |
| `app.js`     | Filtros, reproductor embebido, progreso (localStorage) y exportación.  |
| `gamificacion.js` | Personaje pixel art, niveles por competencia, capacidades, logros y puntos. |
| `styles.css` | Estilos, modo claro/oscuro.                                            |

## Ver en local

Abre `index.html` en el navegador, o sirve la carpeta:

```
python -m http.server 8080
```

y entra a <http://localhost:8080>.

## Agregar un video

En `videos.js`, dentro del módulo que corresponda, copia un objeto y cambia sus campos:

```js
{ id: "XXXXXXXXXXX",        // lo que va después de watch?v= en la URL de YouTube
  titulo: "…", canal: "…",
  lang: "es",               // "es" | "en"
  min: 12,                  // duración en minutos
  nivel: "basico",          // "basico" | "intermedio" | "avanzado"
  ruta: false,              // true = parte de la ruta recomendada ★
  anio: 2026,
  porque: "Una línea: por qué vale la pena verlo." }
```

Comprueba que el video existe y permite embebido: abre `https://www.youtube.com/watch?v=XXXXXXXXXXX`.

## Publicar (GitHub → Vercel)

1. Crear un repositorio en GitHub y subir esta carpeta.
2. En Vercel: **Add New → Project**, importar el repo, framework preset **Other**, sin build command,
   output directory `.` (raíz). Deploy.
3. Cada `git push` a `main` vuelve a publicar.

## Gamificación

- **Nivel 0–10**: un nivel por cada competencia completada (módulo completo), en cualquier orden. Codex y Claude Code cuentan como una sola competencia.
- **Capacidades**: cada competencia describe lo que Fernando ya debería poder hacer (p. ej. Bases → bases de datos con relaciones entre archivos Markdown; MiroFish → simulación de escenarios de mercado).
- **Retos prácticos**: cada competencia trae un reto (opcional, +150 pts) para comprobar la capacidad en la vida real; la tarjeta muestra "verificado en la práctica".
- **Recompensas**: cada competencia desbloquea una plantilla o herramienta real (briefing de crédito, CLAUDE.md/AGENTS.md, plantilla de nota y archivo .base para Obsidian, checklist de verificación, plantilla de escenario MiroFish, script de ratios…). Al completar las 10: certificado imprimible.
- **Puntos**: 50 por video + 5 por minuto; 200 por competencia; 150 por reto; 100 por logro extra (Primer paso, Bilingüe, Maratón, Práctica constante, Doble agente, Ruta completa, Director de IA).
- **Celebraciones**: al subir de nivel, confeti + modal con la nueva capacidad y recompensa. Al desbloquear un logro, aviso.
- **Personaje**: sprite de 16×24 píxeles en `gamificacion.js`, dibujado a partir de la foto de Óscar Fernando (pelo oscuro con volumen, audífonos con micrófono, sonrisa, camiseta blanca). La apariencia se ajusta en el objeto `LOOK`. Evoluciona por tramos: camisa azul (nivel 1), laptop (3), gema de Obsidian (5), saco y corbata (7), orbe de simulación (9), corona (10). Tiene animaciones que se desbloquean por tramo: parpadeo y respiración siempre; pantalla del laptop, brillo de la gema, pulso del orbe y titilar de la corona según el nivel.
- **Progreso portable**: botones "Copiar código de progreso" / "Restaurar progreso" para moverlo entre navegadores.

## Notas

- El progreso ("Visto") se guarda en `localStorage` del navegador; no hay backend.
- Los videos se reproducen con `youtube-nocookie.com` y solo se carga el iframe al hacer clic.
- Catálogo verificado contra YouTube (título, canal, duración y embebido permitido) el 10 de septiembre de 2026.
