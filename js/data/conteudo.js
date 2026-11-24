/* conteudo.js — dados fixos do jogo: fases, conquistas, loja e personagens.
 * Os textos aqui estão em português; a tradução para o inglês fica em data/ui-en.js. */

/* Imagens usadas dentro do jogo (caminhos relativos ao index.html) */
var IM = {
  logo: "assets/images/logo.png",      // logo (tela inicial e créditos)
  cv: "assets/images/capa.jpg",        // capa (tela final)
  ok: "assets/images/acerto.png",      // banner de ACERTO ("Você cartou, Parabéns!")
  no: "assets/images/erro.png"         // banner de ERRO ("Você errou, Tente novamente")
};

/* Tentativas por pergunta. Com 1, ao errar o jogo já explica a resposta (a pergunta fica marcada
 * para tentar de novo depois, pelo tabuleiro). Se mudar este número, revise também os textos que
 * falam de tentativas (regras na tela inicial e dica da tela de carregamento). */
var TENTATIVAS = 1;

/* Tabuleiro: casas de 0 (Início) a P (Próxima fase). */
var P = 10;
/* Posição [coluna, linha] das casas 1 a 9 na grade de 8 colunas do tabuleiro. */
var CL = [[2, 1], [3, 1], [4, 1], [4, 2], [4, 3], [5, 3], [6, 3], [6, 2], [7, 2]];

/* Imagens dos personagens, NA ORDEM DAS FASES: 0 Alex, 1 Gaia, 2 Nico, 3 Luna, 4 Ravi.
 *  cheio = imagem inteira (conquistas) | rosto = recorte do rosto (ícones, peões, botões) */
var AVATARES = [
  { id: "alex", cheio: "assets/images/personagens/alex.png", rosto: "assets/images/personagens/alex-rosto.png" },
  { id: "gaia", cheio: "assets/images/personagens/gaia.png", rosto: "assets/images/personagens/gaia-rosto.png" },
  { id: "nico", cheio: "assets/images/personagens/nico.png", rosto: "assets/images/personagens/nico-rosto.png" },
  { id: "luna", cheio: "assets/images/personagens/luna.png", rosto: "assets/images/personagens/luna-rosto.png" },
  { id: "ravi", cheio: "assets/images/personagens/ravi.png", rosto: "assets/images/personagens/ravi-rosto.png" }
];

/* Fases: [ícone (emoji reserva), personagem, tema]. Na tela aparece a IMAGEM do personagem (AVATARES). */
var PH = [
  ["🧭", "Alex", "Exploração e localização"],
  ["🌍", "Gaia", "Sociedade e economia"],
  ["🗺️", "Nico", "Mapas e cartografia"],
  ["☀️", "Luna", "Clima e relevo"],
  ["🍃", "Ravi", "Desafio Final · perguntas difíceis"]
];

/* Conquistas: [ícone (emoji reserva), nome, descrição]. As 5 primeiras mostram a imagem do personagem da fase
 * (AVATARES); a 6ª é o REI DA GEOGRAFIA e usa o troféu 🏆. */
var ACH = [
  ["🧭", "Explorador Iniciante", "Concluiu a Fase 1 com Alex: orientação e localização."],
  ["🌍", "Analista da Sociedade", "Concluiu a Fase 2 com Gaia: sociedade e economia."],
  ["🗺️", "Olhar Cartográfico", "Concluiu a Fase 3 com Nico: mapas e coordenadas."],
  ["☀️", "Investigador do Planeta", "Concluiu a Fase 4 com Luna: clima e relevo."],
  ["🏅", "Mestre da Expedição", "Concluiu o Desafio Final com Ravi e terminou a expedição."],
  ["🏆", "REI DA GEOGRAFIA", "Completou todas as fases da expedição. Você é o rei (ou a rainha) da Geografia!"]
];

/* Loja de apoios: [nome, preço em pontos, código]. SI = ícone, SD = descrição. */
var SH = [
  ["Pista simples", 10, "s"],
  ["Pista detalhada", 15, "d"],
  ["Explicação de conceito", 20, "e"],
  ["Glossário", 10, "g"],
  ["Ajuda especializada", 30, "h"]
];
var SI = { s: "💡", d: "🔎", e: "📘", g: "📖", h: "🙋" };
var SD = {
  s: "Uma dica sobre a pergunta.",
  d: "Elimina duas alternativas incorretas.",
  e: "Explica o conceito geográfico da pergunta.",
  g: "Lista os termos geográficos do jogo.",
  h: "O professor orienta o grupo, sem dar a resposta."
};

/* Personagens-guia: [ícone, nome, o que faz] */
var CHR = [
  ["🧭", "Alex, o Explorador", "conduz a expedição e incentiva a observar pistas"],
  ["🌍", "Gaia, a Geógrafa", "relaciona natureza, sociedade e economia"],
  ["🗺️", "Nico, o Cartógrafo", "mapas, legendas, pontos cardeais e coordenadas"],
  ["☀️", "Luna, a Climatologista", "clima, vegetação, relevo e fenômenos naturais"],
  ["🍃", "Ravi, o Guardião do Planeta", "sustentabilidade e o Desafio Final"]
];
