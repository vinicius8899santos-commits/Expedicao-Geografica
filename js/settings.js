/* settings.js — preferências do jogador, efeitos sonoros e música.
 *
 * As preferências ficam no navegador (localStorage, chave "eg_cfg"):
 * idioma, sons, volume, salvamento automático e ajustes do leitor de tela. */

var KEY_PREFS = "eg_cfg";   // preferências
var KEY_GAME = "eg3";       // partida salva (veja progress.js)

var CFG = {
  sfx: true,        // som de clique nos botões
  vol: 60,          // volume da música (0 a 100)
  lang: "pt",       // idioma: "pt" ou "en"
  save: true,       // salvar o progresso automaticamente neste navegador
  noticeSeen: false,// o aviso sobre o salvamento já foi lido?
  rate: 1,          // velocidade da narração (0.6 a 1.6)
  auto: false       // ler a tela automaticamente quando ela mudar
};
var CO = 0;         // janela de configurações aberta?
var CNOTE = "";     // mensagem curta dentro das configurações

function clamp(n, min, max) { return Math.max(min, Math.min(max, n)); }

/** Lê as preferências guardadas (tolerante a dados antigos ou corrompidos). */
function loadPrefs() {
  try {
    var c = JSON.parse(localStorage.getItem(KEY_PREFS));
    if (!c) return;
    if (c.sfx === false) CFG.sfx = false;
    if (typeof c.vol === "number") CFG.vol = clamp(c.vol, 0, 100);
    if (c.lang === "en") CFG.lang = "en";
    if (typeof c.save === "boolean") CFG.save = c.save;      // quem já desativou continua desativado
    if (c.noticeSeen === true) CFG.noticeSeen = true;
    if (typeof c.rate === "number") CFG.rate = clamp(c.rate, 0.6, 1.6);
    if (c.auto === true) CFG.auto = true;
  } catch (e) { /* sem armazenamento: usa os padrões */ }
}

/** Guarda as preferências (chamado sempre que algo muda nas configurações). */
function savePrefs() {
  try { localStorage.setItem(KEY_PREFS, JSON.stringify(CFG)); } catch (e) { /* ignora */ }
}

/** O navegador permite guardar dados? (modo privado às vezes bloqueia) */
function storageOK() {
  try {
    localStorage.setItem("eg_teste", "1");
    localStorage.removeItem("eg_teste");
    return true;
  } catch (e) { return false; }
}

/* ---------------- efeito sonoro dos botões ---------------- */
var AC = null;   // contexto de áudio

/** Toca um "clique" curto. Fica em silêncio se estiver desligado ou se o leitor de tela estiver falando. */
function beep() {
  if (!CFG.sfx) return;
  if (window.A11Y && A11Y.isSpeaking()) return;     // não competir com a narração
  try {
    AC = AC || new (window.AudioContext || window.webkitAudioContext)();
    var o = AC.createOscillator(), g = AC.createGain(), t = AC.currentTime;
    o.type = "triangle";
    o.frequency.setValueAtTime(720, t);
    o.frequency.exponentialRampToValueAtTime(980, t + 0.07);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.18, t + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.12);
    o.connect(g);
    g.connect(AC.destination);
    o.start(t);
    o.stop(t + 0.13);
  } catch (e) { /* sem áudio */ }
}

/* ---------------- música de fundo ---------------- */
var AU = null;      // elemento de áudio (criado só quando precisa tocar)
var MS = 0;         // a música já começou alguma vez?
var DUCK = false;   // volume reduzido enquanto o leitor de tela fala

function music() {
  if (!AU) {
    AU = new Audio("assets/sounds/musica.mp3");
    AU.loop = true;
    AU.preload = "auto";
    AU.addEventListener("play", function () { MS = 1; });
  }
  applyVol();
  return AU;
}

function applyVol() {
  if (AU) AU.volume = clamp(CFG.vol / 100 * (DUCK ? 0.25 : 1), 0, 1);
}

function playMus() {
  if (CFG.vol <= 0) return;
  var a = music();
  if (a.paused) {
    var p = a.play();
    if (p && p.catch) p.catch(function () { /* o navegador só deixa tocar após um clique */ });
  }
}

/** Abaixa a música enquanto a voz fala (on = true) e volta ao normal (on = false). */
function duckMusic(on) {
  DUCK = !!on;
  applyVol();
}

/* Toda vez que o jogador clica: som de botão e (na 1ª vez) música */
document.addEventListener("click", function (e) {
  var b = e.target.closest && e.target.closest("button");
  if (b && !b.disabled) beep();
  playMus();
}, true);

/* Pausa a música quando a aba fica escondida */
document.addEventListener("visibilitychange", function () {
  if (!AU) return;
  if (document.hidden) AU.pause();
  else if (MS) playMus();
});
