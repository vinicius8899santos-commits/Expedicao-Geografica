/* conteudo.js — dados fixos do jogo: fases, conquistas, loja e personagens.
 * Os textos aqui estão em português; a tradução para o inglês fica em data/ui-en.js. */

/* Imagens usadas dentro do jogo (caminhos relativos ao index.html) */
var IM = {
  logo: "assets/images/logo.png",      // logo (tela inicial e créditos)
  cv: "assets/images/capa.jpg",        // capa (tela final)
  ex: "assets/images/explorador.png"   // explorador (telas de resultado)
};

/* Tabuleiro: casas de 0 (Início) a P (Próxima fase). */
var P = 10;
/* Posição [coluna, linha] das casas 1 a 9 na grade de 8 colunas do tabuleiro. */
var CL = [[2, 1], [3, 1], [4, 1], [4, 2], [4, 3], [5, 3], [6, 3], [6, 2], [7, 2]];

/* Fases: [ícone, personagem, tema] */
var PH = [
  ["🧭", "Alex", "Exploração e localização"],
  ["🌍", "Gaia", "Sociedade e economia"],
  ["🗺️", "Nico", "Mapas e cartografia"],
  ["☀️", "Luna", "Clima e relevo"],
  ["🍃", "Ravi", "Desafio Final · perguntas difíceis"]
];

/* Conquistas: [ícone, nome, descrição]. As 5 primeiras são das fases; a 6ª é o REI DA GEOGRAFIA. */
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
