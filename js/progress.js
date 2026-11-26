/* progress.js — estado da partida e salvamento automático.
 *
 * S guarda TUDO da partida em andamento: fase, perguntas respondidas, pontos,
 * apoios guardados, conquistas e a tela atual. Cada parte do código lê e altera S.
 *
 * Salvamento (localStorage, chave "eg3"):
 *  - acontece sozinho a cada mudança de tela e quando a página é fechada/escondida;
 *  - o registro é versionado ({v, t, F, S}) e validado ao ler;
 *  - o progresso NUNCA é apagado sem o jogador confirmar ("Novo jogo") ou pedir
 *    nas configurações. */

var FREE = false;               // modo professor: apoios gratuitos
var S;                          // estado da partida
var SAVE_VERSION = 2;

function mk(n, i) { return { n: n, im: i, pos: 0, pts: 0 }; }
function zeros() { return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; }

/** Cria um estado novo (início de partida). */
function init() {
  S = {
    t: [mk("Equipe Expedição", "🧭")],   // equipe: posição no tabuleiro (pos) e pontos (pts)
    cur: 0,
    ban: [],            // alternativas desativadas na pergunta atual
    rev: 0,             // erros já cometidos na pergunta atual (0 a 2)
    wo: 0,              // última alternativa errada
    sel: -1,            // alternativa selecionada
    note: "",           // aviso de validação
    hint: [],           // dicas/apoios mostrados na pergunta (montados na hora de desenhar, no idioma atual)
    q: -1,              // índice da pergunta atual em Q
    num: 1,             // número da pergunta dentro da fase (1 a 10)
    ord: [],            // ordem embaralhada das alternativas
    msg: null,          // mensagem da tela de resultado
    scr: "title",       // tela atual
    bk: "phases",       // tela para voltar (usada pelas Conquistas)
    shop: 0,            // loja aberta?
    ph: -1,             // fase atual (0 a 4)
    done: [0, 0, 0, 0, 0],   // fases concluídas
    nw: 0,              // acabou de ganhar uma conquista?
    inv: {},            // apoios guardados
    sn: "",             // aviso dentro da loja
    started: 0,         // a partida já começou?
    fresh: 0,           // animar o símbolo da fase?
    just: "",           // justificativa digitada
    pp: [0, 0, 0, 0, 0].map(zeros)   // progresso de cada pergunta: 0 = nova, 1 = acertou, 2 = errou 3 vezes
  };
}

/** Completa/corrige um estado vindo do armazenamento (dados antigos ou incompletos). */
function fixState(s) {
  var base = {};
  var tmp = S; init(); base = S; S = tmp;
  Object.keys(base).forEach(function (k) { if (s[k] === undefined) s[k] = base[k]; });
  if (!s.inv || typeof s.inv !== "object") s.inv = {};
  if (!Array.isArray(s.pp) || s.pp.length !== 5) s.pp = base.pp;
  s.pp = s.pp.map(function (a) { return Array.isArray(a) && a.length === 10 ? a : zeros(); });
  if (!Array.isArray(s.done) || s.done.length !== 5) s.done = [0, 0, 0, 0, 0];
  // fase concluída = as 10 perguntas ✅ (conserta partidas salvas antes desta regra)
  s.done.forEach(function (d, i) { if (d) s.pp[i] = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]; });
  s.t[0].pts = Number(s.t[0].pts) || 0;
  s.t[0].pos = clamp(Number(s.t[0].pos) || 0, 0, P);
  if (!Array.isArray(s.hint)) s.hint = [];                    // formato antigo (texto) → lista
  if (s.msg && !s.msg.k) { s.msg = null; if (s.scr === "res") s.scr = "board"; }   // resultado em formato antigo
  s.started = 1;
  s.shop = 0;
  return s;
}

/** Salva a partida (só se o salvamento estiver ligado e a partida já tiver começado). */
function sv() {
  if (CFG.save !== true || !S || !S.started) return;
  try {
    var snap = S;
    // se estiver na tela inicial/carregando, guarda como "escolher fase"
    if (S.scr === "title" || S.scr === "load" || S.scr === "credits") snap = Object.assign({}, S, { scr: "phases" });
    localStorage.setItem(KEY_GAME, JSON.stringify({ v: SAVE_VERSION, t: Date.now(), F: FREE, S: snap }));
  } catch (e) { /* armazenamento cheio ou bloqueado */ }
}

/** Lê a partida salva (ou null se não houver / estiver inválida / o salvamento estiver desligado). */
function ld() {
  if (CFG.save !== true) return null;
  try {
    var d = JSON.parse(localStorage.getItem(KEY_GAME));
    if (!d || !d.S || !Array.isArray(d.S.done) || !Array.isArray(d.S.pp) || !d.S.t || !d.S.t[0]) return null;
    d.S = fixState(d.S);
    return d;
  } catch (e) { return null; }
}

/** Apaga a partida salva. */
function clearSaved() {
  try { localStorage.removeItem(KEY_GAME); } catch (e) { /* ignora */ }
}

/* Última tentativa de salvar quando a pessoa sai da página, troca de aba ou fecha o navegador */
window.addEventListener("pagehide", sv);
window.addEventListener("beforeunload", sv);
document.addEventListener("visibilitychange", function () { if (document.hidden) sv(); });
