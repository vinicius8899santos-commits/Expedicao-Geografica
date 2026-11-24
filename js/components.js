/* components.js — peças de interface usadas por várias telas:
 * abas, pontuação, loja, apoios guardados, configurações, aviso de salvamento,
 * janela de confirmação e o controle de FOCO/TECLADO das janelas. */

var RETURN_TO = "";   // id do botão que abriu a janela (o foco volta para ele ao fechar)
var CD = 0;           // janela "Novo jogo?" aberta?

/* ---------------- abas, título e pontuação ---------------- */

/** Quantas conquistas existem desbloqueadas (5 fases + REI DA GEOGRAFIA). */
function nA() {
  return S.done.filter(Boolean).length + (S.done.every(Boolean) ? 1 : 0);
}

/** Abas "Jogo" e "Conquistas" no topo das telas de jogo. */
function tabsUI() {
  var ach = S.scr === "ach";
  return '<nav class="tabs" aria-label="' + tx("Navegação principal", "Main navigation") + '">' +
    '<button id="t1" class="' + (ach ? "" : "on") + '"' + (ach ? "" : ' aria-current="page"') + '>🎮 Jogo</button>' +
    '<button id="t2" class="' + (ach ? "on" : "") + '"' + (ach ? ' aria-current="page"' : "") + '>🏆 Conquistas (' + nA() + '/6)</button></nav>';
}

function bindTabs() {
  bind("t1", function () { if (S.scr === "ach") go(S.bk); });
  bind("t2", function () { if (S.scr !== "ach") { S.bk = S.scr; go("ach"); } });
}

/** Título da tela (barra verde). É o "cabeçalho" que recebe o foco ao mudar de tela. */
function barUI(texto, extra) {
  return '<div class="bar" role="heading" aria-level="1" id="main-title" tabindex="-1">' + (extra || "") + texto + '</div>';
}

/** Pontos e conquistas. */
function scoreUI() {
  return '<p class="mute c">⭐ ' + S.t[0].pts + ' pts · Conquistas ' + nA() + '/6</p>';
}

/** Botão Voltar (o destino é ligado em cada tela com bind("bk", ...)). */
function backUI() {
  return '<div class="c"><button id="bk" class="back">⬅ Voltar</button></div>';
}

/* ---------------- loja e apoios ---------------- */

/** Aplica o efeito de um apoio na pergunta atual (guarda só o TIPO; o texto é montado em hintHTML). */
function eff(id) {
  var item = { t: id };
  if (id === "d") {
    var w = S.ord.filter(function (o) { return o !== 0 && S.ban.indexOf(o) < 0 && o !== S.sel; }).slice(0, 2);
    S.ban = S.ban.concat(w);
    item.n = w.length;
  }
  S.hint.push(item);
}

/** Texto das dicas/apoios mostrados na pergunta, no idioma ATUAL (muda junto se o idioma mudar). */
function hintHTML() {
  var q = Q[S.q];
  return S.hint.map(function (it) {
    switch (it.t) {
      case "s": return "💡 Pista: " + q[3];
      case "d": return "🔎 Eliminei " + it.n + " alternativa(s) incorreta(s).";
      case "e": return "📘 Conceito: " + q[4];
      case "g": return "📖 Glossário: " + GX();
      case "h": return "🙋 Ajuda especializada: chame o professor para orientar o grupo, sem revelar a resposta.";
      case "r": return "🔁 Tentativa " + it.a + " de 3: as alternativas erradas foram desativadas.";
    }
    return "";
  }).join("<br><br>");
}

/** Compra um apoio: usa na hora (dentro da pergunta) ou guarda na mochila (fora dela). */
function buy(id, T) {
  var x = SH.filter(function (y) { return y[2] === id; })[0];
  if (!FREE) {
    if (T.pts < x[1]) return;
    T.pts -= x[1];
  }
  if (S.scr === "q") {
    eff(id);
    S.shop = 0;
    render();
  } else {
    S.inv[id] = (S.inv[id] || 0) + 1;
    S.sn = "✅ " + x[0] + " comprado! Está guardado na 🎒 e pode ser usado em qualquer pergunta.";
    render();
  }
}

/** Usa um apoio guardado na mochila. */
function use(id) {
  if (!(S.inv[id] > 0)) return;
  S.inv[id]--;
  eff(id);
  render();
}

/** Mochila: apoios guardados, usáveis dentro da pergunta. */
function invUI() {
  var ks = SH.filter(function (x) { return S.inv[x[2]] > 0; });
  if (!ks.length) return "";
  return '<div class="card"><b>🎒 Seus apoios guardados</b><br>' + ks.map(function (x) {
    return '<button data-u="' + x[2] + '">' + SI[x[2]] + " " + x[0] + " ×" + S.inv[x[2]] + "</button>";
  }).join("") + "</div>";
}

/** Botão flutuante da loja (🛒) e, se estiver aberta, a janela da loja. */
function shopUI(T) {
  var h = '<button class="fab" id="sh" aria-haspopup="dialog" aria-label="' +
    tx("Abrir a loja. Você tem " + T.pts + " pontos.", "Open the shop. You have " + T.pts + " points.") +
    '">🛒<small>⭐' + T.pts + "</small></button>";
  if (!S.shop) return h;
  h += '<div class="ov" id="ov"><div class="card shop" role="dialog" aria-modal="true" aria-labelledby="shop-t">' +
    '<div class="hud"><b id="shop-t">🛒 Loja de apoios</b><button id="sx" aria-label="Fechar">✕</button></div>' +
    '<p class="mute">' + T.n + ": ⭐ " + T.pts + " pts" + (FREE ? " · apoios grátis" : "") + "</p>" +
    (S.sn ? '<div class="hint" role="status">' + S.sn + "</div>" : "");
  SH.forEach(function (x) {
    var off = !FREE && T.pts < x[1];
    h += '<div class="it"><div><b>' + SI[x[2]] + " " + x[0] + "</b>" +
      (S.inv[x[2]] ? ' <span class="mute">· você tem ' + S.inv[x[2]] + "</span>" : "") +
      '<br><span class="mute">' + SD[x[2]] + '</span></div><button data-s="' + x[2] + '"' + (off ? " disabled" : "") + ">" +
      (S.scr === "q" ? "Comprar e usar" : "Comprar") + " (" + (FREE ? "grátis" : x[1] + " pts") + ")</button></div>";
  });
  return h + '<p class="mute">' +
    (S.scr === "q" ? "Os apoios são usados na hora. " : "Os apoios comprados ficam guardados na 🎒 e podem ser usados em qualquer pergunta. ") +
    "</p></div></div>";
}

function bindShop(T, a) {
  bind("sh", function () { S.shop = 1; S.sn = ""; RETURN_TO = "sh"; render(); });
  bind("sx", fecharJanela);
  fundoFecha($("ov"));
  a.querySelectorAll("[data-s]").forEach(function (b) {
    b.onclick = function () { buy(b.dataset.s, T); };
  });
}

/* ---------------- configurações ---------------- */

function cfgUI() {
  return '<div class="ov" id="ovc"><div class="card shop" role="dialog" aria-modal="true" aria-labelledby="cfg-t">' +
    '<div class="hud"><b id="cfg-t">⚙️ Configurações</b><button id="cx" aria-label="Fechar">✕</button></div>' +
    '<label class="chk"><input type="checkbox" id="fr"' + (FREE ? " checked" : "") + '><span>Apoios gratuitos (modo professor)</span></label>' +
    '<p class="mute">' + tx("Libera a loja sem custo de pontos.", "Makes the shop free of points.") + '</p>' +
    '<label class="chk"><input type="checkbox" id="sfx"' + (CFG.sfx ? " checked" : "") + '><span>🔊 Som de efeito dos botões</span></label>' +
    '<p class="mute">Desmarque para desativar o som ao clicar nos botões.</p>' +
    '<div class="vol"><label for="vol">🎵 Volume da música: <b id="vv">' + CFG.vol + '%</b></label>' +
    '<input type="range" id="vol" min="0" max="100" step="1" value="' + CFG.vol + '" aria-valuetext="' + CFG.vol + '%"></div>' +
    '<label class="chk"><input type="checkbox" id="svc"' + (CFG.save === true ? " checked" : "") + '><span>💾 Salvar progresso neste navegador</span></label>' +
    '<p class="mute">Guarda o seu andamento neste aparelho para você continuar depois. Nenhum dado pessoal é coletado ou enviado.</p>' +
    '<button id="dsv" class="back">🗑️ Apagar progresso salvo</button>' +
    (CNOTE ? '<p class="mute" role="status">' + CNOTE + "</p>" : "") +
    '<div class="lang" role="group" aria-label="' + tx("Idioma", "Language") + '"><div>🌐 Idioma</div>' +
    '<button data-l="pt" aria-pressed="' + (LANG === "pt") + '" class="' + (LANG === "pt" ? "on" : "") + '">Português</button>' +
    '<button data-l="en" aria-pressed="' + (LANG === "en") + '" class="' + (LANG === "en" ? "on" : "") + '">English</button></div>' +
    '<p class="mute">' + tx("Leitor de tela e narração: use o botão de acessibilidade, no canto superior esquerdo.",
      "Screen reader and narration: use the accessibility button at the top left.") + "</p>" +
    "</div></div>";
}

function bindCfg() {
  bind("cx", fecharJanela);
  fundoFecha($("ovc"));
  var fr = $("fr");
  if (fr) fr.onchange = function () { FREE = this.checked; if (S.started) sv(); };
  var c = $("sfx");
  if (c) c.onchange = function () { CFG.sfx = this.checked; savePrefs(); if (CFG.sfx) beep(); };
  var v = $("vol");
  if (v) v.oninput = function () {
    CFG.vol = +this.value;
    $("vv").textContent = CFG.vol + "%";
    this.setAttribute("aria-valuetext", CFG.vol + "%");
    if (CFG.vol > 0) playMus(); else if (AU) AU.pause();
    applyVol();
    savePrefs();
  };
  var sc = $("svc");
  if (sc) sc.onchange = function () {
    CFG.save = this.checked;
    savePrefs();
    if (CFG.save) { if (S.started) sv(); } else clearSaved();
  };
  bind("dsv", function () {
    clearSaved();
    CNOTE = "✅ Progresso salvo apagado.";
    render();
  });
  document.querySelectorAll("#ovc [data-l]").forEach(function (b) {
    b.onclick = function () { setLang(this.dataset.l); savePrefs(); render(); };
  });
}

/* ---------------- aviso de salvamento e confirmação de "Novo jogo" ---------------- */

/** Aviso (uma vez só) de que o jogo salva o progresso sozinho. */
function avisoUI() {
  return '<div class="aviso" role="region" aria-label="' + tx("Aviso sobre o salvamento", "Saving notice") + '"><p>💾 ' +
    tx("O jogo salva o seu progresso automaticamente neste navegador. Você pode desativar isso em Configurações. Nenhum dado pessoal é coletado ou enviado.",
       "The game automatically saves your progress in this browser. You can turn this off in Settings. No personal data is collected or sent.") +
    '</p><button id="nt-ok">' + tx("Entendi", "Got it") + "</button></div>";
}

/** Janela de confirmação antes de apagar o progresso e começar um novo jogo. */
function dialogUI() {
  return '<div class="ov" id="ovd"><div class="card shop" role="alertdialog" aria-modal="true" aria-labelledby="nd-t" aria-describedby="nd-d">' +
    '<h2 id="nd-t">' + tx("Começar um novo jogo?", "Start a new game?") + "</h2>" +
    '<p id="nd-d">' + tx("O progresso salvo será apagado e não poderá ser recuperado. Deseja continuar?",
      "Your saved progress will be deleted and cannot be recovered. Do you want to continue?") + "</p>" +
    '<div class="c"><button id="nd-ok">' + tx("Sim, começar novo jogo", "Yes, start a new game") + "</button>" +
    '<button id="nd-no" class="back" data-focus>' + tx("Cancelar", "Cancel") + "</button></div></div></div>";
}

/* ---------------- janelas: fechar, foco e teclado ---------------- */

function overlayEl() { return $("ovd") || $("ovc") || $("ov"); }

/** Fecha a janela que estiver por cima (confirmação, configurações ou loja). */
function fecharJanela() {
  if (CD) CD = 0;
  else if (CO) { CO = 0; CNOTE = ""; }
  else if (S.shop) S.shop = 0;
  render();
}

/** Clicar no fundo escuro fecha a janela. */
function fundoFecha(el) {
  if (el) el.onclick = function (e) { if (e.target === el) fecharJanela(); };
}

/** Elementos que podem receber foco dentro de uma janela. */
function focaveis(el) {
  return [].slice.call(el.querySelectorAll('button:not([disabled]),input:not([disabled]),select,textarea,[tabindex]:not([tabindex="-1"])'));
}

/** Foco inicial ao abrir uma janela (o botão marcado com data-focus ou o primeiro). */
function focoInicial() {
  var ov = overlayEl();
  if (!ov) return;
  var alvo = ov.querySelector("[data-focus]") || focaveis(ov)[0];
  if (alvo) alvo.focus({ preventScroll: true });
}

/** Guarda qual controle está em foco (para devolver o foco depois de redesenhar a tela). */
function focusKey() {
  var a = document.activeElement;
  if (!a || a === document.body || !$("app").contains(a)) return "";
  if (a.id) return "#" + a.id;
  var attrs = ["data-a", "data-s", "data-q", "data-u", "data-p", "data-l"];
  for (var i = 0; i < attrs.length; i++) {
    if (a.hasAttribute(attrs[i])) return "[" + attrs[i] + '="' + a.getAttribute(attrs[i]) + '"]';
  }
  return "";
}

/** Devolve o foco ao mesmo controle depois que a tela foi redesenhada. */
function restoreFocus(key) {
  var perdido = document.activeElement === document.body || !$("app").contains(document.activeElement);
  if (!perdido || !key) return;
  var e = document.querySelector("#app " + key);
  if (e && !e.disabled) e.focus({ preventScroll: true });
}

/** Ao mudar de tela, o foco vai para o título (os leitores de tela leem o título novo). */
function focusHeading() {
  var h = $("main-title") || document.querySelector("#app h1, #app h2");
  if (h) {
    h.setAttribute("tabindex", "-1");
    h.focus({ preventScroll: true });
  }
}

/* Teclado: Esc fecha a janela; Tab fica preso dentro dela (foco "preso" = padrão de acessibilidade) */
document.addEventListener("keydown", function (e) {
  var ov = overlayEl();
  if (!ov) return;
  if (e.key === "Escape") {
    e.preventDefault();
    fecharJanela();
    return;
  }
  if (e.key !== "Tab") return;
  var lista = focaveis(ov);
  if (!lista.length) return;
  var primeiro = lista[0], ultimo = lista[lista.length - 1];
  if (!ov.contains(document.activeElement)) { e.preventDefault(); primeiro.focus(); }
  else if (e.shiftKey && document.activeElement === primeiro) { e.preventDefault(); ultimo.focus(); }
  else if (!e.shiftKey && document.activeElement === ultimo) { e.preventDefault(); primeiro.focus(); }
});
