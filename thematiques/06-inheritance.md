# Héritage

L'héritage permet de créer des classes **spécialisées** à partir d'une classe existante. La classe dérivée hérite de tout (propriétés, méthodes) et peut redéfinir le comportement avec `virtual` / `override`. Le **polymorphisme** permet de traiter tous les types de manière uniforme.

## Théorie

- [Support héritage](../supports/06a-heritage.md)
- [Slides héritage](https://etml-inf.github.io/ict-320-poo/slides/06-inheritance/)

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

#### Objectif
- `FastSnail : Snail` avec `override Move` (avance 2x)
- `SlowSnail : Snail` qui s'arrête si énergie ≤ 30
- `BonusSnail : Snail` avec bonus aléatoire et `CollectBonus()`
- Un `Snail[]` contient tous les types, la boucle de course est identique

### Tutoriels
- [Héritage OO : créer des types d'escargots spécialisés](https://labs.section-inf.ch/codelabs/oo-04-inheritance/index.html?index=..%2F..index)

## Avancé

Maintenant que les escargots sont spécialisés, explorer :

- Classes abstraites : `abstract class Snail` pour interdire l'instanciation directe
- `ToString()` : redéfinir l'affichage pour chaque type d'escargot
- Chaîne d'héritage : `Snail → FastSnail → TurboSnail` (héritage sur plusieurs niveaux)
- Pattern Strategy : remplacer l'héritage par la composition (`IMoveStrategy`)
