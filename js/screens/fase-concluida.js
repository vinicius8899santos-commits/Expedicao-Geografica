/* fase-concluida.js — tela exibida ao terminar uma fase (conquista e fase seguinte liberada). */

SCREENS.done = function (a, T) {
  var i = S.ph, A = ACH[i];
  a.innerHTML = tabsUI() + '<div class="res c">' + barUI("🏁 Fase " + (i + 1) + " concluída!") +
    (S.nw
      ? '<div class="card"><div class="big" aria-hidden="true">' + A[0] + "</div><b>🏆 Conquista desbloqueada: " + A[1] + "</b><p>" + A[2] + "</p><p>Vocês ganharam +15 pontos!</p></div>"
      : '<div class="card">Esta fase já tinha sido concluída antes, então não há bônus extra.</div>') +
    '<div class="hint">🔓 Fase ' + (i + 2) + " · " + PH[i + 1][1] + ' está desbloqueada!</div>' +
    '<button class="go" id="np">Próxima fase ➜</button>' +
    '<div><button id="bk" class="back">⬅ Voltar</button></div></div>';

  bindTabs();
  bind("np", function () { openPh(i + 1); });
  bind("bk", function () { go("phases"); });
};
