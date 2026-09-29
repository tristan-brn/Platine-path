/*
 * Platine Path — persistance locale (localStorage) et fichiers de sauvegarde.
 * Toute la progression reste dans le navigateur ; l'export JSON sert de sauvegarde
 * ou de transfert vers un autre appareil.
 */
(function (root) {
  "use strict";

  var Core = root.PlatineCore;
  var PROGRESS_KEY = "platine-path:progress:v1";
  var GUIDES_KEY = "platine-path:guides:v1";
  var UI_KEY = "platine-path:ui:v1";

  function read(key) {
    try {
      var raw = root.localStorage.getItem(key);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function write(key, value) {
    try {
      root.localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      return false;
    }
  }

  function download(filename, data) {
    var blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  }

  function today() {
    return new Date().toISOString().slice(0, 10);
  }

  function readFile(file) {
    return new Promise(function (resolve, reject) {
      var reader = new FileReader();
      reader.onload = function () {
        try {
          resolve(JSON.parse(reader.result));
        } catch (e) {
          reject(new Error("Ce fichier n'est pas un JSON valide."));
        }
      };
      reader.onerror = function () { reject(new Error("Lecture du fichier impossible.")); };
      reader.readAsText(file);
    });
  }

  root.PlatineStore = {
    loadProgress: function () {
      return Core.normalizeState(read(PROGRESS_KEY));
    },
    saveProgress: function (state) {
      return write(PROGRESS_KEY, state);
    },

    // Guides importés par l'utilisateur (même format que data/games/*.js).
    loadCustomGuides: function () {
      var list = read(GUIDES_KEY);
      return Array.isArray(list) ? list : [];
    },
    saveCustomGuides: function (list) {
      return write(GUIDES_KEY, list);
    },

    loadUi: function () {
      var ui = read(UI_KEY);
      return ui && typeof ui === "object" && !Array.isArray(ui) ? ui : {};
    },
    saveUi: function (ui) {
      return write(UI_KEY, ui);
    },

    exportProgress: function (state) {
      download("platine-path-progression-" + today() + ".json", {
        app: "platine-path",
        kind: "progress",
        exportedAt: new Date().toISOString(),
        progress: state
      });
    },
    exportGuide: function (game) {
      download(game.id + ".guide.json", game);
    },

    // Accepte un export de l'app ({ progress }) ou un état brut ({ games }).
    parseProgressFile: function (file) {
      return readFile(file).then(function (data) {
        var raw = data && data.kind === "progress" ? data.progress : data;
        if (!raw || typeof raw !== "object" || !raw.games) {
          throw new Error("Ce fichier ne contient pas de progression Platine Path.");
        }
        return Core.normalizeState(raw);
      });
    },
    parseGuideFile: function (file) {
      return readFile(file);
    }
  };
})(typeof self !== "undefined" ? self : this);
