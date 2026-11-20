/* carregando.js — tela de carregamento (engrenagem girando e uma dica). */

SCREENS.load = function (a) {
  var dicas = [
    "Leia a legenda do mapa antes de responder.",
    "Releia o enunciado com calma antes de escolher a resposta.",
    "Errar faz parte: cada pergunta tem 3 tentativas.",
    "Os pontos compram apoios na Loja 🛒. Use com estratégia!",
    "Cada fase concluída desbloqueia a próxima e dá uma conquista."
  ];
  a.innerHTML =
    '<div class="load" role="status">' +
    '<div class="compass" aria-hidden="true">⚙️</div>' +
    '<h2 id="main-title" tabindex="-1">Preparando a expedição<span class="dots" aria-hidden="true"></span></h2>' +
    '<div class="pg" role="progressbar" aria-label="Carregando"><i></i></div>' +
    '<div class="card mute">💡 ' + dicas[Math.floor(Math.random() * dicas.length)] + "</div></div>";
};
