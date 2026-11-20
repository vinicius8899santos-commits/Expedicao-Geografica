/* creditos.js — tela de CRÉDITOS (aberta pelo botão CRÉDITOS da tela inicial). */

SCREENS.credits = function (a) {
  var devs = [
    "Ângelo Vinicius Nascimento dos Santos",
    "João Lucas Barbosa da Silva",
    "Carlos Daniel Oliveira Cunha",
    "João Gabriel Lauriano da Silva",
    "Eduardo dos Santos Gonçalves"
  ];
  var ferramentas = ["Claude AI", "ChatGPT", "EducaTech Level Up – Ateliê"];
  function lista(l) {
    return '<ul class="cred-list">' + l.map(function (x) { return "<li>" + x + "</li>"; }).join("") + "</ul>";
  }

  a.innerHTML = '<section class="creditos">' +
    '<img class="logo logo-peq" src="' + IM.logo + '" alt="Expedição Geográfica: Basic Geography">' +
    '<h1 class="cred-h1" id="main-title" tabindex="-1">' + tx("CRÉDITOS", "CREDITS") + '</h1>' +
    '<div class="card cred"><h2>' + tx("DESENVOLVEDORES", "DEVELOPERS") + '</h2>' + lista(devs) + '</div>' +
    '<div class="card cred"><h2>' + tx("INTELIGÊNCIA ARTIFICIAL E FERRAMENTAS UTILIZADAS", "ARTIFICIAL INTELLIGENCE AND TOOLS USED") + '</h2>' + lista(ferramentas) + '</div>' +
    '<div class="card cred"><h2>' + tx("INSTITUIÇÃO DE ENSINO", "SCHOOL") + '</h2>' +
    '<p><b>' + tx("Escola:", "School:") + '</b> Maria Ângela da Silveira Borges</p>' +
    '<p><b>' + tx("Turma:", "Class:") + '</b> ' + tx("2º Ano de Informática", "2nd Year – Computer Science (Informática)") + '</p>' +
    '<p><b>' + tx("Ano:", "Year:") + '</b> 2026</p></div>' +
    '<p class="cred-fim">' + tx("UM PROJETO DESENVOLVIDO COM CRIATIVIDADE, TECNOLOGIA E COLABORAÇÃO.",
                                "A PROJECT DEVELOPED WITH CREATIVITY, TECHNOLOGY AND COLLABORATION.") + '</p>' +
    '<p class="copy">' + tx("© 2026 – Todos os direitos reservados.", "© 2026 – All rights reserved.") + '</p>' +
    '<div class="c"><button id="bk" class="back">⬅ Voltar</button></div></section>';

  bind("bk", function () { go("title"); });
};
