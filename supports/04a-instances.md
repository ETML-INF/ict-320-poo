# Des Classes Statiques aux Instances

## Introduction

Ce chapitre fait la transition depuis les **classes statiques** vers la **Programmation Orientée Objet** avec des **instances**. Jusqu'ici, une classe statique servait de conteneur pour regrouper des champs et des méthodes. Mais que se passe-t-il quand on veut **plusieurs exemplaires** d'une même chose ?

Le fil rouge de ce chapitre est l'escargot : un petit être avec une position (`x`, `y`) et un nom (`name`). Un escargot, ça va. Mais trois escargots avec une classe statique... ça coince.

## Étape 1 : Le problème des tableaux parallèles

Imaginons qu'on gère 3 escargots dans une course. Avec ce qu'on connaît déjà, on pourrait utiliser des **tableaux parallèles** :

```csharp
// Tableaux parallèles pour 3 escargots
int[] snailX = { 0, 0, 0 };
int[] snailY = { 5, 7, 9 };
string[] snailNames = { "Turbo", "Speedy", "Flash" };

// Faire avancer l'escargot 0
snailX[0] = snailX[0] + 1;

// Afficher l'escargot 1
Console.SetCursorPosition(snailX[1], snailY[1]);
Console.Write(snailNames[1]);
```

### Problèmes de cette approche

| Problème                    | Conséquence                                                                    |
| --------------------------- | ------------------------------------------------------------------------------ |
| Données liées mais séparées | `snailX[0]`, `snailY[0]`, `snailNames[0]` doivent toujours rester synchronisés |
| Indices fragiles            | Se tromper d'indice = bug silencieux                                           |
| Pas extensible              | Ajouter un champ (ex: `snailSpeed`) = un tableau de plus à gérer               |
| Pas de lien formel          | Rien ne dit que `snailX` et `snailNames` vont ensemble                         |

## Étape 2 : Une classe statique ne suffit pas

On a appris à regrouper données et méthodes dans une **classe statique**. Essayons pour un escargot :

```csharp
static class Snail
{
    static int x = 0;
    static int y = 5;
    static string name = "Turbo";

    public static void Move(int dx, int dy)
    {
        x = x + dx;
        y = y + dy;
    }

    public static void Draw()
    {
        Console.SetCursorPosition(x, y);
        Console.Write(name);
    }
}
```

Pour **un seul** escargot, ça fonctionne :

```csharp
Snail.Move(1, 0);
Snail.Draw();
```

Mais pour **3 escargots** ? Impossible. `Snail.x` est **unique** : il n'existe qu'une seule valeur partagée. On ne peut pas avoir `Snail.x` qui vaut 0 pour Turbo ET 5 pour Speedy en même temps.

> **Conclusion** : `static` = une seule copie de chaque champ. Pour avoir **plusieurs escargots**, il faut un mécanisme qui crée **plusieurs copies** des données.

## Étape 3 : Retirer `static` → classe instanciable

La solution : retirer le mot-clé `static` de la classe et de ses membres. On obtient une **classe instanciable** :

```csharp
class Snail
{
    int x;
    int y;
    string name;
}
```

> **Note sur la visibilité** : dans ces exemples simplifiés, les champs `x`, `y`, `name` n'ont pas de mot-clé d'accès. En pratique, pour accéder aux champs depuis l'extérieur de la classe (comme `s1.x = 0`), il faudrait écrire `public int x`. On omet volontairement `public` ici pour se concentrer sur les concepts. La question de la **visibilité** (`public`, `private`, `internal`) sera traitée en détail au chapitre sur l'**encapsulation**.

Le mot-clé **`new`** permet de créer une **instance** (un objet) de cette classe. Chaque instance possède **ses propres champs** :

```csharp
Snail s1 = new Snail();
s1.x = 0;
s1.y = 5;
s1.name = "Turbo";

Snail s2 = new Snail();
s2.x = 0;
s2.y = 7;
s2.name = "Speedy";

Snail s3 = new Snail();
s3.x = 0;
s3.y = 9;
s3.name = "Flash";
```

Maintenant, `s1.x` et `s2.x` sont **indépendants**. Modifier `s1.x` ne change pas `s2.x`.

### Ce qui a changé

| Avant (statique)     | Après (instanciable)            | Terminologie        |
| -------------------- | ------------------------------- | ------------------- |
| `static class Snail` | `class Snail`                   | Classe instanciable |
| `Snail.x` (unique)   | `s1.x`, `s2.x` (par instance)   | Champ d'instance    |
| Une seule copie      | Autant de copies que nécessaire | Instances (objets)  |

### Analogie : le moule et les gâteaux

- La **classe** est le **moule** : elle définit la forme (quels champs, quelles méthodes)
- Une **instance** est un **gâteau** : chaque gâteau est indépendant, avec sa propre garniture
- `new` = "utiliser le moule pour faire un nouveau gâteau"

### Ce qui se passe en mémoire (RAM)

Quand on écrit `new Snail()`, un **nouveau bloc** est réservé en mémoire pour stocker les champs de cette instance. La variable (`s1`, `s2`, `s3`) ne contient pas l'objet directement : elle contient une **référence** (adresse) vers le bloc en mémoire.

```csharp
Snail s1 = new Snail();
s1.x = 0;  s1.y = 5;  s1.name = "Turbo";

Snail s2 = new Snail();
s2.x = 0;  s2.y = 7;  s2.name = "Speedy";

Snail s3 = new Snail();
s3.x = 0;  s3.y = 9;  s3.name = "Flash";
```

```
  VARIABLES (pile/stack)              OBJETS EN MÉMOIRE (tas/heap)
 ┌──────────────────────┐
 │ s1  ───────────────────────────► ┌─────────────────────┐
 ├──────────────────────┤           │ Snail               │
 │ s2  ──────────────────────────┐  │  x    = 0           │
 ├──────────────────────┤        │  │  y    = 5           │
 │ s3  ───────────────────────┐  │  │  name = "Turbo"     │
 └──────────────────────┘     │  │  └─────────────────────┘
                              │  │
                              │  └► ┌─────────────────────┐
                              │     │ Snail               │
                              │     │  x    = 0           │
                              │     │  y    = 7           │
                              │     │  name = "Speedy"    │
                              │     └─────────────────────┘
                              │
                              └──► ┌─────────────────────┐
                                   │ Snail               │
                                   │  x    = 0           │
                                   │  y    = 9           │
                                   │  name = "Flash"     │
                                   └─────────────────────┘
```

Chaque `new` crée un bloc séparé. Les trois blocs sont **indépendants** :

```csharp
s1.x = 10;  // Modifie UNIQUEMENT le bloc de s1
// s2.x vaut toujours 0, s3.x vaut toujours 0
```

#### Comparaison avec `static`

Avec une classe **statique**, il n'y a qu'**un seul bloc** en mémoire, sans variable ni `new` :

```
  PAS DE VARIABLE                     MÉMOIRE
  (pas de new)
                                    ┌─────────────────────┐
  Snail.x  ─────────────────────►   │ static class Snail  │
  Snail.y  ─────────────────────►   │  x    = ???         │
  Snail.name ───────────────────►   │  y    = ???         │
                                    │  name = ???         │
                                    └─────────────────────┘
                                     UN SEUL bloc partagé
                                     → impossible d'avoir
                                       3 escargots !
```

> **Retenir** : `static` = un seul bloc partagé. `new` = un nouveau bloc à chaque appel. C'est ce qui rend les instances indépendantes les unes des autres.

#### La valeur `null`

Une variable de type `Snail` contient une **référence** vers un objet. Mais que se passe-t-il si la variable ne pointe vers **rien** ?

```csharp
Snail s1 = new Snail();   // s1 pointe vers un objet en mémoire
Snail s2 = null;           // s2 ne pointe vers RIEN
```

```
  VARIABLES (pile)                  MÉMOIRE (tas)
 ┌──────────────────────┐
 │ s1  ──────────────────────────► ┌──────────────────┐
 ├──────────────────────┤          │ Snail            │
 │ s2  ──► null (rien)  │          │  x = 0, y = 0    │
 └──────────────────────┘          │  name = ???      │
                                   └──────────────────┘
```

`null` signifie "cette variable ne référence aucun objet". Toute tentative d'accéder à un champ ou une méthode via une variable `null` provoque une erreur :

```csharp
Snail s2 = null;
s2.Draw();  // ERREUR à l'exécution!
```

```
System.NullReferenceException: Object reference not set to an instance of an object.
```

> **`NullReferenceException`** est l'une des erreurs les plus courantes en C#. Elle signifie qu'on essaie d'utiliser une référence qui vaut `null`. La solution : s'assurer que la variable pointe vers un objet (`new`) avant de l'utiliser.

On peut tester si une variable est `null` avant de l'utiliser :

```csharp
Snail s2 = null;

if (s2 != null)
{
    s2.Draw();  // Exécuté uniquement si s2 pointe vers un objet
}
```

#### Types référence nullables (`?`)

En C# moderne, le compilateur vérifie les risques de `null` **à la compilation**. Par défaut, une variable de type `Snail` ne devrait **pas** valoir `null`. Si on écrit :

```csharp
Snail s = null;  // Avertissement : Converting null literal or possible null value to non-nullable type.
```

Le compilateur émet un **warning** : on met `null` dans une variable qui n'est pas prévue pour ça.

Pour indiquer qu'une variable **peut** valoir `null`, on ajoute **`?`** après le type :

```csharp
Snail? s = null;  // OK : le ? dit "cette variable peut être null"
```

Le `?` transforme le type en **type nullable**. Le compilateur sait alors que cette variable peut être `null` et vérifie qu'on ne l'utilise pas sans précaution :

```csharp
Snail? winner = null;

// Avertissement : winner peut être null
winner.Draw();

// Correct : on vérifie avant d'utiliser
if (winner != null)
{
    winner.Draw();  // OK : le compilateur sait que winner n'est pas null ici
}
```

##### L'opérateur `!` (null-forgiving)

Parfois, on **sait** qu'une variable n'est pas `null` à un certain point du code, mais le compilateur ne peut pas le déduire. L'opérateur **`!`** lui dit "fais-moi confiance" :

```csharp
Snail? winner = null;

// ... logique de course qui assigne forcément un gagnant ...

Console.WriteLine(winner!.Name);  // Le ! dit : "je garantis que ce n'est pas null"
```

> **Attention** : `!` ne vérifie rien à l'exécution. Si la variable est effectivement `null`, on obtient quand même une `NullReferenceException`. Il faut utiliser `!` uniquement quand on est **certain** que la variable a été assignée.

##### Récapitulatif

| Syntaxe | Signification | Exemple |
| --- | --- | --- |
| `Snail s` | Variable non-nullable (ne devrait pas être `null`) | `Snail s = new Snail(...)` |
| `Snail? s` | Variable nullable (peut être `null`) | `Snail? winner = null` |
| `s!.Name` | "Je garantis que `s` n'est pas `null`" | `winner!.Name` |
| `s?.Name` | "Si `s` n'est pas `null`, accède à `Name`" | `winner?.Name` (retourne `null` si `winner` est `null`) |

Le dernier opérateur, **`?.`** (null-conditional), est un raccourci pratique :

```csharp
// Au lieu de :
if (winner != null)
{
    Console.WriteLine(winner.Name);
}

// On peut écrire :
Console.WriteLine(winner?.Name);  // Affiche le nom ou rien (null)
```

> **À retenir** : utilisez `?` sur le type pour signaler qu'une variable peut être `null`. Le compilateur vous avertira si vous oubliez de vérifier avant utilisation. C'est un filet de sécurité qui évite les `NullReferenceException` en détectant les risques **avant** l'exécution.

#### Deux variables, un seul objet

Comme les variables contiennent des **références** (adresses), deux variables peuvent pointer vers le **même** objet :

```csharp
Snail s1 = new Snail();
s1.x = 0;
s1.name = "Turbo";

Snail s2 = s1;  // s2 pointe vers le MÊME objet que s1 (pas de copie !)
```

```
  VARIABLES (pile)                  MÉMOIRE (tas)
 ┌──────────────────────┐
 │ s1  ──────────────────────┐
 ├──────────────────────┤    ├──► ┌──────────────────┐
 │ s2  ──────────────────────┘    │ Snail            │
 └──────────────────────┘         │  x    = 0        │
                                  │  name = "Turbo"  │
                                  └──────────────────┘
                                   UN SEUL objet !
```

Conséquence : modifier via `s2` modifie aussi ce que voit `s1` (c'est le même objet) :

```csharp
s2.x = 99;
Console.WriteLine(s1.x);  // Affiche 99 ! (même objet)
```

> **Attention** : `=` entre deux variables d'objet ne copie pas l'objet, il copie la **référence**. Les deux variables pointent ensuite vers le même objet en mémoire.

## Étape 4 : Le constructeur

Avec le code précédent, créer un escargot nécessite 4 lignes :

```csharp
Snail s1 = new Snail();
s1.x = 0;
s1.y = 5;
s1.name = "Turbo";
```

C'est verbeux et on risque d'oublier un champ. La solution est le **constructeur** : une méthode spéciale qui s'exécute automatiquement à la création de l'objet.

```csharp
class Snail
{
    int x;
    int y;
    string name;

    // Constructeur
    public Snail(int x, int y, string name)
    {
        this.x = x;
        this.y = y;
        this.name = name;
    }
}
```

### Le mot-clé `this`

Dans le constructeur, le paramètre `x` et le champ `x` ont le même nom. Le mot-clé **`this`** désigne l'instance en cours de création :

- `this.x` = le champ de l'objet
- `x` (sans `this`) = le paramètre du constructeur

### Utilisation

```csharp
Snail s1 = new Snail(0, 5, "Turbo");
Snail s2 = new Snail(0, 7, "Speedy");
Snail s3 = new Snail(0, 9, "Flash");
```

Une seule ligne par escargot, rien ne peut être oublié.

### Constructeur par défaut vs constructeur personnalisé

Quand une classe n'a **aucun constructeur** explicite, C# fournit automatiquement un **constructeur par défaut** (sans paramètres) :

```csharp
class Snail
{
    int x;
    int y;
    string name;
    // Pas de constructeur écrit → C# en génère un : public Snail() { }
}

Snail s = new Snail();  // OK : utilise le constructeur par défaut
```

Mais dès qu'on écrit **un constructeur personnalisé**, le constructeur par défaut **disparaît** :

```csharp
class Snail
{
    int x;
    int y;
    string name;

    public Snail(int x, int y, string name)  // Constructeur personnalisé
    {
        this.x = x;
        this.y = y;
        this.name = name;
    }
}

Snail s1 = new Snail(0, 5, "Turbo");  // OK
Snail s2 = new Snail();               // ERREUR! Le constructeur sans paramètres n'existe plus
```

```
CS7036: There is no argument given that corresponds to the required parameter 'x' of 'Snail.Snail(int, int, string)'
```

> **Règle** : dès qu'on définit un constructeur, C# considère qu'on veut **contrôler** la création des objets. Le constructeur par défaut n'est plus fourni automatiquement.

Si on veut **les deux** (avec et sans paramètres), il faut les écrire explicitement :

```csharp
class Snail
{
    int x;
    int y;
    string name;

    // Constructeur sans paramètres (à écrire soi-même !)
    public Snail()
    {
        this.x = 0;
        this.y = 0;
        this.name = "???";
    }

    // Constructeur avec paramètres
    public Snail(int x, int y, string name)
    {
        this.x = x;
        this.y = y;
        this.name = name;
    }
}

Snail s1 = new Snail(0, 5, "Turbo");  // OK : utilise le 2e constructeur
Snail s2 = new Snail();               // OK : utilise le 1er constructeur
```

### Récapitulatif des règles du constructeur

| Situation                                         | Constructeur par défaut | `new Snail()` | `new Snail(0, 5, "Turbo")` |
| ------------------------------------------------- | ----------------------- | ------------- | -------------------------- |
| Aucun constructeur écrit                          | Généré automatiquement  | OK            | ERREUR                     |
| Constructeur `Snail(int, int, string)` uniquement | Supprimé                | ERREUR        | OK                         |
| Les deux constructeurs écrits                     | Écrit manuellement      | OK            | OK                         |

## Étape 5 : Méthodes d'instance

Comme pour les champs, les méthodes perdent aussi le mot-clé `static`. Elles deviennent des **méthodes d'instance** qui agissent sur les données de **leur** objet :

```csharp
class Snail
{
    int x;
    int y;
    string name;

    public Snail(int x, int y, string name)
    {
        this.x = x;
        this.y = y;
        this.name = name;
    }

    public void Move(int dx, int dy)
    {
        this.x = this.x + dx;
        this.y = this.y + dy;
    }

    public void Draw()
    {
        Console.SetCursorPosition(this.x, this.y);
        Console.Write(this.name);
    }

    public void Erase()
    {
        Console.SetCursorPosition(this.x, this.y);
        Console.Write(new string(' ', this.name.Length));
    }
}
```

### Appel : sur l'instance, pas sur la classe

```csharp
Snail s1 = new Snail(0, 5, "Turbo");
Snail s2 = new Snail(0, 7, "Speedy");

s1.Move(1, 0);  // Déplace Turbo
s2.Move(3, 0);  // Déplace Speedy (indépendamment)

s1.Draw();  // Dessine Turbo à sa position
s2.Draw();  // Dessine Speedy à sa position
```

### Avant / Après

| Avant (statique)                               | Après (instance)                                       |
|------------------------------------------------|--------------------------------------------------------|
| `Snail.Move(1, 0)` — un seul escargot possible | `s1.Move(1, 0)` — chaque escargot bouge indépendamment |
| `Snail.Draw()` — dessine "le" escargot         | `s1.Draw()` — dessine cet escargot précis              |
| La méthode utilise les champs `static`         | La méthode utilise les champs de `this`                |

## Étape 6 : Tableau d'objets

Le vrai gain apparaît quand on combine instances et tableaux. Au lieu de tableaux parallèles, on a un **tableau d'objets** :

```csharp
// Créer un tableau d'escargots
Snail[] snails = new Snail[3];
snails[0] = new Snail(0, 5, "Turbo");
snails[1] = new Snail(0, 7, "Speedy");
snails[2] = new Snail(0, 9, "Flash");
```

On peut ensuite itérer sur les escargots avec une boucle `foreach` :

```csharp
// Dessiner tous les escargots
foreach (Snail snail in snails)
{
    snail.Draw();
}

// Faire avancer tous les escargots d'un pas aléatoire
Random rng = new Random();
foreach (Snail snail in snails)
{
    int step = rng.Next(1, 4);
    snail.Move(step, 0);
}
```

### Avant / Après : la comparaison complète

| Tableaux parallèles                       | Tableau d'objets                                 |
| ----------------------------------------- | ------------------------------------------------ |
| `snailX[i]`, `snailY[i]`, `snailNames[i]` | `snails[i].x`, `snails[i].y`, `snails[i].name`   |
| 3 tableaux à synchroniser                 | 1 seul tableau                                   |
| Ajouter un champ = un tableau de plus     | Ajouter un champ = modifier la classe uniquement |
| Fonctions avec index : `Move(i, dx, dy)`  | Méthodes sur l'objet : `snails[i].Move(dx, dy)`  |

## Passer un objet à une fonction

Quand on passe un objet en paramètre à une fonction, c'est la **référence** qui est transmise, pas une copie de l'objet. La fonction travaille donc sur le **même objet** que l'appelant.

```csharp
void Accelerate(Snail snail)
{
    snail.Move(10, 0);  // Modifie l'objet original !
}

Snail turbo = new Snail(0, 5, "Turbo");
Accelerate(turbo);
Console.WriteLine(turbo.x);  // Affiche 10 (l'objet a été modifié)
```

```
  Avant l'appel                      Pendant l'appel

  turbo ──────► ┌────────┐           turbo ──────► ┌────────┐
                │ x = 0  │           snail ──────► │ x = 10 │  ← même objet !
                └────────┘                         └────────┘
```

C'est très différent des types simples (`int`, `double`, `bool`) qui sont **copiés** :

```csharp
void Double(int n)
{
    n = n * 2;  // Modifie la COPIE locale, pas l'original
}

int score = 5;
Double(score);
Console.WriteLine(score);  // Affiche 5 (inchangé)
```

### Résumé : passage par valeur vs par référence

| Type                            | Passage                | Conséquence                                |
|---------------------------------|------------------------|--------------------------------------------|
| `int`, `double`, `bool`, `char` | Par **valeur** (copie) | La fonction travaille sur une copie        |
| `Snail`, `string[]`, tout objet | Par **référence**      | La fonction travaille sur l'objet original |

### Les mots-clés `ref` et `out`

Pour forcer le passage par référence d'un type simple, on utilise `ref` ou `out` :

```csharp
void Double(ref int n)
{
    n = n * 2;  // Modifie l'original cette fois
}

int score = 5;
Double(ref score);
Console.WriteLine(score);  // Affiche 10
```

| Mot-clé | Signification | Contrainte |
| --- | --- | --- |
| `ref` | Référence vers la variable | La variable doit être initialisée avant l'appel |
| `out` | Référence vers la variable (sortie) | La fonction **doit** assigner une valeur |
| `in` | Référence en lecture seule | La fonction ne peut pas modifier la variable |

```csharp
// out : la fonction DOIT donner une valeur
void Init(out int x)
{
    x = 42;  // Obligatoire
}

int val;
Init(out val);
Console.WriteLine(val);  // Affiche 42
```

> **Note** : `ref`, `out` et `in` sont rarement nécessaires pour les objets puisqu'ils sont déjà passés par référence. Ils servent principalement pour les types simples (`int`, `double`, etc.).

## Types valeur vs types référence

En C#, il existe deux grandes familles de types :

### Types valeur (pile)

Les types simples (`int`, `double`, `bool`, `char`, les `struct`) sont des **types valeur**. La variable contient directement la donnée :

```csharp
int a = 42;
int b = a;   // b reçoit une COPIE de 42
b = 99;
Console.WriteLine(a);  // Affiche 42 (a n'a pas changé)
```

```
  VARIABLES (pile)
 ┌──────────────────┐
 │ a  = 42          │   ← la valeur est directement dans la variable
 ├──────────────────┤
 │ b  = 99          │   ← copie indépendante
 └──────────────────┘
```

### Types référence (tas)

Les objets créés avec `new` (`class`, `string`, tableaux) sont des **types référence**. La variable contient une adresse vers le tas :

```csharp
Snail a = new Snail(0, 5, "Turbo");
Snail b = a;  // b pointe vers le MÊME objet
b.x = 99;
Console.WriteLine(a.x);  // Affiche 99 (même objet !)
```

```
  VARIABLES (pile)                  MÉMOIRE (tas)
 ┌──────────────────┐
 │ a  ───────────────────────┐
 ├──────────────────┤        ├──► ┌──────────────────┐
 │ b  ───────────────────────┘    │ x = 99           │
 └──────────────────┘             └──────────────────┘
```

### Tableau récapitulatif

|                          | Type valeur                               | Type référence                               |
|--------------------------|-------------------------------------------|----------------------------------------------|
| **Exemples**             | `int`, `double`, `bool`, `char`, `struct` | `class`, `string`, `int[]`, `Snail`          |
| **Stockage**             | Directement dans la variable (pile)       | Objet sur le tas, référence dans la variable |
| **Copie (`=`)**          | Copie la **valeur**                       | Copie la **référence** (même objet)          |
| **Valeur par défaut**    | `0`, `false`, `'\0'`                      | `null`                                       |
| **Passage en paramètre** | Par copie                                 | Par référence                                |

### Au fait : `int` est aussi un objet ?

En C#, même les types simples comme `int` sont des objets "en coulisses". On peut d'ailleurs appeler des méthodes dessus :

```csharp
int n = 42;
string s = n.ToString();  // "42" — int a des méthodes !
```

En réalité, `int` est un raccourci pour `System.Int32`, qui est une `struct` (un type valeur). Puisque c'est un type, on peut même utiliser la syntaxe `new` :

```csharp
int a = 5;              // Écriture habituelle
int b = new int();      // Équivalent : crée un int avec la valeur par défaut (0)
Int32 c = new Int32();  // Pareil, sans le raccourci
```

Les trois lignes font la même chose. En pratique, on écrit toujours `int a = 5;` — mais le fait que `new int()` fonctionne montre bien qu'un `int` **est** un objet.

La différence avec une `class` : les `struct` vivent sur la **pile** (pas de `null` possible) et sont **copiées** à l'assignation.

```csharp
int a = 5;       // Raccourci pour : System.Int32 a = 5;
double b = 3.14; // Raccourci pour : System.Double b = 3.14;
bool c = true;   // Raccourci pour : System.Boolean c = true;
```

> **À retenir** : en C#, tout est objet — même `int` et `bool`. Mais les types valeur (`struct`) restent sur la pile pour des raisons de performance.

## Résumé de la Progression

| Étape                  | Concept                 | Code                          |
| ---------------------- | ----------------------- | ----------------------------- |
| 1. Tableaux parallèles | Données séparées        | `snailX[0]`, `snailY[0]`      |
| 2. Classe statique     | Un seul exemplaire      | `Snail.x`, `Snail.Move()`     |
| 3. Classe instanciable | Plusieurs exemplaires   | `s1.x`, `s2.x`, `new Snail()` |
| 4. Constructeur        | Initialisation garantie | `new Snail(0, 5, "Turbo")`    |
| 5. Méthodes d'instance | Comportement par objet  | `s1.Move(1, 0)`               |
| 6. Tableau d'objets    | Collection d'instances  | `snails[i].Draw()`            |

## Points Importants

1. Une **classe instanciable** (sans `static`) sert de modèle pour créer des objets
2. Le mot-clé **`new`** crée une nouvelle instance avec ses propres champs
3. Chaque instance est **indépendante** : modifier `s1.x` ne change pas `s2.x`
4. Le **constructeur** garantit qu'un objet est correctement initialisé dès sa création
5. Dès qu'on écrit un constructeur personnalisé, le **constructeur par défaut disparaît**
6. Le mot-clé **`this`** désigne l'instance courante (l'objet sur lequel on travaille)
7. Les **méthodes d'instance** (sans `static`) opèrent sur les données de leur objet
8. Un **tableau d'objets** remplace avantageusement les tableaux parallèles
9. Une variable d'objet contient une **référence**, pas l'objet lui-même — `null` = aucune référence
10. Passer un objet à une fonction transmet la **référence** : la fonction modifie l'original
11. Les types simples (`int`, `double`, ...) sont des **types valeur** (copiés), les objets sont des **types référence**
12. En C#, tout est objet — même `int` (`System.Int32`) — mais les types valeur restent sur la pile

## Prochaine Étape

Les champs de nos classes sont actuellement accessibles depuis l'extérieur (`s1.x = -999` est possible). La prochaine étape introduira l'**encapsulation** : protéger les données avec `private` et contrôler l'accès avec des **propriétés** (`public`).
