/* fim.js — tela final (depois do Desafio Final da Fase 5). */

SCREENS.win = function (a, T) {
  var novo = S.nw;                                    // acabou de ganhar as conquistas finais?
  a.innerHTML = tabsUI() + '<div class="res c">' +
    '<h1 id="main-title" tabindex="-1" style="color:#fff;text-shadow:0 3px 0 #0006">Parabéns!</h1>' +
    '<div class="bar">🏁 Desafio Final concluído!</div>' +
    (novo
      ? '<div class="card"><div class="big" aria-hidden="true">' + ACH[4][0] + "</div><b>🏆 Conquista desbloqueada: " + ACH[4][1] + "</b><p>Vocês ganharam +15 pontos!</p></div>" +
        '<div class="card"><div class="big" aria-hidden="true">🏆</div><b>🏆 Conquista desbloqueada: REI DA GEOGRAFIA</b><p>Você completou todas as fases!</p></div>'
      : "") +
    '<div class="card" style="text-align:left"><b>Pontuação final:</b> ⭐ ' + T.pts + " pts<br>Conquistas: " + nA() + "/6</div>" +
    '<img class="cover" src="' + IM.cv + '" alt="' + tx("Capa do jogo Expedição Geográfica", "Cover of the game Geographic Expedition") + '">' +
    '<div class="card" style="text-align:left"><b>Autoavaliação (cada participante):</b><ul>' +
    "<li>Qual conceito geográfico compreendi melhor?</li><li>Qual desafio exigiu mais reflexão?</li><li>Como contribuí para a equipe?</li>" +
    "<li>Que resposta precisei revisar?</li><li>O que faria de maneira diferente em uma próxima partida?</li></ul></div>" +
    '<button class="go" id="again">🏠 Voltar ao início</button></div>';

  bindTabs();
  bind("again", function () { go("title"); });
};
