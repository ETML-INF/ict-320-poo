# Instances

Le coeur de la POO réside dans la facilité à réutiliser des composants.
Le mode 'statique' a été utilisé pour faciliter la transition vers une manière de coder pratique et élégante. Il est temps de passer aux **instances** : créer plusieurs objets à partir d'une même classe, chacun avec ses propres données.

## Théorie

- [Support instances](../supports/04a-instances.md)

### Slides
- [Slides instances](https://etml-inf.github.io/ict-320-poo/slides/04-instances/)

## Pratique

### Course d'Escargots

**Mission** : Transformer le code "classes statiques" de la course d'escargots en code avec des **instances**.

#### Code actuel
- Classes statiques `Race`, `Snail`, `SuperConsole`
- Champs `static` partagés, tableaux parallèles
- Impossible d'avoir plusieurs escargots indépendants

#### Objectif
- Classe `Snail` instanciable (constructeur, méthodes d'instance)
- Tableau d'objets `Snail[]` pour gérer les coureurs
- Chaque escargot a sa propre position et son propre nom

### Tutoriels
- [Menu OO : des fonctions aux instances](https://labs.section-inf.ch/codelabs/oo-01-menu/index.html?index=..%2F..index)
- [Course d'escargots OO : des classes statiques aux instances](https://labs.section-inf.ch/codelabs/oo-02-snail/index.html?index=..%2F..index)

## Avancé

Maintenant que le code utilise des instances, il est temps d'explorer :

- Multi-courses : rendre la classe `Race` elle aussi instanciable pour lancer plusieurs courses indépendantes (qualifications, finale…), chacune avec ses propres escargots
- Statistiques : chaque escargot garde un historique de ses courses (champs d'instance supplémentaires)
- Types d'escargots : escargot rapide, escargot lent, escargot aléatoire (prépare le terrain pour l'héritage)
