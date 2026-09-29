# Platine-path

Une mini application pour suivre ton chemin vers le platine, étape par étape et avec un minimum de spoil.

## Ce que fait l'application

- **Bibliothèque** : un guide par jeu, avec ta progression (étapes, trophées cochés).
- **Où j'en suis** : en haut de chaque jeu, une carte t'indique le prochain point de vigilance, ou l'étape en cours.
- **À surveiller pendant tout le jeu** : un menu déroulant avec les collectibles (compteurs `x / total`), les points d'intérêt, les réflexes à garder et les trophées de personnage. Il est rédigé sans spoil ; les éléments sensibles (un compagnon qui n'est pas encore arrivé, par exemple) restent verrouillés jusqu'à l'étape concernée.
- **Parcours chronologique** : chaque étape commence par un **point de vigilance**. Il indique seulement *quand* faire attention (ex. « Quand l'écran « Acte II » s'affiche ») et son niveau (critique, attention, tranquille). Le contenu de l'étape (consignes, tâches, trophées liés) reste masqué jusqu'à ce que tu touches **« J'y suis »**.
- **Étape terminée** : l'app affiche le prochain repère. Entre deux repères, tu joues librement. Si des tâches marquées *manquable* ne sont pas cochées, l'app te demande confirmation avant de clore l'étape.
- **Anti-spoil à plusieurs niveaux** : révéler une étape future demande confirmation ; certaines lignes restent masquées individuellement (« Spoiler masqué ») ; les trophées cachés sont masqués jusqu'à ce que tu les révèles, que tu les coches ou que tu dépasses l'étape qui les annonce.
- **Trophées** : liste à cocher avec des filtres (tous, restants, manquables). Cocher une tâche qui débloque directement un trophée coche aussi ce trophée.
- **Notes**, **export/import de la progression** (JSON) et **import de guides** (JSON).

Tout est stocké dans ton navigateur (`localStorage`) : aucun compte, aucun serveur. Pour changer d'appareil, exporte ta progression puis importe-la sur l'autre.

## Lancer l'application

Aucune dépendance, aucune compilation.

- **Localement** : ouvre `index.html` dans un navigateur, ou lance `npm start` puis va sur <http://localhost:8000>.
- **Sur téléphone, via GitHub Pages** (le plus pratique à côté de la console) : dans le dépôt GitHub, *Settings → Pages → Build and deployment → Source : Deploy from a branch*, branche `main`, dossier `/ (root)`. L'app sera servie à l'adresse `https://<utilisateur>.github.io/Platine-path/`. Ajoute-la ensuite à l'écran d'accueil du téléphone.

## Guides inclus

| Jeu | État |
| --- | --- |
| Clair Obscur: Expedition 33 (PS5) | Parcours complet en 8 étapes ; liste de trophées **partielle (36 sur 56)** ; plusieurs points marqués « à vérifier » |

### Comment ce guide a été construit, et ses limites

- Il a été compilé à partir des guides cités dans l'app (PSNProfiles, PowerPyx, PlayStationTrophies.org, Game8, BrokenBuilds, WeArePlayStation…). **Les pages elles-mêmes n'étaient pas accessibles depuis l'environnement de développement** (le proxy réseau bloque ces domaines). Le contenu vient donc de résultats de recherche, recoupés entre plusieurs sources quand c'était possible.
- Quand les sources se contredisaient ou qu'une seule source confirmait une information, l'élément porte la mention **« à vérifier »** dans l'app. Exemple : PowerPyx annonce 5 trophées manquables, mais d'autres guides en ajoutent (Surcharge de Gustave, compétence liée au boss Grosse Tête, disque « Lettre à Maelle »). Tous sont signalés dans le parcours.
- Le texte est reformulé, pas copié. Pour les emplacements précis des collectibles, suis les liens des sources.
- Le parcours n'utilise aucun glitch ni exploit.

### Pourquoi l'app ne récupère pas les guides PSNProfiles automatiquement

- PSNProfiles ne propose pas d'API publique. Aspirer ses pages serait fragile (protection anti-robots, changements de mise en page) et le contenu des guides appartient à leurs auteurs.
- Une page web statique ne peut pas lire un autre site depuis le navigateur (politique CORS) sans passer par un serveur intermédiaire.
- Les guides sont donc des **fichiers de données structurés** (un par jeu) qui citent leurs sources. On peut en ajouter autant qu'on veut (voir ci-dessous).

## Ajouter un jeu

Deux possibilités :

1. **Sans toucher au code** : dans l'app, *Importer un guide (.json)*. Le fichier est validé puis enregistré dans ton navigateur. Le bouton *Télécharger ce guide (.json)* en bas de chaque jeu fournit un exemple complet à adapter.
2. **Dans le dépôt** : crée `data/games/<id>.js` sur le modèle de `data/games/clair-obscur-expedition-33.js`, ajoute la balise `<script src="data/games/<id>.js"></script>` dans `index.html`, puis lance `npm test` : les tests valident le guide et vérifient qu'il est bien chargé.

### Format d'un guide

```js
(window.PLATINE_GAMES = window.PLATINE_GAMES || []).push({
  id: "mon-jeu",                    // minuscules, chiffres, tirets ; = nom du fichier
  title: "Mon Jeu",
  platform: "PS5",                  // optionnel
  accent: "#c8a24a",                // optionnel, couleur de la carte
  overview: {                       // optionnel, « Fiche du platine »
    trophyCount: 50, breakdown: "…", difficulty: "…", time: "…", playthroughs: "…",
    missables: "…", online: "…", difficultyTrophies: "…", hiddenTrophies: "…"
  },
  disclaimer: "…",                  // optionnel
  sources: [{ id: "psnp", label: "PSNProfiles — guide", url: "https://…" }],

  // Visible dès le départ : AUCUN spoil ici.
  watch: [{
    id: "w-collectibles",
    category: "collectible",        // reflex | collectible | poi | character
    title: "…", summary: "…",
    count: 30,                      // optionnel : affiche un compteur
    revealAfter: "acte-2",          // optionnel : verrouillé jusqu'à cette étape
    details: ["…", { text: "…", spoiler: true }],
    trophies: ["id-trophee"], sources: ["psnp"], verify: true
  }],

  steps: [{
    id: "acte-1",
    title: "Acte I",                // visible d'avance : sans spoil
    checkpoint: {
      when: "Quand l'écran « Acte I » s'affiche",  // visible d'avance : sans spoil
      level: "critical",            // critical | caution | calm
      alerts: ["…"]                 // masqué jusqu'à « J'y suis »
    },
    summary: "…",                   // optionnel
    tasks: [{
      id: "a1-boss", text: "Vaincre …",
      missable: true,               // alerte si l'étape est close sans la cocher
      unlocks: true,                // cocher la tâche coche ses trophées
      trophies: ["id-trophee"],
      details: ["…", { text: "…", spoiler: true }],
      verify: true
    }],
    trophies: ["trophee-histoire"], // trophées d'histoire obtenus pendant l'étape
    enjoy: "Ce que tu peux faire librement jusqu'au prochain repère.",
    sources: ["psnp"]
  }],

  trophies: [{
    id: "id-trophee", name: "…", description: "…",
    grade: "bronze",                // platinum | gold | silver | bronze (optionnel)
    hidden: true,                   // masqué par défaut
    missable: true, tip: "…", verify: true, sources: ["psnp"]
  }]
});
```

Le texte accepte `**gras**`. Tout le reste est affiché tel quel (pas de HTML), ce qui rend l'import de guides sûr.

### Faire rédiger un nouveau guide par Claude

Dans une nouvelle session sur ce dépôt, par exemple :

> Ajoute un guide Platine Path pour *<jeu>* en suivant le format du README et le guide d'Expedition 33 : recherche le guide de trophées PSNProfiles et au moins une autre source, liste les manquables et le moment où ils deviennent manquables, écris des points de vigilance sans spoil, marque « à vérifier » tout ce qui n'est pas confirmé par deux sources, puis lance `npm test`.

Pour que Claude puisse lire les pages des guides, autorise les domaines concernés (`psnprofiles.com`, `powerpyx.com`, `playstationtrophies.org`…) dans les paramètres réseau de l'environnement ; sinon il devra se contenter de résultats de recherche, comme pour le guide actuel.

## Développement

```
index.html                      page unique
css/styles.css                  thème sombre / clair automatique, mobile d'abord
js/core.js                      logique pure (progression, validation), testée sous Node
js/store.js                     localStorage, export / import
js/app.js                       interface
data/games/*.js                 un guide par jeu
tests/                          tests `node:test`
```

```sh
npm test    # logique de progression + validation de chaque guide
```
