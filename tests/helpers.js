"use strict";

const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const ROOT = path.join(__dirname, "..");
const GAMES_DIR = path.join(ROOT, "data", "games");

// Charge un fichier de data/games/*.js comme le ferait le navigateur.
function loadGameFile(file) {
  const sandbox = { window: {} };
  vm.runInNewContext(fs.readFileSync(file, "utf8"), sandbox, { filename: file });
  return sandbox.window.PLATINE_GAMES || [];
}

function gameFiles() {
  return fs.readdirSync(GAMES_DIR)
    .filter((f) => f.endsWith(".js"))
    .map((f) => path.join(GAMES_DIR, f));
}

// Guide minimal valide, réutilisé par les tests de logique.
function sampleGame() {
  return {
    id: "demo",
    title: "Démo",
    sources: [{ id: "src", label: "Source", url: "https://example.com" }],
    watch: [
      { id: "w-open", category: "reflex", title: "Ouvert", summary: "Toujours visible." },
      { id: "w-late", category: "collectible", title: "Tardif", summary: "Après l'étape 2.", count: 3, revealAfter: "s2" }
    ],
    steps: [
      {
        id: "s1",
        title: "Début",
        checkpoint: { when: "Au début", level: "calm", alerts: ["Rien de spécial."] },
        tasks: [{ id: "t1", text: "Tâche simple" }]
      },
      {
        id: "s2",
        title: "Milieu",
        checkpoint: { when: "Au milieu", level: "critical" },
        tasks: [
          { id: "t2", text: "Manquable", missable: true, unlocks: true, trophies: ["boss"] },
          { id: "t3", text: "Normale", trophies: ["story"] }
        ],
        trophies: ["story"]
      },
      { id: "s3", title: "Fin", checkpoint: { when: "À la fin", level: "caution" } }
    ],
    trophies: [
      { id: "plat", name: "Platine", grade: "platinum", description: "Tout." },
      { id: "boss", name: "Boss", grade: "bronze", description: "Vaincre le boss.", missable: true, sources: ["src"] },
      { id: "story", name: "Secret", grade: "gold", hidden: true, description: "Spoiler." }
    ]
  };
}

module.exports = { ROOT, loadGameFile, gameFiles, sampleGame };
