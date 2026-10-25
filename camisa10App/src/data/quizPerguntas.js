
// Cada chave deste objeto deve corresponder ao ID usado
// no catálogo de Quiz.js.
// respostaCorreta é o índice da alternativa, começando em zero:
// A = 0, B = 1, C = 2 e D = 3.

export const quizzes = {

  "quiz-dia": {
    titulo: "Quiz do Dia",
    perguntas: [
      {
        id: 1,
        pergunta: "Qual país venceu a Copa do Mundo de 2002?",
        alternativas: [
          "Alemanha",
          "Brasil",
          "França",
          "Argentina",
        ],
        respostaCorreta: 1,
        explicacao:
          "O Brasil venceu a Alemanha na final e conquistou seu quinto título mundial em 2002.",
      },
      {
        id: 2,
        pergunta:
          "Quantos jogadores cada equipe inicia em campo no futebol tradicional?",
        alternativas: [
          "9 jogadores",
          "10 jogadores",
          "11 jogadores",
          "12 jogadores",
        ],
        respostaCorreta: 2,
        explicacao:
          "Cada equipe começa a partida com 11 jogadores em campo, incluindo o goleiro.",
      },
      {
        id: 3,
        pergunta:
          "Qual é o nome tradicionalmente associado ao estádio do Barcelona?",
        alternativas: [
          "Santiago Bernabéu",
          "Anfield",
          "Camp Nou",
          "San Siro",
        ],
        respostaCorreta: 2,
        explicacao:
          "O Camp Nou é o estádio histórico do Barcelona; o clube também passou a utilizar o nome Spotify Camp Nou após a renovação.",
      },
    ],
  },


// --------------------------------------------------------------------------------------------------------------------------------------


  "brasileirao": {
    titulo: "Brasileirão: História e Recordes",
    perguntas: [
      {
        id: 1,
        pergunta:
          "Considerando os títulos brasileiros oficialmente reconhecidos pela CBF até o fim de 2025, qual clube é o maior campeão nacional?Considerando os títulos brasileiros oficialmente reconhecidos pela CBF até o fim de 2025, qual clube é o maior campeão nacional?",
        alternativas: [
          "Palmeiras",
          "Santos",
          "Flamengo",
          "Corinthians",
        ],
        respostaCorreta: 0,
        explicacao:
          "O Palmeiras lidera a lista de títulos do Campeonato Brasileiro, considerando as conquistas reconhecidas oficialmente pela CBF.",
      },
      {
        id: 2,
        pergunta:
          "Quem é o maior artilheiro da história do Campeonato Brasileiro em gols?",
        alternativas: [
          "Romário",
          "Roberto Dinamite",
          "Edmundo",
          "Zico",
        ],
        respostaCorreta: 1,
        explicacao:
          "Roberto Dinamite é reconhecido como o maior artilheiro da história do Campeonato Brasileiro.",
      },
      {
        id: 3,
        pergunta:
          "Quais clubes chegaram a acumular sete rebaixamentos da Série A até 2025?",
        alternativas: [
          "Grêmio, Vasco, Bahia e Vitória",
          "América-MG, Coritiba, Goiás e Sport",
          "Botafogo, Fluminense, Athletico-PR e Avaí",
          "Cruzeiro, Atlético-MG, Santos e Ceará",
        ],
        respostaCorreta: 1,
        explicacao:
          "América-MG, Coritiba, Goiás e Sport aparecem entre os clubes com sete rebaixamentos da Série A no recorte considerado.",
      },
      {
        id: 4,
        pergunta:
          "Qual jogador marcou 34 gols em uma única edição do Campeonato Brasileiro, em 2004?",
        alternativas: [
          "Romário",
          "Washington",
          "Adriano",
          "Fred",
        ],
        respostaCorreta: 1,
        explicacao:
          "Washington marcou 34 gols pelo Athletico Paranaense no Campeonato Brasileiro de 2004.",
      },
      {
        id: 5,
        pergunta:
          "Qual clube somou 90 pontos no Campeonato Brasileiro de 2019?",
        alternativas: [
          "Santos",
          "Palmeiras",
          "Flamengo",
          "Grêmio",
        ],
        respostaCorreta: 2,
        explicacao:
          "O Flamengo terminou o Brasileirão de 2019 com 90 pontos e conquistou o título.",
      },
      {
        id: 6,
        pergunta:
          "Qual clube foi o primeiro campeão do Campeonato Brasileiro, em 1971?",
        alternativas: [
          "Cruzeiro",
          "Atlético Mineiro",
          "São Paulo",
          "Internacional",
        ],
        respostaCorreta: 1,
        explicacao:
          "O Atlético Mineiro venceu o triangular final e conquistou o Campeonato Brasileiro de 1971.",
      },
      {
        id: 7,
        pergunta:
          "Qual clube conquistou a Copa João Havelange de 2000, competição reconhecida como Campeonato Brasileiro?",
        alternativas: [
          "Vasco da Gama",
          "São Caetano",
          "Fluminense",
          "Grêmio",
        ],
        respostaCorreta: 0,
        explicacao:
          "O Vasco da Gama venceu o São Caetano na final da Copa João Havelange de 2000.",
      },
      {
        id: 8,
        pergunta:
          "Qual clube foi campeão brasileiro na primeira edição disputada em sistema de pontos corridos, em 2003?",
        alternativas: [
          "Santos",
          "Cruzeiro",
          "São Paulo",
          "Corinthians",
        ],
        respostaCorreta: 1,
        explicacao:
          "O Cruzeiro conquistou o Brasileirão de 2003, a primeira edição disputada em pontos corridos.",
      },
      {
        id: 9,
        pergunta:
          "Qual clube conquistou o Campeonato Brasileiro de 2024?",
        alternativas: [
          "Palmeiras",
          "Flamengo",
          "Botafogo",
          "Fortaleza",
        ],
        respostaCorreta: 2,
        explicacao:
          "O Botafogo conquistou o Campeonato Brasileiro de 2024.",
      },
      {
        id: 10,
        pergunta:
          "Qual clube sofreu seu primeiro rebaixamento para a Série B em 2023?",
        alternativas: [
          "Santos",
          "Corinthians",
          "São Paulo",
          "Flamengo",
        ],
        respostaCorreta: 0,
        explicacao:
          "O Santos foi rebaixado pela primeira vez em sua história ao fim do Campeonato Brasileiro de 2023.",
      },
    ],
  },


// --------------------------------------------------------------------------------------------------------------------------------------

  
  "laliga": {
    titulo: "La Liga",
    perguntas: [
      {
        id: 1,
        pergunta:
          "Em que ano começou a primeira edição do Campeonato Espanhol de futebol, atualmente conhecido como La Liga?",
        alternativas: ["1925", "1932", "1929", "1936"],
        respostaCorreta: 2,
        explicacao:
          "A primeira edição da La Liga começou em 1929, marcando o início da principal competição nacional de futebol da Espanha.",
      },
      {
        id: 2,
        pergunta:
          "Qual clube conquistou o primeiro título da história da La Liga, na temporada 1928–29?",
        alternativas: [
          "FC Barcelona",
          "Real Madrid",
          "Athletic Club",
          "Atlético de Madrid",
        ],
        respostaCorreta: 0,
        explicacao:
          "O FC Barcelona conquistou a primeira edição da La Liga, na temporada 1928–29.",
      },
      {
        id: 3,
        pergunta:
          "Qual clube possui o maior número de títulos da história da La Liga, considerando os campeonatos concluídos até a temporada 2025–26?",
        alternativas: [
          "Atlético de Madrid",
          "FC Barcelona",
          "Athletic Club",
          "Real Madrid",
        ],
        respostaCorreta: 3,
        explicacao:
          "O Real Madrid é o clube com mais títulos da história da La Liga, considerando as temporadas concluídas até 2025–26.",
      },
      {
        id: 4,
        pergunta:
          "Qual jogador é o maior artilheiro da história da La Liga?",
        alternativas: [
          "Cristiano Ronaldo",
          "Lionel Messi",
          "Telmo Zarra",
          "Karim Benzema",
        ],
        respostaCorreta: 1,
        explicacao:
          "Lionel Messi é o maior artilheiro da história da La Liga.",
      },
      {
        id: 5,
        pergunta:
          "Como é conhecido o confronto entre Real Madrid e FC Barcelona?",
        alternativas: [
          "Derbi Madrileño",
          "Derbi Vasco",
          "El Clásico",
          "Derbi Sevillano",
        ],
        respostaCorreta: 2,
        explicacao:
          "O confronto entre Real Madrid e FC Barcelona é conhecido mundialmente como El Clásico.",
      },
      {
        id: 6,
        pergunta:
          "Qual é o nome do prêmio tradicionalmente concedido ao artilheiro de cada temporada da liga espanhola?",
        alternativas: [
          "Zamora",
          "Balón de Oro",
          "Laureus",
          "Pichichi",
        ],
        respostaCorreta: 3,
        explicacao:
          "O Troféu Pichichi reconhece tradicionalmente o maior artilheiro do Campeonato Espanhol em cada temporada.",
      },
      {
        id: 7,
        pergunta:
          "Qual clube venceu o Barcelona por 12 a 1 em fevereiro de 1931, no que é considerado o maior placar de vitória da história da La Liga?",
        alternativas: [
          "Athletic Club",
          "Real Madrid",
          "Valencia",
          "Real Sociedad",
        ],
        respostaCorreta: 0,
        explicacao:
          "O Athletic Club venceu o Barcelona por 12 a 1 em fevereiro de 1931.",
      },
      {
        id: 8,
        pergunta:
          "Quantos clubes participaram da primeira edição da La Liga, em 1929?",
        alternativas: [
          "12 clubes",
          "10 clubes",
          "16 clubes",
          "20 clubes",
        ],
        respostaCorreta: 1,
        explicacao:
          "A primeira edição da La Liga contou com 10 clubes participantes.",
      },
      {
        id: 9,
        pergunta:
          "Qual destes clubes nunca foi rebaixado da primeira divisão espanhola desde a criação da La Liga?",
        alternativas: [
          "Valencia",
          "Sevilla",
          "Real Betis",
          "Athletic Club",
        ],
        respostaCorreta: 3,
        explicacao:
          "O Athletic Club é um dos clubes que nunca foram rebaixados da primeira divisão espanhola desde a criação da La Liga.",
      },
      {
        id: 10,
        pergunta:
          "Qual clube conquistou o título da La Liga na temporada 2013–14, interrompendo a sequência de títulos recentes de Real Madrid e Barcelona?",
        alternativas: [
          "Atlético de Madrid",
          "Valencia",
          "Sevilla",
          "Villarreal",
        ],
        respostaCorreta: 0,
        explicacao:
          "O Atlético de Madrid conquistou a La Liga em 2013–14, sob o comando de Diego Simeone.",
      },
    ],
  },


// --------------------------------------------------------------------------------------------------------------------------------------

  
  "champions": {
    titulo: "Champions League",
    perguntas: [
      {
        id: 1,
        pergunta:
          "Em que ano foi disputada a primeira edição da competição que deu origem à Champions League?",
        alternativas: ["1960", "1955", "1962", "1970"],
        respostaCorreta: 1,
        explicacao:
          "A primeira edição da Copa dos Campeões Europeus começou em 1955, dando origem à competição que conhecemos hoje como Champions League.",
      },
      {
        id: 2,
        pergunta:
          "Qual clube conquistou a primeira edição da Copa dos Campeões Europeus, na temporada 1955–56?",
        alternativas: [
          "AC Milan",
          "Benfica",
          "Bayern de Munique",
          "Real Madrid",
        ],
        respostaCorreta: 3,
        explicacao:
          "O Real Madrid conquistou a primeira edição da competição, vencendo a final da temporada 1955–56.",
      },
      {
        id: 3,
        pergunta:
          "Qual clube possui o maior número de títulos da história da Champions League e da antiga Copa dos Campeões Europeus?",
        alternativas: [
          "Real Madrid",
          "AC Milan",
          "Liverpool",
          "Bayern de Munique",
        ],
        respostaCorreta: 0,
        explicacao:
          "O Real Madrid é o clube com mais títulos da principal competição europeia de clubes.",
      },
      {
        id: 4,
        pergunta:
          "Quem é o maior goleador da história da UEFA Champions League, considerando os gols na competição principal e excluindo as fases classificatórias?",
        alternativas: [
          "Lionel Messi",
          "Robert Lewandowski",
          "Cristiano Ronaldo",
          "Karim Benzema",
        ],
        respostaCorreta: 2,
        explicacao:
          "Cristiano Ronaldo é o maior artilheiro da história da Champions League, considerando a competição principal e excluindo as fases classificatórias.",
      },
      {
        id: 5,
        pergunta:
          "Qual equipe venceu a Champions League na temporada 2004–05, após virar uma final em que perdia por 3 a 0 para o AC Milan?",
        alternativas: [
          "Manchester United",
          "Liverpool",
          "Chelsea",
          "Barcelona",
        ],
        respostaCorreta: 1,
        explicacao:
          "O Liverpool empatou a final contra o AC Milan após estar perdendo por 3 a 0 e conquistou o título na disputa por pênaltis.",
      },
      {
        id: 6,
        pergunta:
          "Qual clube conquistou três títulos consecutivos da Champions League entre 2016 e 2018?",
        alternativas: [
          "Barcelona",
          "Bayern de Munique",
          "Manchester United",
          "Real Madrid",
        ],
        respostaCorreta: 3,
        explicacao:
          "O Real Madrid conquistou três títulos consecutivos nas temporadas 2015–16, 2016–17 e 2017–18.",
      },
      {
        id: 7,
        pergunta:
          "Qual clube conquistou sua primeira Champions League na temporada 2011–12, vencendo o Bayern de Munique na final nos pênaltis?",
        alternativas: [
          "Chelsea",
          "Arsenal",
          "Inter de Milão",
          "Borussia Dortmund",
        ],
        respostaCorreta: 0,
        explicacao:
          "O Chelsea conquistou seu primeiro título da Champions League em 2012, derrotando o Bayern de Munique na disputa por pênaltis.",
      },
      {
        id: 8,
        pergunta:
          "Qual jogador brasileiro conquistou a Bola de Ouro em 2007, após uma temporada de destaque pelo AC Milan, incluindo a conquista da Champions League?",
        alternativas: [
          "Ronaldinho Gaúcho",
          "Ronaldo Fenômeno",
          "Kaká",
          "Rivaldo",
        ],
        respostaCorreta: 2,
        explicacao:
          "Kaká venceu a Bola de Ouro em 2007, após uma temporada de destaque pelo AC Milan, que conquistou a Champions League naquele ano.",
      },
      {
        id: 9,
        pergunta:
          "Qual clube venceu a Champions League de 1998–99 com dois gols nos acréscimos da final contra o Bayern de Munique?",
        alternativas: [
          "Juventus",
          "Ajax",
          "Real Madrid",
          "Manchester United",
        ],
        respostaCorreta: 3,
        explicacao:
          "O Manchester United marcou dois gols nos acréscimos para vencer o Bayern de Munique por 2 a 1 na final de 1999.",
      },
      {
        id: 10,
        pergunta:
          "Qual clube conquistou sua primeira Champions League em 2025, vencendo a final por 5 a 0 contra a Inter de Milão?",
        alternativas: [
          "Manchester City",
          "Paris Saint-Germain (PSG)",
          "Atlético de Madrid",
          "Borussia Dortmund",
        ],
        respostaCorreta: 1,
        explicacao:
          "O Paris Saint-Germain conquistou sua primeira Champions League em 2025, vencendo a Inter de Milão por 5 a 0 na final.",
      },
    ],
  },


// --------------------------------------------------------------------------------------------------------------------------------------


  "copa-brasil": {
    titulo: "Copa do Brasil - Geral",
    perguntas: [
      {
        pergunta: "Em que ano foi disputada a primeira edição da Copa do Brasil?",
        alternativas: ["1985", "1991", "1989", "1993"],
        respostaCorreta: 2,
        explicacao:
          "A Copa do Brasil foi criada em 1989 e teve o Grêmio como seu primeiro campeão."
      },
      {
        pergunta: "Qual clube é o maior campeão da Copa do Brasil até a edição de 2025?",
        alternativas: ["Flamengo", "Cruzeiro", "Grêmio", "Corinthians"],
        respostaCorreta: 1,
        explicacao:
          "O Cruzeiro lidera o ranking histórico com seis títulos, conquistados em 1993, 1996, 2000, 2003, 2017 e 2018."
      },
      {
        pergunta: "Qual clube conquistou a primeira edição da Copa do Brasil, em 1989?",
        alternativas: ["Vasco", "Flamengo", "Sport", "Grêmio"],
        respostaCorreta: 3,
        explicacao:
          "O Grêmio foi o primeiro campeão da história da competição, vencendo o Sport na decisão."
      },
      {
        pergunta: "Qual clube surpreendeu o Flamengo e conquistou a Copa do Brasil de 2004?",
        alternativas: ["Santo André", "Juventude", "Criciúma", "Paulista"],
        respostaCorreta: 0,
        explicacao:
          "O Santo André venceu o Flamengo na final de 2004 e conquistou um dos títulos mais marcantes da história do torneio."
      },
      {
        pergunta: "Qual foi o primeiro clube a conquistar a Copa do Brasil duas vezes consecutivas?",
        alternativas: ["Grêmio", "Flamengo", "Cruzeiro", "Palmeiras"],
        respostaCorreta: 2,
        explicacao:
          "O Cruzeiro foi campeão em 2017 e 2018, tornando-se o primeiro clube a vencer duas edições seguidas da Copa do Brasil."
      },
      {
        pergunta: "Quem venceu a Copa do Brasil de 2008?",
        alternativas: ["Corinthians", "Sport", "Vasco", "Internacional"],
        respostaCorreta: 1,
        explicacao:
          "O Sport conquistou o título de 2008 ao superar o Corinthians na final, garantindo a taça diante de sua torcida na Ilha do Retiro."
      },
      {
        pergunta: "Qual clube conquistou a Copa do Brasil de 2014?",
        alternativas: ["Atlético-MG", "Cruzeiro", "Grêmio", "Flamengo"],
        respostaCorreta: 0,
        explicacao:
          "O Atlético Mineiro venceu o Cruzeiro na decisão de 2014 e conquistou seu primeiro título da Copa do Brasil."
      },
      {
        pergunta: "Qual clube conquistou sua primeira Copa do Brasil em 2023?",
        alternativas: ["Fluminense", "Botafogo", "Corinthians", "São Paulo"],
        respostaCorreta: 3,
        explicacao:
          "O São Paulo conquistou a Copa do Brasil pela primeira vez em 2023, vencendo o Flamengo na decisão."
      },
      {
        pergunta: "Qual clube venceu a Copa do Brasil de 2020?",
        alternativas: ["Santos", "Palmeiras", "Grêmio", "Athletico-PR"],
        respostaCorreta: 1,
        explicacao:
          "O Palmeiras foi campeão em 2020 ao vencer o Grêmio na final, conquistando seu quarto título da competição."
      },
      {
        pergunta: "Quem foi o campeão da Copa do Brasil de 2025?",
        alternativas: ["Vasco", "Flamengo", "Corinthians", "Cruzeiro"],
        respostaCorreta: 2,
        explicacao:
          "O Corinthians conquistou seu quarto título em 2025, vencendo o Vasco na decisão."
      }
    ]
  },


// --------------------------------------------------------------------------------------------------------------------------------------

};