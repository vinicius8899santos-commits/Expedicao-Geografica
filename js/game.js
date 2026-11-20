/* game.js — navegação entre telas, regras do jogo e desenho da tela. */

/** Mostra uma mensagem para leitores de tela (área "aria-live" invisível). */
function announce(texto) {
  var l = $("live");
  if (!l) return;
  l.textContent = "";
  setTimeout(function () { l.textContent = texto; }, 60);
}

/** Vai para outra tela. */
function go(x) {
  S.scr = x;
  S.shop = 0;
  S.sn = "";
  FOCUS_SKIP = true;
  render();
  var a = $("app");               // animação de entrada da tela
  a.classList.remove("tr");
  void a.offsetWidth;
  a.classList.add("tr");
  scrollTo(0, 0);
  focusHeading();
  if (window.A11Y) A11Y.onScreen();
}
var FOCUS_SKIP = false;

/** Volta ao tabuleiro (usado depois de uma pergunta). */
function nxt() {
  S.hint = [];
  S.note = "";
  go("board");
}

/** Quantas perguntas da fase atual já foram acertadas. */
function cnt() {
  return S.pp[S.ph].filter(function (x) { return x === 1; }).length;
}

/** Abre uma fase (mantém o progresso; refaz do zero se ela já estava toda concluída). */
function openPh(i) {
  S.ph = i;
  if (!S.pp[i] || S.pp[i].every(function (x) { return x === 1; })) S.pp[i] = zeros();
  S.t[0].pos = cnt();
  S.hint = [];
  S.fresh = 1;
  go("board");
}

/** Fim de uma fase: +15 pontos e conquista (só na 1ª vez). */
function fin(T) {
  var i = S.ph;
  S.nw = 0;
  if (!S.done[i]) {
    S.done[i] = 1;
    T.pts += 15;
    S.nw = 1;
  }
  go(i === 4 ? "win" : "done");
}

/** Botão "Confirmar resposta". */
function confirmarResposta() {
  var T = S.t[S.cur];
  if (S.sel < 0 || (S.just || "").trim().length < 8) {
    S.note = "Escolham uma alternativa e escrevam uma justificativa curta (mínimo de 8 letras).";
    render();
    return;
  }
  var ok = S.sel === 0, kq = S.num - 1;
  S.wo = S.sel; S.sel = -1; S.just = ""; S.note = "";
  if (ok) {
    S.pp[S.ph][kq] = 1;
    T.pos = cnt();
    T.pts += 3;
    S.msg = { g: "ex", k: "ok", ok: 1, fim: T.pos >= P };         // o texto é montado em resultado.js
  } else {
    if (S.rev >= 2) S.pp[S.ph][kq] = 2;
    S.msg = S.rev >= 2 ? { g: "ex", k: "fail", ok: 0 } : { g: "ex", k: "retry", rv: 1, ok: 0 };
  }
  go("res");
}

/* ---------------- começar, continuar e novo jogo ---------------- */

/** Tela de "carregando" e depois a escolha de fases. */
function carregando() {
  S.scr = "load";
  render();
  var curto = matchMedia("(prefers-reduced-motion: reduce)").matches;
  setTimeout(function () { if (S.scr === "load") go("phases"); }, curto ? 700 : 2600);
  if (window.A11Y) A11Y.onScreen();
}

/** Começa uma partida nova (sem perguntar nada: use novoJogoConfirmado se houver progresso). */
function iniciarNovo() {
  var f = FREE;
  init();
  FREE = f;
  S.started = 1;
  sv();
  carregando();
}

/** "Continuar jogo": volta ao ponto salvo; sem nada salvo, começa uma partida nova. */
function continuarJogo() {
  if (S.started) { go("phases"); return; }
  var d = ld();
  if (d) {
    S = d.S;
    S.started = 1;
    go(S.scr === "title" || S.scr === "load" || S.scr === "credits" ? "phases" : S.scr);
  } else {
    iniciarNovo();
  }
}

/** "Novo jogo" depois da confirmação: apaga o progresso e recomeça. */
function novoJogoConfirmado() {
  clearSaved();
  iniciarNovo();
}

/* ---------------- desenho da tela ---------------- */

/** Redesenha a tela atual (chamado depois de qualquer mudança no estado S). */
function render() {
  var tinhaJanela = !!overlayEl();
  var chave = focusKey();
  var a = $("app"), T = S.t[S.cur];
  if (["title", "load", "credits"].indexOf(S.scr) < 0) sv();          // salvamento automático
  var desenha = SCREENS[S.scr];
  if (desenha) desenha(a, T);
  translate(a);                                            // inglês, se for o caso
  var temJanela = !!overlayEl();
  if (FOCUS_SKIP) FOCUS_SKIP = false;                      // mudança de tela: go() cuida do foco
  else if (temJanela && !tinhaJanela) focoInicial();       // abriu uma janela: foco para dentro
  else if (!temJanela && tinhaJanela) {                    // fechou: foco volta ao botão que abriu
    var r = $(RETURN_TO);
    RETURN_TO = "";
    if (r) r.focus({ preventScroll: true });
  } else restoreFocus(chave);                              // redesenho comum: mantém o foco
  if (window.A11Y) A11Y.afterRender();
}
