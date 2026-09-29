/*
 * Guide de platine — The Witcher 3: Wild Hunt (PS5, valable aussi sur PS4)
 *
 * Compilé à partir des guides listés dans `sources` (PSNProfiles, PowerPyx,
 * PlayStationTrophies.org, XboxAchievements, TheGamer, Game Rant…). Texte
 * reformulé ; les noms de quêtes sont en anglais, comme dans les sources.
 * Les éléments `verify: true` sont incertains ou contradictoires entre sources.
 *
 * Règle anti-spoil (voir aussi le guide d'Expedition 33) :
 *  - `checkpoint.when`, les titres d'étapes et la liste `watch` sont visibles
 *    dès le départ : rien sur l'histoire ;
 *  - `{ text, spoiler: true }` masque une ligne précise (choix, personnages…).
 */
(window.PLATINE_GAMES = window.PLATINE_GAMES || []).push({
  id: "the-witcher-3-wild-hunt",
  title: "The Witcher 3: Wild Hunt",
  platform: "PS5 / PS4",
  accent: "#b33a3a",
  updated: "2026-09-29",

  overview: {
    trophyCount: 53,
    breakdown: "53 trophées pour le jeu de base (79 avec les extensions, non requises pour le platine)",
    difficulty: "6/10 (estimation XboxAchievements)",
    time: "150 h ou plus (estimation XboxAchievements)",
    playthroughs: "1 partie en Death March!, ou 2 (histoire, puis Nouvelle Partie+ en Death March!)",
    missables: "Oui : 9 à 11 selon les guides, tous signalés dans le parcours",
    online: "Aucun",
    difficultyTrophies: "Oui : Death March! du début à la fin, sans jamais baisser"
  },

  disclaimer:
    "Guide compilé par Claude à partir de résultats de recherche sur les guides cités (leurs pages n'étaient pas lisibles directement depuis l'environnement de travail). " +
    "Les points marqués « à vérifier » sont incertains ou contradictoires entre sources. La liste des trophées est partielle : complète-la depuis PSNProfiles. " +
    "Les noms de quêtes sont en anglais, comme dans les sources. Aucun glitch ni exploit n'est utilisé. Les extensions ne sont pas couvertes.",

  sources: [
    { id: "psnp-guide", label: "PSNProfiles — Trophy Guide", url: "https://psnprofiles.com/guide/2842-the-witcher-3-wild-hunt-trophy-guide" },
    { id: "powerpyx", label: "PowerPyx — Trophy Guide", url: "https://www.powerpyx.com/guides/the-witcher-3-wild-hunt-trophy-guide.html" },
    { id: "pst-guide", label: "PlayStationTrophies.org — Trophy Guide & Road Map", url: "https://www.playstationtrophies.org/game/the-witcher-3-wild-hunt/guide/" },
    { id: "xba-guide", label: "XboxAchievements — Achievement Guide & Road Map", url: "https://www.xboxachievements.com/game/the-witcher-3-wild-hunt/guide/" },
    { id: "dayngls-ps5", label: "Dayngls' Guides — Trophy Guide & Roadmap (PS5)", url: "https://daynglsgameguides.com/2026/05/27/the-witcher-3-wild-hunt-trophy-guide-roadmap-ps5/" },
    { id: "powerpyx-races", label: "PowerPyx — toutes les courses de chevaux", url: "https://www.powerpyx.com/guide/the-witcher-3-all-horse-races.html" },
    { id: "powerpyx-fists", label: "PowerPyx — tous les combats à mains nues", url: "https://www.powerpyx.com/guide/the-witcher-3-wild-hunt-all-fistfighting-quests-locations-guide.html" },
    { id: "gamerant-gwent", label: "Game Rant — objets et cartes de Gwent manquables", url: "https://gamerant.com/the-witcher-3-all-missable-items-gwent-cards-guide/" },
    { id: "consolepulse-gwent", label: "Console Pulse — ordre sûr pour les cartes de Gwent", url: "https://consolepulse.com/multiplatform/the-witcher/guides/witcher-3-missable-gwent-cards-safe-collection-order" },
    { id: "thegamer-autofail", label: "TheGamer — quêtes qui échouent automatiquement", url: "https://www.thegamer.com/witcher-3-autofail-quests/" },
    { id: "witcherdb-missables", label: "WitcherDB — points de non-retour", url: "https://witcherdb.com/missables" },
    { id: "thegamer-fullcrew", label: "TheGamer — trophée Full Crew", url: "https://www.thegamer.com/witcher-3-battle-kaer-morhen-full-crew/" },
    { id: "wiki-reason", label: "Witcher Wiki — Reason of State", url: "https://witcher.fandom.com/wiki/Reason_of_State" },
    { id: "steam-missables", label: "Steam — guide des succès manquables", url: "https://steamcommunity.com/sharedfiles/filedetails/?id=2923802549" },
    { id: "pushsquare-remaster", label: "Push Square — la version « Remastered » ne change pas la liste de trophées", url: "https://www.pushsquare.com/news/2026/09/the-witcher-3-remastered-is-just-an-update-on-ps5-not-a-new-edition-with-new-trophies" }
  ],

  // ---------------------------------------------------------------------------
  // « À surveiller pendant tout le jeu » — visible dès le départ, donc SANS spoil.
  // ---------------------------------------------------------------------------
  watch: [
    {
      id: "w-difficulty",
      category: "reflex",
      title: "Ne jamais baisser la difficulté",
      summary: "Si tu joues en Death March! pour le trophée, ne baisse jamais la difficulté, même le temps d'un combat : le trophée serait perdu pour toute la partie.",
      details: ["Tu pourras la baisser une fois l'histoire terminée."],
      trophies: ["walked-the-path"],
      sources: ["xba-guide", "pst-guide"]
    },
    {
      id: "w-saves",
      category: "reflex",
      title: "Sauvegardes manuelles",
      summary: "Fais une sauvegarde manuelle avant chaque choix important, tournoi de Gwent, course et combat à mains nues. Garde plusieurs emplacements en rotation.",
      details: ["Plusieurs trophées se perdent sur une seule défaite ou un seul choix : recharger est la parade."]
    },
    {
      id: "w-side-quests",
      category: "reflex",
      title: "Faire les quêtes secondaires quand elles se présentent",
      summary: "Beaucoup de quêtes secondaires échouent à des moments précis de l'histoire principale. Règle simple : fais-les dans la région où tu les trouves, avant d'avancer trop loin. Les deux points limites sont signalés dans le parcours.",
      sources: ["thegamer-autofail", "witcherdb-missables"]
    },
    {
      id: "w-boards",
      category: "reflex",
      title: "Panneaux d'affichage",
      summary: "Lis les panneaux d'affichage de chaque village : ils lancent les contrats de sorceleur et les tournois de combat à mains nues."
    },
    {
      id: "w-dlc",
      category: "reflex",
      title: "Extensions",
      summary: "Hearts of Stone et Blood and Wine ne sont pas nécessaires au platine. Pour viser le 100 %, lis un guide avant de les lancer : elles ont leurs propres trophées manquables (4 et 6 selon les guides).",
      sources: ["pst-guide", "powerpyx"]
    },
    {
      id: "w-gwent",
      category: "collectible",
      title: "Cartes de Gwent",
      summary: "Affronte chaque joueur de Gwent, achète les cartes chez les marchands et aubergistes, termine chaque quête de Gwent. Plusieurs cartes sont manquables : elles sont signalées région par région.",
      details: [
        "Le nombre de cartes requis varie selon les sources (cartes du jeu de base uniquement).",
        "Les cartes de Skellige ajoutées par une extension ne sont pas requises."
      ],
      trophies: ["card-collector", "gwent-master", "geralt-and-friends"],
      sources: ["gamerant-gwent", "consolepulse-gwent"],
      verify: true
    },
    {
      id: "w-books",
      category: "collectible",
      title: "Livres et documents",
      summary: "Lis les livres, journaux et documents que tu trouves ou achètes : 30 suffisent.",
      count: 30,
      trophies: ["bookworm"]
    },
    {
      id: "w-bombs",
      category: "collectible",
      title: "Formules de bombes",
      summary: "Récupère les formules de 6 types de bombes différents (marchands, coffres, alchimistes).",
      count: 6,
      trophies: ["bombardier"]
    },
    {
      id: "w-gear",
      category: "collectible",
      title: "Équipement de sorceleur",
      summary: "Trouve les plans d'un set d'équipement de sorceleur, fabrique toutes ses pièces et équipe-les ensemble.",
      trophies: ["armed-and-dangerous"]
    },
    {
      id: "w-contracts",
      category: "poi",
      title: "Contrats de sorceleur",
      summary: "Tous les contrats du jeu de base comptent pour un trophée. Fais-les dès qu'ils apparaissent : au moins un peut échouer si tu le repousses trop longtemps.",
      trophies: ["geralt-the-professional", "even-odds"],
      sources: ["thegamer-autofail"]
    },
    {
      id: "w-races",
      category: "poi",
      title: "Courses de chevaux",
      summary: "Gagne toutes les courses : Velen, Novigrad et Skellige. Sauvegarde avant chacune.",
      count: 11,
      details: ["Répartition selon PowerPyx : 3 en Velen, 4 à Novigrad, 4 à Skellige."],
      trophies: ["fast-and-furious"],
      sources: ["powerpyx-races"],
      verify: true
    },
    {
      id: "w-fists",
      category: "poi",
      title: "Combats à mains nues",
      summary: "Chaque région a son tournoi, lancé par une affiche « Fist fights » sur un panneau. Gagne tous les combats.",
      count: 14,
      details: [
        "Répartition selon PowerPyx : 4 en Velen, 4 à Novigrad, 6 à Skellige, dont un dernier combat de « champion des champions ».",
        "Profite d'un combat facile pour gagner sans prendre un seul coup (autre trophée)."
      ],
      trophies: ["brawl-master", "fist-of-the-south-star"],
      sources: ["powerpyx-fists"],
      verify: true
    },
    {
      id: "w-nests",
      category: "poi",
      title: "Nids de monstres",
      summary: "Détruis les nids avec une bombe : tous ceux de Velen et Novigrad, OU tous ceux de Skellige, suffisent.",
      trophies: ["pest-control"]
    },
    {
      id: "w-places-of-power",
      category: "poi",
      title: "Lieux de pouvoir",
      summary: "Chaque lieu de pouvoir donne un bonus temporaire lié à un Signe. Avoir les bonus des 5 Signes actifs en même temps rapporte un trophée.",
      trophies: ["power-overwhelming"],
      verify: true
    },
    {
      id: "w-counter",
      category: "character",
      title: "Contre-attaques en série",
      summary: "Réussir 10 contre-attaques d'affilée sans être touché ni parer.",
      trophies: ["kaer-morhen-trained"]
    },
    {
      id: "w-combo",
      category: "character",
      title: "Combo express",
      summary: "Attaquer, contre-attaquer, lancer un Signe et une bombe (dans n'importe quel ordre) en moins de 4 secondes. Plus simple face à un groupe d'ennemis faibles.",
      trophies: ["what-was-that"]
    },
    {
      id: "w-butcher",
      category: "character",
      title: "Cinq ennemis en dix secondes",
      summary: "Tuer au moins 5 adversaires en moins de 10 secondes : vise un groupe d'ennemis faibles.",
      trophies: ["butcher-of-blaviken"]
    },
    {
      id: "w-aard",
      category: "character",
      title: "Aard et le vide",
      summary: "Tuer 10 adversaires en les projetant d'un endroit élevé avec le Signe Aard.",
      count: 10,
      trophies: ["humpty-dumpty"]
    },
    {
      id: "w-crossbow",
      category: "character",
      title: "Tirs d'arbalète à la tête",
      summary: "Tuer 50 adversaires humains ou non humains d'un carreau d'arbalète dans la tête.",
      count: 50,
      trophies: ["master-marksman"],
      verify: true
    },
    {
      id: "w-overkill",
      category: "character",
      title: "Saignement, poison et brûlure",
      summary: "Infliger les trois effets en même temps à un adversaire, 10 fois.",
      count: 10,
      trophies: ["overkill"]
    },
    {
      id: "w-progression",
      category: "character",
      title: "Progression de Geralt",
      summary: "Atteindre le niveau 35 et remplir tous les emplacements de mutagènes : ça vient naturellement en jouant.",
      trophies: ["munchkin", "mutant"]
    }
  ],

  // ---------------------------------------------------------------------------
  // Parcours chronologique (régions dans l'ordre conseillé par les niveaux).
  // ---------------------------------------------------------------------------
  steps: [
    {
      id: "prep",
      title: "Préparation : la difficulté",
      checkpoint: {
        when: "Avant de lancer ta partie, au choix de la difficulté",
        level: "critical",
        alerts: [
          "Le trophée **Walked the Path** exige de finir le jeu en **Death March!** (difficulté maximale) sans JAMAIS la baisser. Une partie Death March! débloque aussi les deux trophées de difficulté inférieure.",
          "Option 1 (la plus efficace) : tout faire en une seule partie en Death March!. Le début est exigeant, puis Geralt monte en puissance.",
          "Option 2 (la plus détendue) : une première partie pour l'histoire dans la difficulté de ton choix, puis une Nouvelle Partie+ en Death March! (le trophée y est accepté). Compte alors une seconde partie complète.",
          "Ce parcours suppose l'option 1. Avec l'option 2, suis-le lors de la première partie et garde seulement le trophée de difficulté pour la NG+."
        ]
      },
      tasks: [
        { id: "prep-difficulty", text: "Choisir Death March! dès le départ (option 1)", missable: true, trophies: ["walked-the-path"] },
        { id: "prep-watch", text: "Lire la liste « À surveiller » (elle ne contient aucun spoiler)" }
      ],
      enjoy: "Lance le jeu ! Prochain repère : dès le début, à White Orchard.",
      sources: ["xba-guide", "pst-guide", "powerpyx"]
    },
    {
      id: "white-orchard",
      title: "Prologue : White Orchard",
      checkpoint: {
        when: "Dès le début du jeu, dans la région de White Orchard",
        level: "caution",
        alerts: [
          "Un contrat de sorceleur de cette région peut échouer bien plus tard dans l'histoire : fais-le maintenant.",
          "Bon moment pour prendre les réflexes de la liste « À surveiller » (panneaux d'affichage, livres, sauvegardes)."
        ]
      },
      tasks: [
        {
          id: "wo-devil",
          text: "Faire le contrat « Devil by the Well » (le puits de White Orchard)",
          missable: true,
          verify: true,
          trophies: ["geralt-the-professional"],
          details: ["Selon TheGamer, c'est le seul contrat qui échoue automatiquement (au lancement de la quête « On Thin Ice ») ; une autre source évoque aussi un contrat de Velen. Dans le doute, fais chaque contrat dès qu'il apparaît."],
          sources: ["thegamer-autofail"]
        },
        {
          id: "wo-gwent",
          text: "Gwent : dès que le jeu te l'apprend, affronter chaque joueur et acheter les cartes en vente (White Orchard, puis le palais de Vizima)",
          trophies: ["card-collector"],
          verify: true,
          details: ["Console Pulse conseille de vider White Orchard et Vizima en premier dans l'ordre de collecte."],
          sources: ["consolepulse-gwent"]
        },
        {
          id: "wo-power",
          text: "Si tu les croises tous, activer les bonus des 5 Signes aux lieux de pouvoir en même temps",
          unlocks: true,
          verify: true,
          trophies: ["power-overwhelming"],
          details: ["Un guide conseille de le faire dès White Orchard ; sinon, garde-le pour plus tard."]
        }
      ],
      trophies: ["lilac-and-gooseberries"],
      enjoy: "Profite du prologue. Prochain repère : ton arrivée en Velen.",
      sources: ["thegamer-autofail"]
    },
    {
      id: "velen",
      title: "Velen",
      checkpoint: {
        when: "Quand tu arrives en Velen, après le prologue",
        level: "critical",
        alerts: [
          "Plusieurs quêtes commencées ici échouent si tu les repousses trop longtemps : le point limite est signalé plus loin dans le parcours. Fais-les quand tu les croises.",
          "Une histoire secondaire se termine sur un choix qui compte pour deux trophées (voir tâches)."
        ]
      },
      tasks: [
        {
          id: "v-keira",
          text: "Suivre jusqu'au bout les quêtes de Keira Metz (« An Invitation From Keira Metz » → « For the Advancement of Learning »)",
          missable: true,
          trophies: ["friends-with-benefits", "full-crew"],
          details: [
            "À la fin, un choix décide de deux trophées. Révèle la ligne suivante quand tu y arrives.",
            { text: "Ne la tue pas : envoie-la à Kaer Morhen.", spoiler: true }
          ],
          sources: ["thegamer-fullcrew"]
        },
        {
          id: "v-fist-clean",
          text: "Gagner un combat à mains nues sans prendre un seul coup",
          missable: true,
          unlocks: true,
          trophies: ["fist-of-the-south-star"],
          details: ["Choisis le combat le plus facile de Velen ; sauvegarde avant et recharge si tu es touché."]
        },
        { id: "v-fists", text: "Tournoi « Fists of Fury: Velen » (4 combats)", trophies: ["brawl-master"], sources: ["powerpyx-fists"] },
        { id: "v-races", text: "Courses de Velen (3, au carrefour à l'ouest de Crow's Perch)", trophies: ["fast-and-furious"], sources: ["powerpyx-races"] },
        { id: "v-gwent", text: "Gwent : « Velen Players » et « Playing Innkeeps »", trophies: ["card-collector"], sources: ["consolepulse-gwent"] },
        { id: "v-contracts", text: "Faire les contrats de Velen dès qu'ils apparaissent", trophies: ["geralt-the-professional"] },
        {
          id: "v-even-odds",
          text: "Tuer 2 monstres de contrat sans Signes, potions, mutagènes, huiles ni bombes",
          missable: true,
          unlocks: true,
          verify: true,
          trophies: ["even-odds"],
          details: ["Choisis deux contrats faciles : le nombre de contrats est limité."]
        },
        { id: "v-nests", text: "Détruire les nids de monstres de Velen (bombe)", trophies: ["pest-control"] }
      ],
      trophies: ["family-counselor"],
      enjoy: "Velen se vit à ton rythme : explore, écoute les villageois, laisse les histoires se dérouler. Prochain repère : ton arrivée à Novigrad.",
      sources: ["powerpyx", "pst-guide"]
    },
    {
      id: "novigrad",
      title: "Novigrad",
      checkpoint: {
        when: "Quand tu arrives à Novigrad",
        level: "critical",
        alerts: [
          "C'est la région qui concentre le plus de trophées manquables : un tournoi de Gwent, une chaîne de quêtes politiques et un contrat piège.",
          "Le point limite de la plupart : le lancement d'une quête principale signalée plus loin (« The Isle of Mists »)."
        ]
      },
      tasks: [
        {
          id: "n-high-stakes",
          text: "Tournoi de Gwent « High Stakes » (Passiflora) : gagner les 4 manches",
          missable: true,
          trophies: ["gwent-master", "card-collector"],
          details: [
            "Inscription : 1 000 couronnes et un deck solide.",
            "Une seule défaite annule le trophée : sauvegarde avant chaque manche et recharge en cas d'échec.",
            "Les 4 cartes de chef gagnées ici sont manquables."
          ],
          sources: ["gamerant-gwent", "consolepulse-gwent"]
        },
        {
          id: "n-gwent",
          text: "Gwent : « Big City Players », le mini-tournoi d'une réception mondaine, les parties avec Zoltan et « Old Pals »",
          missable: true,
          trophies: ["card-collector"],
          verify: true,
          details: [
            "Pendant la quête « A Matter of Life and Death », un petit tournoi a lieu dans la cour : gagne toutes les manches (cartes manquables).",
            "Carte Zoltan Chivay : battre le lettré dans l'auberge.",
            "« Old Pals » : joue d'abord contre Zoltan, puis Roche, puis Lambert (après « A Deadly Plot ») pour la carte Triss.",
            "Carte Iorveth : quête « Shock Therapy ».",
            { text: "Carte Ciri : battre Dijkstra dans ses bains.", spoiler: true },
            "Cartes signalées sans rattrapage fiable : Milva, Vampire: Bruxa, Dandelion et les 4 cartes de chef du tournoi."
          ],
          sources: ["gamerant-gwent", "consolepulse-gwent"]
        },
        {
          id: "n-politics",
          text: "Suivre jusqu'au bout la chaîne de quêtes politiques de Novigrad",
          missable: true,
          trophies: ["assassin-of-kings"],
          details: [
            "Quêtes à terminer : « A Matter of Life and Death », « Now or Never », « An Eye for an Eye », « Redania's Most Wanted », « A Deadly Plot », « Blindingly Obvious », puis « Reason of State ».",
            { text: "Dans « Blindingly Obvious », convaincs Dijkstra en lui donnant l'information demandée, pas par la force (ne lui casse pas la jambe) : sinon « Reason of State » ne se débloque pas.", spoiler: true },
            "« Reason of State » échoue si tu lances « The Isle of Mists » avant de l'avoir terminée."
          ],
          sources: ["wiki-reason", "thegamer-autofail"]
        },
        {
          id: "n-doppler",
          text: "Contrat « An Elusive Thief » (panneau de Hierarch Square, note « Contract: Imp »)",
          missable: true,
          verify: true,
          trophies: ["the-doppler-effect", "geralt-the-professional"],
          details: ["Sauvegarde avant la poursuite à pied : si la cible s'échappe, le trophée est perdu."]
        },
        { id: "n-fists", text: "Tournoi « Fists of Fury: Novigrad » (4 combats)", trophies: ["brawl-master"], sources: ["powerpyx-fists"] },
        { id: "n-races", text: "Courses de Novigrad (4, dont 3 près de la résidence Vegelbud une fois « Get Junior » terminée)", trophies: ["fast-and-furious"], sources: ["powerpyx-races"] },
        { id: "n-contracts", text: "Faire les contrats de Novigrad dès qu'ils apparaissent", trophies: ["geralt-the-professional"] }
      ],
      enjoy: "Novigrad est dense : pas besoin de tout enchaîner, alterne avec l'histoire principale. Prochain repère : ton arrivée à Skellige.",
      sources: ["powerpyx", "pst-guide", "steam-missables"]
    },
    {
      id: "skellige",
      title: "Skellige",
      checkpoint: {
        when: "Quand tu débarques à Skellige",
        level: "critical",
        alerts: [
          "Deux choix de quête comptent pour des trophées ici (voir tâches).",
          "Même point limite que pour Velen et Novigrad : la quête principale « The Isle of Mists »."
        ]
      },
      tasks: [
        {
          id: "s-kings-gambit",
          text: "« King's Gambit » : soutenir Cerys OU Hjalmar, pas la troisième option",
          missable: true,
          trophies: ["kingmaker", "full-crew"],
          details: [
            "Cerys ou Hjalmar, les deux conviennent.",
            { text: "La troisième option empêche Hjalmar de te rejoindre plus tard : adieu « Full Crew ».", spoiler: true }
          ],
          sources: ["thegamer-fullcrew"]
        },
        {
          id: "s-woodland",
          text: "Contrat « In the Heart of the Woods » (niveau 22+ conseillé) : accepter la proposition de Sven (le jeune), pas celle d'Harald (l'ancien)",
          missable: true,
          unlocks: true,
          trophies: ["woodland-spirit"],
          details: ["Sauvegarde avant le choix : le combat est rude, la créature frappe très fort."]
        },
        { id: "s-fists", text: "Tournoi « Fists of Fury: Skellige », puis « Champion of Champions »", trophies: ["brawl-master"], sources: ["powerpyx-fists"] },
        { id: "s-races", text: "Courses de Skellige (4, chacune à un endroit différent)", trophies: ["fast-and-furious"], sources: ["powerpyx-races"] },
        {
          id: "s-gwent",
          text: "Gwent : « Skellige Style » (Madman Lugos, Gremist)",
          trophies: ["card-collector"],
          verify: true,
          details: ["Ces parties demandent d'avoir terminé la quête principale « Practicum in Advanced Alchemy »."],
          sources: ["gamerant-gwent"]
        },
        { id: "s-contracts", text: "Faire les contrats de Skellige", trophies: ["geralt-the-professional"] }
      ],
      trophies: ["necromancer"],
      enjoy: "Skellige est magnifique en bateau : prends le temps de naviguer. Prochain repère : quand la quête « The Isle of Mists » apparaît.",
      sources: ["powerpyx", "pst-guide"]
    },
    {
      id: "isle-of-mists",
      title: "Avant le grand point de non-retour",
      checkpoint: {
        when: "Quand la quête principale « The Isle of Mists » apparaît dans ton journal, avant de la lancer",
        level: "critical",
        alerts: [
          "C'est LE point de non-retour du jeu : au lancement de cette quête (le jeu affiche un avertissement), une vingtaine de quêtes secondaires de Velen et Novigrad échouent, dont plusieurs liées à des trophées.",
          "Fais une sauvegarde manuelle dédiée et coche toute la liste ci-dessous avant de partir."
        ]
      },
      tasks: [
        {
          id: "iom-allies",
          text: "Quêtes « Brothers in Arms » : recruter Ermion, Hjalmar, Keira, Triss, Roche (avec Ves) et Zoltan",
          missable: true,
          trophies: ["full-crew"],
          details: [
            "Zoltan et Ermion : il suffit de leur demander.",
            "Roche : aide-le d'abord à défendre Ves contre des soldats nilfgaardiens.",
            "Hjalmar : seulement si Cerys ou Hjalmar a pris le pouvoir à Skellige.",
            "Keira : seulement si tu l'as épargnée à la fin de son histoire.",
            "Letho n'est pas requis pour le trophée."
          ],
          sources: ["thegamer-fullcrew"]
        },
        { id: "iom-politics", text: "« Reason of State » terminée", missable: true, trophies: ["assassin-of-kings"], sources: ["wiki-reason"] },
        { id: "iom-keira", text: "Histoire de Keira Metz terminée", missable: true, trophies: ["friends-with-benefits"] },
        { id: "iom-gwent", text: "Tous les joueurs et quêtes de Gwent de Velen et Novigrad faits, tournoi « High Stakes » gagné", missable: true, trophies: ["card-collector", "gwent-master"] },
        { id: "iom-activities", text: "Courses, combats à mains nues et contrats de Velen et Novigrad terminés", missable: true, verify: true, trophies: ["fast-and-furious", "brawl-master", "geralt-the-professional"] }
      ],
      enjoy: "Une fois tout coché, lance la quête et savoure la suite : c'est un grand moment de l'histoire.",
      sources: ["thegamer-autofail", "witcherdb-missables"]
    },
    {
      id: "last-act",
      title: "Dernier acte",
      checkpoint: {
        when: "Quand tu retrouves le monde ouvert après la série de quêtes principales ouverte par « The Isle of Mists »",
        level: "caution",
        alerts: [
          "Il reste peu de manquables : termine les activités encore ouvertes avant la quête finale (repère suivant).",
          "C'est le moment de finir ce qui reste à Skellige (Gwent, courses, combats, contrats)."
        ]
      },
      tasks: [
        { id: "la-gwent", text: "Compléter la collection de cartes de Gwent", trophies: ["card-collector"] },
        { id: "la-activities", text: "Finir courses, combats à mains nues et contrats restants", trophies: ["fast-and-furious", "brawl-master", "geralt-the-professional"] }
      ],
      trophies: ["something-more", "xenonaut"],
      enjoy: "Suis l'histoire à ton rythme. Prochain repère : quand la quête « On Thin Ice » apparaît.",
      sources: ["thegamer-autofail"]
    },
    {
      id: "finale",
      title: "Avant la quête finale",
      checkpoint: {
        when: "Quand la quête principale « On Thin Ice » apparaît dans ton journal, avant de la lancer",
        level: "caution",
        alerts: [
          "Second point de non-retour, plus léger : quelques quêtes échouent, dont le contrat « Devil by the Well » s'il n'est pas fait.",
          "Après le générique, tu peux continuer à jouer : tout ce qui n'a pas échoué reste faisable."
        ]
      },
      tasks: [
        { id: "fin-devil", text: "Contrat « Devil by the Well » fait (White Orchard)", missable: true, trophies: ["geralt-the-professional"] },
        { id: "fin-save", text: "Faire une sauvegarde manuelle avant de lancer la quête" },
        { id: "fin-end", text: "Terminer l'histoire principale", unlocks: true, trophies: ["passed-the-trial"] },
        { id: "fin-dm", text: "Si toute la partie a été jouée en Death March! : trophées de difficulté", unlocks: true, trophies: ["ran-the-gauntlet", "walked-the-path"] }
      ],
      enjoy: "Profite de la fin : tes choix au fil du jeu comptent.",
      sources: ["thegamer-autofail", "xba-guide"]
    },
    {
      id: "postgame",
      title: "Après le générique : nettoyage",
      checkpoint: {
        when: "Après le générique de fin",
        level: "calm",
        alerts: [
          "Plus rien de manquable dans le jeu de base. Tu peux maintenant baisser la difficulté si tu le souhaites.",
          "Option 2 (NG+) : c'est le moment de lancer une Nouvelle Partie+ en Death March!."
        ]
      },
      tasks: [
        { id: "pg-level", text: "Atteindre le niveau 35", unlocks: true, trophies: ["munchkin"] },
        { id: "pg-mutagens", text: "Remplir tous les emplacements de mutagènes", unlocks: true, trophies: ["mutant"] },
        { id: "pg-gear", text: "Équiper un set complet d'équipement de sorceleur", unlocks: true, trophies: ["armed-and-dangerous"] },
        { id: "pg-books", text: "Lire 30 livres ou documents", unlocks: true, trophies: ["bookworm"] },
        { id: "pg-bombs", text: "Connaître 6 formules de bombes", unlocks: true, trophies: ["bombardier"] },
        { id: "pg-nests", text: "Finir les nids de monstres d'une des deux grandes régions", unlocks: true, trophies: ["pest-control"] },
        { id: "pg-combat", text: "Finir les trophées de combat (liste « À surveiller »)", trophies: ["kaer-morhen-trained", "what-was-that", "butcher-of-blaviken", "humpty-dumpty", "master-marksman", "overkill", "power-overwhelming"] },
        {
          id: "pg-gwent-neutral",
          text: "Gagner une manche de Gwent avec uniquement des cartes neutres",
          unlocks: true,
          verify: true,
          trophies: ["geralt-and-friends"],
          details: ["Description d'une seule source ; certains guides le classent manquable. Fais-le dès que tu as assez de cartes neutres."]
        },
        { id: "pg-platinum", text: "Platine !", unlocks: true, trophies: ["the-limits-of-the-possible"] }
      ],
      enjoy: "Félicitations, sorceleur.",
      sources: ["powerpyx", "pst-guide"]
    }
  ],

  // ---------------------------------------------------------------------------
  // Trophées du jeu de base (liste partielle : 36 sur 53). Noms anglais.
  // ---------------------------------------------------------------------------
  trophies: [
    { id: "the-limits-of-the-possible", name: "The Limits of the Possible", grade: "platinum", description: "Obtenir tous les trophées.", verify: true },

    { id: "lilac-and-gooseberries", name: "Lilac and Gooseberries", description: "Retrouver Yennefer de Vengerberg." },
    { id: "family-counselor", name: "Family Counselor", hidden: true, description: "Retrouver la femme et la fille du baron." },
    { id: "necromancer", name: "Necromancer", hidden: true, description: "Aider Yennefer à tirer des informations du corps de Skjall." },
    { id: "kingmaker", name: "Kingmaker", hidden: true, description: "Terminer l'intrigue sur le choix du souverain de Skellige." },
    { id: "something-more", name: "Something More", hidden: true, description: "Retrouver Ciri." },
    { id: "xenonaut", name: "Xenonaut", hidden: true, description: "Visiter Tir ná Lia et convaincre Ge'els de trahir Eredin." },

    { id: "passed-the-trial", name: "Passed the Trial", description: "Terminer le jeu, quelle que soit la difficulté." },
    { id: "ran-the-gauntlet", name: "Ran the Gauntlet", description: "Terminer le jeu en difficulté Blood and Broken Bones! ou supérieure." },
    {
      id: "walked-the-path",
      name: "Walked the Path",
      description: "Terminer le jeu en difficulté Death March! sans jamais la baisser.",
      missable: true,
      tip: "Manquable pour la partie en cours dès que la difficulté est baissée ; possible en Nouvelle Partie+.",
      sources: ["xba-guide", "pst-guide"]
    },

    {
      id: "full-crew",
      name: "Full Crew",
      hidden: true,
      description: "Rassembler tous les alliés possibles avant la bataille contre la Chasse.",
      missable: true,
      tip: "7 alliés requis, recrutés avant « The Isle of Mists ».",
      sources: ["thegamer-fullcrew"]
    },
    {
      id: "friends-with-benefits",
      name: "Friends With Benefits",
      hidden: true,
      description: "Terminer l'intrigue de Keira Metz.",
      missable: true,
      tip: "Avant « The Isle of Mists ».",
      sources: ["thegamer-fullcrew"]
    },
    {
      id: "assassin-of-kings",
      name: "Assassin of Kings",
      hidden: true,
      description: "Participer à l'assassinat du roi Radovid.",
      missable: true,
      tip: "« Reason of State » doit être terminée avant « The Isle of Mists ».",
      sources: ["wiki-reason"]
    },
    {
      id: "woodland-spirit",
      name: "Woodland Spirit",
      description: "Tuer l'esprit de la forêt (contrat « In the Heart of the Woods »).",
      missable: true,
      tip: "Choisir la proposition de Sven.",
      sources: ["pst-guide"]
    },
    {
      id: "the-doppler-effect",
      name: "The Doppler Effect",
      description: "Terminer le contrat « An Elusive Thief ».",
      missable: true,
      verify: true,
      tip: "Ne pas laisser la cible s'échapper pendant la poursuite."
    },
    {
      id: "card-collector",
      name: "Card Collector",
      description: "Obtenir toutes les cartes de Gwent du jeu de base.",
      missable: true,
      tip: "Plusieurs cartes manquables, surtout à Novigrad.",
      sources: ["gamerant-gwent"]
    },
    {
      id: "gwent-master",
      name: "Gwent Master",
      description: "Remporter le tournoi de Gwent de la quête « High Stakes ».",
      missable: true,
      verify: true,
      tip: "Une défaite annule le trophée : sauvegarde avant chaque manche.",
      sources: ["gamerant-gwent"]
    },
    { id: "geralt-and-friends", name: "Geralt and Friends", description: "Gagner une manche de Gwent avec uniquement des cartes neutres.", missable: true, verify: true },
    { id: "brawl-master", name: "Brawl Master", description: "Terminer toutes les quêtes de combat à mains nues.", missable: true, sources: ["powerpyx-fists"] },
    { id: "fist-of-the-south-star", name: "Fist of the South Star", description: "Vaincre un adversaire à mains nues sans subir de dégâts.", missable: true },
    { id: "fast-and-furious", name: "Fast and Furious", description: "Gagner toutes les courses de chevaux.", missable: true, sources: ["powerpyx-races"] },
    { id: "even-odds", name: "Even Odds", description: "Tuer 2 monstres de contrat sans Signes, potions, mutagènes, huiles ni bombes.", missable: true, verify: true },
    { id: "geralt-the-professional", name: "Geralt: The Professional", description: "Terminer tous les contrats de sorceleur.", tip: "« Devil by the Well » échoue au lancement de « On Thin Ice ».", sources: ["thegamer-autofail"] },

    { id: "bookworm", name: "Bookworm", description: "Lire 30 livres, journaux ou autres documents." },
    { id: "bombardier", name: "Bombardier", description: "Obtenir les formules de 6 types de bombes différents." },
    { id: "armed-and-dangerous", name: "Armed and Dangerous", description: "Trouver et équiper toutes les pièces d'un set d'équipement de sorceleur." },
    { id: "munchkin", name: "Munchkin", description: "Atteindre le niveau 35." },
    { id: "mutant", name: "Mutant", description: "Remplir tous les emplacements de mutagènes." },
    { id: "pest-control", name: "Pest Control", description: "Détruire tous les nids de monstres de Velen/Novigrad, ou de Skellige." },
    { id: "power-overwhelming", name: "Power Overwhelming", description: "Avoir tous les bonus de lieux de pouvoir actifs en même temps." },
    { id: "kaer-morhen-trained", name: "Kaer Morhen Trained", description: "Réussir 10 contre-attaques d'affilée sans être touché ni parer." },
    { id: "what-was-that", name: "What Was That?", description: "Attaquer, contre-attaquer, lancer un Signe et une bombe (dans n'importe quel ordre) en moins de 4 secondes." },
    { id: "butcher-of-blaviken", name: "Butcher of Blaviken", description: "Tuer au moins 5 adversaires en moins de 10 secondes." },
    { id: "humpty-dumpty", name: "Humpty Dumpty", description: "Tuer 10 adversaires en les projetant d'un endroit élevé avec le Signe Aard." },
    { id: "master-marksman", name: "Master Marksman", description: "Tuer 50 adversaires d'un carreau d'arbalète dans la tête.", verify: true },
    { id: "overkill", name: "Overkill", grade: "silver", description: "Infliger en même temps saignement, empoisonnement et brûlure à un adversaire, 10 fois." }
  ]
});
