// Dados fictícios iniciais. Edite livremente, adicione/remova campos.
const DATA_PLAYERS = [
  {
    id: "rafa-martins",
    nome: "Patrick",
    jogo: "Stumble Guys",
    avatar: "",
    stats: { nivel: 28, coroas: 34, vitorias: 92, partidas: 470, taxaVitoria: "19.6%" },
    destaques: [
      "Destaque da semana no mapa Pivot Push",
      "Combo perfeito em três mapas seguidos"
    ],
    feitos: [
      "Top 1 no torneio de sábado",
      "15 eliminações em um único dia",
      "Recorde pessoal no mapa Jungle Roll"
    ],
    emblemas: [
      { id: "coroado-30", nome: "30+ Coroas", icone: "assets/emblems/coroa.svg", descricao: "Acumulou mais de 30 coroas" },
      { id: "estrela-combo", nome: "Combo Master", icone: "assets/emblems/estrela.svg", descricao: "Executou combos perfeitos" }
    ]
  },
  {
    id: "luna-oliveira",
    nome: "Limão",
    jogo: "Stumble Guys",
    avatar: "",
    stats: { nivel: 31, coroas: 41, vitorias: 110, partidas: 520, taxaVitoria: "21.1%" },
    destaques: [
      "Invicta em Lava Land no fim de semana",
      "Manobra aérea lendária em Space Race"
    ],
    feitos: [
      "5 vitórias seguidas na madrugada",
      "Campeã do evento da comunidade",
      "Derrota adversários com saltos precisos"
    ],
    emblemas: [
      { id: "rainha-lava", nome: "Rainha da Lava", icone: "assets/emblems/estrela.svg", descricao: "Domina o mapa Lava Land" },
      { id: "coroado-40", nome: "40+ Coroas", icone: "assets/emblems/coroa.svg", descricao: "Mais de 40 coroas conquistadas" }
    ]
  },
  {
    id: "davi-souza",
    nome: "Fernando",
    jogo: "Stumble Guys",
    avatar: "",
    stats: { nivel: 18, coroas: 12, vitorias: 38, partidas: 260, taxaVitoria: "14.6%" },
    destaques: [
      "Melhor jogada em Cannon Climb",
      "Recuperação épica após queda"
    ],
    feitos: [
      "Primeira coroa conquistada em 10 partidas",
      "Top 3 no campeonato amistoso",
      "Sequência de 10 semifinais"
    ],
    emblemas: [
      { id: "em-ascensao", nome: "Em Ascensão", icone: "", descricao: "Evoluindo rápido nos torneios" }
    ]
  },
  {
    id: "bianca-rosa",
    nome: "Beatriz",
    jogo: "Stumble Guys",
    avatar: "",
    stats: { nivel: 24, coroas: 21, vitorias: 65, partidas: 340, taxaVitoria: "19.1%" },
    destaques: [
      "Defesa impecável no mapa Block Dash",
      "Destaque tático da semana"
    ],
    feitos: [
      "Três coroas no mesmo dia",
      "Sem cair por 8 partidas seguidas",
      "Top 1 em corrida com tempo recorde"
    ],
    emblemas: [
      { id: "taticamente", nome: "Estrategista", icone: "assets/emblems/estrela.svg", descricao: "Leituras táticas decisivas" }
    ]
  },
  {
    id: "icaro-lima",
    nome: "Soquete",
    jogo: "Stumble Guys",
    avatar: "",
    stats: { nivel: 37, coroas: 55, vitorias: 143, partidas: 680, taxaVitoria: "21.0%" },
    destaques: [
      "Recordista de coroas do grupo",
      "Manobras avançadas em mapas de gelo"
    ],
    feitos: [
      "Campeão do torneio mensal",
      "Eliminou 9 jogadores em uma final",
      "Zerou obstáculos em Space Race sem erro"
    ],
    emblemas: [
      { id: "lenda", nome: "Lenda do Grupo", icone: "assets/emblems/estrela.svg", descricao: "Reconhecido pela comunidade" },
      { id: "coroado-50", nome: "50+ Coroas", icone: "assets/emblems/coroa.svg", descricao: "Ultrapassou 50 coroas" }
    ]
  }
];

window.DATA_PLAYERS = DATA_PLAYERS;
