/* resultado.js — resultado de uma resposta (acerto, tentar de novo ou explicação).
 * O texto é montado AQUI, com a pergunta e o idioma atuais (assim, se o idioma mudar
 * com esta tela aberta, a explicação também muda). */

function mensagemResultado(m) {
  var q = Q[S.q];
  if (m.k === "ok") {
    return {
      t: m.fim ? "🎉 Parabéns! Vocês chegaram à " + (S.ph === 4 ? "linha final!" : "próxima fase!") : "🎉 Parabéns! Vocês avançaram 1 casa.",
      e: "+3 pontos. " + q[4]
    };
  }
  if (m.k === "retry") {
    return {
      t: "Quase! Tente novamente",
      e: "Vocês ainda têm " + (2 - S.rev) + " tentativa" + (S.rev === 0 ? "s" : "") + ". Releiam a pergunta com calma. Dica: " + q[3]
    };
  }
  return { t: "Ops. Não ande! Você errou", e: "Resposta esperada: " + q[2][0] + ". " + q[4] };
}

SCREENS.res = function (a, T) {
  var m = S.msg, txt = mensagemResultado(m);
  a.innerHTML = tabsUI() +
    '<div class="res">' + barUI(txt.t) + '<img src="' + IM[m.g] + '" alt=""><div class="card">' + txt.e + "</div>" +
    (m.rv
      ? '<div class="c"><button id="rv">🔁 Tentar novamente (tentativa ' + (S.rev + 2) + " de 3)</button></div>"
      : '<div class="c"><button id="cont">Continuar ➜</button></div>') +
    "</div>";

  bindTabs();
  // segunda/terceira tentativa: a alternativa errada é desativada
  bind("rv", function () {
    S.rev++;
    if (S.ban.indexOf(S.wo) < 0) S.ban.push(S.wo);
    S.sel = -1; S.just = ""; S.note = "";
    S.hint = [{ t: "r", a: S.rev + 1 }];
    go("q");
  });
  bind("cont", function () {
    if (!m.ok) { nxt(); return; }
    if (T.pos >= P) fin(T); else nxt();
  });
};
