# Expedição Geográfica: Basic Geography

Jogo educacional de Geografia com **5 fases**, **50 perguntas**, conquistas, loja de apoios,
**leitor de tela em português e inglês**, salvamento automático e opção de idioma.

## Como abrir no VS Code

1. Abra o VS Code → **Arquivo → Abrir Pasta…** → escolha a pasta `expedicao-geografica`.
2. Instale a extensão **Live Server** (o VS Code sugere sozinho, está em `.vscode/extensions.json`).
3. Clique com o botão direito em `index.html` → **Open with Live Server**.
   (Também funciona dando duplo clique em `index.html`, mas o Live Server é melhor para editar.)

## Estrutura das pastas

```
expedicao-geografica/
├── index.html                 página única do jogo (as telas são desenhadas por JavaScript)
├── css/
│   ├── style.css              estilos base (cores no :root, no topo do arquivo)
│   ├── responsive.css         celulares, tablets e telas largas
│   └── accessibility.css      foco, botão/painel do leitor de tela, movimento reduzido
├── js/
│   ├── utils.js               funções auxiliares
│   ├── i18n.js                idioma (português/inglês) e tradução da tela
│   ├── settings.js            preferências, som dos botões, música
│   ├── progress.js            estado da partida e SALVAMENTO automático
│   ├── components.js          loja, configurações, janelas, foco e teclado
│   ├── game.js                navegação entre telas e regras do jogo
│   ├── accessibility.js       LEITOR DE TELA (voz) e painel de acessibilidade
│   ├── main.js                inicialização
│   ├── vlibras.js             Libras (VLibras, precisa de internet)
│   ├── data/
│   │   ├── perguntas-pt.js    as 50 perguntas (EDITE AQUI as perguntas)
│   │   ├── perguntas-en.js    as 50 perguntas em inglês (mesma ordem)
│   │   ├── ui-en.js           tradução dos textos da interface
│   │   └── conteudo.js        fases, conquistas, loja, personagens
│   └── screens/               uma tela por arquivo (titulo, creditos, fases, tabuleiro, pergunta...)
└── assets/
    ├── images/                logo, capa, fundo, acerto, erro
    │   └── personagens/       imagens do Alex, Gaia, Nico, Luna e Ravi (inteira e rosto)
    ├── icons/                 ícone de acessibilidade e favicon
    └── sounds/                música de fundo
```

> O jogo é uma **página única** (SPA): as "páginas" são as telas de `js/screens/`.
> Por isso não há uma pasta `pages/` com vários `.html`.

## Tela inicial e créditos

- A tela inicial é um menu de jogo: **logo**, **Jogar / Continuar jogo**, **Opções**, **Créditos** (e **Novo jogo** quando há partida).
- Os textos dos créditos ficam em `js/screens/creditos.js`; a logo em `assets/images/logo.png`.
- A cor dos botões grandes está em `.menu-btn` (`css/style.css`).
- "Apoios gratuitos (modo professor)" agora fica dentro de **Opções**.

## Como editar

- **Perguntas**: `js/data/perguntas-pt.js`. Cada pergunta é
  `[personagem, enunciado, [alternativas], dica, explicação]`; a **1ª alternativa é a correta**
  (o jogo embaralha). Mantenha a mesma ordem em `perguntas-en.js`.
- **Tentativas por pergunta**: constante `TENTATIVAS` em `js/data/conteudo.js` (hoje 1: errou, o jogo explica a resposta).
- **Imagens de acerto e erro**: `assets/images/acerto.png` e `assets/images/erro.png` (tela de resultado).
- **Cores**: variáveis em `:root` no começo de `css/style.css`.
- **Pontos** (3 por acerto, 15 por fase, preços da loja): `js/game.js` e `js/data/conteudo.js`.
- **Textos novos em inglês**: acrescente o par `[português, english]` em `js/data/ui-en.js`.
- **Frases do leitor de tela**: funções `dTitulo`, `dFases`, `dTabuleiro`, `dPergunta`... em `js/accessibility.js`
  (cada frase tem versão em português e em inglês).

## Leitor de tela (acessibilidade por áudio)

- Botão fixo no **canto superior esquerdo**, igual em todas as telas. Abre o painel com
  **Ouvir, Pausar, Continuar e Parar**, idioma (PT-BR / English US), velocidade e "ler automaticamente".
- Descreve a tela de forma organizada: título, textos importantes, botões e o que fazem, o que dá para fazer.
  Só narra o que está visível e disponível (alternativas desativadas e perguntas bloqueadas não são lidas uma a uma).
- Usa a Web Speech API do navegador. Escolhe a voz do idioma: prefere Google/"naturais", depois a voz padrão
  do idioma, depois qualquer voz do mesmo idioma. As vozes disponíveis dependem do navegador e do aparelho.
- Enquanto a voz fala, a música abaixa e o som dos botões fica mudo.
- O idioma da narração é o **mesmo do jogo**: trocar no painel ou em ⚙️ Configurações troca os dois.
- Teclado: `Tab` navega, `Enter`/`Espaço` ativam, setas escolhem a alternativa, `Esc` fecha janelas,
  e o primeiro `Tab` mostra o link "Pular para o conteúdo".

## Salvamento automático

- Salva sozinho (no `localStorage` do navegador) a cada mudança de tela e quando a página é fechada ou escondida.
- Guarda: fase, perguntas respondidas, pontos, apoios, conquistas e tela atual; as preferências ficam à parte.
- Na tela inicial: **Continuar jogo** e **Novo jogo** (pede confirmação antes de apagar).
- Em ⚙️ Configurações dá para desligar o salvamento e apagar o progresso salvo.
- O progresso fica **neste navegador e neste aparelho**. Limpar os dados do navegador apaga o progresso.

## Limitações conhecidas

- A narração depende das vozes do navegador/aparelho; sem vozes instaladas, usa a voz padrão.
- "Pausar" e "Continuar" retomam do início da frase em que a fala parou.
- O VLibras precisa de internet e o botão dele fica na lateral direita.
- O salvamento é por navegador (não há conta nem nuvem).
