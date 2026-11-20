/* main.js — inicialização do jogo (carregado por último).
 * Ordem: preferências → estado → idioma → leitor de tela → primeira tela. */
(function () {
  loadPrefs();                      // idioma, volume, salvamento... (js/settings.js)
  init();                           // estado novo da partida (js/progress.js)
  var salvo = ld();
  if (salvo) FREE = !!salvo.F;      // lembra o "modo professor" da partida salva
  setLang(CFG.lang);                // idioma (js/i18n.js)
  A11Y.init();                      // botão e painel do leitor de tela (js/accessibility.js)
  render();                         // desenha a tela inicial (js/game.js)
})();
