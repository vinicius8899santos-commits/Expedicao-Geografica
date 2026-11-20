/* vlibras.js — tradução para Libras (widget VLibras do governo federal).
 * Precisa de internet. Se o site do VLibras não carregar, o jogo continua normal. */
(function () {
  var s = document.createElement("script");
  s.src = "https://vlibras.gov.br/app/vlibras-plugin.js";
  s.onload = function () {
    try {
      new window.VLibras.Widget({
        rootPath: "https://vlibras.gov.br/app",
        personalization: "https://vlibras.gov.br/config/default_logo.json",
        avatar: "random",
        position: "R"
      });
    } catch (e) { /* sem VLibras */ }
  };
  s.onerror = function () { /* sem internet: segue sem VLibras */ };
  document.body.appendChild(s);
})();
