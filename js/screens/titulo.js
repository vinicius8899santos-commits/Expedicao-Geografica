/* titulo.js — tela inicial no estilo de menu de jogo de celular:
 * logo no alto e botões grandes JOGAR (ou CONTINUAR JOGO), OPÇÕES e CRÉDITOS.
 * Se já existe uma partida, aparece também NOVO JOGO (com confirmação). */

SCREENS.title = function (a, T) {
  var salvo = ld();                                   // partida salva (ou null)
  var temProgresso = !!S.started || !!salvo;          // existe algo para continuar?

  var regras =
    '<p><b>Objetivo:</b> concluir as 5 fases e conquistar todas as conquistas.</p>' +
    '<p><b>Perguntas:</b> cada fase tem 10 perguntas. Elas são liberadas em ordem: ao responder a pergunta 1, a 2 é desbloqueada, e assim por diante.</p>' +
    '<p><b>Tabuleiro:</b> cada acerto avança 1 casa automaticamente. Ao chegar à Próxima fase, você ganha 15 pontos e uma conquista, e a fase seguinte é desbloqueada. A Fase 5 é o Desafio Final e encerra o jogo.</p>' +
    '<p><b>Pontos:</b> cada resposta correta, com justificativa, vale 3.</p>' +
    '<p><b>Loja 🛒:</b> use os pontos em apoios.</p>' +
    '<p><b>Errou?</b> Cada pergunta tem 3 tentativas: a cada erro, a alternativa errada é desativada; no terceiro erro, o jogo explica a resposta. Uma pergunta que não foi acertada pode ser tentada de novo depois.</p>' +
    '<p><b>Progresso:</b> ' + tx(
      "o jogo salva sozinho neste navegador e mantém o lugar onde você parou: use Continuar jogo depois. Para recomeçar, use Novo jogo (o jogo pede confirmação).",
      "the game saves by itself in this browser and keeps the place where you stopped: use Continue game later. To start over, use New game (the game asks you to confirm).") + '</p>';

  var h = '<h1 class="sr-only" id="main-title" tabindex="-1">Expedição Geográfica: Basic Geography</h1>' +
    '<section class="menu">' +
    '<img class="logo" src="' + IM.logo + '" alt="Expedição Geográfica: Basic Geography">' +
    '<div class="menu-list">' +
    '<button class="menu-btn" id="play">▶ ' + (temProgresso ? tx("Continuar jogo", "Continue game") : tx("Jogar", "Play")) + '</button>' +
    '<button class="menu-btn" id="cfg" aria-haspopup="dialog">⚙️ ' + tx("Opções", "Options") + '</button>' +
    '<button class="menu-btn" id="creds">👥 ' + tx("Créditos", "Credits") + '</button>' +
    (temProgresso ? '<button class="menu-btn peq" id="newg">🆕 ' + tx("Novo jogo", "New game") + '</button>' : "") +
    '</div>' +
    '<details class="card menu-det"><summary><b>Como jogar</b></summary>' + regras + '</details>' +
    '<details class="card menu-det"><summary><b>Personagens-guia</b></summary>' +
    CHR.map(function (c, i) { return '<p class="pers">' + avatar(i, "rosto", "av-lista") + " <b>" + c[1] + "</b>: " + c[2] + ".</p>"; }).join("") + '</details>' +
    '<p class="copy">' + tx("© 2026 – Todos os direitos reservados.", "© 2026 – All rights reserved.") + '</p>' +
    '</section>' +
    (CFG.save === true && !CFG.noticeSeen ? avisoUI() : "") +
    (CO ? cfgUI() : "") +
    (CD ? dialogUI() : "");

  a.innerHTML = h;

  bind("cfg", function () { CO = 1; CNOTE = ""; RETURN_TO = "cfg"; render(); });
  bind("creds", function () { go("credits"); });
  bind("play", function () { if (temProgresso) continuarJogo(); else iniciarNovo(); });
  bind("newg", function () { CD = 1; RETURN_TO = "newg"; render(); });
  bind("nd-ok", function () { CD = 0; novoJogoConfirmado(); });
  bind("nd-no", function () { CD = 0; render(); });
  bind("nt-ok", function () { CFG.noticeSeen = true; savePrefs(); render(); });
  bindCfg();
  fundoFecha($("ovd"));
};
