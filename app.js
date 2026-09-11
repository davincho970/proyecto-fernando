// Proyecto Fernando — lógica de la página (sin dependencias).
// Perfiles (perfiles.js) + catálogo (videos.js) + gamificación (gamificacion.js).
(function () {
  "use strict";

  var CATALOGO = window.CURSO, PERFILES = window.PERFILES;
  var KEY_PERFIL = "proyecto-fernando:perfil";
  var KEY_THEME = "proyecto-fernando:theme";
  var NIVEL = { basico: "Básico", intermedio: "Intermedio", avanzado: "Avanzado" };

  var perfil = null, DATA = null, vistos = {}, todos = [];
  var state = { lang: "all", nivel: "all", q: "", soloRuta: false, ocultarVistos: false };

  // ---------- Persistencia (por perfil) ----------
  function keyVistos() { return "proyecto-fernando:" + perfil.id + ":vistos"; }
  function cargarVistos() {
    try {
      var v = localStorage.getItem(keyVistos());
      // migración: el progreso anterior a los perfiles era de Fernando
      if (v === null && perfil.id === "fernando") {
        var viejo = localStorage.getItem("proyecto-fernando:vistos");
        if (viejo) {
          localStorage.setItem(keyVistos(), viejo); localStorage.removeItem("proyecto-fernando:vistos");
          ["retos", "celebrados"].forEach(function (k) {
            var x = localStorage.getItem("proyecto-fernando:" + k);
            if (x) { localStorage.setItem("proyecto-fernando:fernando:" + k, x); localStorage.removeItem("proyecto-fernando:" + k); }
          });
          v = viejo;
        }
      }
      return JSON.parse(v || "{}");
    } catch (e) { return {}; }
  }
  function guardarVistos() { try { localStorage.setItem(keyVistos(), JSON.stringify(vistos)); } catch (e) {} }

  // ---------- Tema ----------
  function aplicarTema(t) {
    var root = document.documentElement;
    if (t === "dark" || t === "light") root.setAttribute("data-theme", t); else root.removeAttribute("data-theme");
    try { t ? localStorage.setItem(KEY_THEME, t) : localStorage.removeItem(KEY_THEME); } catch (e) {}
  }
  function temaActual() {
    var t = document.documentElement.getAttribute("data-theme");
    if (t) return t;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  try { var saved = localStorage.getItem(KEY_THEME); if (saved) aplicarTema(saved); } catch (e) {}

  // ---------- Utilidades ----------
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function dur(min) {
    if (min < 60) return min + " min";
    var h = Math.floor(min / 60), m = min % 60;
    return h + " h" + (m ? " " + m + " min" : "");
  }
  function normalizar(s) {
    return String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  }
  function toast(msg) {
    var el = document.getElementById("toast");
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toast._t);
    toast._t = setTimeout(function () { el.classList.remove("show"); }, 2200);
  }
  function numModulo(m) { return DATA.modulos.indexOf(m) + 1; }

  // ---------- Perfil ----------
  function construirDATA(p) {
    var mods = p.modulos.map(function (id) {
      return CATALOGO.modulos.filter(function (m) { return m.id === id; })[0];
    }).filter(Boolean);
    return { titulo: p.titulo, modulos: mods };
  }

  function iniciarPerfil(id) {
    perfil = PERFILES[id];
    try { localStorage.setItem(KEY_PERFIL, id); } catch (e) {}
    DATA = construirDATA(perfil);
    todos = [];
    DATA.modulos.forEach(function (m) { m.videos.forEach(function (v) { v.modulo = m; todos.push(v); }); });
    vistos = cargarVistos();
    document.body.setAttribute("data-perfil", id);
    // Textos del hero
    document.getElementById("hero-titulo").textContent = perfil.titulo;
    document.getElementById("hero-lede-perfil").textContent = perfil.lede;
    document.getElementById("perfil-nombre").textContent = perfil.nombre;
    document.getElementById("perfil-rol").textContent = perfil.rol;
    document.getElementById("p-comp").textContent = "0 de " + perfil.competencias.length;
    document.title = "Proyecto Fernando · " + perfil.nombre;
    if (window.GAMI) GAMI.init({ data: DATA, perfil: perfil, notify: toast });
    renderTodo();
    document.getElementById("bienvenida").hidden = true;
    document.body.classList.remove("bienvenida-abierta");
  }

  function mostrarBienvenida() {
    var cont = document.getElementById("bienvenida-opciones");
    cont.innerHTML = Object.keys(PERFILES).map(function (id) {
      var p = PERFILES[id];
      return '<button type="button" class="quien" data-perfil="' + id + '">' +
        '<span class="quien-avatar">' + (window.GAMI ? GAMI.avatar(0, p) : "") + "</span>" +
        '<span class="quien-nombre">' + esc(p.nombre) + "</span>" +
        '<span class="quien-rol">' + esc(p.rol) + "</span>" +
        "</button>";
    }).join("");
    document.getElementById("bienvenida").hidden = false;
    document.body.classList.add("bienvenida-abierta");
  }

  // ---------- Dedicatoria (se muestra al elegir un perfil que la tenga) ----------
  var petalosActivo = false;
  function mostrarDedicatoria(p) {
    var d = p.dedicatoria, el = document.getElementById("dedicatoria");
    if (!d || !el) return;
    document.getElementById("dedicatoria-avatar").innerHTML = window.GAMI ? GAMI.avatar(0, p) : "";
    document.getElementById("dedicatoria-titulo").textContent = d.titulo;
    document.getElementById("dedicatoria-texto").textContent = d.texto;
    document.getElementById("dedicatoria-firma").textContent = d.firma || "";
    el.hidden = false;
    document.body.classList.add("bienvenida-abierta");
    petalos();
  }
  function cerrarDedicatoria() {
    var el = document.getElementById("dedicatoria");
    if (!el) return;
    el.hidden = true; petalosActivo = false;
    document.body.classList.remove("bienvenida-abierta");
    window.scrollTo({ top: 0, behavior: "instant" });
  }
  // Pétalos de rosa que caen meciéndose y estrellas que titilan, en el mismo canvas del confeti.
  function petalos() {
    var cv = document.getElementById("confetti");
    if (!cv || (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches)) return;
    var ctx = cv.getContext("2d"), W = cv.width = window.innerWidth, H = cv.height = window.innerHeight;
    var rosas = ["#e8536f", "#f28ca3", "#ffb3c1", "#d93b5c", "#fbd1da"], parts = [];
    for (var i = 0; i < 70; i++) parts.push({ tipo: "p", x: Math.random() * W, y: -Math.random() * H, vy: 1 + Math.random() * 1.6, sway: Math.random() * Math.PI * 2, sv: .8 + Math.random() * 1.2, amp: 14 + Math.random() * 22, w: 9 + Math.random() * 9, h: 6 + Math.random() * 5, r: Math.random() * Math.PI, vr: (Math.random() - .5) * .04, c: rosas[i % rosas.length] });
    for (var j = 0; j < 45; j++) parts.push({ tipo: "s", x: Math.random() * W, y: Math.random() * H, s: 3 + Math.random() * 5, f: Math.random() * Math.PI * 2, fv: 1.5 + Math.random() * 2.5, vy: .15 + Math.random() * .3 });
    petalosActivo = true;
    cv.classList.add("on");
    var t0 = null;
    function estrella(x, y, s, a) {
      ctx.save(); ctx.translate(x, y); ctx.globalAlpha = a; ctx.fillStyle = "#ffd75e";
      ctx.beginPath();
      for (var k = 0; k < 8; k++) { var rad = k % 2 ? s * .38 : s, ang = k * Math.PI / 4; ctx.lineTo(Math.cos(ang) * rad, Math.sin(ang) * rad); }
      ctx.closePath(); ctx.fill(); ctx.restore();
    }
    function frame(t) {
      if (!petalosActivo) { ctx.clearRect(0, 0, W, H); cv.classList.remove("on"); return; }
      if (!t0) t0 = t;
      var dt = (t - t0) / 1000;
      ctx.clearRect(0, 0, W, H);
      parts.forEach(function (p) {
        if (p.tipo === "p") {
          p.y += p.vy; p.sway += p.sv * .02; p.r += p.vr;
          var x = p.x + Math.sin(p.sway) * p.amp;
          if (p.y > H + 20) { p.y = -20; p.x = Math.random() * W; }
          ctx.save(); ctx.translate(x, p.y); ctx.rotate(p.r + Math.sin(p.sway) * .4); ctx.fillStyle = p.c; ctx.globalAlpha = .9;
          ctx.beginPath(); ctx.ellipse(0, 0, p.w / 2, p.h / 2, 0, 0, Math.PI * 2); ctx.fill(); ctx.restore();
        } else {
          p.y += p.vy; if (p.y > H + 10) p.y = -10;
          estrella(p.x, p.y, p.s, .35 + .65 * Math.abs(Math.sin(p.f + dt * p.fv)));
        }
      });
      if (dt < 25) requestAnimationFrame(frame); else { petalosActivo = false; ctx.clearRect(0, 0, W, H); cv.classList.remove("on"); }
    }
    requestAnimationFrame(frame);
  }

  // ---------- Pestañas ----------
  function activarTab(nombre, sinScroll) {
    document.querySelectorAll("[data-tab]").forEach(function (b) { b.setAttribute("aria-selected", b.getAttribute("data-tab") === nombre ? "true" : "false"); });
    document.querySelectorAll("[data-panel]").forEach(function (p) { p.hidden = p.getAttribute("data-panel") !== nombre; });
    document.querySelectorAll("[data-only]").forEach(function (el) { el.hidden = el.getAttribute("data-only") !== nombre; });
    if (!sinScroll) {
      var tabs = document.getElementById("tabs");
      if (tabs && tabs.getBoundingClientRect().top < 0) tabs.scrollIntoView({ behavior: "instant", block: "start" });
    }
  }
  function irA(hash) {
    if (!hash || hash === "#") return false;
    var el = document.querySelector(hash);
    if (!el) return false;
    var panel = el.closest("[data-panel]");
    if (panel) activarTab(panel.getAttribute("data-panel"), true);
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    return true;
  }

  // ---------- Render ----------
  function cardHTML(v) {
    var visto = !!vistos[v.id];
    return (
      '<article class="card' + (visto ? " visto" : "") + '" data-id="' + v.id + '">' +
        '<div class="thumb" role="button" tabindex="0" aria-label="Reproducir: ' + esc(v.titulo) + '">' +
          '<img src="https://i.ytimg.com/vi/' + v.id + '/hqdefault.jpg" alt="" loading="lazy" width="480" height="360">' +
          '<span class="play" aria-hidden="true">&#9654;</span>' +
          '<span class="dur">' + dur(v.min) + "</span>" +
        "</div>" +
        '<div class="body">' +
          '<div class="meta">' +
            '<span class="badge ' + v.lang + '">' + (v.lang === "es" ? "Español" : "English") + "</span>" +
            '<span class="badge">' + NIVEL[v.nivel] + "</span>" +
            (v.ruta ? '<span class="badge ruta">&#9733; Ruta</span>' : "") +
          "</div>" +
          "<h3>" + esc(v.titulo) + "</h3>" +
          '<p class="canal">' + esc(v.canal) + " · " + v.anio + "</p>" +
          '<p class="porque">' + esc(v.porque) + "</p>" +
          '<div class="actions">' +
            '<label class="check"><input type="checkbox"' + (visto ? " checked" : "") + "> Visto</label>" +
            '<a href="https://www.youtube.com/watch?v=' + v.id + '" target="_blank" rel="noopener">Abrir en YouTube &#8599;</a>' +
          "</div>" +
        "</div>" +
      "</article>"
    );
  }

  function moduloHTML(m) {
    var aplicado = (m.aplicado && m.aplicado[perfil.id]) || m.credito || "";
    return (
      '<section class="modulo" id="m-' + m.id + '" data-id="' + m.id + '">' +
        "<header>" +
          "<div>" +
            '<p class="num">Módulo ' + numModulo(m) + ' <span class="count" data-count></span></p>' +
            "<h2>" + esc(m.titulo) + "</h2>" +
            '<p class="intro">' + esc(m.intro) + "</p>" +
          "</div>" +
          "<div>" +
            '<p class="credito"><b>' + esc(perfil.etiquetaAplicado) + "</b>" + esc(aplicado) + "</p>" +
            '<p class="comp-chip" data-chip="' + m.id + '"></p>' +
          "</div>" +
        "</header>" +
        '<div class="grid">' + m.videos.map(cardHTML).join("") + "</div>" +
      "</section>"
    );
  }

  function renderTodo() {
    document.getElementById("curso").innerHTML = DATA.modulos.map(moduloHTML).join("");
    document.getElementById("modnav").innerHTML = DATA.modulos.map(function (m) {
      return '<a href="#m-' + m.id + '" data-id="' + m.id + '"><span class="n">' + numModulo(m) + "</span>" + esc(m.titulo.split(":")[0]) + "</a>";
    }).join("");
    var ruta = todos.filter(function (v) { return v.ruta; });
    var suma = function (arr) { return arr.reduce(function (a, v) { return a + v.min; }, 0); };
    document.getElementById("total-videos").textContent = todos.length;
    document.getElementById("total-videos-2").textContent = todos.length;
    document.getElementById("total-modulos").textContent = DATA.modulos.length;
    document.getElementById("total-ruta").textContent = ruta.length;
    document.getElementById("total-min").textContent = dur(suma(todos));
    document.getElementById("ruta-min").textContent = dur(suma(ruta));
    aplicarFiltros();
    actualizarProgreso();
    if (window.GAMI) GAMI.actualizar(vistos);
  }

  // ---------- Filtros ----------
  function pasaFiltro(v) {
    if (state.lang !== "all" && v.lang !== state.lang) return false;
    if (state.nivel !== "all" && v.nivel !== state.nivel) return false;
    if (state.soloRuta && !v.ruta) return false;
    if (state.ocultarVistos && vistos[v.id]) return false;
    if (state.q) {
      var hay = normalizar(v.titulo + " " + v.canal + " " + v.porque + " " + v.modulo.titulo);
      if (hay.indexOf(state.q) === -1) return false;
    }
    return true;
  }

  function contador(m) {
    var vistosMod = m.videos.filter(function (v) { return vistos[v.id]; }).length;
    var min = m.videos.reduce(function (a, v) { return a + v.min; }, 0);
    return vistosMod + "/" + m.videos.length + " vistos · " + dur(min);
  }

  function aplicarFiltros() {
    var visibles = 0;
    DATA.modulos.forEach(function (m) {
      var sec = document.getElementById("m-" + m.id);
      var n = 0;
      m.videos.forEach(function (v) {
        var ok = pasaFiltro(v);
        sec.querySelector('.card[data-id="' + v.id + '"]').classList.toggle("hidden", !ok);
        if (ok) n++;
      });
      visibles += n;
      sec.classList.toggle("empty", n === 0);
      sec.querySelector("[data-count]").textContent = contador(m);
    });
    document.getElementById("empty-state").classList.toggle("show", visibles === 0);
  }

  // ---------- Progreso ----------
  function actualizarProgreso() {
    var n = todos.filter(function (v) { return vistos[v.id]; }).length;
    var ruta = todos.filter(function (v) { return v.ruta; });
    var nRuta = ruta.filter(function (v) { return vistos[v.id]; }).length;
    var minVistos = todos.reduce(function (a, v) { return a + (vistos[v.id] ? v.min : 0); }, 0);
    document.getElementById("p-num").textContent = n;
    document.getElementById("p-bar").style.transform = "scaleX(" + (todos.length ? n / todos.length : 0) + ")";
    document.getElementById("p-ruta").textContent = nRuta + " de " + ruta.length;
    document.getElementById("p-min").textContent = dur(minVistos);
    DATA.modulos.forEach(function (m) {
      var done = m.videos.every(function (v) { return vistos[v.id]; });
      var a = document.querySelector('.modnav a[data-id="' + m.id + '"]');
      if (a) a.classList.toggle("done", done);
    });
  }

  function marcar(id, valor) {
    if (valor) vistos[id] = Date.now(); else delete vistos[id];
    guardarVistos();
    var card = document.querySelector('.card[data-id="' + id + '"]');
    if (card) {
      card.classList.toggle("visto", !!valor);
      var cb = card.querySelector('input[type="checkbox"]');
      if (cb) cb.checked = !!valor;
    }
    DATA.modulos.forEach(function (m) {
      document.getElementById("m-" + m.id).querySelector("[data-count]").textContent = contador(m);
    });
    actualizarProgreso();
    if (state.ocultarVistos) aplicarFiltros();
    if (window.GAMI) GAMI.actualizar(vistos);
  }

  // ---------- Reproductor ----------
  function reproducir(thumb) {
    var id = thumb.closest(".card").getAttribute("data-id");
    document.querySelectorAll(".thumb iframe").forEach(function (f) {
      var t = f.parentNode, vid = t.closest(".card").getAttribute("data-id");
      var v = todos.filter(function (x) { return x.id === vid; })[0];
      t.innerHTML = '<img src="https://i.ytimg.com/vi/' + vid + '/hqdefault.jpg" alt="" loading="lazy" width="480" height="360">' +
        '<span class="play" aria-hidden="true">&#9654;</span><span class="dur">' + dur(v.min) + "</span>";
    });
    thumb.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0" title="Reproductor de YouTube" ' +
      'allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>';
  }

  // ---------- Exportar a Markdown (Obsidian) ----------
  function markdown() {
    var out = ["# " + DATA.titulo + " — " + perfil.nombre, "", "Progreso: " + todos.filter(function (v) { return vistos[v.id]; }).length + " de " + todos.length + " videos vistos.", ""];
    if (window.GAMI) out.push(GAMI.markdown(vistos), "");
    DATA.modulos.forEach(function (m) {
      var aplicado = (m.aplicado && m.aplicado[perfil.id]) || "";
      out.push("## " + numModulo(m) + ". " + m.titulo, "", m.intro, "", "> **" + perfil.etiquetaAplicado + ":** " + aplicado, "");
      m.videos.forEach(function (v) {
        out.push("- [" + (vistos[v.id] ? "x" : " ") + "] " + (v.ruta ? "★ " : "") + "[" + v.titulo + "](https://www.youtube.com/watch?v=" + v.id + ") — " +
          v.canal + " · " + (v.lang === "es" ? "ES" : "EN") + " · " + dur(v.min) + " · " + NIVEL[v.nivel] + "\n  - " + v.porque);
      });
      out.push("");
    });
    return out.join("\n");
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

  // ---------- Eventos ----------
  function bind() {
    var curso = document.getElementById("curso");
    curso.addEventListener("click", function (e) {
      var thumb = e.target.closest(".thumb");
      if (thumb && !thumb.querySelector("iframe")) { reproducir(thumb); return; }
    });
    curso.addEventListener("keydown", function (e) {
      var thumb = e.target.closest(".thumb");
      if (thumb && (e.key === "Enter" || e.key === " ") && !thumb.querySelector("iframe")) { e.preventDefault(); reproducir(thumb); }
    });
    curso.addEventListener("change", function (e) {
      if (e.target.matches('.check input[type="checkbox"]')) {
        marcar(e.target.closest(".card").getAttribute("data-id"), e.target.checked);
      }
    });

    // Pestañas y navegación interna
    document.querySelectorAll("[data-tab]").forEach(function (b) {
      b.addEventListener("click", function () { activarTab(b.getAttribute("data-tab")); });
    });
    document.addEventListener("click", function (e) {
      var a = e.target.closest('a[href^="#"]');
      if (!a) return;
      var hash = a.getAttribute("href");
      if (hash.length > 1 && irA(hash)) { e.preventDefault(); history.replaceState(null, "", hash); }
    });

    // Bienvenida / cambio de perfil
    document.getElementById("bienvenida-opciones").addEventListener("click", function (e) {
      var b = e.target.closest("[data-perfil]");
      if (b) {
        iniciarPerfil(b.getAttribute("data-perfil")); activarTab("curso", true); window.scrollTo({ top: 0, behavior: "instant" });
        if (perfil.dedicatoria) mostrarDedicatoria(perfil);
      }
    });
    document.getElementById("btn-cambiar-perfil").addEventListener("click", mostrarBienvenida);
    document.getElementById("dedicatoria-ok").addEventListener("click", cerrarDedicatoria);

    document.querySelectorAll("#seg-lang button").forEach(function (b) {
      b.addEventListener("click", function () {
        document.querySelectorAll("#seg-lang button").forEach(function (x) { x.setAttribute("aria-pressed", "false"); });
        b.setAttribute("aria-pressed", "true");
        state.lang = b.getAttribute("data-lang");
        aplicarFiltros();
      });
    });
    document.getElementById("sel-nivel").addEventListener("change", function (e) { state.nivel = e.target.value; aplicarFiltros(); });
    document.getElementById("q").addEventListener("input", function (e) { state.q = normalizar(e.target.value.trim()); aplicarFiltros(); });
    document.getElementById("chk-ruta").addEventListener("change", function (e) { state.soloRuta = e.target.checked; aplicarFiltros(); });
    document.getElementById("chk-ocultar").addEventListener("change", function (e) { state.ocultarVistos = e.target.checked; aplicarFiltros(); });

    document.getElementById("btn-theme").addEventListener("click", function () {
      aplicarTema(temaActual() === "dark" ? "light" : "dark");
    });

    document.getElementById("btn-md").addEventListener("click", function () {
      copiar(markdown()).then(function () { toast("Copiado. Pégalo en una nota nueva de Obsidian."); },
                              function () { toast("No se pudo copiar automáticamente."); });
    });
    document.getElementById("btn-export").addEventListener("click", function () {
      var extra = window.GAMI ? GAMI.exportar() : {};
      var codigo = btoa(unescape(encodeURIComponent(JSON.stringify({ p: perfil.id, v: vistos, r: extra.retos || {}, c: extra.celebrados || null }))));
      copiar("PF2:" + codigo).then(function () { toast("Código de progreso copiado. Guárdalo en una nota."); },
                                  function () { prompt("Copia este código:", "PF2:" + codigo); });
    });
    document.getElementById("btn-import").addEventListener("click", function () {
      var codigo = prompt("Pega tu código de progreso (empieza por PF1: o PF2:):");
      if (!codigo) return;
      try {
        var obj = JSON.parse(decodeURIComponent(escape(atob(codigo.trim().replace(/^PF[12]:/, "")))));
        if (obj.p && PERFILES[obj.p] && obj.p !== perfil.id) iniciarPerfil(obj.p);
        vistos = obj.v || {}; guardarVistos();
        if (window.GAMI) GAMI.importar({ retos: obj.r, celebrados: obj.c });
        renderTodo(); toast("Progreso restaurado.");
      } catch (e) { toast("Ese código no es válido."); }
    });
    document.getElementById("btn-reset").addEventListener("click", function () {
      if (!confirm("¿Borrar el progreso de " + perfil.nombre + " guardado en este navegador?")) return;
      vistos = {}; guardarVistos(); if (window.GAMI) GAMI.reiniciar(); renderTodo(); toast("Progreso reiniciado.");
    });
  }

  // ---------- Arranque ----------
  window.APP = { numModulo: numModulo, perfil: function () { return perfil; } };
  bind();
  var guardado = null;
  try { guardado = localStorage.getItem(KEY_PERFIL); } catch (e) {}
  if (guardado && PERFILES[guardado]) {
    iniciarPerfil(guardado);
    activarTab("curso", true);
    if (location.hash) setTimeout(function () { irA(location.hash); }, 50);
  } else {
    // sin perfil: se muestra la bienvenida sobre una página vacía pero con estructura
    activarTab("curso", true);
    mostrarBienvenida();
  }
})();
