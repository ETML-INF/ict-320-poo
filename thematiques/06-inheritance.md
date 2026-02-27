# Héritage

L'héritage permet de créer des classes **spécialisées** à partir d'une classe existante. La classe dérivée hérite de tout (propriétés, méthodes) et peut redéfinir le comportement avec `virtual` / `override`. Le **polymorphisme** permet de traiter tous les types de manière uniforme.

## Théorie

### Partie A — Créer des classes dérivées

- [Support héritage](../supports/06-heritage.md) (marqueurs Partie A jusqu'à Étape 4)
- [Slides Partie A](https://etml-inf.github.io/ict-320-poo/slides/06a-inheritance-bases/)

### Partie B — Spécialiser et polymorphisme

- [Support héritage](../supports/06-heritage.md) (marqueurs Partie B — Étapes 5 à 9)
- [Slides Partie B](https://etml-inf.github.io/ict-320-poo/slides/06b-inheritance-comportement/)

### Résumé

- [kahoot héritage](https://create.kahoot.it/share/ict-320-heritage/a459546c-a93f-41f4-95ae-f9d49038b991)

## Pratique

### Types d'Escargots

```
  Snail        FastSnail      SlowSnail      BonusSnail
   @------>     @===========>  @-->  @...     @---*-->@--*=====>
  normal       2x plus vite   stop si < 30   bonus aléatoire
```

**Mission** : Créer des classes dérivées de `Snail` avec des comportements spécialisés.

#### Code actuel
- Une seule classe `Snail` encapsulée
- Tous les escargots se comportent de la même manière
- Impossible de créer des types sans copier-coller

#### Objectif Partie A
- `GlitterSnail : Snail` avec constructeur `base(...)` et membres propres
- Comprendre la relation "est-un" et le tableau mixte

#### Objectif Partie B
- `FastSnail : Snail` avec `override Move` (avance 2x)
- `SlowSnail : Snail` qui s'arrête si énergie ≤ 30
- `BonusSnail : Snail` avec bonus aléatoire et `CollectBonus()`
- Un `Snail[]` contient tous les types, la boucle de course est identique

### Tutoriels
- [Héritage OO intro — créer sa première classe dérivée (Partie A)](https://labs.section-inf.ch/codelabs/oo-04a-inheritance-intro/index.html?index=..%2F..index)
- [Héritage OO — créer des types d'escargots spécialisés (Partie B)](https://labs.section-inf.ch/codelabs/oo-04b-inheritance/index.html?index=..%2F..index)

## Avancé

Maintenant que les escargots sont spécialisés, explorer :

- Classes abstraites : `abstract class Snail` pour interdire l'instanciation directe
- `ToString()` : redéfinir l'affichage pour chaque type d'escargot
- Chaîne d'héritage : `Snail → FastSnail → TurboSnail` (héritage sur plusieurs niveaux)
- Pattern Strategy : remplacer l'héritage par la composition (`IMoveStrategy`)
