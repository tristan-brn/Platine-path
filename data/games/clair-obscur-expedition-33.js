/*
 * Guide de platine — Clair Obscur: Expedition 33 (PS5)
 *
 * Compilé à partir des guides listés dans `sources` (PSNProfiles, PowerPyx,
 * PlayStationTrophies.org, Game8…). Le texte est reformulé : pour les
 * emplacements précis des collectibles, suivre les liens des sources.
 * Les éléments `verify: true` sont incertains ou contradictoires entre sources.
 *
 * Règle d'écriture anti-spoil :
 *  - `checkpoint.when`, les titres d'étapes et la liste `watch` sont visibles
 *    dès le départ : ils ne doivent rien révéler de l'histoire ;
 *  - le reste d'une étape n'apparaît qu'après « J'y suis » ;
 *  - `{ text, spoiler: true }` masque encore une ligne précise.
 */
(window.PLATINE_GAMES = window.PLATINE_GAMES || []).push({
  id: "clair-obscur-expedition-33",
  title: "Clair Obscur: Expedition 33",
  platform: "PS5",
  accent: "#c8a24a",
  updated: "2026-09-29",

  overview: {
    trophyCount: 56,
    breakdown: "1 platine · 2 or · 5 argent · 48 bronze",
    difficulty: "3/10 (estimation PowerPyx)",
    time: "50 à 70 h (estimation PowerPyx)",
    playthroughs: "1 seule partie, nettoyage après le générique",
    missables: "Oui — tous signalés dans les points de vigilance",
    online: "Aucun",
    difficultyTrophies: "Aucun : tout est faisable dans n'importe quelle difficulté",
    hiddenTrophies: "41 trophées cachés sur 56"
  },

  disclaimer:
    "Guide compilé par Claude à partir de résultats de recherche sur les guides cités (leurs pages n'étaient pas lisibles directement depuis l'environnement de travail). " +
    "Les points marqués « à vérifier » sont incertains ou contradictoires entre sources. La liste des trophées est partielle : complète-la depuis PSNProfiles. " +
    "Aucun glitch ni exploit n'est utilisé.",

  sources: [
    { id: "psnp-guide", label: "PSNProfiles — Trophy Guide", url: "https://psnprofiles.com/guide/22179-clair-obscur-expedition-33-trophy-guide" },
    { id: "psnp-walkthrough", label: "PSNProfiles — Full Platinum Walkthrough", url: "https://psnprofiles.com/guide/22615-clair-obscur-expedition-33-full-platinum-walkthrough" },
    { id: "psnp-trophies", label: "PSNProfiles — liste des trophées", url: "https://psnprofiles.com/trophies/33395-clair-obscur-expedition-33" },
    { id: "powerpyx", label: "PowerPyx — Trophy Guide & Roadmap", url: "https://www.powerpyx.com/clair-obscur-expedition-33-trophy-guide-roadmap/" },
    { id: "powerpyx-collectibles", label: "PowerPyx — tous les collectibles", url: "https://www.powerpyx.com/clair-obscur-expedition-33-all-collectible-locations-guide/" },
    { id: "pst-guide", label: "PlayStationTrophies.org — Trophy Guide & Road Map", url: "https://www.playstationtrophies.org/game/clair-obscur-expedition-33/guide/" },
    { id: "pst-records", label: "PlayStationTrophies.org — disques de musique", url: "https://www.playstationtrophies.org/game/clair-obscur-expedition-33/guide/all-music-records-locations" },
    { id: "pst-skills", label: "PlayStationTrophies.org — compétences à apprendre", url: "https://www.playstationtrophies.org/game/clair-obscur-expedition-33/guide/all-monoco-skills-nevron-feet-locations" },
    { id: "game8-missables", label: "Game8 — manquables et points de non-retour", url: "https://game8.co/games/Clair-Obscur-Expedition-33/archives/515786" },
    { id: "brokenbuilds", label: "BrokenBuilds — Trophy & Achievement Guide", url: "https://brokenbuilds.gg/expedition-33/guides/expedition-33-trophy-guide" },
    { id: "weareps", label: "WeArePlayStation — trophées manquables (FR)", url: "https://www.weareplaystation.fr/communautes/clair-obscur-expedition-33/astuces/wiki/clair-obscur-expedition-33-guide-des-trophees-manquables-collectibles-duree-platine" },
    { id: "gamerant-act3", label: "Game Rant — l'Acte III a-t-il un point de non-retour ?", url: "https://gamerant.com/act-3-clair-obscur-expedition-33-explained-point-of-no-return/" },
    { id: "ta-missables", label: "TrueAchievements — ne manquer aucun succès (forum)", url: "https://www.trueachievements.com/forum/viewthread.aspx?tid=1617125" }
  ],

  // ---------------------------------------------------------------------------
  // « À surveiller pendant tout le jeu » — visible dès le départ, donc SANS spoil.
  // ---------------------------------------------------------------------------
  watch: [
    {
      id: "w-flags",
      category: "reflex",
      title: "Se reposer aux drapeaux d'Expédition",
      summary: "Avant chaque moment signalé dans le parcours, repose-toi à un drapeau : c'est ton point de retour si quelque chose tourne mal.",
      details: [
        "Se reposer fait réapparaître les ennemis de la zone : pratique pour retenter un combat."
      ]
    },
    {
      id: "w-camp",
      category: "reflex",
      title: "Discussions au camp",
      summary: "Dès qu'une discussion est proposée au camp, prends-la. Les relations au niveau 7 rapportent chacune un trophée.",
      count: 35,
      details: [
        "35 interactions de relation au total (PowerPyx).",
        "Personne n'atteint le niveau 7 avant le dernier acte : c'est normal, continue simplement à passer au camp.",
        "Un seul choix de dialogue est piégeux : il est signalé au bon moment dans le parcours."
      ],
      trophies: ["maelle", "lune", "sciel", "esquie", "monoco"],
      sources: ["powerpyx", "pst-guide"]
    },
    {
      id: "w-explore",
      category: "reflex",
      title: "Explorer les chemins de traverse",
      summary: "Journaux, disques et Gestrals perdus sont souvent à l'écart du chemin principal. Explore à ton rythme : les zones restent accessibles plus tard.",
      details: [
        "Seules exceptions : les points signalés « critique » dans le parcours.",
        "Inutile de tout ratisser au premier passage : un nettoyage est prévu en fin de parcours."
      ],
      sources: ["gamerant-act3", "powerpyx"]
    },
    {
      id: "w-nevrons",
      category: "reflex",
      title: "Nevrons qui ne t'attaquent pas",
      summary: "Certains Nevrons sont pacifiques et proposent une quête. Accepte-les toujours, même quand l'un d'eux te demande de le combattre.",
      count: 10,
      details: [
        "10 quêtes de Nevrons au total (PowerPyx).",
        "Combattre un Nevron après avoir terminé sa quête n'annule pas le trophée."
      ],
      trophies: ["aiding-the-enemy"],
      sources: ["powerpyx", "ta-missables"]
    },
    {
      id: "w-journals",
      category: "collectible",
      title: "Journaux d'expédition",
      summary: "Journaux laissés par les expéditions précédentes. L'un d'eux dépend d'un objet obtenu au tout début du jeu (signalé dans le parcours).",
      count: 49,
      trophies: ["follow-the-trail"],
      sources: ["powerpyx", "powerpyx-collectibles"]
    },
    {
      id: "w-records",
      category: "collectible",
      title: "Disques de musique",
      summary: "33 disques à trouver (coffres, marchands, combats). Deux sont liés à des moments précis, signalés dans le parcours.",
      count: 33,
      trophies: ["connoisseur"],
      sources: ["pst-records", "powerpyx"]
    },
    {
      id: "w-lost-gestrals",
      category: "collectible",
      title: "Gestrals perdus",
      summary: "Des Gestrals égarés sont cachés sur la carte et dans les zones. Ramène-les tous.",
      count: 9,
      trophies: ["lost-gestrals"],
      sources: ["powerpyx"]
    },
    {
      id: "w-beaches",
      category: "collectible",
      title: "Plages gestrales (mini-jeux)",
      summary: "Chaque plage gestrale propose un mini-jeu. Certaines ne deviennent accessibles que plus tard dans l'aventure.",
      count: 5,
      details: [
        "Pour la course, il faut obtenir l'or."
      ],
      trophies: ["gestral-games"],
      sources: ["powerpyx"]
    },
    {
      id: "w-skills",
      category: "collectible",
      title: "Compétences de Monoco",
      summary: "Monoco apprend ses compétences en battant certains ennemis — uniquement s'il est dans l'équipe active au moment de la victoire.",
      count: 44,
      revealAfter: "act2",
      details: [
        "Une seule compétence est signalée comme manquable : celle du boss Grosse Tête (voir Acte III)."
      ],
      trophies: ["feet-collection"],
      sources: ["pst-skills", "ta-missables"]
    },
    {
      id: "w-paint-cages",
      category: "poi",
      title: "Cages de peinture",
      summary: "Des cages scellées gardent des récompenses. En briser une suffit pour un trophée.",
      trophies: ["paint-cage"],
      verify: true
    },
    {
      id: "w-chromatic",
      category: "poi",
      title: "Boss chromatiques optionnels",
      summary: "Des versions « chromatiques » d'ennemis, plus coriaces, gardent de bonnes récompenses. Ce sont aussi de bons candidats pour le trophée « sans dégâts ».",
      trophies: ["professional", "carreau-parfait"],
      sources: ["pst-guide"]
    },
    {
      id: "w-weapons",
      category: "poi",
      title: "Amélioration d'armes",
      summary: "Améliorer une arme au maximum rapporte un trophée argent : concentre tes ressources d'amélioration sur une arme que tu aimes.",
      verify: true
    },
    {
      id: "w-gustave",
      category: "character",
      title: "Gustave — Surcharge",
      summary: "Surcharge chargée à 10/10 qui provoque un Break. À faire dès le Prologue, au pire au début de l'Acte I. Ne le repousse pas.",
      details: [
        { text: "Pourquoi c'est urgent : Gustave n'est plus jouable après la fin de l'Acte I.", spoiler: true }
      ],
      trophies: ["overcharge"],
      sources: ["weareps", "pst-guide"]
    },
    {
      id: "w-sciel",
      category: "character",
      title: "Sciel — Présages",
      summary: "Avec Sciel, consommer 20 Présages (Foretell) sur une seule cible pendant le Crépuscule (Twilight).",
      trophies: ["maximisation"],
      verify: true
    },
    {
      id: "w-lune",
      category: "character",
      title: "Lune — Taches",
      summary: "Avec Lune, consommer des Taches (Stains) 4 tours d'affilée. Un ennemi robuste que tu évites de mettre en Break aide beaucoup.",
      verify: true
    },
    {
      id: "w-maelle-mech",
      category: "character",
      title: "Maelle — Percée",
      summary: "Avec Maelle, utiliser Percée sur un ennemi Marqué pendant la posture Virtuose.",
      verify: true
    },
    {
      id: "w-gradient",
      category: "character",
      title: "Attaque Gradient de niveau 3",
      summary: "Dès que les attaques Gradient sont disponibles, charge la jauge jusqu'au niveau 3 lors d'un long combat (boss) et lance-la.",
      trophies: ["chroma-proficiency"],
      verify: true
    }
  ],

  // ---------------------------------------------------------------------------
  // Parcours chronologique. `checkpoint.when` et `title` sont visibles d'avance.
  // ---------------------------------------------------------------------------
  steps: [
    {
      id: "prep",
      title: "Préparation",
      checkpoint: {
        when: "Avant de lancer ta partie",
        level: "calm",
        alerts: [
          "La difficulté n'a aucune incidence sur les trophées : choisis celle qui te fait plaisir.",
          "Aucun trophée en ligne, une seule partie suffit.",
          "Parcours le menu « À surveiller pendant tout le jeu » : ce sont les réflexes à garder du début à la fin."
        ]
      },
      tasks: [
        { id: "prep-watch", text: "Lire la liste « À surveiller » (elle ne contient aucun spoiler)" },
        { id: "prep-difficulty", text: "Choisir ta difficulté" }
      ],
      enjoy: "Lance le jeu ! Le prochain point de vigilance arrive très vite, dès le festival du Prologue.",
      sources: ["powerpyx"]
    },
    {
      id: "prologue",
      title: "Prologue",
      checkpoint: {
        when: "Dès le début du jeu, pendant le festival de Lumière (Prologue)",
        level: "critical",
        alerts: [
          "Un combat optionnel, un échange d'objet et un trophée de personnage se jouent ici et deviennent impossibles (ou très compliqués) une fois le festival terminé.",
          "Ne te rends pas au port tant que les trois tâches marquées « manquable » ne sont pas faites : le Prologue avance ensuite sans retour possible."
        ]
      },
      tasks: [
        {
          id: "pro-mime",
          text: "Vaincre le Mime isolé près de la scène du festival",
          missable: true,
          unlocks: true,
          trophies: ["a-peculiar-encounter"],
          details: [
            "Depuis la scène où se produisent des enfants, dirige-toi vers l'est : le Mime se tient seul, un peu à l'écart.",
            "Il peut être coriace à ce stade : observe ses attaques, pare ou esquive, et retente si besoin.",
            "Garde-le pour la tâche suivante (Surcharge de Gustave) avant de l'achever.",
            { text: "Il laisse le disque « Lumière », qui peut aussi être récupéré en fin de jeu : pas d'inquiétude pour le trophée des disques.", spoiler: true }
          ]
        },
        {
          id: "pro-overcharge",
          text: "Avec Gustave, provoquer un Break avec une Surcharge chargée à 10/10",
          missable: true,
          unlocks: true,
          verify: true,
          trophies: ["overcharge"],
          details: [
            "Le Mime est la première cible idéale : remplis sa jauge de Break (jaune, sous sa barre de vie) sans la terminer, attends que la Surcharge soit à 10/10, puis utilise-la pour déclencher le Break.",
            "Si ça ne marche pas ici, fais-le au tout début de l'Acte I sur un ennemi résistant.",
            { text: "Pourquoi c'est urgent : Gustave n'est plus jouable après la fin de l'Acte I.", spoiler: true }
          ]
        },
        {
          id: "pro-old-key",
          text: "Échanger un Jeton du Festival contre la Vieille Clé",
          missable: true,
          trophies: ["follow-the-trail"],
          details: [
            "Pendant le festival, tu reçois des Jetons du Festival. Le troisième stand (tenu par Colette, au fond à gauche) propose la Vieille Clé contre un jeton.",
            "Cette clé ouvre, bien plus tard, la porte d'un journal d'expédition. Sans elle, pas de trophée « tous les journaux ».",
            { text: "Filet de sécurité : depuis le patch 1.5.0, une seconde Vieille Clé existe dans une zone de fin de jeu. Ne compte pas dessus, prends-la maintenant.", spoiler: true }
          ]
        },
        {
          id: "pro-stands",
          text: "Faire le tour des trois stands du festival (Tom, Amandine, Colette)",
          details: ["Pas de trophée direct : c'est surtout l'occasion de profiter de Lumière avant le départ."]
        }
      ],
      trophies: ["lumiere"],
      enjoy: "Une fois le Mime vaincu et la clé en poche, vis le Prologue sans te presser. Le trophée « Lumière » tombe tout seul à la fin.",
      sources: ["powerpyx", "game8-missables", "brokenbuilds", "weareps"]
    },
    {
      id: "act1",
      title: "Acte I",
      checkpoint: {
        when: "Au début de l'Acte I, dès que l'Expédition pose le pied sur le Continent",
        level: "caution",
        alerts: [
          "Rien d'autre n'est définitivement manquable dans cet acte, SAUF la Surcharge de Gustave si elle n'est pas encore faite : règle-la maintenant.",
          "Prends l'habitude du camp : parle à chaque compagnon dès qu'une discussion est proposée.",
          "Bonne période pour tenter le trophée « boss sans dégâts » sur un boss optionnel (voir tâches)."
        ]
      },
      tasks: [
        {
          id: "a1-overcharge",
          text: "Si pas encore fait : Surcharge 10/10 de Gustave qui provoque un Break",
          missable: true,
          unlocks: true,
          trophies: ["overcharge"],
          details: [
            { text: "Dernier délai : la fin de l'Acte I, dont la dernière zone est Stone Wave Cliffs (Falaises de Rochevague).", spoiler: true }
          ]
        },
        {
          id: "a1-professional",
          text: "Vaincre un boss sans subir le moindre dégât",
          unlocks: true,
          trophies: ["professional"],
          details: [
            "Cible souvent conseillée : le Lancelier chromatique, boss optionnel de la première zone (Spring Meadows / Vallons fleuris).",
            "Repose-toi au drapeau avant, et recommence dès que tu es touché : c'est un exercice de parade et d'esquive.",
            "Certains guides le classent « manquable » car la plupart des boss ne réapparaissent pas ; d'autres citent un boss de fin de jeu qui réapparaît. Le plus serein reste de le faire tôt."
          ],
          sources: ["pst-guide", "powerpyx"]
        },
        { id: "a1-paint-cage", text: "Briser une Cage de peinture", unlocks: true, trophies: ["paint-cage"], verify: true },
        { id: "a1-camp", text: "Passer au camp et prendre chaque discussion proposée", trophies: ["lune", "sciel", "maelle"] },
        { id: "a1-collect", text: "Ramasser journaux et disques trouvés en chemin (compteurs dans « À surveiller »)", trophies: ["follow-the-trail", "connoisseur"] }
      ],
      trophies: ["spring-meadows", "flying-waters", "ancient-sanctuary", "gestral-village", "esquies-nest", "stone-wave-cliffs"],
      enjoy: "L'Acte I se savoure tel quel : suis l'histoire, explore les zones, fais les combats optionnels qui te tentent. Prochain point de vigilance au début de l'Acte II.",
      sources: ["powerpyx", "pst-guide", "weareps"]
    },
    {
      id: "act2",
      title: "Acte II",
      checkpoint: {
        when: "Quand l'écran « Acte II » s'affiche",
        level: "caution",
        alerts: [
          "Un nouveau compagnon rejoint l'équipe : il apprend des compétences en combat, mais seulement s'il est dans l'équipe active. Garde-le avec toi le plus souvent possible.",
          "Un disque de musique est lié à une discussion de camp après un boss majeur : il a son propre point de vigilance juste après."
        ]
      },
      tasks: [
        {
          id: "a2-skills",
          text: "Garder Monoco dans l'équipe active pour qu'il apprenne ses compétences",
          trophies: ["feet-collection"],
          details: ["Le compteur « Compétences de Monoco » est maintenant visible dans « À surveiller »."]
        },
        { id: "a2-camp", text: "Continuer les discussions au camp avec tout le monde", trophies: ["lune", "sciel", "maelle", "monoco"] },
        { id: "a2-nevrons", text: "Accepter les quêtes des Nevrons pacifiques que tu croises", trophies: ["aiding-the-enemy"] }
      ],
      trophies: ["forgotten-battlefield", "monocos-station", "old-lumiere"],
      enjoy: "Profite de l'Acte II et de ses révélations. Prochain point de vigilance : juste après le premier des deux grands boss « Axon ».",
      sources: ["pst-skills", "ta-missables"]
    },
    {
      id: "act2-axon",
      title: "Acte II — après le premier Axon",
      checkpoint: {
        when: "Acte II : juste après ta victoire contre le premier des deux grands boss « Axon »",
        level: "caution",
        alerts: [
          "Avant d'aller plus loin, retourne au camp : une discussion avec Maelle rapporte le disque « Lettre à Maelle », signalé comme potentiellement manquable."
        ]
      },
      tasks: [
        {
          id: "a2x-record",
          text: "Aller au camp et obtenir le disque « Lettre à Maelle »",
          missable: true,
          verify: true,
          trophies: ["connoisseur"],
          details: ["Que ton premier Axon soit Visages ou Sirène, le déclencheur est le même : la visite au camp qui suit."]
        }
      ],
      trophies: ["first-axon", "second-axon"],
      enjoy: "Termine l'Acte II à ton rythme. Prochain point de vigilance : l'écran « Acte III ».",
      sources: ["pst-records"]
    },
    {
      id: "act3",
      title: "Acte III",
      checkpoint: {
        when: "Quand l'écran « Acte III » s'affiche",
        level: "critical",
        alerts: [
          "Plus de point de non-retour : tout le contenu reste accessible après le générique (en rechargeant ta dernière sauvegarde).",
          "Le monde entier s'ouvre : c'est le moment des collectibles, boss optionnels, plages et relations au niveau 7.",
          "Un seul vrai piège : la dernière discussion de relation avec Maelle (tâche marquée « manquable »)."
        ]
      },
      tasks: [
        {
          id: "a3-maelle",
          text: "Relation Maelle niveau 7 : choisir l'option « Vérité » (Truth)",
          missable: true,
          unlocks: true,
          trophies: ["maelle"],
          details: [
            "Lors de la 7ᵉ interaction de relation avec Maelle au camp, choisis l'option marquée « (Vérité) » et non « (Mensonge) ».",
            "Le mensonge bloque le niveau 7 : pas de trophée ni d'attaque Gradient de niveau 3 pour Maelle. En cas d'erreur, recharge une sauvegarde antérieure."
          ],
          sources: ["pst-guide", "powerpyx"]
        },
        {
          id: "a3-relations",
          text: "Monter toutes les autres relations au niveau 7",
          trophies: ["lune", "sciel", "esquie", "monoco"],
          verify: true
        },
        {
          id: "a3-old-key",
          text: "Ouvrir la porte du journal verrouillé avec la Vieille Clé",
          trophies: ["follow-the-trail"],
          details: [
            "Pour l'emplacement de la porte, consulte un guide des journaux (PowerPyx ou PlayStationTrophies.org).",
            { text: "Clé oubliée au Prologue ? Depuis le patch 1.5.0 : à Lumière, en haut des premières marches depuis les quais, sur la gauche.", spoiler: true }
          ],
          verify: true,
          sources: ["game8-missables", "brokenbuilds"]
        },
        {
          id: "a3-grosse-tete",
          text: "Vaincre Grosse Tête (boss de la carte, niveau ~65) avec Monoco dans l'équipe active",
          missable: true,
          trophies: ["feet-collection"],
          details: ["C'est la seule compétence de Monoco signalée comme manquable : s'il n'est pas dans l'équipe active lors de la victoire, il ne l'apprend pas."],
          sources: ["ta-missables"]
        },
        {
          id: "a3-nevrons",
          text: "Terminer les 10 quêtes des Nevrons",
          trophies: ["aiding-the-enemy"],
          details: ["Si un Nevron te demande de le combattre, accepte : c'est sa quête."]
        },
        {
          id: "a3-serpenphare",
          text: "Vaincre le Serpenphare (au-dessus du grand lac à l'est du Forgotten Battlefield, niveau 70+ conseillé)",
          unlocks: true,
          trophies: ["a-on"]
        },
        { id: "a3-petank", text: "Vaincre le Pétank chromatique", unlocks: true, trophies: ["carreau-parfait"], verify: true },
        { id: "a3-beaches", text: "Terminer les 5 mini-jeux des plages gestrales", trophies: ["gestral-games"] },
        { id: "a3-lost-gestrals", text: "Retrouver les 9 Gestrals perdus", trophies: ["lost-gestrals"] }
      ],
      enjoy: "L'Acte III dure le temps que tu veux : explore librement, et garde le combat final pour quand tu te sens prêt.",
      sources: ["gamerant-act3", "powerpyx"]
    },
    {
      id: "finale",
      title: "Combat final",
      checkpoint: {
        when: "Quand l'histoire t'annonce l'affrontement final",
        level: "caution",
        alerts: [
          "Repose-toi à un drapeau juste avant : c'est la sauvegarde que tu rechargeras après le générique.",
          "Après le générique, recharger ta dernière sauvegarde te ramène sur la carte avec tout le contenu accessible."
        ]
      },
      tasks: [
        { id: "fin-save", text: "Te reposer à un drapeau avant d'entrer" },
        { id: "fin-end", text: "Terminer l'histoire et regarder le générique", unlocks: true, trophies: ["the-end"] }
      ],
      enjoy: "Profite de la conclusion.",
      sources: ["powerpyx"]
    },
    {
      id: "postgame",
      title: "Après le générique : nettoyage",
      checkpoint: {
        when: "Après le générique de fin",
        level: "calm",
        alerts: [
          "Plus rien n'est manquable. Place au nettoyage, à ton rythme.",
          "Recharge ta dernière sauvegarde pour revenir sur la carte."
        ]
      },
      tasks: [
        { id: "pg-level-66", text: "Atteindre le niveau 66 (trophée argent)" },
        { id: "pg-level-99", text: "Atteindre le niveau 99", unlocks: true, trophies: ["survivor"] },
        { id: "pg-weapon", text: "Améliorer une arme au maximum (trophée argent)", verify: true },
        { id: "pg-endless", text: "Atteindre le sommet de la Tour sans fin (Endless Tower, 33 combats d'affilée)", unlocks: true, trophies: ["endless"] },
        {
          id: "pg-simon",
          text: "Vaincre Simon, le boss optionnel ultime",
          unlocks: true,
          trophies: ["peace-at-last"],
          details: [
            "Prévois un niveau très élevé.",
            { text: "Accès : l'Abîme (The Abyss), via un portail dans la zone « Renoir's Drafts ».", spoiler: true }
          ]
        },
        {
          id: "pg-collect",
          text: "Terminer tous les compteurs de collectibles (menu « À surveiller »)",
          trophies: ["follow-the-trail", "connoisseur", "lost-gestrals", "gestral-games", "feet-collection", "aiding-the-enemy"]
        },
        { id: "pg-characters", text: "Finir les trophées de mécanique des personnages", trophies: ["maximisation", "chroma-proficiency"] },
        { id: "pg-platinum", text: "Platine !", unlocks: true, trophies: ["the-greatest-expedition"] }
      ],
      enjoy: "Félicitations, Expéditionnaire.",
      sources: ["powerpyx", "pst-guide"]
    }
  ],

  // ---------------------------------------------------------------------------
  // Trophées (liste partielle : 36 sur 56). Noms anglais tels qu'affichés sur PSNProfiles.
  // `hidden: true` = masqué par défaut dans l'app (anti-spoil).
  // ---------------------------------------------------------------------------
  trophies: [
    { id: "the-greatest-expedition", name: "The Greatest Expedition in History", grade: "platinum", description: "Obtenir tous les trophées." },

    { id: "lumiere", name: "Lumière", grade: "bronze", description: "Se lancer dans l'Expédition (fin du Prologue)." },
    { id: "spring-meadows", name: "Spring Meadows", grade: "bronze", hidden: true, description: "Trouver son chemin à travers Spring Meadows." },
    { id: "flying-waters", name: "Flying Waters", grade: "bronze", hidden: true, description: "Trouver son chemin à travers Flying Waters." },
    { id: "ancient-sanctuary", name: "Ancient Sanctuary", grade: "bronze", hidden: true, description: "Trouver son chemin à travers l'Ancient Sanctuary." },
    { id: "gestral-village", name: "Gestral Village", grade: "bronze", hidden: true, description: "Trouver son chemin à travers le Gestral Village." },
    { id: "esquies-nest", name: "Esquie's Nest", grade: "bronze", hidden: true, description: "Trouver son chemin à travers l'Esquie's Nest." },
    { id: "stone-wave-cliffs", name: "Stone Wave Cliffs", grade: "bronze", hidden: true, description: "Trouver son chemin à travers les Stone Wave Cliffs." },
    { id: "forgotten-battlefield", name: "Forgotten Battlefield", grade: "bronze", hidden: true, description: "Trouver son chemin à travers le Forgotten Battlefield." },
    { id: "monocos-station", name: "Monoco's Station", grade: "bronze", hidden: true, description: "Trouver son chemin à travers la Monoco's Station." },
    { id: "old-lumiere", name: "Old Lumière", grade: "bronze", hidden: true, description: "Trouver son chemin à travers Old Lumière." },
    { id: "first-axon", name: "First Axon", hidden: true, description: "Vaincre le premier Axon." },
    { id: "second-axon", name: "Second Axon", hidden: true, description: "Vaincre le second Axon." },
    { id: "the-end", name: "The End", hidden: true, description: "Terminer l'histoire principale.", verify: true },

    {
      id: "a-peculiar-encounter",
      name: "A Peculiar Encounter",
      description: "Vaincre le Mime de Lumière pendant le Prologue.",
      missable: true,
      tip: "Manquable : uniquement pendant le festival du Prologue.",
      sources: ["brokenbuilds", "game8-missables"]
    },
    {
      id: "overcharge",
      name: "Overcharge",
      description: "Avec Gustave, utiliser une Surcharge pleine qui provoque un Break.",
      missable: true,
      verify: true,
      tip: "Manquable : à faire au Prologue ou au début de l'Acte I.",
      sources: ["weareps"]
    },
    {
      id: "follow-the-trail",
      name: "Follow the Trail",
      grade: "silver",
      description: "Trouver tous les journaux des expéditions précédentes.",
      missable: true,
      tip: "Un journal exige la Vieille Clé échangée au Prologue.",
      sources: ["powerpyx", "game8-missables"]
    },
    {
      id: "connoisseur",
      name: "Connoisseur",
      description: "Trouver tous les disques de musique (33).",
      missable: true,
      tip: "Deux disques sont liés à des moments précis (Prologue, Acte II).",
      sources: ["pst-records", "powerpyx"]
    },
    {
      id: "maelle",
      name: "Maelle",
      description: "Atteindre le niveau de relation 7 avec Maelle.",
      missable: true,
      tip: "Choisir « Vérité » lors de la 7ᵉ discussion.",
      sources: ["pst-guide", "powerpyx"]
    },
    {
      id: "professional",
      name: "Professional",
      description: "Vaincre un boss sans subir de dégâts.",
      missable: true,
      tip: "Classé manquable par PowerPyx ; à faire tôt sur un boss optionnel.",
      sources: ["powerpyx", "pst-guide"]
    },
    { id: "lune", name: "Lune", description: "Atteindre le niveau de relation 7 avec Lune.", verify: true },
    { id: "sciel", name: "Sciel", description: "Atteindre le niveau de relation 7 avec Sciel.", verify: true },
    { id: "esquie", name: "Esquie", hidden: true, description: "Atteindre le niveau de relation 7 avec Esquie.", verify: true },
    { id: "monoco", name: "Monoco", hidden: true, description: "Atteindre le niveau de relation 7 avec Monoco.", verify: true },
    { id: "feet-collection", name: "Feet Collection", hidden: true, description: "Apprendre toutes les compétences de Monoco.", tip: "Grosse Tête doit être vaincu avec Monoco dans l'équipe active.", sources: ["pst-skills", "ta-missables"] },
    { id: "aiding-the-enemy", name: "Aiding the Enemy", description: "Terminer toutes les quêtes des Nevrons.", sources: ["powerpyx"] },
    { id: "gestral-games", name: "Gestral Games", description: "Réussir les mini-jeux des plages gestrales.", verify: true },
    { id: "lost-gestrals", name: "Lost Gestrals", description: "Trouver tous les Gestrals perdus.", verify: true },
    { id: "paint-cage", name: "Paint Cage", description: "Briser une Cage de peinture.", verify: true },
    { id: "chroma-proficiency", name: "Chroma Proficiency", description: "Utiliser une attaque Gradient de niveau 3.", verify: true },
    { id: "maximisation", name: "Maximisation", description: "Avec Sciel, consommer 20 Présages sur une seule cible pendant le Crépuscule.", verify: true },
    { id: "a-on", name: "À On", hidden: true, description: "Vaincre le Serpenphare.", verify: true },
    { id: "carreau-parfait", name: "Carreau Parfait", description: "Vaincre le Pétank chromatique.", verify: true },
    { id: "survivor", name: "Survivor", grade: "silver", description: "Atteindre le niveau 99." },
    { id: "endless", name: "Endless", hidden: true, description: "Atteindre le sommet de la Tour sans fin.", verify: true },
    { id: "peace-at-last", name: "Peace At Last", grade: "gold", hidden: true, description: "Vaincre Simon." }
  ]
});
