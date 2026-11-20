/* pergunta.js — tela da pergunta: enunciado, alternativas, justificativa e confirmação. */

SCREENS.q = function (a, T) {
  var q = Q[S.q];
  var h = tabsUI() +
    barUI("Fase " + (S.ph + 1) + " · Pergunta " + S.num + (S.rev ? " · Tentativa " + (S.rev + 1) + " de 3" : "")) +
    '<div class="card"><p class="mute">' + q[0] + '</p><h2 id="qt">' + q[1] + '</h2>' +
    '<div role="radiogroup" aria-labelledby="qt">';

  S.ord.forEach(function (o, k) {
    h += '<button class="ans' + (S.sel === o ? " sel" : "") + '" role="radio" aria-checked="' + (S.sel === o) + '" data-a="' + o + '"' +
      (S.ban.indexOf(o) >= 0 ? " disabled" : "") + ">" + String.fromCharCode(65 + k) + ") " + q[2][o] + "</button>";
  });

  h += "</div>" +
    '<p><label for="j"><b>Justifiquem a escolha</b> com um conceito geográfico:</label></p>' +
    '<textarea id="j" aria-required="true" placeholder="Escolhemos esta alternativa porque...">' + esc(S.just || "") + "</textarea>" +
    (S.note ? '<div class="hint" role="alert">' + S.note + "</div>" : "") +
    '<button id="conf">Confirmar resposta</button></div>' +
    (S.hint.length ? '<div class="hint" role="status">' + hintHTML() + "</div>" : "") +
    invUI() + backUI() + shopUI(T);

  a.innerHTML = h;
  bindTabs();
  bindShop(T, a);
  bind("bk", function () { go("board"); });
  $("j").oninput = function () { S.just = this.value; };
  bind("conf", confirmarResposta);

  a.querySelectorAll("[data-a]").forEach(function (b) {
    b.onclick = function () { S.sel = +b.dataset.a; render(); };
  });
  a.querySelectorAll("[data-u]").forEach(function (b) {
    b.onclick = function () { use(b.dataset.u); };
  });

  // teclado: setas movem e selecionam a alternativa (como em qualquer grupo de opções)
  var grupo = a.querySelector('[role="radiogroup"]');
  grupo.onkeydown = function (e) {
    var passo = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
    if (!passo) return;
    var lista = [].slice.call(grupo.querySelectorAll("button.ans:not([disabled])"));
    var i = lista.indexOf(document.activeElement);
    if (i < 0) return;
    e.preventDefault();
    var prox = lista[(i + passo + lista.length) % lista.length];
    prox.focus();
    prox.click();
  };
};
