/*
 * Platine Path — interface.
 * Vue entièrement reconstruite à chaque changement d'état (l'app est petite) ;
 * l'état d'ouverture des panneaux, le défilement et le focus sont préservés.
 */
(function () {
  "use strict";

  const Core = window.PlatineCore;
  const Store = window.PlatineStore;
  const app = document.getElementById("app");
  const toastEl = document.getElementById("toast");

  const LEVEL_LABEL = {
    critical: "Critique : trophée manquable",
    caution: "Attention",
    calm: "Tranquille"
  };
  const LEVEL_ICON = { critical: "!", caution: "⚑", calm: "✓" };
  const GRADE_LABEL = { platinum: "Platine", gold: "Or", silver: "Argent", bronze: "Bronze" };
  const CATEGORY_LABEL = {
    reflex: "Réflexes à garder",
    collectible: "Collectibles",
    poi: "Points d'intérêt",
    character: "Trophées de personnage"
  };
  const STATUS_LABEL = { done: "Terminée", current: "En cours", upcoming: "À venir" };

  let state = Store.loadProgress();
  let ui = Store.loadUi();
  const games = loadGames();

  // ---------------------------------------------------------------------------
  // Données
  // ---------------------------------------------------------------------------

  function loadGames() {
    const list = [];
    const seen = new Set();
    (window.PLATINE_GAMES || []).forEach((game) => {
      const errors = Core.validateGame(game);
      if (errors.length) {
        console.error("Guide invalide ignoré :", game && game.id, errors);
        return;
      }
      seen.add(game.id);
      list.push(game);
    });
    Store.loadCustomGuides().forEach((game) => {
      if (Core.validateGame(game).length || seen.has(game.id)) return;
      seen.add(game.id);
      list.push(Object.assign({}, game, { custom: true }));
    });
    return list;
  }

  function findGame(id) {
    return games.find((g) => g.id === id) || null;
  }

  function persist() {
    if (!Store.saveProgress(state)) {
      toast("Impossible d'enregistrer la progression (stockage du navigateur indisponible).");
    }
  }

  function persistUi() {
    Store.saveUi(ui);
  }

  // ---------------------------------------------------------------------------
  // Construction DOM
  // ---------------------------------------------------------------------------

  function h(tag, props, ...children) {
    const el = document.createElement(tag);
    if (props) {
      Object.keys(props).forEach((key) => {
        const value = props[key];
        if (value === null || value === undefined || value === false) return;
        if (key === "class") el.className = value;
        else if (key.startsWith("on") && typeof value === "function") el.addEventListener(key.slice(2).toLowerCase(), value);
        else if (key === "vars") Object.keys(value).forEach((v) => el.style.setProperty(v, value[v]));
        else if (value === true) el.setAttribute(key, "");
        else el.setAttribute(key, String(value));
      });
    }
    append(el, children);
    return el;
  }

  function append(el, children) {
    children.forEach((child) => {
      if (child === null || child === undefined || child === false) return;
      if (Array.isArray(child)) append(el, child);
      else if (child instanceof Node) el.appendChild(child);
      else el.appendChild(document.createTextNode(String(child)));
    });
  }

  // Texte enrichi minimal : **gras**. Tout le reste est inséré comme texte brut.
  function rich(text) {
    return String(text).split(/\*\*(.+?)\*\*/g).map((part, i) => (i % 2 ? h("strong", null, part) : part));
  }

  // <details> dont l'ouverture est mémorisée entre deux rendus et deux visites.
  function panel(key, defaultOpen, props, summary, ...body) {
    const isOpen = key in ui ? ui[key] : defaultOpen;
    const el = h("details", Object.assign({ open: isOpen }, props), h("summary", null, summary), ...body);
    el.addEventListener("toggle", () => {
      ui[key] = el.open;
      persistUi();
    });
    return el;
  }

  function trophyIcon(grade) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("class", "trophy-icon grade-" + (grade || "unknown"));
    svg.setAttribute("aria-hidden", "true");
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M7 3h10v2h3v3a4 4 0 0 1-4 4h-.3A5 5 0 0 1 13 14.9V17h3v4H8v-4h3v-2.1A5 5 0 0 1 8.3 12H8a4 4 0 0 1-4-4V5h3V3zm0 4H6v1a2 2 0 0 0 1 1.7V7zm10 0v2.7A2 2 0 0 0 18 8V7h-1z");
    path.setAttribute("fill", "currentColor");
    svg.appendChild(path);
    return svg;
  }

  function badge(text, kind) {
    return h("span", { class: "badge badge-" + kind }, text);
  }

  function verifyBadge(item) {
    return item.verify ? h("span", { class: "badge badge-verify", title: "Information incertaine ou contradictoire entre les sources" }, "à vérifier") : null;
  }

  function progressBar(value, max, label) {
    const pct = max ? Math.round((value / max) * 100) : 0;
    return h("div", { class: "bar", role: "progressbar", "aria-valuemin": "0", "aria-valuemax": String(max), "aria-valuenow": String(value), "aria-label": label },
      h("span", { vars: { "--pct": pct + "%" } }));
  }

  function toast(message) {
    toastEl.textContent = message;
    toastEl.classList.add("show");
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => toastEl.classList.remove("show"), 5000);
  }

  function sourceLinks(game, ids) {
    if (!ids || !ids.length) return null;
    const byId = {};
    (game.sources || []).forEach((s) => { byId[s.id] = s; });
    return h("p", { class: "src" }, "Sources : ",
      ids.map((id, i) => [i ? ", " : "", h("a", { href: byId[id].url, target: "_blank", rel: "noopener noreferrer" }, byId[id].label)]));
  }

  function hostOf(url) {
    try { return new URL(url).hostname.replace(/^www\./, ""); } catch (e) { return url; }
  }

  // Ligne de détail : texte simple ou { text, spoiler } masqué jusqu'au clic.
  function detailLine(game, gs, key, item) {
    const text = typeof item === "string" ? item : item.text;
    if (typeof item === "string" || !item.spoiler || gs.spoilers[key]) return h("li", null, rich(text));
    return h("li", { class: "has-spoiler" }, h("button", {
      class: "spoiler",
      type: "button",
      "data-focus": key,
      onclick: () => {
        gs.spoilers[key] = true;
        persist();
        render();
      }
    }, "Spoiler masqué : toucher pour révéler"));
  }

  function trophyChips(game, gs, ids) {
    if (!ids || !ids.length) return null;
    return h("ul", { class: "chips", "aria-label": "Trophées liés" }, ids.map((id) => {
      const trophy = Core.findTrophy(game, id);
      const visible = Core.isTrophyVisible(game, gs, trophy);
      const obtained = !!gs.trophies[id];
      return h("li", { class: "chip" + (obtained ? " chip-done" : ""), title: visible ? trophy.description : "Trophée caché" },
        trophyIcon(trophy.grade), visible ? trophy.name : "Trophée caché", obtained ? " ✓" : "");
    }));
  }

  // ---------------------------------------------------------------------------
  // Bibliothèque
  // ---------------------------------------------------------------------------

  function renderHome() {
    document.title = "Platine Path";
    const cards = games.map((game) => {
      const gs = state.games[game.id] || Core.emptyGameState();
      const p = Core.gameProgress(game, gs);
      const idx = Core.currentStepIndex(game, gs);
      const next = game.steps[idx];
      const started = Object.keys(gs.revealed).length > 0 || p.stepsDone > 0;
      return h("article", { class: "game-card", vars: accentVars(game) },
        h("div", { class: "game-card-band" }, game.platform || "", game.custom ? " · guide importé" : ""),
        h("h2", null, game.title),
        h("p", { class: "muted" }, p.stepsDone + "/" + p.stepsTotal + " étapes · " + p.trophiesDone + "/" + p.trophiesTotal + " trophées cochés"),
        progressBar(p.stepsDone, p.stepsTotal, "Progression du parcours"),
        next
          ? h("p", { class: "next" }, h("span", { class: "muted" }, started ? "Prochain repère : " : "Premier repère : "), next.checkpoint.when)
          : h("p", { class: "next" }, "🏆 Parcours terminé"),
        h("a", { class: "btn btn-primary", href: "#/game/" + encodeURIComponent(game.id) }, started ? "Continuer" : "Commencer"));
    });

    app.replaceChildren(
      h("section", { class: "hero" },
        h("h1", null, "Tes platines, pas à pas"),
        h("p", null, "Chaque jeu a un parcours chronologique. Avant chaque étape, un point de vigilance te dit ", h("em", null, "quand"),
          " faire attention, sans rien dévoiler : tu ne le révèles qu'une fois arrivé au bon moment du jeu. Entre deux repères, profite simplement du jeu.")),
      h("section", { class: "library", "aria-label": "Mes jeux" }, cards.length ? cards : h("p", null, "Aucun guide chargé.")),
      renderTools(),
      renderHelp()
    );
  }

  function accentVars(game) {
    return game.accent ? { "--game-accent": game.accent } : null;
  }

  function renderTools() {
    const progressInput = h("input", {
      type: "file", accept: "application/json,.json", hidden: true,
      onchange: (e) => {
        const file = e.target.files[0];
        if (!file) return;
        Store.parseProgressFile(file).then((imported) => {
          if (!confirm("Remplacer ta progression actuelle par celle du fichier ?")) return;
          state = imported;
          persist();
          render();
          toast("Progression importée.");
        }).catch((err) => toast(err.message));
        e.target.value = "";
      }
    });
    const guideInput = h("input", {
      type: "file", accept: "application/json,.json", hidden: true,
      onchange: (e) => {
        const file = e.target.files[0];
        if (!file) return;
        Store.parseGuideFile(file).then(importGuide).catch((err) => toast(err.message));
        e.target.value = "";
      }
    });
    const custom = games.filter((g) => g.custom);

    return h("section", { class: "tools" },
      h("h2", null, "Sauvegarde et guides"),
      h("p", { class: "muted" }, "Ta progression est enregistrée dans ce navigateur. Exporte-la pour la sauvegarder ou la passer sur un autre appareil."),
      h("div", { class: "btn-row" },
        h("button", { class: "btn", type: "button", onclick: () => Store.exportProgress(state) }, "Exporter ma progression"),
        h("button", { class: "btn", type: "button", onclick: () => progressInput.click() }, "Importer une progression"),
        h("button", { class: "btn", type: "button", onclick: () => guideInput.click() }, "Importer un guide (.json)"),
        progressInput, guideInput),
      custom.length
        ? h("ul", { class: "custom-guides" }, custom.map((g) => h("li", null, g.title, " ",
          h("button", { class: "btn btn-small btn-danger", type: "button", onclick: () => removeGuide(g.id) }, "Retirer"))))
        : null);
  }

  function importGuide(guide) {
    const errors = Core.validateGame(guide);
    if (errors.length) {
      toast("Guide invalide : " + errors.slice(0, 3).join(" ; ") + (errors.length > 3 ? " …" : ""));
      return;
    }
    const existing = findGame(guide.id);
    if (existing && !existing.custom) {
      toast("Un guide intégré porte déjà l'identifiant « " + guide.id + " ».");
      return;
    }
    const list = Store.loadCustomGuides().filter((g) => g.id !== guide.id);
    list.push(guide);
    if (!Store.saveCustomGuides(list)) {
      toast("Impossible d'enregistrer le guide dans ce navigateur.");
      return;
    }
    const idx = games.findIndex((g) => g.id === guide.id);
    const entry = Object.assign({}, guide, { custom: true });
    if (idx === -1) games.push(entry);
    else games[idx] = entry;
    render();
    toast("Guide « " + guide.title + " » ajouté.");
  }

  function removeGuide(id) {
    if (!confirm("Retirer ce guide importé ? Ta progression sur ce jeu est conservée.")) return;
    Store.saveCustomGuides(Store.loadCustomGuides().filter((g) => g.id !== id));
    const idx = games.findIndex((g) => g.id === id);
    if (idx !== -1) games.splice(idx, 1);
    render();
  }

  function renderHelp() {
    return panel("help", false, { class: "panel help" }, "Comment ça marche ?",
      h("ol", null,
        h("li", null, "Ouvre le menu « À surveiller pendant tout le jeu » : collectibles, points d'intérêt et réflexes, sans spoil."),
        h("li", null, "Dans le parcours, chaque étape commence par un ", h("strong", null, "point de vigilance"), " : il indique seulement le moment du jeu concerné."),
        h("li", null, "Quand tu atteins ce moment, touche « J'y suis » : les consignes et les tâches de l'étape apparaissent."),
        h("li", null, "Coche les tâches, puis « Étape terminée » : l'app t'indique le prochain repère. D'ici là, joue librement."),
        h("li", null, "Les lignes « Spoiler masqué » et les trophées cachés restent floutés tant que tu ne les touches pas.")),
      h("p", { class: "muted" }, "Les mentions « à vérifier » signalent une information incertaine ou contradictoire entre les guides sources."));
  }

  // ---------------------------------------------------------------------------
  // Page d'un jeu
  // ---------------------------------------------------------------------------

  function renderGame(game) {
    document.title = game.title + " · Platine Path";
    const gs = Core.gameState(state, game.id);
    app.replaceChildren(
      h("div", { class: "game", vars: accentVars(game) },
        h("a", { class: "back", href: "#/" }, "← Bibliothèque"),
        renderGameHeader(game, gs),
        renderNow(game, gs),
        renderFacts(game, gs),
        renderWatch(game, gs),
        renderRoadmap(game, gs),
        renderTrophies(game, gs),
        renderNotes(gs),
        renderSources(game, gs))
    );
  }

  function renderGameHeader(game, gs) {
    const p = Core.gameProgress(game, gs);
    return h("header", { class: "game-head" },
      h("p", { class: "eyebrow" }, game.platform || "", p.platinum ? " · 🏆 Platiné" : ""),
      h("h1", null, game.title));
  }

  // Fiche du platine : ouverte par défaut tant que le parcours n'a pas commencé.
  function renderFacts(game, gs) {
    const o = game.overview || {};
    const facts = [
      ["Trophées", o.breakdown],
      ["Difficulté", o.difficulty],
      ["Durée", o.time],
      ["Parties", o.playthroughs],
      ["Manquables", o.missables],
      ["En ligne", o.online],
      ["Liés à la difficulté", o.difficultyTrophies],
      ["Cachés", o.hiddenTrophies]
    ].filter((f) => f[1]);
    if (!facts.length) return null;
    const started = Object.keys(gs.revealed).length > 0;
    return panel("facts:" + game.id, !started, { class: "panel facts-panel" }, "Fiche du platine",
      h("dl", { class: "facts" }, facts.map((f) => h("div", null, h("dt", null, f[0]), h("dd", null, f[1])))));
  }

  function renderNow(game, gs) {
    const idx = Core.currentStepIndex(game, gs);
    const p = Core.gameProgress(game, gs);
    const stats = h("div", { class: "now-stats" },
      h("div", null, h("span", { class: "muted" }, "Étapes "), p.stepsDone + "/" + p.stepsTotal, progressBar(p.stepsDone, p.stepsTotal, "Étapes terminées")),
      h("div", null, h("span", { class: "muted" }, "Trophées "), p.trophiesDone + "/" + p.trophiesTotal, progressBar(p.trophiesDone, p.trophiesTotal, "Trophées cochés")));

    if (idx >= game.steps.length) {
      return h("section", { class: "now now-done", "aria-label": "Où j'en suis" },
        h("p", { class: "now-label" }, "Parcours terminé"),
        h("p", { class: "now-title" }, p.platinum ? "🏆 Platine obtenu. Bravo !" : "Toutes les étapes sont faites. Il reste peut-être des trophées à cocher."),
        stats);
    }

    const step = game.steps[idx];
    const revealed = !!gs.revealed[step.id];
    const prev = game.steps[idx - 1];

    if (!revealed) {
      return h("section", { class: "now level-" + step.checkpoint.level, "aria-label": "Où j'en suis" },
        h("p", { class: "now-label" }, "Prochain point de vigilance · ", LEVEL_LABEL[step.checkpoint.level]),
        h("p", { class: "now-title" }, step.checkpoint.when),
        h("p", { class: "muted" }, prev
          ? prev.enjoy || "Joue librement jusqu'à ce moment, puis reviens ici."
          : "Touche « J'y suis » quand tu arrives à ce moment : les consignes de l'étape apparaîtront."),
        h("div", { class: "btn-row" },
          h("button", { class: "btn btn-primary", type: "button", "data-focus": "now-reveal", onclick: () => reveal(game, gs, idx) }, "J'y suis : révéler"),
          h("a", { class: "btn", href: "#step-" + step.id, onclick: (e) => jumpTo(e, step.id) }, "Voir dans le parcours")),
        stats);
    }

    const sp = Core.stepProgress(step, gs);
    return h("section", { class: "now", "aria-label": "Où j'en suis" },
      h("p", { class: "now-label" }, "Étape en cours"),
      h("p", { class: "now-title" }, "Étape " + (idx + 1) + " · " + step.title),
      h("p", { class: "muted" }, sp.total ? sp.done + "/" + sp.total + " tâches cochées" : "Aucune tâche à cocher"),
      h("div", { class: "btn-row" },
        h("a", { class: "btn btn-primary", href: "#step-" + step.id, onclick: (e) => jumpTo(e, step.id) }, "Voir l'étape"),
        h("button", { class: "btn", type: "button", "data-focus": "now-complete", onclick: () => complete(game, gs, idx) }, "Étape terminée")),
      stats);
  }

  function jumpTo(e, stepId) {
    e.preventDefault();
    const el = document.getElementById("step-" + stepId);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // --- À surveiller ----------------------------------------------------------

  function renderWatch(game, gs) {
    const items = game.watch || [];
    if (!items.length) return null;
    const groups = Core.WATCH_CATEGORIES.map((cat) => {
      const list = items.filter((w) => w.category === cat);
      if (!list.length) return null;
      return h("section", { class: "watch-group" },
        h("h3", null, CATEGORY_LABEL[cat]),
        h("div", { class: "watch-list" }, list.map((w) => renderWatchItem(game, gs, w))));
    });
    return panel("watch:" + game.id, true, { class: "panel watch" },
      h("span", null, "À surveiller pendant tout le jeu ", h("span", { class: "count" }, items.length)),
      h("p", { class: "muted" }, "Collectibles, points d'intérêt et réflexes à garder du début à la fin. Rien ici ne dévoile l'histoire ; les éléments sensibles se débloquent avec le parcours."),
      groups);
  }

  function renderWatchItem(game, gs, w) {
    if (!Core.isWatchUnlocked(gs, w)) {
      const step = game.steps[Core.stepIndex(game, w.revealAfter)];
      return h("div", { class: "watch-item locked" },
        h("span", { "aria-hidden": "true" }, "🔒"),
        " Se débloque avec l'étape « " + step.title + " »");
    }
    const found = gs.counters[w.id] || 0;
    const counterBadge = w.count ? h("span", { class: "counter-badge" + (found >= w.count ? " complete" : "") }, found + "/" + w.count) : null;
    return panel("watch-item:" + game.id + ":" + w.id, false, { class: "watch-item" },
      h("span", { class: "watch-title" }, w.title, " ", verifyBadge(w), counterBadge),
      h("p", null, rich(w.summary)),
      w.details && w.details.length ? h("ul", { class: "details" }, w.details.map((d, i) => detailLine(game, gs, "watch:" + w.id + ":" + i, d))) : null,
      w.count ? renderCounter(gs, w) : null,
      trophyChips(game, gs, w.trophies),
      sourceLinks(game, w.sources));
  }

  function renderCounter(gs, w) {
    const value = gs.counters[w.id] || 0;
    const set = (n) => {
      Core.setCounter(gs, w, n);
      persist();
      render();
    };
    return h("div", { class: "counter" },
      h("button", { class: "btn btn-small", type: "button", "aria-label": "Retirer un", "data-focus": "minus:" + w.id, onclick: () => set(value - 1) }, "−"),
      h("label", null,
        h("input", { type: "number", min: "0", max: String(w.count), value: String(value), inputmode: "numeric", "aria-label": w.title + " trouvés", onchange: (e) => set(Number(e.target.value) || 0) }),
        " / " + w.count),
      h("button", { class: "btn btn-small", type: "button", "aria-label": "Ajouter un", "data-focus": "plus:" + w.id, onclick: () => set(value + 1) }, "+"));
  }

  // --- Parcours --------------------------------------------------------------

  function renderRoadmap(game, gs) {
    return h("section", { class: "roadmap", "aria-labelledby": "roadmap-title" },
      h("h2", { id: "roadmap-title" }, "Parcours vers le platine"),
      h("ol", { class: "timeline" }, game.steps.map((step, i) => renderStep(game, gs, step, i))));
  }

  function renderStep(game, gs, step, i) {
    const status = Core.stepStatus(game, gs, i);
    const revealed = !!gs.revealed[step.id];
    const cp = step.checkpoint;
    const taskCount = (step.tasks || []).length;

    const checkpoint = h("div", { class: "checkpoint level-" + cp.level + (revealed ? " is-revealed" : "") },
      h("span", { class: "cp-icon", "aria-hidden": "true" }, LEVEL_ICON[cp.level]),
      h("div", { class: "cp-text" },
        h("p", { class: "cp-label" }, "Point de vigilance · " + LEVEL_LABEL[cp.level]),
        h("p", { class: "cp-when" }, cp.when)),
      revealed ? null : h("button", {
        class: "btn " + (status === "current" ? "btn-primary" : ""),
        type: "button",
        "data-focus": "reveal:" + step.id,
        onclick: () => reveal(game, gs, i)
      }, status === "current" ? "J'y suis : révéler" : "Révéler"));

    let body;
    if (!revealed) {
      body = h("p", { class: "masked" }, "Contenu masqué pour éviter les spoils", taskCount ? " · " + taskCount + " tâche" + (taskCount > 1 ? "s" : "") : "", ".");
    } else if (status === "done") {
      body = panel("step:" + game.id + ":" + step.id, false, { class: "step-done-panel" },
        "Terminée le " + formatDate(gs.stepsDone[step.id]) + " · revoir le détail",
        stepBody(game, gs, step, i, status));
    } else {
      body = stepBody(game, gs, step, i, status);
    }

    return h("li", { class: "step status-" + status, id: "step-" + step.id },
      checkpoint,
      h("div", { class: "step-card" },
        h("div", { class: "step-head" },
          h("h3", null, h("span", { class: "step-num" }, "Étape " + (i + 1)), " ", step.title),
          badge(STATUS_LABEL[status], status)),
        body));
  }

  function stepBody(game, gs, step, i, status) {
    const cp = step.checkpoint;
    const sp = Core.stepProgress(step, gs);
    return h("div", { class: "step-body" },
      cp.alerts && cp.alerts.length
        ? h("div", { class: "alerts level-" + cp.level },
          h("p", { class: "alerts-title" }, "Ce qu'il faut savoir maintenant"),
          h("ul", null, cp.alerts.map((a, j) => detailLine(game, gs, "alert:" + step.id + ":" + j, a))))
        : null,
      step.summary ? h("p", null, rich(step.summary)) : null,
      step.tasks && step.tasks.length
        ? h("div", { class: "tasks" },
          h("p", { class: "tasks-title" }, "Tâches · " + sp.done + "/" + sp.total),
          h("ul", { class: "task-list" }, step.tasks.map((t) => renderTask(game, gs, t))))
        : null,
      step.trophies && step.trophies.length
        ? h("div", { class: "story-trophies" }, h("p", { class: "muted" }, "Trophées d'histoire de cette étape (automatiques) :"), trophyChips(game, gs, step.trophies))
        : null,
      step.enjoy ? h("p", { class: "enjoy" }, h("strong", null, "Ensuite : "), rich(step.enjoy)) : null,
      sourceLinks(game, step.sources),
      h("div", { class: "btn-row" },
        status === "done"
          ? h("button", { class: "btn", type: "button", "data-focus": "reopen:" + step.id, onclick: () => reopen(game, gs, step) }, "Rouvrir l'étape")
          : h("button", { class: "btn btn-primary", type: "button", "data-focus": "complete:" + step.id, onclick: () => complete(game, gs, i) }, "Étape terminée")));
  }

  function renderTask(game, gs, task) {
    const done = !!gs.tasksDone[task.id];
    const inputId = "task-" + task.id;
    return h("li", { class: "task" + (done ? " is-done" : "") + (task.missable ? " is-missable" : "") },
      h("div", { class: "task-main" },
        h("input", {
          type: "checkbox", id: inputId, checked: done, "data-focus": inputId,
          onchange: (e) => {
            Core.setTask(game, gs, task, e.target.checked);
            persist();
            render();
          }
        }),
        h("label", { for: inputId }, rich(task.text), " ",
          task.missable ? badge("manquable", "missable") : null, verifyBadge(task))),
      task.details && task.details.length
        ? h("ul", { class: "details" }, task.details.map((d, i) => detailLine(game, gs, "task:" + task.id + ":" + i, d)))
        : null,
      trophyChips(game, gs, task.trophies),
      sourceLinks(game, task.sources));
  }

  function reveal(game, gs, index) {
    const step = game.steps[index];
    if (Core.revealNeedsConfirmation(game, gs, index) &&
      !confirm("Tu n'as pas terminé les étapes précédentes. Révéler « " + step.title + " » maintenant risque de te spoiler. Continuer ?")) {
      return;
    }
    Core.revealCheckpoint(gs, step.id);
    persist();
    render();
    scrollToStep(step.id);
  }

  function complete(game, gs, index) {
    const step = game.steps[index];
    const pending = Core.pendingMissableTasks(step, gs);
    if (pending.length && !confirm(pending.length + " tâche(s) manquable(s) ne sont pas cochées :\n\n• " +
      pending.map((t) => t.text).join("\n• ") + "\n\nTerminer l'étape quand même ?")) {
      return;
    }
    Core.completeStep(gs, step);
    persist();
    render();
    const next = game.steps[Core.currentStepIndex(game, gs)];
    if (next) {
      toast("Étape terminée ! Prochain repère : « " + next.checkpoint.when + " ». D'ici là, profite du jeu.");
      scrollToStep(next.id);
    } else {
      toast("Parcours terminé. Bravo !");
    }
  }

  function reopen(game, gs, step) {
    Core.reopenStep(gs, step.id);
    persist();
    render();
  }

  function scrollToStep(stepId) {
    const el = document.getElementById("step-" + stepId);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function formatDate(iso) {
    const d = new Date(iso);
    return isNaN(d) || d.getTime() === 0 ? "—" : d.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
  }

  // --- Trophées --------------------------------------------------------------

  function renderTrophies(game, gs) {
    const trophies = game.trophies || [];
    const p = Core.gameProgress(game, gs);
    const filter = ui["filter:" + game.id] || "all";
    const setFilter = (f) => {
      ui["filter:" + game.id] = f;
      persistUi();
      render();
    };
    const shown = trophies.filter((t) => {
      if (filter === "todo") return !gs.trophies[t.id];
      if (filter === "missable") return t.missable;
      return true;
    });
    const hiddenLeft = trophies.filter((t) => !Core.isTrophyVisible(game, gs, t)).length;

    return panel("trophies:" + game.id, false, { class: "panel trophies" },
      h("span", null, "Trophées ", h("span", { class: "count" }, p.trophiesDone + "/" + p.trophiesTotal)),
      p.trophiesListed < p.trophiesTotal
        ? h("p", { class: "notice" }, "Liste partielle : " + p.trophiesListed + " trophées répertoriés sur " + p.trophiesTotal + ". Complète-la depuis la liste PSNProfiles.")
        : null,
      h("div", { class: "filters", role: "group", "aria-label": "Filtrer les trophées" },
        [["all", "Tous"], ["todo", "Restants"], ["missable", "Manquables"]].map(([key, label]) =>
          h("button", { class: "btn btn-small" + (filter === key ? " is-active" : ""), type: "button", "aria-pressed": String(filter === key), "data-focus": "filter:" + key, onclick: () => setFilter(key) }, label)),
        hiddenLeft
          ? h("button", {
            class: "btn btn-small", type: "button",
            onclick: () => {
              if (!confirm("Révéler les " + hiddenLeft + " trophées cachés ? Leurs noms peuvent dévoiler l'histoire.")) return;
              trophies.forEach((t) => { if (t.hidden) gs.spoilers["trophy:" + t.id] = true; });
              persist();
              render();
            }
          }, "Révéler les cachés (" + hiddenLeft + ")")
          : null),
      h("ul", { class: "trophy-list" }, shown.map((t) => renderTrophy(game, gs, t))),
      shown.length ? null : h("p", { class: "muted" }, "Aucun trophée dans ce filtre."));
  }

  function renderTrophy(game, gs, t) {
    const visible = Core.isTrophyVisible(game, gs, t);
    const obtained = !!gs.trophies[t.id];
    const inputId = "trophy-" + t.id;
    return h("li", { class: "trophy" + (obtained ? " is-done" : "") },
      h("input", {
        type: "checkbox", id: inputId, checked: obtained, "data-focus": inputId,
        "aria-label": (visible ? t.name : "Trophée caché") + " obtenu",
        onchange: (e) => {
          Core.setTrophy(gs, t.id, e.target.checked);
          persist();
          render();
        }
      }),
      trophyIcon(t.grade),
      h("div", { class: "trophy-text" },
        visible
          ? [
            h("p", { class: "trophy-name" }, t.name, " ", t.grade ? h("span", { class: "muted" }, GRADE_LABEL[t.grade]) : null, " ",
              t.missable ? badge("manquable", "missable") : null, verifyBadge(t)),
            h("p", { class: "trophy-desc" }, rich(t.description)),
            t.tip ? h("p", { class: "trophy-tip" }, rich(t.tip)) : null
          ]
          : h("button", {
            class: "spoiler", type: "button", "data-focus": "trophy-reveal:" + t.id,
            onclick: () => {
              gs.spoilers["trophy:" + t.id] = true;
              persist();
              render();
            }
          }, "Trophée caché : toucher pour révéler")));
  }

  // --- Notes & sources -------------------------------------------------------

  function renderNotes(gs) {
    let timer;
    return panel("notes", false, { class: "panel notes" }, "Mes notes",
      h("textarea", {
        rows: "5",
        placeholder: "Ex. : sauvegarde manuelle avant le boss, objet à revenir chercher…",
        "aria-label": "Mes notes",
        oninput: (e) => {
          gs.notes = e.target.value;
          clearTimeout(timer);
          timer = setTimeout(persist, 400);
        }
      }, gs.notes));
  }

  function renderSources(game, gs) {
    return h("footer", { class: "game-foot" },
      game.disclaimer ? h("p", { class: "notice" }, game.disclaimer) : null,
      game.sources && game.sources.length
        ? [h("h2", null, "Sources"), h("ul", { class: "sources" }, game.sources.map((s) =>
          h("li", null, h("a", { href: s.url, target: "_blank", rel: "noopener noreferrer" }, s.label), " ", h("span", { class: "muted" }, hostOf(s.url)))))]
        : null,
      h("div", { class: "btn-row" },
        h("button", { class: "btn btn-small", type: "button", onclick: () => Store.exportGuide(stripRuntime(game)) }, "Télécharger ce guide (.json)"),
        h("button", {
          class: "btn btn-small btn-danger", type: "button",
          onclick: () => {
            if (!confirm("Effacer toute ta progression sur « " + game.title + " » ?")) return;
            delete state.games[game.id];
            persist();
            render();
            window.scrollTo(0, 0);
          }
        }, "Réinitialiser ma progression")),
      game.updated ? h("p", { class: "muted" }, "Guide mis à jour le " + formatDate(game.updated)) : null);
  }

  function stripRuntime(game) {
    const copy = Object.assign({}, game);
    delete copy.custom;
    return copy;
  }

  // ---------------------------------------------------------------------------
  // Routage & rendu
  // ---------------------------------------------------------------------------

  function route() {
    const match = location.hash.match(/^#\/game\/([^/?#]+)/);
    return match ? { name: "game", id: decodeURIComponent(match[1]) } : { name: "home" };
  }

  function render() {
    const focusKey = document.activeElement && document.activeElement.getAttribute("data-focus");
    const y = window.scrollY;
    const r = route();
    const game = r.name === "game" ? findGame(r.id) : null;
    if (r.name === "game" && game) renderGame(game);
    else renderHome();
    window.scrollTo(0, y);
    if (focusKey) {
      const el = app.querySelector('[data-focus="' + CSS.escape(focusKey) + '"]');
      if (el) el.focus({ preventScroll: true });
    }
  }

  window.addEventListener("hashchange", () => {
    // Les ancres internes (#step-…) ne sont pas des changements de page.
    if (!location.hash.startsWith("#/") && location.hash !== "") return;
    render();
    window.scrollTo(0, 0);
  });

  // Synchronise deux onglets ouverts sur l'app.
  window.addEventListener("storage", (e) => {
    if (e.key && e.key.startsWith("platine-path:progress")) {
      state = Store.loadProgress();
      render();
    }
  });

  render();
})();
