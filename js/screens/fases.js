/* fases.js — escolha da fase (5 botões; as fases se desbloqueiam em ordem). */

SCREENS.phases = function (a, T) {
  var h = tabsUI() + barUI("Escolha a fase") + scoreUI() +
    '<div class="phs" role="group" aria-label="' + tx("Fases do jogo", "Game phases") + '">';

  PH.forEach(function (p, i) {
    var liberada = i === 0 || S.done[i - 1];
    var feita = S.done[i];
    var ok = S.pp[i].filter(function (x) { return x === 1; }).length;
    var estado = feita ? tx("concluída", "completed")
      : liberada ? tx("disponível", "available")
      : tx("bloqueada: conclua a fase anterior", "locked: complete the previous phase");
    var rotulo = tx(
      "Fase " + (i + 1) + ", " + p[1] + ", " + p[2] + ". " + ok + " de 10 perguntas respondidas. " + estado + ".",
      "Phase " + (i + 1) + ", " + p[1] + ", " + trs(p[2]) + ". " + ok + " of 10 questions answered. " + estado + ".");
    h += '<button class="phb' + (feita ? " dn" : "") + '" data-p="' + i + '"' + (liberada ? "" : " disabled") +
      ' aria-label="' + rotulo + '">' +
      '<span class="pe" aria-hidden="true">' + avatar(i, "rosto", "av-fase") + "</span>" +
      "<span><b>Fase " + (i + 1) + " · " + p[1] + (i === 4 ? " · Desafio Final" : "") + "</b><br><small>" + p[2] + " · " + ok + "/10</small></span>" +
      '<span class="st" aria-hidden="true">' + (feita ? "✅" : liberada ? "▶" : "🔒") + "</span></button>";
  });

  a.innerHTML = h + "</div>" + backUI() + shopUI(T);
  bindTabs();
  bindShop(T, a);
  bind("bk", function () { go("title"); });
  a.querySelectorAll("[data-p]").forEach(function (b) {
    b.onclick = function () { openPh(+b.dataset.p); };
  });
};
