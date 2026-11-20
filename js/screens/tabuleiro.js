/* tabuleiro.js — tabuleiro da fase: caminho com 9 casas e painel de 10 perguntas.
 * As perguntas são liberadas em ordem (1 → 2 → 3 ...). */

/** Peões (o símbolo é o do personagem da fase) numa casa do tabuleiro. */
function tk(i) {
  return S.t.filter(function (t) { return t.pos === i; }).map(function (t) {
    return '<span class="tk' + (S.fresh ? " symin" : "") + '" title="' + t.n + '">' + PH[S.ph][0] + "</span>";
  }).join("");
}

SCREENS.board = function (a, T) {
  var st = S.pp[S.ph];          // estado de cada pergunta da fase: 0 nova, 1 acertou, 2 errou 3 vezes
  var nx = -1;                  // próxima pergunta disponível
  for (var k = 0; k < 10; k++) {
    if (k > 0 && st[k - 1] === 0) break;            // bloqueada: a anterior ainda não foi respondida
    if (st[k] !== 1 && nx < 0) nx = k;
  }
  var falta = P - T.pos;
  var resumo = tx(
    "Tabuleiro: você está na casa " + T.pos + " de " + P + ". Faltam " + falta + " acertos para " + (S.ph === 4 ? "concluir o Desafio Final" : "chegar à próxima fase") + ".",
    "Board: you are on square " + T.pos + " of " + P + ". " + falta + " more correct answers to " + (S.ph === 4 ? "finish the Final Challenge" : "reach the next phase") + ".");

  var h = tabsUI() +
    barUI(" Fase " + (S.ph + 1) + " · " + PH[S.ph][1], '<span class="' + (S.fresh ? "symin" : "") + '" aria-hidden="true">' + PH[S.ph][0] + "</span>") +
    scoreUI() + '<p class="sr-only">' + resumo + '</p><div class="mboard">';

  // desenho do caminho (decorativo para leitores de tela: o resumo acima descreve a posição)
  h += '<div class="lbl ini" aria-hidden="true" style="grid-column:1;grid-row:1"><span class="lt">Início</span><span class="li">🚩</span><span class="pawns">' + tk(0) + "</span></div>";
  CL.forEach(function (c, n) {
    h += '<div class="mc" aria-hidden="true" style="grid-column:' + c[0] + ";grid-row:" + c[1] + '"><small>' + (n + 1) + '</small><span class="pawns">' + tk(n + 1) + "</span></div>";
  });
  h += '<div class="lbl fin" aria-hidden="true" style="grid-column:8;grid-row:2"><span class="lt">' + (S.ph === 4 ? "Desafio Final" : "Próxima fase") +
    '</span><span class="li">' + (S.ph === 4 ? "🏁" : "⏭️") + '</span><span class="pawns">' + tk(P) + "</span></div>";

  // painel de perguntas
  h += '<div class="perg"><div class="ptit" aria-hidden="true">Perguntas</div><div class="nums" role="group" aria-label="' + tx("Perguntas da fase", "Phase questions") + '">';
  for (var n = 0; n < 10; n++) {
    var bloqueada = n > 0 && st[n - 1] === 0, certa = st[n] === 1;
    var estado = bloqueada ? tx("bloqueada", "locked")
      : certa ? tx("respondida corretamente", "answered correctly")
      : st[n] === 2 ? tx("errada, tente de novo", "missed, try again")
      : n === nx ? tx("disponível, é a próxima", "available, it is the next one")
      : tx("disponível", "available");
    h += '<button class="nb' + (st[n] === 2 ? " bad" : "") + (n === nx ? " nx" : "") + '" data-q="' + (S.ph * 10 + n) + '" data-n="' + (n + 1) + '"' +
      (bloqueada || certa ? " disabled" : "") + ' aria-label="' + tx("Pergunta ", "Question ") + (n + 1) + ", " + estado + '">' +
      (bloqueada ? "🔒" : certa ? "✅" : n + 1) + "</button>";
  }
  h += "</div></div></div>" + backUI() + shopUI(T);

  a.innerHTML = h;
  S.fresh = 0;
  bindTabs();
  bindShop(T, a);
  bind("bk", function () { go("phases"); });
  a.querySelectorAll("[data-q]").forEach(function (b) {
    b.onclick = function () {
      S.q = +b.dataset.q;
      S.num = +b.dataset.n;
      S.ord = embaralhar(Q[S.q][2].length);       // ordem sorteada das alternativas
      S.rev = 0; S.ban = []; S.sel = -1; S.just = ""; S.hint = []; S.note = "";
      go("q");
    };
  });
};
