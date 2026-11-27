/* i18n.js — idioma do jogo (Português / English).
 *
 * O jogo é escrito em português. Para o inglês:
 *  - as perguntas vêm de data/perguntas-en.js (troca de lista inteira);
 *  - os textos da interface são traduzidos na tela por translate(), usando as
 *    tabelas de data/ui-en.js.
 * O leitor de tela (js/accessibility.js) usa este MESMO idioma. */

var LANG = "pt";                 // "pt" ou "en"
var QP = Q;                      // perguntas em português
var QEN = (typeof QE !== "undefined")
  ? QP.map(function (q, i) { return [q[0], QE[i][0], QE[i][1], QE[i][2], QE[i][3]]; })
  : QP;                          // perguntas em inglês (mesma estrutura de Q)

/** Glossário no idioma atual */
function GX() {
  return LANG === "en" && typeof GE !== "undefined" ? GE : G;
}

/** Troca o idioma de todo o jogo (e do leitor de tela). */
function setLang(l) {
  LANG = l;
  CFG.lang = l;
  Q = l === "en" ? QEN : QP;
  document.documentElement.lang = l === "en" ? "en" : "pt-BR";
  document.title = l === "en"
    ? "Geographic Expedition: Basic Geography"
    : "Expedição Geográfica: Basic Geography";
  var pular = document.querySelector(".skip");
  if (pular) pular.textContent = l === "en" ? "Skip to content" : "Pular para o conteúdo";
  if (window.A11Y) A11Y.onLang();
  if (window.LUPA) LUPA.onLang();
}

/** Traduz um texto em português para inglês usando RX (padrões) e SX (pares). */
function trs(s) {
  RX.forEach(function (r) { s = s.replace(r[0], r[1]); });
  SX.forEach(function (r) { s = s.split(r[0]).join(r[1]); });
  return s;
}

/** Traduz todos os textos visíveis (e atributos de acessibilidade) dentro de "root". */
function translate(root) {
  if (LANG !== "en" || typeof SX === "undefined") return;
  var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
  var node, nodes = [];
  while ((node = walker.nextNode())) nodes.push(node);
  nodes.forEach(function (n) {
    if (n.parentNode.nodeName === "TEXTAREA") return;   // não mexe no que o jogador digitou
    var v = n.nodeValue;
    if (/\S/.test(v)) {
      var r = trs(v);
      if (r !== v) n.nodeValue = r;
    }
  });
  root.querySelectorAll("[placeholder],[aria-label],[title],[alt]").forEach(function (e) {
    ["placeholder", "aria-label", "title", "alt"].forEach(function (a) {
      var v = e.getAttribute(a);
      if (v) {
        var r = trs(v);
        if (r !== v) e.setAttribute(a, r);
      }
    });
  });
}
