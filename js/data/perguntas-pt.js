/* perguntas-pt.js — AS 50 PERGUNTAS DO JOGO (português)
 *
 * Cada pergunta tem 5 campos, nesta ordem:
 *   [personagem, enunciado, [alternativas], dica, explicação]
 * - A PRIMEIRA alternativa é sempre a correta (o jogo embaralha ao mostrar).
 * - São 10 perguntas por fase: índices 0-9 = Fase 1, 10-19 = Fase 2, e assim por diante.
 * - Para editar a versão em inglês, veja perguntas-en.js (mesma ordem).
 */
var Q = [
  // ===== FASE 1 · Alex · Tópico 1: Orientação e pontos cardeais =====
  [
    "🧭 Alex, o Explorador",
    "Quais são os quatro pontos cardeais principais utilizados para orientação geográfica?",   // enunciado
    ["Norte, Sul, Leste e Oeste.", "Norte, Sul, Superior e Inferior.", "Nordeste, Sudeste, Noroeste e Sudoeste.", "Direita, Esquerda, Frente e Trás."],   // alternativas: a CORRETA é sempre a 1ª (o jogo embaralha na tela)
    "Pense nas quatro direções principais de uma bússola.",   // dica
    "Os pontos cardeais são Norte, Sul, Leste e Oeste. Os outros nomes são colaterais ou direções relativas."    // explicação
  ],
  [
    "🧭 Alex, o Explorador",
    "O Sol nasce aproximadamente em qual direção?",   // enunciado
    ["Leste.", "Norte.", "Sul.", "Oeste."],   // alternativas: a CORRETA é sempre a 1ª (o jogo embaralha na tela)
    "Pense no amanhecer: de que lado o dia começa a clarear?",   // dica
    "O Sol nasce a Leste (nascente) e se põe a Oeste (poente)."    // explicação
  ],
  [
    "🧭 Alex, o Explorador",
    "Se uma pessoa está olhando para o Norte, qual direção estará à sua direita?",   // enunciado
    ["Leste.", "Oeste.", "Sul.", "Noroeste."],   // alternativas: a CORRETA é sempre a 1ª (o jogo embaralha na tela)
    "Imagine uma bússola: girando no sentido horário a partir do Norte, qual vem primeiro?",   // dica
    "Olhando para o Norte, o Leste fica à direita e o Oeste à esquerda."    // explicação
  ],
  [
    "🧭 Alex, o Explorador",
    "Uma pessoa está de frente para o Leste. Se ela girar 90° para a esquerda, para qual direção ficará voltada?",   // enunciado
    ["Norte.", "Sul.", "Oeste.", "Nordeste."],   // alternativas: a CORRETA é sempre a 1ª (o jogo embaralha na tela)
    "Girar para a esquerda é o sentido anti-horário.",   // dica
    "Do Leste, um giro de 90° para a esquerda leva ao Norte."    // explicação
  ],
  [
    "🧭 Alex, o Explorador",
    "Um estudante observa o Sol se pondo à sua frente. Considerando a posição aproximada do pôr do sol, para qual direção ele está olhando?",   // enunciado
    ["Oeste.", "Norte.", "Leste.", "Sul."],   // alternativas: a CORRETA é sempre a 1ª (o jogo embaralha na tela)
    "Pense no entardecer: o Sol se põe do lado oposto ao do amanhecer.",   // dica
    "O Sol se põe a Oeste. Se ele está à frente do estudante, ele olha para o Oeste."    // explicação
  ],
  [
    "🧭 Alex, o Explorador",
    "Em uma rosa dos ventos, o ponto colateral localizado entre o Norte e o Oeste é chamado de:",   // enunciado
    ["Noroeste.", "Nordeste.", "Sudeste.", "Sudoeste."],   // alternativas: a CORRETA é sempre a 1ª (o jogo embaralha na tela)
    "Junte os nomes das duas direções, começando pelo Norte.",   // dica
    "O ponto colateral entre o Norte e o Oeste é o Noroeste."    // explicação
  ],
  [
    "🧭 Alex, o Explorador",
    "Uma escola está localizada ao norte de uma praça. Em relação à escola, onde está localizada a praça?",   // enunciado
    ["Ao sul.", "Ao norte.", "A leste.", "A oeste."],   // alternativas: a CORRETA é sempre a 1ª (o jogo embaralha na tela)
    "Inverta a relação: se A está ao norte de B, onde está B?",   // dica
    "Se a escola está ao norte da praça, a praça está ao sul da escola."    // explicação
  ],
  [
    "🧭 Alex, o Explorador",
    "Durante uma caminhada, um explorador segue para o Norte. Depois, vira à direita e caminha para o Leste. Em seguida, vira novamente à direita. Qual é a direção em que ele estará caminhando?",   // enunciado
    ["Sul.", "Norte.", "Leste.", "Oeste."],   // alternativas: a CORRETA é sempre a 1ª (o jogo embaralha na tela)
    "Cada virada à direita é um giro de 90° no sentido horário.",   // dica
    "Norte, depois à direita é Leste, e novamente à direita é Sul."    // explicação
  ],
  [
    "🧭 Alex, o Explorador",
    "Uma cidade A está localizada a oeste de uma cidade B. Uma cidade C está localizada ao sul da cidade A. Em relação à cidade B, a cidade C está situada:",   // enunciado
    ["A sudoeste.", "A nordeste.", "A sudeste.", "A noroeste."],   // alternativas: a CORRETA é sempre a 1ª (o jogo embaralha na tela)
    "Desenhe: A à esquerda de B, e C abaixo de A.",   // dica
    "C fica abaixo e à esquerda de B, ou seja, a sudoeste."    // explicação
  ],
  [
    "🧭 Alex, o Explorador",
    "Um viajante utiliza uma bússola para se orientar em uma região desconhecida. Entretanto, ele percebe que a agulha sofre interferência quando se aproxima de determinados equipamentos metálicos e eletrônicos. Isso acontece porque:",   // enunciado
    ["Campos magnéticos próximos podem alterar a orientação da agulha.", "A bússola identifica a temperatura do ambiente.", "A agulha aponta sempre para o ponto mais alto do terreno.", "A bússola depende da luz solar para funcionar."],   // alternativas: a CORRETA é sempre a 1ª (o jogo embaralha na tela)
    "A agulha da bússola é magnética.",   // dica
    "A agulha reage ao magnetismo. Equipamentos metálicos e eletrônicos criam campos magnéticos que a desviam."    // explicação
  ],

  // ===== FASE 2 · Gaia · Tópico 2: Continentes e relações espaciais =====
  [
    "🌍 Gaia, a Geógrafa",
    "Qual é o maior continente do planeta em extensão territorial?",   // enunciado
    ["Ásia.", "África.", "Europa.", "Oceania."],   // alternativas: a CORRETA é sempre a 1ª (o jogo embaralha na tela)
    "Ele abriga países como China e Índia.",   // dica
    "A Ásia é o maior continente em área e também em população."    // explicação
  ],
  [
    "🌍 Gaia, a Geógrafa",
    "Em qual continente está localizado o Brasil?",   // enunciado
    ["América.", "Europa.", "África.", "Ásia."],   // alternativas: a CORRETA é sempre a 1ª (o jogo embaralha na tela)
    "O Brasil fica a oeste do Oceano Atlântico.",   // dica
    "O Brasil está na América, mais precisamente na América do Sul."    // explicação
  ],
  [
    "🌍 Gaia, a Geógrafa",
    "Qual oceano banha a costa brasileira?",   // enunciado
    ["Oceano Atlântico.", "Oceano Índico.", "Oceano Pacífico.", "Oceano Glacial Ártico."],   // alternativas: a CORRETA é sempre a 1ª (o jogo embaralha na tela)
    "Ele separa a América da África e da Europa.",   // dica
    "O litoral brasileiro é banhado pelo Oceano Atlântico."    // explicação
  ],
  [
    "🌍 Gaia, a Geógrafa",
    "O Brasil faz fronteira com diversos países sul-americanos. Qual dos países abaixo NÃO faz fronteira terrestre com o Brasil?",   // enunciado
    ["Chile.", "Argentina.", "Peru.", "Bolívia."],   // alternativas: a CORRETA é sempre a 1ª (o jogo embaralha na tela)
    "O Brasil tem fronteira com quase todos os países da América do Sul, exceto dois.",   // dica
    "O Brasil faz fronteira com quase todos os países sul-americanos, exceto Chile e Equador."    // explicação
  ],
  [
    "🌍 Gaia, a Geógrafa",
    "A Europa e a Ásia formam uma grande massa continental frequentemente denominada Eurásia. Essa denominação está relacionada:",   // enunciado
    ["À proximidade entre os continentes e à continuidade de suas terras.", "À separação completa entre os continentes por um oceano.", "À existência de um único país que ocupa toda a região.", "Ao fato de os dois continentes estarem localizados exclusivamente no Hemisfério Sul."],   // alternativas: a CORRETA é sempre a 1ª (o jogo embaralha na tela)
    "Pense em terras que não são separadas pelo mar.",   // dica
    "Europa e Ásia compartilham uma grande extensão de terra contínua, por isso são tratadas juntas como Eurásia."    // explicação
  ],
  [
    "🌍 Gaia, a Geógrafa",
    "Uma viagem aérea parte do Brasil em direção à África Ocidental, atravessando o Oceano Atlântico. Qual relação espacial está sendo representada?",   // enunciado
    ["A América do Sul e a África são separadas pelo Oceano Atlântico.", "A África está inteiramente localizada ao sul do Brasil.", "A América do Sul e a África são separadas pelo Oceano Pacífico.", "O Brasil está localizado no continente africano."],   // alternativas: a CORRETA é sempre a 1ª (o jogo embaralha na tela)
    "Observe qual oceano a viagem atravessa.",   // dica
    "Como a viagem cruza o Atlântico, é ele que separa a América do Sul da África."    // explicação
  ],
  [
    "🌍 Gaia, a Geógrafa",
    "A Linha do Equador atravessa áreas de diferentes continentes. Qual alternativa apresenta dois continentes atravessados por essa linha?",   // enunciado
    ["América do Sul e África.", "Europa e Oceania.", "Europa e Antártida.", "América do Norte e Europa."],   // alternativas: a CORRETA é sempre a 1ª (o jogo embaralha na tela)
    "A linha passa por regiões tropicais, como a Amazônia e a bacia do Congo.",   // dica
    "A Linha do Equador cruza a América do Sul e a África (e também passa por partes da Ásia e da Oceania). Ela não cruza a Europa."    // explicação
  ],
  [
    "🌍 Gaia, a Geógrafa",
    "Um pesquisador compara as condições naturais e econômicas de países situados em diferentes continentes. Ele observa que países de uma mesma região podem apresentar diferenças significativas de renda, industrialização e qualidade de vida. Essa observação demonstra que:",   // enunciado
    ["Os continentes apresentam grande diversidade interna, tanto natural quanto socioeconômica.", "Todos os países de um continente possuem o mesmo nível de desenvolvimento.", "A localização continental determina sozinha a riqueza de um país.", "Os países desenvolvidos estão concentrados em um único continente."],   // alternativas: a CORRETA é sempre a 1ª (o jogo embaralha na tela)
    "Se países vizinhos são tão diferentes, o que isso mostra sobre o continente?",   // dica
    "Países de uma mesma região podem ser muito diferentes, o que mostra a diversidade interna dos continentes."    // explicação
  ],
  [
    "🌍 Gaia, a Geógrafa",
    "A posição geográfica de um território pode influenciar suas relações comerciais. Um país com extensas áreas costeiras e portos bem estruturados pode apresentar vantagens para o comércio marítimo porque:",   // enunciado
    ["Facilita o transporte de mercadorias para outros países por rotas marítimas.", "Elimina a necessidade de transporte terrestre.", "Impede a ocorrência de importações.", "Garante que todos os seus habitantes tenham a mesma renda."],   // alternativas: a CORRETA é sempre a 1ª (o jogo embaralha na tela)
    "Pense em navios levando e trazendo mercadorias.",   // dica
    "Costa extensa e bons portos facilitam o transporte de produtos por mar, mas não eliminam o transporte terrestre."    // explicação
  ],
  [
    "🌍 Gaia, a Geógrafa",
    "Um mapa apresenta a localização de quatro cidades: Cidade P: 10° N, 30° O. Cidade Q: 10° S, 30° O. Cidade R: 10° N, 20° O. Cidade S: 20° N, 30° O. Qual cidade está localizada mais ao sul?",   // enunciado
    ["Cidade Q.", "Cidade P.", "Cidade R.", "Cidade S."],   // alternativas: a CORRETA é sempre a 1ª (o jogo embaralha na tela)
    "Compare as latitudes: o Hemisfério Sul fica abaixo do Equador.",   // dica
    "A cidade Q está a 10° S, no Hemisfério Sul. As outras ficam ao norte do Equador."    // explicação
  ],

  // ===== FASE 3 · Nico · Tópico 3: Mapas, legendas e coordenadas =====
  [
    "🗺️ Nico, o Cartógrafo",
    "Qual é a principal função de uma legenda em um mapa?",   // enunciado
    ["Explicar o significado dos símbolos e das cores utilizados.", "Indicar a idade de todas as cidades representadas.", "Substituir a escala cartográfica.", "Informar apenas a população mundial."],   // alternativas: a CORRETA é sempre a 1ª (o jogo embaralha na tela)
    "Ela “traduz” o que o mapa mostra.",   // dica
    "A legenda explica o que cada símbolo e cada cor do mapa representam."    // explicação
  ],
  [
    "🗺️ Nico, o Cartógrafo",
    "Quais linhas imaginárias são utilizadas para determinar a latitude?",   // enunciado
    ["Os paralelos.", "Os meridianos.", "Os trópicos exclusivamente.", "Os círculos polares exclusivamente."],   // alternativas: a CORRETA é sempre a 1ª (o jogo embaralha na tela)
    "Elas são horizontais, paralelas à Linha do Equador.",   // dica
    "A latitude é medida pelos paralelos. Os meridianos medem a longitude."    // explicação
  ],
  [
    "🗺️ Nico, o Cartógrafo",
    "Qual é a principal função da escala cartográfica?",   // enunciado
    ["Mostrar a relação entre as distâncias no mapa e as distâncias reais.", "Indicar a temperatura dos lugares representados.", "Identificar os idiomas falados em cada país.", "Mostrar apenas os limites políticos."],   // alternativas: a CORRETA é sempre a 1ª (o jogo embaralha na tela)
    "Ela compara o tamanho no papel com o tamanho real.",   // dica
    "A escala mostra quantas vezes a realidade foi reduzida para caber no mapa."    // explicação
  ],
  [
    "🗺️ Nico, o Cartógrafo",
    "Em um mapa de escala 1:100.000, a distância entre duas cidades é de 4 cm. Qual é a distância real aproximada entre elas?",   // enunciado
    ["4 quilômetros.", "400 metros.", "40 quilômetros.", "400 quilômetros."],   // alternativas: a CORRETA é sempre a 1ª (o jogo embaralha na tela)
    "Multiplique 4 cm por 100.000 e converta o resultado para quilômetros.",   // dica
    "4 × 100.000 = 400.000 cm, que equivalem a 4.000 m ou 4 km."    // explicação
  ],
  [
    "🗺️ Nico, o Cartógrafo",
    "A latitude de um ponto é de 25° S. Essa informação indica que o ponto está:",   // enunciado
    ["A 25° ao sul da Linha do Equador.", "A 25° a leste do Meridiano de Greenwich.", "A 25° a oeste do Meridiano de Greenwich.", "Sobre a Linha do Equador."],   // alternativas: a CORRETA é sempre a 1ª (o jogo embaralha na tela)
    "A latitude é medida a partir do Equador.",   // dica
    "Latitude 25° S significa 25° ao sul da Linha do Equador."    // explicação
  ],
  [
    "🗺️ Nico, o Cartógrafo",
    "Dois pontos possuem as seguintes coordenadas: Ponto A: 15° N, 40° O. Ponto B: 15° N, 20° O. O que podemos concluir sobre esses pontos?",   // enunciado
    ["Estão na mesma latitude, mas em longitudes diferentes.", "Estão na mesma longitude, mas em latitudes diferentes.", "Estão no mesmo local geográfico.", "Estão necessariamente em continentes diferentes."],   // alternativas: a CORRETA é sempre a 1ª (o jogo embaralha na tela)
    "Compare primeiro as latitudes e depois as longitudes.",   // dica
    "Os dois estão a 15° N (mesma latitude), mas em longitudes diferentes (40° O e 20° O)."    // explicação
  ],
  [
    "🗺️ Nico, o Cartógrafo",
    "Em um mapa temático sobre a distribuição da população, diferentes tonalidades representam a densidade demográfica das regiões. Esse tipo de mapa permite:",   // enunciado
    ["Comparar a concentração de habitantes entre diferentes áreas.", "Identificar diretamente a composição química do solo.", "Determinar com exatidão a temperatura de cada cidade.", "Descobrir a altitude exata de todas as construções."],   // alternativas: a CORRETA é sempre a 1ª (o jogo embaralha na tela)
    "Um mapa temático mostra apenas o assunto que ele representa.",   // dica
    "Aqui o tema é a população: o mapa permite comparar onde há mais ou menos habitantes."    // explicação
  ],
  [
    "🗺️ Nico, o Cartógrafo",
    "Em um mapa de escala 1:250.000, a distância entre dois municípios é de 8 cm. Qual é a distância real entre eles?",   // enunciado
    ["20 km.", "2 km.", "8 km.", "200 km."],   // alternativas: a CORRETA é sempre a 1ª (o jogo embaralha na tela)
    "Calcule 8 × 250.000 e converta de centímetros para quilômetros.",   // dica
    "8 × 250.000 = 2.000.000 cm, que equivalem a 20 km."    // explicação
  ],
  [
    "🗺️ Nico, o Cartógrafo",
    "Um mapa apresenta muitos detalhes de uma pequena área urbana, enquanto outro representa um país inteiro com menos detalhes. Considerando a escala cartográfica, é correto afirmar que:",   // enunciado
    ["O mapa urbano provavelmente possui escala maior e representa uma área menor com mais detalhes.", "O mapa do país possui necessariamente escala maior porque representa uma área maior.", "Os dois mapas possuem obrigatoriamente a mesma escala.", "A quantidade de detalhes não tem relação com a escala cartográfica."],   // alternativas: a CORRETA é sempre a 1ª (o jogo embaralha na tela)
    "Quanto menos o terreno é reduzido, mais detalhes cabem no mapa.",   // dica
    "Uma escala maior (menos redução) mostra áreas menores com mais detalhes."    // explicação
  ],
  [
    "🗺️ Nico, o Cartógrafo",
    "A cidade X está localizada a 30° S e 50° O. A cidade Y está localizada a 10° S e 50° O. Considerando apenas essas coordenadas, podemos afirmar que:",   // enunciado
    ["X está ao sul de Y, e ambas possuem a mesma longitude.", "X está ao norte de Y.", "Y está ao sul de X.", "X e Y estão em hemisférios diferentes."],   // alternativas: a CORRETA é sempre a 1ª (o jogo embaralha na tela)
    "Compare as latitudes e as longitudes das duas cidades.",   // dica
    "As duas estão a 50° O, e 30° S fica mais ao sul que 10° S, ambas no mesmo hemisfério."    // explicação
  ],

  // ===== FASE 4 · Luna · Tópico 4: Clima, paisagens e água =====
  [
    "☀️ Luna, a Climatologista",
    "Qual alternativa apresenta um elemento do clima?",   // enunciado
    ["Temperatura.", "População.", "Longitude.", "Industrialização."],   // alternativas: a CORRETA é sempre a 1ª (o jogo embaralha na tela)
    "Pense no que um termômetro mede.",   // dica
    "Temperatura, umidade, pressão e ventos são elementos do clima."    // explicação
  ],
  [
    "☀️ Luna, a Climatologista",
    "Qual é a principal fonte de energia responsável pelo aquecimento da superfície terrestre e pela movimentação do ciclo da água?",   // enunciado
    ["Sol.", "Lua.", "Vento.", "Solo."],   // alternativas: a CORRETA é sempre a 1ª (o jogo embaralha na tela)
    "É a estrela do nosso sistema.",   // dica
    "A energia do Sol aquece a superfície e move o ciclo da água."    // explicação
  ],
  [
    "☀️ Luna, a Climatologista",
    "Como se chama o processo em que a água líquida passa para o estado gasoso devido ao aquecimento?",   // enunciado
    ["Evaporação.", "Condensação.", "Solidificação.", "Precipitação."],   // alternativas: a CORRETA é sempre a 1ª (o jogo embaralha na tela)
    "É o contrário de condensar.",   // dica
    "Na evaporação, a água líquida vira vapor ao ser aquecida."    // explicação
  ],
  [
    "☀️ Luna, a Climatologista",
    "Uma cidade apresenta temperaturas elevadas durante quase todo o ano e chuvas concentradas em determinada estação, seguida por um período seco. Esse padrão pode estar associado a um clima:",   // enunciado
    ["Tropical com estação seca.", "Polar.", "Desértico frio.", "Temperado continental rigoroso."],   // alternativas: a CORRETA é sempre a 1ª (o jogo embaralha na tela)
    "Calor quase o ano todo, com uma estação chuvosa e outra seca.",   // dica
    "O clima tropical tem calor constante e chuvas concentradas em uma estação, seguida de período seco."    // explicação
  ],
  [
    "☀️ Luna, a Climatologista",
    "O desmatamento de áreas próximas às nascentes de um rio pode provocar:",   // enunciado
    ["Maior erosão do solo e possível assoreamento do rio.", "Maior proteção natural do solo contra a erosão.", "Eliminação definitiva das secas na região.", "Aumento garantido da qualidade da água."],   // alternativas: a CORRETA é sempre a 1ª (o jogo embaralha na tela)
    "A vegetação segura o solo.",   // dica
    "Sem vegetação, o solo é arrastado pela chuva e se acumula no leito do rio (assoreamento)."    // explicação
  ],
  [
    "☀️ Luna, a Climatologista",
    "A diferença entre tempo atmosférico e clima está corretamente apresentada em:",   // enunciado
    ["Tempo atmosférico descreve condições momentâneas, enquanto clima corresponde a padrões observados durante longos períodos.", "Tempo atmosférico é sempre quente, enquanto clima é sempre frio.", "Clima muda a cada hora, enquanto o tempo permanece constante.", "Os dois conceitos possuem exatamente o mesmo significado."],   // alternativas: a CORRETA é sempre a 1ª (o jogo embaralha na tela)
    "Um é o “agora”; o outro é o padrão de muitos anos.",   // dica
    "Tempo é a condição do momento. Clima é o padrão observado ao longo de muitos anos."    // explicação
  ],
  [
    "☀️ Luna, a Climatologista",
    "A construção de grandes cidades pode modificar as condições térmicas locais. Um exemplo desse fenômeno é:",   // enunciado
    ["A formação de ilhas de calor devido à concentração de construções, asfalto e pouca vegetação.", "A formação de geleiras urbanas.", "A redução permanente da temperatura em todas as ruas.", "O desaparecimento completo das chuvas nas áreas urbanas."],   // alternativas: a CORRETA é sempre a 1ª (o jogo embaralha na tela)
    "Asfalto e concreto esquentam muito.",   // dica
    "Construções, asfalto e pouca vegetação retêm calor e formam ilhas de calor."    // explicação
  ],
  [
    "☀️ Luna, a Climatologista",
    "Uma região apresenta chuvas intensas durante vários meses, temperaturas elevadas e vegetação adaptada à grande disponibilidade de água. Qual alternativa apresenta uma conclusão coerente?",   // enunciado
    ["A disponibilidade de água e as condições térmicas influenciam a vegetação local.", "A região necessariamente possui clima polar.", "A vegetação não depende das condições climáticas.", "A presença de chuvas impede o desenvolvimento de qualquer tipo de solo."],   // alternativas: a CORRETA é sempre a 1ª (o jogo embaralha na tela)
    "Clima e vegetação estão ligados.",   // dica
    "A água disponível e a temperatura influenciam o tipo de vegetação de cada lugar."    // explicação
  ],
  [
    "☀️ Luna, a Climatologista",
    "Em determinada bacia hidrográfica, a retirada da vegetação das encostas aumenta o escoamento superficial da água durante as chuvas. Uma consequência provável desse processo é:",   // enunciado
    ["O aumento da erosão e do transporte de sedimentos para os rios.", "O desaparecimento de todos os cursos d’água.", "A redução obrigatória do risco de enchentes.", "O aumento da infiltração da água em qualquer tipo de solo."],   // alternativas: a CORRETA é sempre a 1ª (o jogo embaralha na tela)
    "Sem plantas, a água escorre mais rápido.",   // dica
    "A água escorre rápido, arrasta solo e sedimentos e os leva para os rios."    // explicação
  ],
  [
    "☀️ Luna, a Climatologista",
    "Uma comunidade enfrenta períodos prolongados de seca, redução do volume dos reservatórios e dificuldades no abastecimento. Qual medida representa uma estratégia adequada para enfrentar esse problema?",   // enunciado
    ["Adotar medidas de economia, reaproveitamento e gestão sustentável dos recursos hídricos.", "Ampliar o desperdício de água durante os períodos chuvosos.", "Retirar toda a vegetação próxima aos rios.", "Concretar todas as áreas permeáveis da comunidade."],   // alternativas: a CORRETA é sempre a 1ª (o jogo embaralha na tela)
    "Pense em usar a água com cuidado.",   // dica
    "Economizar, reaproveitar e gerir bem a água ajuda a enfrentar períodos de seca."    // explicação
  ],

  // ===== FASE 5 · Ravi · Tópico 5: Ambiente e cidade sustentável (as 5 últimas são de nível difícil) =====
  [
    "🍃 Ravi, o Guardião do Planeta",
    "Uma prefeitura pretende reduzir os problemas causados pelo descarte inadequado de resíduos sólidos. Para isso, propõe a implantação da coleta seletiva e a ampliação da reciclagem. Qual é o principal benefício dessas medidas?",   // enunciado
    ["Reduzir o desperdício de materiais e a quantidade de resíduos destinados à disposição final.", "Aumentar a quantidade de resíduos enviada aos aterros.", "Reduzir o aproveitamento de materiais reutilizáveis.", "Diminuir o reaproveitamento de recursos naturais."],   // alternativas: a CORRETA é sempre a 1ª (o jogo embaralha na tela)
    "Reciclar significa reaproveitar.",   // dica
    "A coleta seletiva e a reciclagem reaproveitam materiais e diminuem o lixo que vai para os aterros."    // explicação
  ],
  [
    "🍃 Ravi, o Guardião do Planeta",
    "Em um bairro, a substituição de áreas verdes por estacionamentos e ruas asfaltadas contribuiu para o aumento das temperaturas e para o acúmulo de água durante chuvas fortes. Qual medida poderia ajudar a reduzir esses problemas?",   // enunciado
    ["Ampliar as áreas verdes e utilizar pavimentos permeáveis em locais adequados.", "Construir mais estacionamentos impermeáveis.", "Eliminar as árvores próximas às ruas.", "Canalizar todos os cursos d’água e ocupar suas margens."],   // alternativas: a CORRETA é sempre a 1ª (o jogo embaralha na tela)
    "Pense em deixar o solo absorver a água.",   // dica
    "Áreas verdes e pavimentos permeáveis reduzem o calor e deixam a água infiltrar."    // explicação
  ],
  [
    "🍃 Ravi, o Guardião do Planeta",
    "Uma cidade apresenta congestionamentos frequentes, poluição atmosférica e longos deslocamentos diários entre residências e locais de trabalho. Qual política pública pode contribuir para enfrentar esses problemas?",   // enunciado
    ["Investir no transporte coletivo de qualidade e em infraestrutura segura para pedestres e ciclistas.", "Incentivar exclusivamente o uso de automóveis particulares.", "Reduzir a quantidade de calçadas e ciclovias.", "Concentrar todos os serviços públicos em uma única área distante dos bairros residenciais."],   // alternativas: a CORRETA é sempre a 1ª (o jogo embaralha na tela)
    "Pense em menos carros nas ruas e mais opções de deslocamento.",   // dica
    "Transporte coletivo de qualidade e infraestrutura para pedestres e ciclistas reduzem trânsito e poluição."    // explicação
  ],
  [
    "🍃 Ravi, o Guardião do Planeta",
    "Uma indústria despeja resíduos sem tratamento em um rio que abastece comunidades próximas. Além de prejudicar os ecossistemas, a situação ameaça a saúde da população. Qual ação é mais adequada para enfrentar o problema?",   // enunciado
    ["Fiscalizar a atividade industrial, exigir o tratamento dos efluentes e monitorar a qualidade da água.", "Aumentar a captação de água sem avaliar sua qualidade.", "Transferir o problema para as comunidades localizadas rio abaixo.", "Suspender o monitoramento ambiental para reduzir os custos públicos."],   // alternativas: a CORRETA é sempre a 1ª (o jogo embaralha na tela)
    "A solução precisa atacar a causa da poluição.",   // dica
    "Fiscalizar, exigir o tratamento dos efluentes e monitorar a água enfrentam a causa do problema."    // explicação
  ],
  [
    "🍃 Ravi, o Guardião do Planeta",
    "Uma comunidade deseja diminuir o consumo de energia elétrica e as emissões associadas à geração de eletricidade. Qual alternativa apresenta uma medida coerente com esse objetivo?",   // enunciado
    ["Melhorar a eficiência energética dos edifícios e ampliar, quando viável, o uso de fontes renováveis.", "Manter equipamentos ligados mesmo quando não estão sendo utilizados.", "Aumentar o desperdício de energia nos edifícios públicos.", "Substituir todas as áreas verdes por instalações de concreto."],   // alternativas: a CORRETA é sempre a 1ª (o jogo embaralha na tela)
    "Pense em gastar menos e usar fontes limpas.",   // dica
    "Eficiência energética e fontes renováveis reduzem o consumo e as emissões."    // explicação
  ],
  [
    "🍃 Ravi, o Guardião do Planeta",
    "Uma cidade de médio porte sofreu enchentes recorrentes após a expansão de bairros sobre áreas de várzea e a impermeabilização de grandes superfícies. O poder público pretende reduzir os riscos sem simplesmente transferir o problema para outros bairros. Qual conjunto de medidas apresenta a estratégia mais adequada?",   // enunciado
    ["Recuperar áreas de várzea quando possível, ampliar espaços permeáveis, melhorar a drenagem e planejar o uso do solo.", "Ampliar a ocupação das margens dos rios e construir mais estacionamentos.", "Canalizar todos os rios e permitir construções sem restrições em suas margens.", "Remover a vegetação urbana e aumentar a pavimentação das ruas."],   // alternativas: a CORRETA é sempre a 1ª (o jogo embaralha na tela)
    "A solução combina natureza e planejamento.",   // dica
    "Recuperar várzeas, ampliar áreas permeáveis, melhorar a drenagem e planejar o uso do solo reduz o risco sem passar o problema adiante."    // explicação
  ],
  [
    "🍃 Ravi, o Guardião do Planeta",
    "Uma prefeitura implantou um programa de coleta seletiva, mas a participação da população continua baixa. Uma pesquisa revelou que muitos moradores não sabem separar os resíduos e que faltam pontos de coleta em diversos bairros. Considerando os princípios da gestão sustentável de resíduos, qual seria a melhor decisão?",   // enunciado
    ["Ampliar a educação ambiental, melhorar a distribuição dos pontos de coleta e acompanhar os resultados do programa.", "Encerrar o programa e encaminhar todos os resíduos para aterros.", "Responsabilizar exclusivamente os moradores, sem modificar a estrutura do serviço.", "Incentivar o descarte de materiais recicláveis junto aos resíduos orgânicos."],   // alternativas: a CORRETA é sempre a 1ª (o jogo embaralha na tela)
    "Os dois problemas (falta de informação e falta de pontos de coleta) precisam de resposta.",   // dica
    "Educação ambiental, mais pontos de coleta e acompanhamento atacam as causas da baixa participação."    // explicação
  ],
  [
    "🍃 Ravi, o Guardião do Planeta",
    "Uma região metropolitana apresenta crescimento populacional acelerado. Ao mesmo tempo, enfrenta aumento do custo da moradia, ocupação de áreas de risco, congestionamentos e desigualdade no acesso aos serviços públicos. Qual proposta melhor representa o planejamento de uma cidade sustentável?",   // enunciado
    ["Integrar habitação, mobilidade, saneamento, áreas verdes e acesso aos serviços públicos, priorizando a inclusão social e a redução dos riscos ambientais.", "Concentrar os investimentos nas áreas mais valorizadas e afastar as populações de baixa renda dos serviços essenciais.", "Expandir a cidade sem planejamento, deixando a distribuição dos serviços ocorrer espontaneamente.", "Priorizar a construção de vias para automóveis, independentemente dos efeitos sobre a população e o ambiente."],   // alternativas: a CORRETA é sempre a 1ª (o jogo embaralha na tela)
    "Uma cidade sustentável pensa em todas as pessoas e no ambiente ao mesmo tempo.",   // dica
    "O planejamento sustentável integra moradia, transporte, saneamento e áreas verdes, com inclusão social."    // explicação
  ],
  [
    "🍃 Ravi, o Guardião do Planeta",
    "Em determinado município, bairros com menor renda apresentam menor cobertura de saneamento básico, maior exposição a enchentes e acesso limitado a áreas verdes. Já as regiões mais valorizadas contam com infraestrutura urbana mais eficiente. A situação descrita demonstra que os problemas ambientais urbanos também estão relacionados:",   // enunciado
    ["À desigualdade socioespacial, que pode distribuir de maneira desigual os riscos ambientais e o acesso à infraestrutura.", "Apenas às condições naturais do relevo, sem influência das decisões humanas.", "Exclusivamente ao crescimento da população mundial.", "À ausência de qualquer relação entre desigualdade social e qualidade ambiental."],   // alternativas: a CORRETA é sempre a 1ª (o jogo embaralha na tela)
    "Observe quem sofre mais com os problemas e por quê.",   // dica
    "Quem tem menos renda tende a ficar com mais riscos ambientais e menos infraestrutura: é a desigualdade socioespacial."    // explicação
  ],
  [
    "🍃 Ravi, o Guardião do Planeta",
    "Um município pretende elaborar um plano de adaptação às mudanças climáticas. Estudos apontam que as chuvas intensas podem se tornar mais prejudiciais em áreas urbanas densamente ocupadas, enquanto períodos de seca podem comprometer o abastecimento. Qual alternativa apresenta uma estratégia integrada de adaptação?",   // enunciado
    ["Combinar drenagem urbana sustentável, proteção de áreas naturais, planejamento do uso do solo e gestão eficiente dos recursos hídricos.", "Priorizar somente a construção de estacionamentos e ampliar a impermeabilização do solo.", "Desconsiderar os dados climáticos e manter todas as regras de ocupação existentes.", "Concentrar as ações exclusivamente na limpeza das ruas depois dos eventos extremos."],   // alternativas: a CORRETA é sempre a 1ª (o jogo embaralha na tela)
    "Enchentes e secas pedem uma solução que cuide da água e do solo.",   // dica
    "Drenagem sustentável, proteção de áreas naturais, planejamento e gestão da água respondem tanto às chuvas quanto à seca."    // explicação
  ],
];

/* Glossário (apoio da loja) */
var G = "<b>Legenda:</b> explica símbolos e cores do mapa. <b>Pontos cardeais:</b> Norte, Sul, Leste e Oeste. <b>Latitude:</b> distância ao norte ou ao sul do Equador. <b>Clima:</b> padrão atmosférico de longo prazo. <b>Bacia hidrográfica:</b> área drenada por um rio e seus afluentes. <b>Planalto:</b> relevo elevado e desgastado pela erosão. <b>Assoreamento:</b> acúmulo de sedimentos no leito de um rio. <b>Êxodo rural:</b> migração do campo para a cidade. <b>Setor terciário:</b> comércio e serviços. <b>Urbanização:</b> crescimento das cidades.";
