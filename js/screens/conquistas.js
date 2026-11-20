/* conquistas.js — aba de conquistas: 5 das fases + REI DA GEOGRAFIA. */

SCREENS.ach = function (a) {
  var h = tabsUI() + barUI("🏆 Conquistas (" + nA() + "/6)");
  ACH.forEach(function (c, i) {
    var d = i < 5 ? S.done[i] : S.done.every(Boolean);      // desbloqueada?
    h += '<div class="card achc' + (d ? "" : " lock") + '"><span class="big" aria-hidden="true">' + (d ? c[0] : "🔒") + "</span><div><b>" + c[1] +
      '</b><br><span class="mute">' + c[2] + "</span><br>" +
      (d ? "✅ Conquistada" : "🔒 " + (i < 5 ? "Conclua a Fase " + (i + 1) : "Conclua todas as fases")) + "</div></div>";
  });
  a.innerHTML = h + backUI();
  bindTabs();
  bind("bk", function () { go(S.bk); });
};
