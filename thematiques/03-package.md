# Packages
La programmation orientée objet suggère de regrouper le code en concentrant les données et les fonctions liées à un contexte au même endroit.

Pour réaliser cela, la notion générique de ‘paquetage’ est un point fondamental à aborder avant d'aller plus en profondeur vers la POO.

## Théorie

- [Support classes statiques](../supports/03a-classes-statiques.md)

### Slides
- [Slides classes statiques](/ict-320-poo/slides/03-static-classes/)

### Kahoot
- [Quelques questions...](https://create.kahoot.it/share/ict-320-poo-classes-statiques/68430660-1689-4322-b876-d3110bf98842)


## Pratique

### Course d'Escargots


```
    🐌 ───────────────────────────────────────│
        🐌 ────────────────────────────────── │
  🐌 ──────────────────────────────────────── │  🏁
            🐌 ────────────────────────────── │
       🐌 ─────────────────────────────────── │
```

**Mission** : Transformer un code "en vrac" de course d'escargots en code structuré avec des **classes statiques**.

#### Code actuel
- Variables globales
- Fonctions préfixées `Snail_`
- Tout dans un seul fichier

#### Objectif
- Classe `SnailManager`
- Classe `Screen` pour l'affichage
- Namespaces organisés

### Tutoriel
- [Escargot basique vers des classes statiques](https://labs.section-inf.ch/codelabs/preoo-03-static-classes/index.html?index=..%2F..index)


### Avancé
Maintenant que le code est bien organisé, il est temps d'améliorer un peu le gameplay :

- Obstacles : placer équitablement des obstacles qui ralentissent la progression
- Météo     : la météo peut changer et donc influencer la course (soleil: plus lent, pluie: plus rapide) 
- Danger    : un hérisson peut passer par là, en cas de rencontre avec un escargot, un mini jeu de combat est lancé, si le joueur perd, son escargot est mangé
- WinForms  : En s'aidant de [ce tutoriel](https://labs.section-inf.ch/codelabs/preoo-02-coordinates-winforms/index.html?index=..%2F..index), refaire le jeu avec WinForms
