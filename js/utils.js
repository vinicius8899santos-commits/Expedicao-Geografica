/* utils.js — funções auxiliares usadas em todo o jogo (carregado primeiro). */

/** Atalho para document.getElementById */
var $ = function (id) { return document.getElementById(id); };

/** Protege texto digitado pelo jogador antes de colocá-lo no HTML. */
function esc(x) {
  return String(x).replace(/&/g, "&amp;").replace(/</g, "&lt;");
}

/** Liga um clique a um botão pelo id (se o botão existir na tela atual). */
function bind(id, fn) {
  var e = $(id);
  if (e) e.onclick = fn;
}

/** Escolhe o texto conforme o idioma atual: tx("português", "english"). */
function tx(pt, en) {
  return LANG === "en" ? en : pt;
}

/** Imagem de um personagem. i = 0..4 (Alex, Gaia, Nico, Luna, Ravi);
 *  tipo = "rosto" (recorte pequeno) ou "cheio" (imagem inteira); classe = estilo extra (css/style.css). */
function avatar(i, tipo, classe) {
  var a = AVATARES[i];
  return '<img class="av ' + (classe || "") + '" src="' + (tipo === "cheio" ? a.cheio : a.rosto) + '" alt="" aria-hidden="true">';
}

/** Embaralha os números 0..n-1 (algoritmo de Fisher-Yates: sorteio justo). */
function embaralhar(n) {
  var a = [], i, j, t;
  for (i = 0; i < n; i++) a.push(i);
  for (i = n - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    t = a[i]; a[i] = a[j]; a[j] = t;
  }
  return a;
}

/** Cada tela do jogo registra aqui a sua função de desenho (veja js/screens/). */
var SCREENS = {};
