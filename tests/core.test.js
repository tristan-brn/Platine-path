"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const Core = require("../js/core.js");
const { sampleGame } = require("./helpers.js");

test("le parcours avance étape par étape", () => {
  const game = sampleGame();
  const gs = Core.emptyGameState();

  assert.equal(Core.currentStepIndex(game, gs), 0);
  assert.equal(Core.stepStatus(game, gs, 0), "current");
  assert.equal(Core.stepStatus(game, gs, 1), "upcoming");

  Core.completeStep(gs, game.steps[0], new Date("2026-01-01T00:00:00Z"));
  assert.equal(gs.stepsDone.s1, "2026-01-01T00:00:00.000Z");
  assert.equal(gs.revealed.s1, true, "terminer une étape la révèle aussi");
  assert.equal(Core.currentStepIndex(game, gs), 1);
  assert.equal(Core.stepStatus(game, gs, 0), "done");
  assert.equal(Core.stepStatus(game, gs, 1), "current");

  Core.reopenStep(gs, "s1");
  assert.equal(Core.currentStepIndex(game, gs), 0);
});

test("toutes les étapes terminées => index hors limites", () => {
  const game = sampleGame();
  const gs = Core.emptyGameState();
  game.steps.forEach((s) => Core.completeStep(gs, s));
  assert.equal(Core.currentStepIndex(game, gs), game.steps.length);
  assert.equal(Core.gameProgress(game, gs).percent, 100);
});

test("révéler au-delà de l'étape en cours demande confirmation", () => {
  const game = sampleGame();
  const gs = Core.emptyGameState();
  assert.equal(Core.revealNeedsConfirmation(game, gs, 0), false);
  assert.equal(Core.revealNeedsConfirmation(game, gs, 1), true);
  Core.completeStep(gs, game.steps[0]);
  assert.equal(Core.revealNeedsConfirmation(game, gs, 1), false);
  assert.equal(Core.revealNeedsConfirmation(game, gs, 0), false, "revoir une étape passée ne spoile rien");
});

test("les tâches manquables non cochées sont signalées avant de clore l'étape", () => {
  const game = sampleGame();
  const gs = Core.emptyGameState();
  const step = game.steps[1];
  assert.deepEqual(Core.pendingMissableTasks(step, gs).map((t) => t.id), ["t2"]);
  Core.setTask(game, gs, step.tasks[0], true);
  assert.deepEqual(Core.pendingMissableTasks(step, gs), []);
  assert.deepEqual(Core.stepProgress(step, gs), { done: 1, total: 2 });
});

test("une tâche « unlocks » coche ses trophées, une tâche liée non", () => {
  const game = sampleGame();
  const gs = Core.emptyGameState();
  Core.setTask(game, gs, game.steps[1].tasks[0], true);
  assert.equal(gs.trophies.boss, true);
  Core.setTask(game, gs, game.steps[1].tasks[1], true);
  assert.equal(gs.trophies.story, undefined);
  // Décocher la tâche ne retire pas le trophée (il a pu être obtenu autrement).
  Core.setTask(game, gs, game.steps[1].tasks[0], false);
  assert.equal(gs.tasksDone.t2, undefined);
  assert.equal(gs.trophies.boss, true);
});

test("un trophée caché devient visible une fois révélé, obtenu ou son étape passée", () => {
  const game = sampleGame();
  const secret = Core.findTrophy(game, "story");

  let gs = Core.emptyGameState();
  assert.equal(Core.isTrophyVisible(game, gs, secret), false);
  assert.equal(Core.isTrophyVisible(game, gs, Core.findTrophy(game, "boss")), true);

  gs.spoilers["trophy:story"] = true;
  assert.equal(Core.isTrophyVisible(game, gs, secret), true);

  gs = Core.emptyGameState();
  Core.setTrophy(gs, "story", true);
  assert.equal(Core.isTrophyVisible(game, gs, secret), true);

  gs = Core.emptyGameState();
  Core.revealCheckpoint(gs, "s2");
  assert.equal(Core.isTrophyVisible(game, gs, secret), false, "révéler l'étape ne suffit pas");
  Core.completeStep(gs, game.steps[1]);
  assert.equal(Core.isTrophyVisible(game, gs, secret), true);
});

test("les éléments « À surveiller » verrouillés s'ouvrent avec leur étape", () => {
  const game = sampleGame();
  const gs = Core.emptyGameState();
  const [open, late] = game.watch;
  assert.equal(Core.isWatchUnlocked(gs, open), true);
  assert.equal(Core.isWatchUnlocked(gs, late), false);
  Core.revealCheckpoint(gs, "s2");
  assert.equal(Core.isWatchUnlocked(gs, late), true);
});

test("les compteurs restent entre 0 et le total", () => {
  const game = sampleGame();
  const gs = Core.emptyGameState();
  const item = game.watch[1];
  assert.equal(Core.setCounter(gs, item, 2), 2);
  assert.equal(Core.setCounter(gs, item, 99), 3);
  assert.equal(Core.setCounter(gs, item, -4), 0);
  assert.equal(gs.counters[item.id], undefined, "zéro n'est pas stocké");
  assert.equal(Core.setCounter(gs, { id: "sans-total" }, 7.8), 7);
});

test("gameProgress utilise le total officiel quand la liste est partielle", () => {
  const game = sampleGame();
  game.overview = { trophyCount: 10 };
  const gs = Core.emptyGameState();
  Core.setTrophy(gs, "plat", true);
  const p = Core.gameProgress(game, gs);
  assert.equal(p.trophiesListed, 3);
  assert.equal(p.trophiesTotal, 10);
  assert.equal(p.trophiesDone, 1);
  assert.equal(p.platinum, true);
});

test("normalizeState ignore les données corrompues", () => {
  assert.deepEqual(Core.normalizeState(null), Core.emptyState());
  assert.deepEqual(Core.normalizeState({ games: "nope" }), Core.emptyState());

  const state = Core.normalizeState({
    games: {
      demo: {
        revealed: { s1: true, s2: "oui" },
        stepsDone: { s1: "2026-01-01T00:00:00.000Z", s2: 3, s3: true },
        tasksDone: ["t1"],
        trophies: { plat: true },
        counters: { a: 4.7, b: -1, c: "3", d: Infinity },
        notes: 42
      },
      broken: "x"
    }
  });
  const gs = state.games.demo;
  assert.deepEqual(gs.revealed, { s1: true });
  assert.deepEqual(Object.keys(gs.stepsDone), ["s1", "s3"]);
  assert.deepEqual(gs.tasksDone, {});
  assert.deepEqual(gs.trophies, { plat: true });
  assert.deepEqual(gs.counters, { a: 4 });
  assert.equal(gs.notes, "");
  assert.equal(state.games.broken, undefined);
});

test("validateGame accepte un guide correct", () => {
  assert.deepEqual(Core.validateGame(sampleGame()), []);
});

test("validateGame signale les références et champs invalides", () => {
  const game = sampleGame();
  game.id = "Pas Valide";
  game.accent = "red; background: url(x)";
  game.sources[0].url = "javascript:alert(1)";
  game.steps[0].checkpoint.level = "panique";
  game.steps[1].tasks[1].trophies = ["inconnu"];
  game.steps[2].id = "s1";
  game.watch[1].revealAfter = "nulle-part";
  game.watch[0].count = 2.5;
  game.trophies.push({ id: "plat2", name: "Autre", grade: "platinum", description: "x" });
  game.steps[0].tasks.push({ id: "t-bad", text: "x", unlocks: true });

  const errors = Core.validateGame(game).join("\n");
  [
    /^id :/m,
    /^accent :/m,
    /sources\[0\]\.url/,
    /steps\[0\]\.checkpoint\.level/,
    /trophée inconnu « inconnu »/,
    /identifiant en double « s1 »/,
    /étape inconnue « nulle-part »/,
    /watch\[0\]\.count/,
    /un seul trophée platine/,
    /tasks\[1\]\.unlocks/
  ].forEach((re) => assert.match(errors, re));
});

test("validateGame rejette ce qui n'est pas un objet", () => {
  assert.deepEqual(Core.validateGame(null), ["guide : objet attendu"]);
  assert.ok(Core.validateGame({}).length > 0);
});
