/* accessibility.js — LEITOR DE TELA do jogo (narração por voz).
 *
 * O que faz:
 *  - cria um botão fixo no canto superior esquerdo (mesma posição em TODAS as telas);
 *  - ao clicar abre um painel com: idioma da narração (PT-BR / English US), velocidade,
 *    leitura automática e os controles Ouvir, Pausar, Continuar e Parar;
 *  - "Ouvir" descreve a tela atual de forma organizada (título, textos, botões, o que dá
 *    para fazer), só com o que está VISÍVEL e disponível (descrever() e as funções d*());
 *  - usa a Web Speech API (speechSynthesis) com a melhor voz do idioma: prefere vozes
 *    do Google/"naturais", depois a padrão do idioma, depois qualquer voz do mesmo idioma;
 *  - o idioma é o MESMO do jogo (js/i18n.js): trocar aqui troca o jogo todo e vice-versa;
 *  - enquanto fala, abaixa a música e silencia o som dos botões.
 *
 * Para editar as frases narradas, procure as funções dTitulo, dFases, dTabuleiro, dPergunta...
 * Cada frase tem versão em português e em inglês: tx("português", "english"). */

var A11Y = (function () {
  var suportado = ("speechSynthesis" in window) && ("SpeechSynthesisUtterance" in window);
  var fila = [];            // trechos a falar
  var pos = 0;              // trecho atual
  var estado = "parado";    // "parado" | "falando" | "pausado"
  var geracao = 0;          // sobe a cada parar/pausar: eventos antigos são ignorados
  var voz = null;           // voz escolhida
  var sig = "";             // "assinatura" da tela quando a narração começou
  var botao, painel;

  /* ---------------- textos do painel (2 idiomas) ---------------- */
  var TXT = {
    pt: {
      btn: "Acessibilidade: leitor de tela", titulo: "Leitor de tela", fechar: "Fechar",
      idioma: "Idioma da narração", vel: "Velocidade da voz", auto: "Ler a tela automaticamente quando ela mudar",
      ouvir: "Ouvir", pausar: "Pausar", continuar: "Continuar", parar: "Parar",
      pronto: "Pronto. Use Ouvir para descrever a tela.", falando: "Falando…", pausado: "Narração pausada.",
      parado: "Narração parada.", fim: "Fim da descrição.", novaTela: "Nova tela: {t}. Use Ouvir para descrever.",
      voz: "Voz: {v}", vozPadrao: "padrão do navegador", nada: "Não há nada para descrever.",
      erro: "A narração falhou ({e}).",
      semSuporte: "Este navegador não oferece narração por voz. Os textos continuam disponíveis para leitores de tela do sistema."
    },
    en: {
      btn: "Accessibility: screen reader", titulo: "Screen reader", fechar: "Close",
      idioma: "Narration language", vel: "Voice speed", auto: "Read the screen automatically when it changes",
      ouvir: "Listen", pausar: "Pause", continuar: "Resume", parar: "Stop",
      pronto: "Ready. Use Listen to describe the screen.", falando: "Speaking…", pausado: "Narration paused.",
      parado: "Narration stopped.", fim: "End of description.", novaTela: "New screen: {t}. Use Listen to describe it.",
      voz: "Voice: {v}", vozPadrao: "browser default", nada: "There is nothing to describe.",
      erro: "Narration failed ({e}).",
      semSuporte: "This browser does not offer speech narration. The texts are still available to the system screen readers."
    }
  };
  function L() { return TXT[LANG === "en" ? "en" : "pt"]; }
  function langFala() { return LANG === "en" ? "en-US" : "pt-BR"; }

  /* ---------------- utilidades de texto ---------------- */
  var EMOJI = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}\u{2190}-\u{21FF}\u{2300}-\u{23FF}\u{FE0F}\u{200D}\u{1F1E6}-\u{1F1FF}]/gu;

  /** Tira marcações e emojis (a voz leria "carrinho de compras", "estrela"...). */
  function limpar(s) {
    return String(s == null ? "" : s)
      .replace(/<[^>]*>/g, " ")
      .replace(/⭐\s*(\d+)\s*pts?/g, "$1 " + tx("pontos", "points"))
      .replace(EMOJI, " ")
      .replace(/\s+/g, " ")
      .trim();
  }
  function visivel(el) { return !!(el && (el.offsetWidth || el.offsetHeight || el.getClientRects().length)); }
  function texto(el) { return visivel(el) ? limpar(el.innerText) : ""; }
  function pontos() { return S.t[0].pts; }
  function t2(pt, en) { return tx(pt, en); }

  /** Divide os trechos em frases curtas (o Chrome corta falas muito longas). */
  function quebrar(partes) {
    var saida = [];
    partes.forEach(function (p) {
      p = limpar(p);
      if (!p) return;
      if (p.length <= 170) { saida.push(p); return; }
      var atual = "";
      (p.match(/[^.!?;:]+[.!?;:]*\s*/g) || [p]).forEach(function (f) {
        if (atual && (atual + f).length > 170) { saida.push(atual.trim()); atual = f; }
        else atual += f;
      });
      if (atual.trim()) saida.push(atual.trim());
    });
    return saida;
  }

  /* ---------------- DESCRIÇÃO DE CADA TELA ---------------- */

  function dTitulo() {
    var prog = !!S.started || !!ld(), o = [];
    o.push(t2("Tela inicial do jogo Expedição Geográfica: Basic Geography. No alto está a logo do jogo, com uma bússola e montanhas verdes.",
              "Home screen of the game Geographic Expedition: Basic Geography. At the top is the game logo, with a compass and green mountains."));
    o.push(t2("É um jogo de Geografia com 5 fases. Cada fase tem 10 perguntas, conduzidas por um personagem guia.",
              "It is a Geography game with 5 phases. Each phase has 10 questions, led by a guide character."));
    o.push(t2("Menu com os botões: " + (prog ? "Continuar jogo, Opções, Créditos e Novo jogo." : "Jogar, Opções e Créditos."),
              "Menu with the buttons: " + (prog ? "Continue game, Options, Credits and New game." : "Play, Options and Credits.")));
    o.push(prog
      ? t2("Continuar jogo retoma de onde você parou. Novo jogo recomeça, depois de pedir a sua confirmação.",
           "Continue game resumes where you stopped. New game starts over, after asking for your confirmation.")
      : t2("Jogar começa uma nova partida.", "Play starts a new game."));
    o.push(t2("Opções tem som, música, salvamento, idioma e a caixa Apoios gratuitos, modo professor. Créditos mostra quem criou o jogo.",
              "Options has sound, music, saving, language and the Free supports checkbox, teacher mode. Credits shows who created the game."));
    var aviso = document.querySelector("#app .aviso");
    if (visivel(aviso)) o.push(t2("Aviso: o jogo salva o seu progresso automaticamente neste navegador, e você pode desativar isso em Configurações. O botão Entendi fecha o aviso.",
                                  "Notice: the game saves your progress automatically in this browser, and you can turn this off in Settings. The Got it button closes the notice."));
    var abertas = [].slice.call(document.querySelectorAll("#app details")).filter(function (d) { return d.open; });
    abertas.forEach(function (d) { o.push(texto(d)); });
    if (abertas.length < 2) o.push(t2("Há seções, Como jogar e Personagens-guia, que você pode abrir para ler as instruções.",
                                      "There are sections, How to play and Guide characters, that you can open to read the instructions."));
    return o;
  }

  function dCarregando() {
    return [t2("Carregando o jogo. Aguarde alguns segundos.", "Loading the game. Please wait a few seconds."), texto(document.querySelector("#app .load .card"))];
  }

  function dFases() {
    var o = [t2("Escolha a fase. Você tem " + pontos() + " pontos e " + nA() + " de 6 conquistas.",
                "Choose a phase. You have " + pontos() + " points and " + nA() + " of 6 achievements.")];
    PH.forEach(function (p, i) {
      var lib = i === 0 || S.done[i - 1], feita = S.done[i];
      var ok = S.pp[i].filter(function (x) { return x === 1; }).length;
      o.push(t2("Fase " + (i + 1) + ", " + p[1] + ", tema: " + p[2] + ". " + ok + " de 10 perguntas respondidas. " +
                (feita ? "Concluída." : lib ? "Disponível." : "Bloqueada: conclua a fase anterior."),
                "Phase " + (i + 1) + ", " + p[1] + ", theme: " + trs(p[2]) + ". " + ok + " of 10 questions answered. " +
                (feita ? "Completed." : lib ? "Available." : "Locked: complete the previous phase.")));
    });
    o.push(t2("O botão Voltar leva à tela inicial. O botão do carrinho abre a loja de apoios. A aba Conquistas mostra as suas conquistas.",
              "The Back button goes to the home screen. The cart button opens the support shop. The Achievements tab shows your achievements."));
    return o;
  }

  function dTabuleiro() {
    var st = S.pp[S.ph], T = S.t[0], certas = [], erradas = [], nx = -1, bloq = 0, k;
    for (k = 0; k < 10; k++) {
      var trava = k > 0 && st[k - 1] === 0;
      if (trava) { bloq++; continue; }
      if (st[k] === 1) certas.push(k + 1);
      else if (st[k] === 2) erradas.push(k + 1);
      if (st[k] !== 1 && nx < 0) nx = k;
    }
    var falta = P - T.pos, o = [];
    o.push(t2("Fase " + (S.ph + 1) + ", com " + PH[S.ph][1] + (S.ph === 4 ? ". Esta é a fase do Desafio Final, com perguntas difíceis." : "."),
              "Phase " + (S.ph + 1) + ", with " + PH[S.ph][1] + (S.ph === 4 ? ". This is the Final Challenge phase, with hard questions." : ".")));
    o.push(t2("Tabuleiro: você está na casa " + T.pos + " de " + P + ". Faltam " + falta + " acertos para " + (S.ph === 4 ? "concluir o Desafio Final." : "chegar à próxima fase."),
              "Board: you are on square " + T.pos + " of " + P + ". " + falta + " more correct answers to " + (S.ph === 4 ? "finish the Final Challenge." : "reach the next phase.")));
    o.push(certas.length ? t2("Perguntas respondidas corretamente: " + certas.join(", ") + ".", "Questions answered correctly: " + certas.join(", ") + ".")
                         : t2("Nenhuma pergunta foi respondida corretamente ainda.", "No question has been answered correctly yet."));
    if (erradas.length) o.push(t2("Perguntas para tentar de novo: " + erradas.join(", ") + ".", "Questions to try again: " + erradas.join(", ") + "."));
    if (nx >= 0) o.push(t2("A próxima pergunta disponível é a número " + (nx + 1) + ". Use o botão com esse número para abri-la.",
                           "The next available question is number " + (nx + 1) + ". Use the button with that number to open it."));
    if (bloq) o.push(t2("As outras " + bloq + " perguntas estão bloqueadas até você responder a anterior.",
                        "The other " + bloq + " questions are locked until you answer the previous one."));
    o.push(t2("O botão Voltar leva à escolha de fases. O botão do carrinho abre a loja.", "The Back button goes to the phase selection. The cart button opens the shop."));
    return o;
  }

  function dPergunta() {
    var q = Q[S.q], T = S.t[0], o = [];
    o.push(t2("Pergunta " + S.num + " da Fase " + (S.ph + 1) + ", com " + limpar(q[0]) + "." + (S.rev ? " Tentativa " + (S.rev + 1) + " de 3." : ""),
              "Question " + S.num + " of Phase " + (S.ph + 1) + ", with " + limpar(trs(q[0])) + "." + (S.rev ? " Attempt " + (S.rev + 1) + " of 3." : "")));
    var aviso = document.querySelector('#app .hint[role="alert"]');
    if (visivel(aviso)) o.push(texto(aviso));
    o.push(t2("Enunciado: ", "Question: ") + q[1]);
    o.push(t2("Alternativas disponíveis:", "Available options:"));
    S.ord.forEach(function (op, k) {
      if (S.ban.indexOf(op) < 0) o.push(t2("Alternativa ", "Option ") + String.fromCharCode(65 + k) + ": " + q[2][op]);
    });
    if (S.ban.length) o.push(t2("As alternativas já tentadas e erradas foram desativadas.", "The options already tried and wrong were disabled."));
    if (S.sel >= 0) o.push(t2("Alternativa selecionada: ", "Selected option: ") + String.fromCharCode(65 + S.ord.indexOf(S.sel)) + ".");
    o.push(t2("Para responder, escolha uma alternativa, escreva a sua justificativa no campo de texto, usando um conceito geográfico, e ative o botão Confirmar resposta.",
              "To answer, choose an option, write your justification in the text field using a geographic concept, and press the Confirm answer button."));
    var dica = document.querySelector('#app .hint[role="status"]');
    if (visivel(dica)) o.push(t2("Dica na tela: ", "Hint on screen: ") + texto(dica));
    var mochila = [].slice.call(document.querySelectorAll("#app button[data-u]")).map(texto).filter(Boolean);
    if (mochila.length) o.push(t2("Apoios guardados na mochila: ", "Supports stored in the backpack: ") + mochila.join(", ") + ".");
    o.push(t2("Você tem " + T.pts + " pontos. O botão do carrinho abre a loja de apoios. O botão Voltar leva ao tabuleiro.",
              "You have " + T.pts + " points. The cart button opens the support shop. The Back button goes to the board."));
    return o;
  }

  function dResultado() {
    var btn = document.querySelector("#app .res .c button");
    return [t2("Resultado.", "Result."), texto($("main-title")) + ".", texto(document.querySelector("#app .res .card")),
            t2("Botão disponível: ", "Available button: ") + texto(btn) + "."];
  }

  function dFaseConcluida() {
    return [texto($("main-title")) + ".", texto(document.querySelector("#app .res .card")), texto(document.querySelector("#app .res .hint")),
            t2("Botões: Próxima fase abre a fase liberada, e Voltar leva à escolha de fases.", "Buttons: Next phase opens the unlocked phase, and Back goes to the phase selection.")];
  }

  function dConquistas() {
    var o = [t2("Conquistas. Você desbloqueou " + nA() + " de 6.", "Achievements. You have unlocked " + nA() + " of 6.")];
    ACH.forEach(function (c, i) {
      var d = i < 5 ? S.done[i] : S.done.every(Boolean);
      var nome = tx(c[1], trs(c[1])), desc = tx(c[2], trs(c[2]));
      o.push(d ? t2("Conquistada: " + nome + ". " + desc, "Achieved: " + nome + ". " + desc)
               : t2("Bloqueada: " + nome + ". Para desbloquear, " + (i < 5 ? "conclua a Fase " + (i + 1) : "conclua todas as fases") + ".",
                    "Locked: " + nome + ". To unlock it, " + (i < 5 ? "complete Phase " + (i + 1) : "complete all the phases") + "."));
    });
    o.push(t2("O botão Voltar retorna à tela anterior.", "The Back button returns to the previous screen."));
    return o;
  }

  function dFim() {
    var cartoes = [].slice.call(document.querySelectorAll("#app .res .card")).map(function (c) {
      return c.querySelector("ul") ? "" : texto(c);
    }).filter(Boolean);
    return [texto($("main-title")) + ".", texto(document.querySelector("#app .res .bar"))].concat(cartoes,
      [t2("Há perguntas de autoavaliação para conversar em grupo. O botão Voltar ao início leva à tela inicial.",
          "There are self-assessment questions to discuss as a group. The Back to start button goes to the home screen.")]);
  }

  /* janelas por cima da tela */
  function dConfig() {
    return [t2("Janela de configurações.", "Settings window."),
      t2("Opções: Apoios gratuitos, modo professor, " + (FREE ? "ligado" : "desligado") + ". Som de efeito dos botões, " + (CFG.sfx ? "ligado" : "desligado") + ". Volume da música, " + CFG.vol + " por cento. Salvar progresso neste navegador, " +
         (CFG.save ? "ligado" : "desligado") + ". Botão Apagar progresso salvo. Idioma, atualmente " + (LANG === "en" ? "English" : "Português") + ". Botão Fechar. A tecla Esc também fecha a janela.",
         "Options: Free supports, teacher mode, " + (FREE ? "on" : "off") + ". Button sound effects, " + (CFG.sfx ? "on" : "off") + ". Music volume, " + CFG.vol + " percent. Save progress in this browser, " +
         (CFG.save ? "on" : "off") + ". Delete saved progress button. Language, currently " + (LANG === "en" ? "English" : "Portuguese") + ". Close button. The Esc key also closes the window.")];
  }
  function dLoja() {
    var o = [t2("Loja de apoios. Você tem " + pontos() + " pontos" + (FREE ? ", e os apoios estão gratuitos." : "."),
                "Support shop. You have " + pontos() + " points" + (FREE ? ", and the supports are free." : ".")),
             S.scr === "q" ? t2("Os apoios comprados aqui são usados na hora.", "Supports bought here are used right away.")
                           : t2("Os apoios comprados ficam guardados na mochila e podem ser usados em qualquer pergunta.", "Supports you buy are stored in the backpack and can be used in any question.")];
    SH.forEach(function (x) {
      o.push(t2(x[0] + ", " + (FREE ? "grátis" : x[1] + " pontos") + ": " + SD[x[2]],
                trs(x[0]) + ", " + (FREE ? "free" : x[1] + " points") + ": " + trs(SD[x[2]])));
    });
    o.push(t2("Botão Fechar. A tecla Esc também fecha a janela.", "Close button. The Esc key also closes the window."));
    return o;
  }
  function dConfirma() {
    return [t2("Confirmação. Começar um novo jogo apaga o progresso salvo e não pode ser desfeito.", "Confirmation. Starting a new game deletes the saved progress and cannot be undone."),
            t2("Dois botões: Sim, começar novo jogo, e Cancelar. O foco está em Cancelar.", "Two buttons: Yes, start a new game, and Cancel. Focus is on Cancel.")];
  }

  function dCreditos() {
    var o = [t2("Tela de créditos do jogo Expedição Geográfica: Basic Geography.", "Credits screen of the game Geographic Expedition: Basic Geography.")];
    [].slice.call(document.querySelectorAll("#app .cred")).forEach(function (c) {
      var itens = [].slice.call(c.querySelectorAll("li")).map(texto);
      o.push(itens.length ? texto(c.querySelector("h2")) + ": " + itens.join("; ") + "." : texto(c));
    });
    o.push(texto(document.querySelector("#app .cred-fim")));
    o.push(texto(document.querySelector("#app .copy")));
    o.push(t2("O botão Voltar leva à tela inicial.", "The Back button goes to the home screen."));
    return o;
  }

  var D = { title: dTitulo, credits: dCreditos, load: dCarregando, phases: dFases, board: dTabuleiro, q: dPergunta, res: dResultado, done: dFaseConcluida, ach: dConquistas, win: dFim };

  /** Lista de trechos a narrar para o que está na tela AGORA (janelas por cima têm prioridade). */
  function descrever() {
    if (CD) return dConfirma();
    if (CO) return dConfig();
    if (S.shop) return dLoja();
    return D[S.scr] ? D[S.scr]() : [];
  }

  /** "Assinatura" da tela: muda quando a tela ou uma janela muda. */
  function assinatura() { return S.scr + "|" + (CD ? 1 : 0) + (CO ? 1 : 0) + (S.shop ? 1 : 0); }
  function tituloTela() { var h = $("main-title"); return h ? limpar(h.innerText) : ""; }

  /* ---------------- voz ---------------- */

  /** Escolhe a melhor voz para o idioma: Google/natural > padrão do idioma > qualquer do mesmo idioma. */
  function escolherVoz() {
    voz = null;
    if (suportado) {
      var vs = window.speechSynthesis.getVoices() || [];
      var alvo = langFala().toLowerCase(), base = alvo.split("-")[0];
      var norm = function (v) { return (v.lang || "").replace("_", "-").toLowerCase(); };
      var melhor = function (l) {
        return l.filter(function (v) { return /google/i.test(v.name); })[0] ||
               l.filter(function (v) { return /natural|neural|online/i.test(v.name); })[0] ||
               l.filter(function (v) { return v.default; })[0] || l[0] || null;
      };
      voz = melhor(vs.filter(function (v) { return norm(v) === alvo; })) ||
            melhor(vs.filter(function (v) { return norm(v).split("-")[0] === base; })) || null;
    }
    var linha = $("a11y-voice");
    if (linha) linha.textContent = L().voz.replace("{v}", voz ? voz.name : L().vozPadrao);
  }

  function falar(i, g) {
    if (g !== geracao || estado !== "falando") return;
    if (i >= fila.length) { fimDaFala(); return; }
    pos = i;
    var u = new SpeechSynthesisUtterance(fila[i]);
    u.lang = langFala();
    if (voz) u.voice = voz;
    u.rate = CFG.rate;
    u.onend = function () { if (g === geracao && estado === "falando") falar(i + 1, g); };
    u.onerror = function (e) {
      if (g !== geracao) return;
      var er = e && e.error;
      if (er === "interrupted" || er === "canceled") return;
      estado = "parado"; duckMusic(false); status(L().erro.replace("{e}", er || "?")); atualizar();
    };
    try {
      window.speechSynthesis.speak(u);
    } catch (e) {                       // se o navegador recusar, não deixa a narração "travada"
      estado = "parado"; duckMusic(false); status(L().erro.replace("{e}", "speak")); atualizar();
    }
  }

  function fimDaFala() { estado = "parado"; fila = []; duckMusic(false); status(L().fim); atualizar(); }

  function ouvir() {
    if (!suportado) { status(L().semSuporte); return; }
    parar(true);
    fila = quebrar(descrever());
    if (!fila.length) { status(L().nada); return; }
    escolherVoz();
    geracao++;
    pos = 0; estado = "falando"; sig = assinatura();
    duckMusic(true);
    status(L().falando); atualizar();
    var g = geracao;
    setTimeout(function () { falar(0, g); }, 80);     // pequena pausa depois do cancel() (evita falhas no Chrome)
  }

  function pausar() {
    if (estado !== "falando") return;
    estado = "pausado"; geracao++;
    window.speechSynthesis.cancel();                   // o "continuar" retoma do trecho atual
    duckMusic(false); status(L().pausado); atualizar(); foco("a11y-resume");
  }

  function continuar() {
    if (estado !== "pausado") return;
    estado = "falando"; geracao++;
    duckMusic(true); status(L().falando); atualizar(); foco("a11y-pause");
    var g = geracao;
    setTimeout(function () { falar(pos, g); }, 80);
  }

  /** Encerra a narração. "silencioso" = sem mensagem (usado ao mudar de tela ou de idioma). */
  function parar(silencioso) {
    geracao++;
    if (suportado) { try { window.speechSynthesis.cancel(); } catch (e) { /* ignora */ } }
    var estava = estado;
    estado = "parado"; fila = []; pos = 0;
    duckMusic(false);
    atualizar();
    if (!silencioso) { status(L().parado); if (estava !== "parado") foco("a11y-listen"); }
  }

  /* ---------------- painel e botão ---------------- */

  function foco(id) { var e = $(id); if (e && !e.disabled) e.focus(); }
  function status(msg) { var e = $("a11y-status"); if (e) e.textContent = msg; }

  /** Habilita/desabilita os controles e mostra o estado atual. */
  function atualizar() {
    if (!painel) return;
    var f = estado === "falando", p = estado === "pausado";
    $("a11y-listen").disabled = !suportado;
    $("a11y-pause").disabled = !f;
    $("a11y-resume").disabled = !p;
    $("a11y-stop").disabled = estado === "parado";
    $("a11y-listen").classList.toggle("ativo", f || p);
    botao.classList.toggle("falando", f);
  }

  /** Escreve todos os textos do painel no idioma atual. */
  function rotular() {
    if (!painel) return;
    var t = L();
    botao.setAttribute("aria-label", t.btn);
    botao.title = t.btn;
    $("a11y-t").textContent = "🔊 " + t.titulo;
    $("a11y-x").setAttribute("aria-label", t.fechar);
    $("a11y-lg").textContent = t.idioma;
    $("a11y-rl").textContent = t.vel;
    $("a11y-rv").textContent = CFG.rate.toFixed(1) + "×";
    $("a11y-al").textContent = t.auto;
    $("a11y-listen").textContent = "🔊 " + t.ouvir;
    $("a11y-pause").textContent = "⏸️ " + t.pausar;
    $("a11y-resume").textContent = "▶️ " + t.continuar;
    $("a11y-stop").textContent = "⏹️ " + t.parar;
    [].slice.call(painel.querySelectorAll("[data-lang]")).forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.dataset.lang === LANG));
    });
    $("a11y-rate").value = CFG.rate;
    $("a11y-auto").checked = !!CFG.auto;
    if (!suportado) status(t.semSuporte);
    else if (estado === "parado") status(t.pronto);
  }

  function abrir() {
    painel.hidden = false;
    botao.setAttribute("aria-expanded", "true");
    rotular(); escolherVoz(); atualizar();
    foco("a11y-listen");
  }
  function fechar() {
    painel.hidden = true;
    botao.setAttribute("aria-expanded", "false");
    botao.focus();
  }

  function montar() {
    botao = document.createElement("button");
    botao.type = "button";
    botao.id = "a11y-btn";
    botao.className = "a11y-btn";
    botao.setAttribute("aria-haspopup", "dialog");
    botao.setAttribute("aria-expanded", "false");
    botao.setAttribute("aria-controls", "a11y-panel");
    botao.innerHTML = '<img src="assets/icons/acessibilidade.svg" alt="">';

    painel = document.createElement("div");
    painel.id = "a11y-panel";
    painel.className = "a11y-panel";
    painel.setAttribute("role", "dialog");
    painel.setAttribute("aria-labelledby", "a11y-t");
    painel.hidden = true;
    painel.innerHTML =
      '<button type="button" id="a11y-x" class="a11y-close back">✕</button>' +
      '<h2 id="a11y-t"></h2>' +
      '<div class="a11y-row" role="group" aria-labelledby="a11y-lg"><span class="a11y-lab" id="a11y-lg"></span>' +
      '<div class="a11y-langs"><button type="button" data-lang="pt">🇧🇷 Português (PT-BR)</button><button type="button" data-lang="en">🇺🇸 English (US)</button></div></div>' +
      '<div class="a11y-row"><label for="a11y-rate"><span id="a11y-rl"></span>: <b id="a11y-rv"></b></label>' +
      '<input type="range" id="a11y-rate" min="0.6" max="1.6" step="0.1"></div>' +
      '<div class="a11y-row"><label class="chk"><input type="checkbox" id="a11y-auto"><span id="a11y-al"></span></label></div>' +
      '<div class="a11y-ctrl"><button type="button" id="a11y-listen"></button><button type="button" id="a11y-pause"></button>' +
      '<button type="button" id="a11y-resume"></button><button type="button" id="a11y-stop"></button></div>' +
      '<p class="a11y-status" id="a11y-status" role="status" aria-live="polite"></p>' +
      '<p class="a11y-voice" id="a11y-voice"></p>';
    document.body.appendChild(botao);
    document.body.appendChild(painel);
  }

  function ligar() {
    botao.onclick = function () { if (painel.hidden) abrir(); else fechar(); };
    $("a11y-x").onclick = fechar;
    $("a11y-listen").onclick = ouvir;
    $("a11y-pause").onclick = pausar;
    $("a11y-resume").onclick = continuar;
    $("a11y-stop").onclick = function () { parar(false); };
    [].slice.call(painel.querySelectorAll("[data-lang]")).forEach(function (b) {
      b.onclick = function () {
        if (b.dataset.lang === LANG) return;
        setLang(b.dataset.lang);      // troca o idioma do jogo todo (também chama onLang → rotular)
        savePrefs();
        render();
      };
    });
    $("a11y-rate").oninput = function () { CFG.rate = clamp(+this.value, 0.6, 1.6); $("a11y-rv").textContent = CFG.rate.toFixed(1) + "×"; savePrefs(); };
    $("a11y-auto").onchange = function () { CFG.auto = this.checked; savePrefs(); };
    // Esc fecha o painel (antes de qualquer outra janela do jogo)
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !painel.hidden) { e.stopImmediatePropagation(); e.preventDefault(); fechar(); }
    }, true);
    if (suportado && "onvoiceschanged" in window.speechSynthesis) window.speechSynthesis.onvoiceschanged = escolherVoz;
  }

  /* ---------------- ganchos chamados pelo resto do jogo ---------------- */
  return {
    init: function () { montar(); ligar(); rotular(); escolherVoz(); atualizar(); },
    /** A tela mudou: para a narração antiga e (se o jogador quiser) já descreve a nova. */
    onScreen: function () {
      if (!painel) return;
      if (estado !== "parado") parar(true);
      status(L().novaTela.replace("{t}", tituloTela()));
      if (CFG.auto && suportado) setTimeout(ouvir, 500);
    },
    /** O idioma mudou: refaz os textos do painel e a escolha da voz. */
    onLang: function () {
      if (!painel) return;
      parar(true); rotular(); escolherVoz();
    },
    /** Depois de qualquer redesenho: se uma janela abriu/fechou durante a fala, para (o conteúdo mudou). */
    afterRender: function () {
      if (painel && estado !== "parado" && assinatura() !== sig) { parar(true); status(L().novaTela.replace("{t}", tituloTela())); }
    },
    isSpeaking: function () { return estado === "falando"; },
    describe: descrever,
    state: function () { return estado; },
    voice: function () { return voz ? voz.name : null; },
    open: abrir, close: fechar,
    listen: ouvir, pause: pausar, resume: continuar, stop: function () { parar(false); }
  };
})();
