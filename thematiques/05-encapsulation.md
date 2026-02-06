# Encapsulation

L'encapsulation a pour but de protéger les données d'un objet et contrôler l'accès depuis l'extérieur. Le mot-clé `private` cache les champs, et les **propriétés** C# (`get`, `set`) offrent un accès contrôlé avec validation.

## Théorie

- [Support encapsulation](../supports/05a-encapsulation.md)

### Slides
- [Slides encapsulation](https://etml-inf.github.io/ict-320-poo/slides/05-encapsulation/)

## Pratique

### Protéger l'Escargot

```
    snail.Energy = 9999  →  ERREUR de compilation
    snail.X = 50         →  ERREUR de compilation
    snail.Name = ""      →  ERREUR de compilation
```

**Mission** : Protéger les champs de `Snail` et `Menu` avec `private` et des propriétés.

#### Code actuel
- Champs `public` dans `Snail` : `X`, `Y`, `Energy`, `Name`, `Color`
- N'importe quel code peut tricher : `snail.Energy = 9999`
- La validation dans `ReduceEnergy()` est contournable

#### Objectif
- Champs `private` avec des propriétés C#
- `Name` et `Color` en lecture seule (`{ get; }`)
- `X`, `Y` modifiables uniquement via `Move()` (`{ get; private set; }`)
- `Energy` avec validation (full property, plage [10, 100])

### Tutoriels
- [Encapsulation OO : protéger les données de Snail et Menu](https://labs.section-inf.ch/codelabs/oo-03-encapsulation/index.html?index=..%2F..index)

## Avancé

Maintenant que les données sont protégées, explorer :

- Propriétés calculées : `public bool IsExhausted => Energy <= 10;` — une propriété sans champ, calculée à la volée
- Méthode `ToString()` : afficher les infos de l'escargot avec ses propriétés
- Accesseur `init` (C# 9+) : `public string Name { get; init; }` — assignable uniquement à la création
- Validation avancée : lever une exception (`throw new ArgumentException(...)`) au lieu d'ignorer les valeurs invalides
