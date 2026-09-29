"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const Core = require("../js/core.js");
const { ROOT, loadGameFile, gameFiles } = require("./helpers.js");

const files = gameFiles();
const indexHtml = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");

test("au moins un guide intégré", () => {
  assert.ok(files.length > 0);
});

for (const file of files) {
  const name = path.basename(file);

  test(name + " : guide valide", () => {
    const games = loadGameFile(file);
    assert.equal(games.length, 1, "un seul jeu par fichier");
    assert.deepEqual(Core.validateGame(games[0]), []);
  });

  test(name + " : l'identifiant correspond au nom du fichier", () => {
    const [game] = loadGameFile(file);
    assert.equal(game.id + ".js", name);
  });

  test(name + " : chargé par index.html", () => {
    assert.ok(indexHtml.includes('src="data/games/' + name + '"'), "ajoute une balise <script> pour " + name);
  });

  test(name + " : pas plus de trophées que le total annoncé", () => {
    const [game] = loadGameFile(file);
    if (game.overview && game.overview.trophyCount) {
      assert.ok(game.trophies.length <= game.overview.trophyCount);
    }
  });
}
