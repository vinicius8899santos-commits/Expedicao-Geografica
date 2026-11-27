/* lupa.js — LUPA para pessoas com baixa visão.
 *
 * Um botão 🔍 fixo (ao lado do botão de acessibilidade, no canto superior) abre um painel.
 * "Ligar a lupa" mostra uma LENTE redonda: arraste com o dedo ou o mouse (ou use as setas do
 * teclado) e tudo que estiver embaixo dela aparece ampliado. O painel muda o aumento
 * (1,5× a 4×) e o tamanho da lente.
 *
 * Como funciona: a lente guarda uma CÓPIA da tela do jogo, ampliada e deslocada para mostrar
 * a parte que está sob a lente. A cópia é refeita sempre que a tela muda (refresh) e
 * reposicionada quando a lente ou a página se movem (pos). A lente não altera o jogo:
 * enquanto ela cobre uma região, os botões daquela região não recebem toque (mova a lente). */

var LUPA = (function () {
  var NIVEIS = [1.5, 2, 2.5, 3, 4];     // aumentos possíveis
  var TAMANHOS = [150, 200, 260];       // diâmetro da lente em pixels
  var ativa = false, x = 0, y = 0, clone = null;
  var botao, painel, lente, vista;

  var TXT = {
    pt: {
      btn: "Lupa para baixa visão", titulo: "Lupa", fechar: "Fechar",
      dica: "Ligue a lupa e arraste a lente com o dedo ou o mouse (ou use as setas do teclado) para ampliar o que estiver embaixo dela.",
      ligar: "Ligar a lupa", desligar: "Desligar a lupa", aumento: "Aumento da lupa", tamanho: "Tamanho da lente",
      mais: "Mais", menos: "Menos", tam: ["Pequena", "Média", "Grande"],
      lente: "Lupa. Arraste ou use as setas do teclado para mover."
    },
    en: {
      btn: "Magnifier for low vision", titulo: "Magnifier", fechar: "Close",
      dica: "Turn the magnifier on and drag the lens with your finger or mouse (or use the keyboard arrows) to enlarge what is under it.",
      ligar: "Turn magnifier on", desligar: "Turn magnifier off", aumento: "Magnification", tamanho: "Lens size",
      mais: "More", menos: "Less", tam: ["Small", "Medium", "Large"],
      lente: "Magnifier. Drag or use the keyboard arrows to move it."
    }
  };
  function L() { return TXT[LANG === "en" ? "en" : "pt"]; }
  function zoom() { return NIVEIS[CFG.lupaZ]; }
  function diametro() { return TAMANHOS[CFG.lupaT]; }
  function numero(n) { return String(n).replace(".", LANG === "en" ? "." : ","); }

  /* ---------------- a lente ---------------- */

  /** Mantém o centro da lente dentro da tela. */
  function limitar() {
    x = Math.max(0, Math.min(window.innerWidth, x));
    y = Math.max(0, Math.min(window.innerHeight, y));
  }

  /** Posiciona a lente e a cópia ampliada (rápido: só mexe em posição). */
  function pos() {
    if (!ativa || !clone) return;
    var r = $("app").getBoundingClientRect(), D = diametro(), Z = zoom();
    lente.style.width = lente.style.height = D + "px";
    lente.style.left = (x - D / 2) + "px";
    lente.style.top = (y - D / 2) + "px";
    // o ponto da tela que está no centro da lente vai para o centro da lente, ampliado
    clone.style.transform = "translate(" + (D / 2 - (x - r.left) * Z) + "px," + (D / 2 - (y - r.top) * Z) + "px) scale(" + Z + ")";
  }

  /** Refaz a cópia da tela (chamado quando a tela do jogo é redesenhada). */
  function refresh() {
    if (!ativa || !vista) return;
    var app = $("app"), r = app.getBoundingClientRect(), cs = window.getComputedStyle(app);
    var c = app.cloneNode(true);
    [].slice.call(c.querySelectorAll("[id]")).forEach(function (e) { e.removeAttribute("id"); });
    c.removeAttribute("id");
    c.removeAttribute("tabindex");
    c.setAttribute("aria-hidden", "true");
    c.setAttribute("inert", "");
    c.className = "lupa-app";
    c.style.cssText = "position:absolute;left:0;top:0;margin:0;max-width:none;transform-origin:0 0;" +
      "width:" + r.width + "px;padding:" + cs.padding + ";";
    // elementos "fixos" (loja, janelas, aviso) viram absolutos, na mesma posição em que aparecem na tela
    var reais = app.querySelectorAll(".fab,.ov,.aviso"), copias = c.querySelectorAll(".fab,.ov,.aviso");
    [].slice.call(reais).forEach(function (e, i) {
      var b = e.getBoundingClientRect(), k = copias[i];
      if (!k) return;
      k.style.cssText += ";position:absolute;margin:0;right:auto;bottom:auto;inset:auto;" +
        "left:" + (b.left - r.left) + "px;top:" + (b.top - r.top) + "px;width:" + b.width + "px;height:" + b.height + "px;";
      k.scrollTop = e.scrollTop;
    });
    [].slice.call(app.querySelectorAll("textarea")).forEach(function (t, i) {
      var k = c.querySelectorAll("textarea")[i]; if (k) k.value = t.value;
    });
    vista.innerHTML = "";
    vista.appendChild(c);
    clone = c;
    pos();
  }

  function criarLente() {
    lente = document.createElement("div");
    lente.className = "lupa-lente";
    lente.tabIndex = 0;
    lente.setAttribute("role", "img");
    lente.setAttribute("aria-label", L().lente);
    vista = document.createElement("div");
    vista.className = "lupa-vista";
    lente.appendChild(vista);
    document.body.appendChild(lente);

    var ox = 0, oy = 0, arrastando = false;
    lente.addEventListener("pointerdown", function (e) {
      arrastando = true; ox = e.clientX - x; oy = e.clientY - y;
      try { lente.setPointerCapture(e.pointerId); } catch (er) { /* ignora */ }
      e.preventDefault();
    });
    lente.addEventListener("pointermove", function (e) {
      if (!arrastando) return;
      x = e.clientX - ox; y = e.clientY - oy;
      limitar(); pos();
    });
    ["pointerup", "pointercancel"].forEach(function (n) { lente.addEventListener(n, function () { arrastando = false; }); });
    lente.addEventListener("keydown", function (e) {      // teclado: setas movem a lente
      var d = { ArrowLeft: [-24, 0], ArrowRight: [24, 0], ArrowUp: [0, -24], ArrowDown: [0, 24] }[e.key];
      if (!d) return;
      e.preventDefault();
      x += d[0]; y += d[1];
      limitar(); pos();
    });
  }

  function ligar() {
    if (ativa) return;
    ativa = true;
    x = window.innerWidth / 2;
    y = window.innerHeight / 2;
    criarLente();
    refresh();
    botao.classList.add("ligada");
    rotular();
  }
  function desligar() {
    ativa = false;
    clone = null;
    if (lente && lente.parentNode) lente.parentNode.removeChild(lente);
    lente = vista = null;
    botao.classList.remove("ligada");
    rotular();
  }

  /* ---------------- painel ---------------- */

  function rotular() {
    if (!painel) return;
    var t = L();
    botao.setAttribute("aria-label", t.btn);
    botao.title = t.btn;
    $("lupa-t").textContent = "🔍 " + t.titulo;
    $("lupa-x").setAttribute("aria-label", t.fechar);
    $("lupa-d").textContent = t.dica;
    $("lupa-onoff").textContent = (ativa ? "⏹️ " + t.desligar : "🔍 " + t.ligar);
    $("lupa-al").textContent = t.aumento;
    $("lupa-tl").textContent = t.tamanho;
    $("lupa-az").setAttribute("aria-label", t.menos + " — " + t.aumento);
    $("lupa-ap").setAttribute("aria-label", t.mais + " — " + t.aumento);
    $("lupa-tz").setAttribute("aria-label", t.menos + " — " + t.tamanho);
    $("lupa-tp").setAttribute("aria-label", t.mais + " — " + t.tamanho);
    $("lupa-av").textContent = numero(zoom()) + "×";
    $("lupa-tv").textContent = t.tam[CFG.lupaT];
    $("lupa-az").disabled = CFG.lupaZ <= 0;
    $("lupa-ap").disabled = CFG.lupaZ >= NIVEIS.length - 1;
    $("lupa-tz").disabled = CFG.lupaT <= 0;
    $("lupa-tp").disabled = CFG.lupaT >= TAMANHOS.length - 1;
    if (lente) lente.setAttribute("aria-label", t.lente);
  }

  function abrir() {
    if (window.A11Y) A11Y.close();           // um painel de cada vez
    painel.hidden = false;
    botao.setAttribute("aria-expanded", "true");
    rotular();
    $("lupa-onoff").focus();
  }
  function fechar(devolveFoco) {
    painel.hidden = true;
    botao.setAttribute("aria-expanded", "false");
    if (devolveFoco !== false) botao.focus();
  }

  function montar() {
    botao = document.createElement("button");
    botao.type = "button";
    botao.id = "lupa-btn";
    botao.className = "lupa-btn";
    botao.setAttribute("aria-haspopup", "dialog");
    botao.setAttribute("aria-expanded", "false");
    botao.setAttribute("aria-controls", "lupa-panel");
    botao.innerHTML = '<img src="assets/icons/lupa.svg" alt="">';

    painel = document.createElement("div");
    painel.id = "lupa-panel";
    painel.className = "lupa-panel";
    painel.setAttribute("role", "dialog");
    painel.setAttribute("aria-labelledby", "lupa-t");
    painel.hidden = true;
    painel.innerHTML =
      '<button type="button" id="lupa-x" class="a11y-close back">✕</button>' +
      '<h2 id="lupa-t"></h2><p id="lupa-d" class="mute"></p>' +
      '<div class="a11y-ctrl"><button type="button" id="lupa-onoff" style="grid-column:1/-1"></button></div>' +
      '<div class="a11y-row"><span class="a11y-lab" id="lupa-al"></span>' +
      '<div class="lupa-passo"><button type="button" id="lupa-az">−</button><output id="lupa-av" aria-live="polite"></output><button type="button" id="lupa-ap">+</button></div></div>' +
      '<div class="a11y-row"><span class="a11y-lab" id="lupa-tl"></span>' +
      '<div class="lupa-passo"><button type="button" id="lupa-tz">−</button><output id="lupa-tv" aria-live="polite"></output><button type="button" id="lupa-tp">+</button></div></div>';
    document.body.appendChild(botao);
    document.body.appendChild(painel);
  }

  function ligarEventos() {
    botao.onclick = function () { if (painel.hidden) abrir(); else fechar(); };
    $("lupa-x").onclick = function () { fechar(); };
    $("lupa-onoff").onclick = function () {
      if (ativa) { desligar(); }
      else { ligar(); fechar(false); if (lente) lente.focus(); }
    };
    $("lupa-az").onclick = function () { CFG.lupaZ = Math.max(0, CFG.lupaZ - 1); savePrefs(); rotular(); pos(); };
    $("lupa-ap").onclick = function () { CFG.lupaZ = Math.min(NIVEIS.length - 1, CFG.lupaZ + 1); savePrefs(); rotular(); pos(); };
    $("lupa-tz").onclick = function () { CFG.lupaT = Math.max(0, CFG.lupaT - 1); savePrefs(); rotular(); pos(); };
    $("lupa-tp").onclick = function () { CFG.lupaT = Math.min(TAMANHOS.length - 1, CFG.lupaT + 1); savePrefs(); rotular(); pos(); };
    document.addEventListener("keydown", function (e) {       // Esc fecha o painel
      if (e.key === "Escape" && !painel.hidden) { e.stopImmediatePropagation(); e.preventDefault(); fechar(); }
    }, true);
    window.addEventListener("scroll", pos, { passive: true });  // a página rolou: a lente acompanha
    window.addEventListener("resize", function () { limitar(); refresh(); });
  }

  /* ---------------- ganchos usados pelo resto do jogo ---------------- */
  return {
    init: function () { montar(); ligarEventos(); rotular(); },
    refresh: refresh,                       // a tela do jogo foi redesenhada
    onLang: function () { rotular(); },     // o idioma mudou
    fecharPainel: function () { if (painel && !painel.hidden) fechar(false); },
    isOn: function () { return ativa; }
  };
})();
