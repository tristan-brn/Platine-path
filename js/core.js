/*
 * Platine Path — logique pure (sans DOM).
 * Chargé tel quel dans le navigateur (window.PlatineCore) et dans Node (require) pour les tests.
 */
(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.PlatineCore = factory();
  }
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";

  var GRADES = ["platinum", "gold", "silver", "bronze"];
  var LEVELS = ["critical", "caution", "calm"];
  var WATCH_CATEGORIES = ["reflex", "collectible", "poi", "character"];
  var ID_RE = /^[a-z0-9][a-z0-9-]*$/;

  // ---------------------------------------------------------------------------
  // État de progression
  // ---------------------------------------------------------------------------

  function emptyGameState() {
    return {
      revealed: {}, // stepId -> true : point de vigilance révélé
      stepsDone: {}, // stepId -> date ISO
      tasksDone: {}, // taskId -> true
      trophies: {}, // trophyId -> true (obtenu)
      counters: {}, // watchId -> nombre trouvé
      spoilers: {}, // clé -> true : spoiler ponctuel révélé
      notes: ""
    };
  }

  function emptyState() {
    return { version: 1, games: {} };
  }

  function isPlainObject(value) {
    return value !== null && typeof value === "object" && !Array.isArray(value);
  }

  // Nettoie un état venant du localStorage ou d'un import : ne garde que les
  // champs connus avec le bon type, pour qu'un fichier corrompu ne casse pas l'app.
  function normalizeState(raw) {
    var state = emptyState();
    if (!isPlainObject(raw) || !isPlainObject(raw.games)) return state;
    Object.keys(raw.games).forEach(function (gameId) {
      var src = raw.games[gameId];
      if (!isPlainObject(src)) return;
      var gs = emptyGameState();
      ["revealed", "tasksDone", "trophies", "spoilers"].forEach(function (key) {
        if (!isPlainObject(src[key])) return;
        Object.keys(src[key]).forEach(function (id) {
          if (src[key][id] === true) gs[key][id] = true;
        });
      });
      if (isPlainObject(src.stepsDone)) {
        Object.keys(src.stepsDone).forEach(function (id) {
          var v = src.stepsDone[id];
          if (typeof v === "string" && v) gs.stepsDone[id] = v;
          else if (v === true) gs.stepsDone[id] = new Date(0).toISOString();
        });
      }
      if (isPlainObject(src.counters)) {
        Object.keys(src.counters).forEach(function (id) {
          var n = src.counters[id];
          if (typeof n === "number" && isFinite(n) && n > 0) gs.counters[id] = Math.floor(n);
        });
      }
      if (typeof src.notes === "string") gs.notes = src.notes;
      state.games[gameId] = gs;
    });
    return state;
  }

  function gameState(state, gameId) {
    if (!state.games[gameId]) state.games[gameId] = emptyGameState();
    return state.games[gameId];
  }

  // ---------------------------------------------------------------------------
  // Parcours (étapes)
  // ---------------------------------------------------------------------------

  // Index de la première étape non terminée ; steps.length si tout est fini.
  function currentStepIndex(game, gs) {
    for (var i = 0; i < game.steps.length; i++) {
      if (!gs.stepsDone[game.steps[i].id]) return i;
    }
    return game.steps.length;
  }

  function stepIndex(game, stepId) {
    for (var i = 0; i < game.steps.length; i++) {
      if (game.steps[i].id === stepId) return i;
    }
    return -1;
  }

  // "done" | "current" | "upcoming"
  function stepStatus(game, gs, index) {
    var step = game.steps[index];
    if (gs.stepsDone[step.id]) return "done";
    return index === currentStepIndex(game, gs) ? "current" : "upcoming";
  }

  // Révéler un point de vigilance au-delà de l'étape en cours = risque de spoil.
  function revealNeedsConfirmation(game, gs, index) {
    return index > currentStepIndex(game, gs);
  }

  function stepTasks(step) {
    return step.tasks || [];
  }

  function stepProgress(step, gs) {
    var tasks = stepTasks(step);
    var done = tasks.filter(function (t) { return gs.tasksDone[t.id]; }).length;
    return { done: done, total: tasks.length };
  }

  // Tâches manquables pas encore cochées : on prévient avant de clore l'étape.
  function pendingMissableTasks(step, gs) {
    return stepTasks(step).filter(function (t) {
      return t.missable && !gs.tasksDone[t.id];
    });
  }

  function revealCheckpoint(gs, stepId) {
    gs.revealed[stepId] = true;
  }

  function completeStep(gs, step, now) {
    gs.revealed[step.id] = true;
    gs.stepsDone[step.id] = (now || new Date()).toISOString();
  }

  function reopenStep(gs, stepId) {
    delete gs.stepsDone[stepId];
  }

  function setTask(game, gs, task, checked) {
    if (checked) gs.tasksDone[task.id] = true;
    else delete gs.tasksDone[task.id];
    // Une tâche "unlocks" coche automatiquement ses trophées associés.
    if (checked && task.unlocks && task.trophies) {
      task.trophies.forEach(function (tid) {
        if (findTrophy(game, tid)) gs.trophies[tid] = true;
      });
    }
  }

  function findTask(game, taskId) {
    for (var i = 0; i < game.steps.length; i++) {
      var tasks = stepTasks(game.steps[i]);
      for (var j = 0; j < tasks.length; j++) {
        if (tasks[j].id === taskId) return tasks[j];
      }
    }
    return null;
  }

  // ---------------------------------------------------------------------------
  // Trophées & liste "À surveiller"
  // ---------------------------------------------------------------------------

  function findTrophy(game, trophyId) {
    var list = game.trophies || [];
    for (var i = 0; i < list.length; i++) {
      if (list[i].id === trophyId) return list[i];
    }
    return null;
  }

  function setTrophy(gs, trophyId, obtained) {
    if (obtained) gs.trophies[trophyId] = true;
    else delete gs.trophies[trophyId];
  }

  // Un trophée caché devient lisible quand le joueur l'a révélé à la main,
  // l'a obtenu, ou a terminé une étape qui l'annonce (il est donc déjà passé par là).
  function isTrophyVisible(game, gs, trophy) {
    if (!trophy.hidden) return true;
    if (gs.spoilers["trophy:" + trophy.id] || gs.trophies[trophy.id]) return true;
    return game.steps.some(function (step) {
      return gs.stepsDone[step.id] && (step.trophies || []).indexOf(trophy.id) !== -1;
    });
  }

  // Un élément de la liste "À surveiller" peut être verrouillé jusqu'à ce que
  // le joueur atteigne une étape (pour ne pas spoiler un personnage, une zone…).
  function isWatchUnlocked(gs, item) {
    if (!item.revealAfter) return true;
    return !!(gs.revealed[item.revealAfter] || gs.stepsDone[item.revealAfter]);
  }

  function setCounter(gs, item, value) {
    var max = item.count || Infinity;
    var n = Math.max(0, Math.min(max, Math.floor(value)));
    if (n > 0) gs.counters[item.id] = n;
    else delete gs.counters[item.id];
    return n;
  }

  function gameProgress(game, gs) {
    var steps = game.steps.length;
    var stepsDone = game.steps.filter(function (s) { return gs.stepsDone[s.id]; }).length;
    var trophies = game.trophies || [];
    var trophiesDone = trophies.filter(function (t) { return gs.trophies[t.id]; }).length;
    var total = (game.overview && game.overview.trophyCount) || trophies.length;
    var platinum = trophies.filter(function (t) { return t.grade === "platinum"; })[0];
    return {
      stepsDone: stepsDone,
      stepsTotal: steps,
      trophiesDone: trophiesDone,
      trophiesListed: trophies.length,
      trophiesTotal: total,
      platinum: !!(platinum && gs.trophies[platinum.id]),
      percent: steps ? Math.round((stepsDone / steps) * 100) : 0
    };
  }

  // ---------------------------------------------------------------------------
  // Validation d'un guide (fichiers de data/ et guides importés)
  // ---------------------------------------------------------------------------

  function validateGame(game) {
    var errors = [];
    function err(path, msg) { errors.push(path + " : " + msg); }
    function str(value, path, optional) {
      if (value === undefined && optional) return;
      if (typeof value !== "string" || !value.trim()) err(path, "texte non vide attendu");
    }
    function strList(value, path) {
      if (value === undefined) return;
      if (!Array.isArray(value)) return err(path, "liste attendue");
      value.forEach(function (v, i) {
        if (typeof v === "string") {
          if (!v.trim()) err(path + "[" + i + "]", "texte non vide attendu");
        } else if (isPlainObject(v)) {
          str(v.text, path + "[" + i + "].text");
          if (v.spoiler !== undefined && typeof v.spoiler !== "boolean") err(path + "[" + i + "].spoiler", "booléen attendu");
        } else {
          err(path + "[" + i + "]", "texte ou { text, spoiler } attendu");
        }
      });
    }
    function id(value, path, seen) {
      if (typeof value !== "string" || !ID_RE.test(value)) {
        return err(path, "identifiant invalide (minuscules, chiffres, tirets)");
      }
      if (seen) {
        if (seen[value]) err(path, "identifiant en double « " + value + " »");
        seen[value] = true;
      }
    }

    if (!isPlainObject(game)) return ["guide : objet attendu"];

    id(game.id, "id");
    str(game.title, "title");
    str(game.platform, "platform", true);
    if (game.accent !== undefined && !/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(game.accent)) {
      err("accent", "couleur hexadécimale attendue (#rgb ou #rrggbb)");
    }
    if (game.sources !== undefined) {
      if (!Array.isArray(game.sources)) err("sources", "liste attendue");
      else {
        var seenSources = {};
        game.sources.forEach(function (s, i) {
          var p = "sources[" + i + "]";
          if (!isPlainObject(s)) return err(p, "objet attendu");
          id(s.id, p + ".id", seenSources);
          str(s.label, p + ".label");
          if (typeof s.url !== "string" || !/^https?:\/\//.test(s.url)) err(p + ".url", "URL http(s) attendue");
        });
      }
    }

    var sourceIds = {};
    (Array.isArray(game.sources) ? game.sources : []).forEach(function (s) { if (s && s.id) sourceIds[s.id] = true; });
    function sourceRefs(value, path) {
      if (value === undefined) return;
      if (!Array.isArray(value)) return err(path, "liste attendue");
      value.forEach(function (ref, i) {
        if (!sourceIds[ref]) err(path + "[" + i + "]", "source inconnue « " + ref + " »");
      });
    }

    var trophyIds = {};
    if (!Array.isArray(game.trophies)) err("trophies", "liste attendue");
    else {
      var platinums = 0;
      game.trophies.forEach(function (t, i) {
        var p = "trophies[" + i + "]";
        if (!isPlainObject(t)) return err(p, "objet attendu");
        id(t.id, p + ".id", trophyIds);
        str(t.name, p + ".name");
        str(t.description, p + ".description");
        if (t.grade !== undefined && GRADES.indexOf(t.grade) === -1) err(p + ".grade", "attendu : " + GRADES.join(", "));
        if (t.grade === "platinum") platinums++;
        str(t.tip, p + ".tip", true);
        sourceRefs(t.sources, p + ".sources");
      });
      if (platinums > 1) err("trophies", "un seul trophée platine attendu");
    }
    function trophyRefs(value, path) {
      if (value === undefined) return;
      if (!Array.isArray(value)) return err(path, "liste attendue");
      value.forEach(function (ref, i) {
        if (!trophyIds[ref]) err(path + "[" + i + "]", "trophée inconnu « " + ref + " »");
      });
    }

    var stepIds = {};
    var taskIds = {};
    if (!Array.isArray(game.steps) || game.steps.length === 0) err("steps", "au moins une étape attendue");
    else {
      game.steps.forEach(function (s, i) {
        var p = "steps[" + i + "]";
        if (!isPlainObject(s)) return err(p, "objet attendu");
        id(s.id, p + ".id", stepIds);
        str(s.title, p + ".title");
        if (!isPlainObject(s.checkpoint)) err(p + ".checkpoint", "objet attendu");
        else {
          str(s.checkpoint.when, p + ".checkpoint.when");
          if (LEVELS.indexOf(s.checkpoint.level) === -1) err(p + ".checkpoint.level", "attendu : " + LEVELS.join(", "));
          strList(s.checkpoint.alerts, p + ".checkpoint.alerts");
        }
        str(s.summary, p + ".summary", true);
        str(s.enjoy, p + ".enjoy", true);
        if (s.tasks !== undefined && !Array.isArray(s.tasks)) err(p + ".tasks", "liste attendue");
        (Array.isArray(s.tasks) ? s.tasks : []).forEach(function (t, j) {
          var tp = p + ".tasks[" + j + "]";
          if (!isPlainObject(t)) return err(tp, "objet attendu");
          id(t.id, tp + ".id", taskIds);
          str(t.text, tp + ".text");
          strList(t.details, tp + ".details");
          trophyRefs(t.trophies, tp + ".trophies");
          if (t.unlocks && !(Array.isArray(t.trophies) && t.trophies.length)) err(tp + ".unlocks", "nécessite au moins un trophée");
        });
        trophyRefs(s.trophies, p + ".trophies");
        sourceRefs(s.sources, p + ".sources");
      });
    }

    if (game.watch !== undefined && !Array.isArray(game.watch)) err("watch", "liste attendue");
    var watchIds = {};
    (Array.isArray(game.watch) ? game.watch : []).forEach(function (w, i) {
      var p = "watch[" + i + "]";
      if (!isPlainObject(w)) return err(p, "objet attendu");
      id(w.id, p + ".id", watchIds);
      str(w.title, p + ".title");
      str(w.summary, p + ".summary");
      if (WATCH_CATEGORIES.indexOf(w.category) === -1) err(p + ".category", "attendu : " + WATCH_CATEGORIES.join(", "));
      if (w.count !== undefined && !(typeof w.count === "number" && w.count > 0 && Math.floor(w.count) === w.count)) {
        err(p + ".count", "entier positif attendu");
      }
      if (w.revealAfter !== undefined && !stepIds[w.revealAfter]) err(p + ".revealAfter", "étape inconnue « " + w.revealAfter + " »");
      strList(w.details, p + ".details");
      trophyRefs(w.trophies, p + ".trophies");
      sourceRefs(w.sources, p + ".sources");
    });

    if (game.overview !== undefined) {
      if (!isPlainObject(game.overview)) err("overview", "objet attendu");
      else if (game.overview.trophyCount !== undefined &&
        !(typeof game.overview.trophyCount === "number" && game.overview.trophyCount > 0)) {
        err("overview.trophyCount", "nombre positif attendu");
      }
    }

    return errors;
  }

  return {
    GRADES: GRADES,
    LEVELS: LEVELS,
    WATCH_CATEGORIES: WATCH_CATEGORIES,
    emptyState: emptyState,
    emptyGameState: emptyGameState,
    normalizeState: normalizeState,
    gameState: gameState,
    currentStepIndex: currentStepIndex,
    stepIndex: stepIndex,
    stepStatus: stepStatus,
    revealNeedsConfirmation: revealNeedsConfirmation,
    stepProgress: stepProgress,
    pendingMissableTasks: pendingMissableTasks,
    revealCheckpoint: revealCheckpoint,
    completeStep: completeStep,
    reopenStep: reopenStep,
    setTask: setTask,
    findTask: findTask,
    findTrophy: findTrophy,
    setTrophy: setTrophy,
    isTrophyVisible: isTrophyVisible,
    isWatchUnlocked: isWatchUnlocked,
    setCounter: setCounter,
    gameProgress: gameProgress,
    validateGame: validateGame
  };
});
