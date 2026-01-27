# Des Fonctions aux Classes Statiques

## Introduction

Ce chapitre montre l'évolution naturelle d'un code en "vrac" vers une structure organisée avec des **classes** et des **namespaces**. Cette progression permet de comprendre pourquoi la Programmation Orientée Objet (POO) existe et comment elle résout des problèmes concrets d'organisation du code.

## Étape 1 : Code en Vrac

Imaginons un programme qui gère des scores de joueurs et dont la version initiale pourrait ressembler à ceci :

```csharp
// Variables globales
int score1 = 0;
int score2 = 0;
int score3 = 0;
string name1 = "Alice";
string name2 = "Bob";
string name3 = "Charlie";

// Ajouter des points à Alice
score1 = score1 + 100;
Console.WriteLine($"{name1}: {score1} points");

// Ajouter des points à Bob
score2 = score2 + 150;
Console.WriteLine($"{name2}: {score2} points");

// Calculer le total
int total = score1 + score2 + score3;
Console.WriteLine($"Total: {total} points");

// Trouver le meilleur score
int best = score1;
if (score2 > best) best = score2;
if (score3 > best) best = score3;
Console.WriteLine($"Meilleur: {best} points");

// Ajouter encore des points à Alice
score1 = score1 + 50;
Console.WriteLine($"{name1}: {score1} points");

// Recalculer le total (code dupliqué!)
total = score1 + score2 + score3;
Console.WriteLine($"Total: {total} points");

// Recalculer le meilleur (code dupliqué!)
best = score1;
if (score2 > best) best = score2;
if (score3 > best) best = score3;
Console.WriteLine($"Meilleur: {best} points");
```

### Problèmes de cette Approche

| Problème              | Conséquence                             |
| --------------------- | --------------------------------------- |
| Code dupliqué         | Maintenance difficile, risque d'erreurs |
| Variables éparpillées | Difficile de savoir ce qui va ensemble  |
| Pas de réutilisation  | Copier-coller = bugs                    |
| Difficile à lire      | On ne voit pas la structure             |

## Étape 2 : Organisation avec des Fonctions

Pour améliorer la lisibilité on peut ensuite définir des **fonctions** :

```csharp
// Variables globales (données)
int[] scores = { 0, 0, 0 };
string[] names = { "Alice", "Bob", "Charlie" };

// Programme principal
AddPoints(0, 100);  // Alice +100
AddPoints(1, 150);  // Bob +150

ShowAllScores();
Console.WriteLine($"Total: {CalculateTotal()} points");
Console.WriteLine($"Meilleur: {FindBestScore()} points");

AddPoints(0, 50);   // Alice +50

ShowAllScores();
Console.WriteLine($"Total: {CalculateTotal()} points");
Console.WriteLine($"Meilleur: {FindBestScore()} points");

// --- Fonctions ---

void AddPoints(int playerIndex, int points)
{
    scores[playerIndex] = scores[playerIndex] + points;
    Console.WriteLine($"{names[playerIndex]}: {scores[playerIndex]} points");
}

int CalculateTotal()
{
    int sum = 0;
    for (int i = 0; i < scores.Length; i++)
    {
        sum = sum + scores[i];
    }
    return sum;
}

int FindBestScore()
{
    int best = scores[0];
    for (int i = 1; i < scores.Length; i++)
    {
        if (scores[i] > best)
        {
            best = scores[i];
        }
    }
    return best;
}

void ShowAllScores()
{
    Console.WriteLine("--- Scores ---");
    for (int i = 0; i < scores.Length; i++)
    {
        Console.WriteLine($"{names[i]}: {scores[i]}");
    }
}
```

### Améliorations
- Lisibilité
- Réduction de la duplication de code
- Fonctions réutilisables

### Problèmes Restants

- Les fonctions "flottent" sans contexte
- Difficile de savoir quelles fonctions vont ensemble
- Risque de conflit de noms avec d'autres parties du programme

## Étape 3 : Préfixer les Fonctions

Pour indiquer que ces fonctions concernent la gestion des scores, on pourrait ajouter un **préfixe** :

```csharp
int[] scores = { 0, 0, 0 };
string[] names = { "Alice", "Bob", "Charlie" };

// Programme principal
Score_AddPoints(0, 100);
Score_AddPoints(1, 150);

Score_ShowAll();
Console.WriteLine($"Total: {Score_CalculateTotal()} points");
Console.WriteLine($"Meilleur: {Score_FindBest()} points");

// --- Fonctions préfixées ---

void Score_AddPoints(int playerIndex, int points)
{
    scores[playerIndex] = scores[playerIndex] + points;
    Console.WriteLine($"{names[playerIndex]}: {scores[playerIndex]} points");
}

int Score_CalculateTotal()
{
    int sum = 0;
    for (int i = 0; i < scores.Length; i++)
    {
        sum = sum + scores[i];
    }
    return sum;
}

int Score_FindBest()
{
    int best = scores[0];
    for (int i = 1; i < scores.Length; i++)
    {
        if (scores[i] > best)
        {
            best = scores[i];
        }
    }
    return best;
}

void Score_ShowAll()
{
    Console.WriteLine("--- Scores ---");
    for (int i = 0; i < scores.Length; i++)
    {
        Console.WriteLine($"{names[i]}: {scores[i]}");
    }
}
```

### Observation Importante

Le préfixe `Score_` indique que ces fonctions forment un **groupe logique**. C'est exactement ce qu'une **classe** va formaliser !

## Étape 4 : Création d'une Classe Statique

Une **classe** est un conteneur qui regroupe des données et des fonctions liées. Une classe **statique** signifie qu'on n'a pas besoin de créer d'objet pour l'utiliser et pour des rasions de simplification, nous utiliserons ce mode pour l'instant.

### Syntaxe de Base

```csharp
static class NomDeLaClasse
{
    // Données (champs)
    static int variable = 0;

    // Fonctions (méthodes)
    static void MaMethode()
    {
        // ...
    }
}
```

### Version du code utilisant une classe statique

```csharp
// Programme principal
ScoreManager.AddPoints(0, 100);
ScoreManager.AddPoints(1, 150);

ScoreManager.ShowAll();
Console.WriteLine($"Total: {ScoreManager.CalculateTotal()} points");
Console.WriteLine($"Meilleur: {ScoreManager.FindBest()} points");

// --- Définition de la classe statique ---
static class ScoreManager
{
    // Données de la classe
    static int[] scores = { 0, 0, 0 };
    static string[] names = { "Alice", "Bob", "Charlie" };

    // Méthodes de la classe
    public static void AddPoints(int playerIndex, int points)
    {
        scores[playerIndex] = scores[playerIndex] + points;
        Console.WriteLine($"{names[playerIndex]}: {scores[playerIndex]} points");
    }

    public static int CalculateTotal()
    {
        int sum = 0;
        for (int i = 0; i < scores.Length; i++)
        {
            sum = sum + scores[i];
        }
        return sum;
    }

    public static int FindBest()
    {
        int best = scores[0];
        for (int i = 1; i < scores.Length; i++)
        {
            if (scores[i] > best)
            {
                best = scores[i];
            }
        }
        return best;
    }

    public static void ShowAll()
    {
        Console.WriteLine("--- Scores ---");
        for (int i = 0; i < scores.Length; i++)
        {
            Console.WriteLine($"{names[i]}: {scores[i]}");
        }
    }
}
```

### Ce qui a Changé

| Avant                    | Après                            |
| ------------------------ | -------------------------------- |
| `Score_A  ddPoints(...)` | `ScoreManager.AddPoints(...)`    |
| Fonctions "en vrac"      | Fonctions dans une classe        |
| `void MaFonction()`      | `public static void MaMethode()` |
| Variables globales       | Champs `static` de la classe     |

### Le Mot-Clé `static`

- **`static class`** : la classe elle-même est statique (pas besoin d'instanciation)
- **`static` sur les champs** : les données appartiennent à la classe, pas à une instance
- **`static` sur les méthodes** : les méthodes s'appellent sur la classe directement

### Le Mot-Clé `public`

- **`public`** : la méthode est accessible depuis l'extérieur de la classe
- Sans `public` (ou avec `private`) : accessible uniquement depuis l'intérieur de la classe

## Étape 5 : Introduction des Namespaces

Un **namespace** (espace de noms) est un conteneur pour organiser les classes. Il évite les conflits de noms entre différentes parties du code.

### Problème : Conflit de Noms

Imaginons deux développeurs qui créent chacun une classe `Player` :

```csharp
// Développeur 1 : classe pour un jeu de construction
static class Player
{
    public static int Resources = 100;
    public static void Build() { /* ... */ }
    public static void Move() { /* ... */ }
}

// Développeur 2 : classe pour un lecteur audio
static class Player
{
    public static void Play() { /* ... */ }
    public static void Pause() { /* ... */ }
}

// ERREUR! Deux classes avec le même nom!
```

### Solution : Les Namespaces

```csharp
namespace SpiritCraft
{
    static class Player
    {
        public static int Resources = 100;
        public static void Build() { /* ... */ }
        public static void Move() { /* ... */ }
    }
}

namespace AudioSystem
{
    static class Player
    {
        public static void Play() { /* ... */ }
        public static void Pause() { /* ... */ }
    }
}
```

### Utilisation avec le Nom Complet

```csharp
// Utiliser les deux classes sans ambiguïté
SpiritCraft.Player.Move();
SpiritCraft.Player.Build();
AudioSystem.Player.Play();
```

### Notre Exemple Complet avec Namespace

```csharp
namespace MyGame.Scoring
{
    static class ScoreManager
    {
        static int[] scores = { 0, 0, 0 };
        static string[] names = { "Alice", "Bob", "Charlie" };

        public static void AddPoints(int playerIndex, int points)
        {
            scores[playerIndex] = scores[playerIndex] + points;
            Console.WriteLine($"{names[playerIndex]}: {scores[playerIndex]} points");
        }

        public static int CalculateTotal()
        {
            int sum = 0;
            for (int i = 0; i < scores.Length; i++)
            {
                sum = sum + scores[i];
            }
            return sum;
        }

        public static int FindBest()
        {
            int best = scores[0];
            for (int i = 1; i < scores.Length; i++)
            {
                if (scores[i] > best)
                {
                    best = scores[i];
                }
            }
            return best;
        }

        public static void ShowAll()
        {
            Console.WriteLine("--- Scores ---");
            for (int i = 0; i < scores.Length; i++)
            {
                Console.WriteLine($"{names[i]}: {scores[i]}");
            }
        }
    }
}
```

## Le Mot-Clé `using`

Écrire le nom complet à chaque fois est fastidieux :

```csharp
// Sans using : nom complet obligatoire
MyGame.Scoring.ScoreManager.AddPoints(0, 100);
MyGame.Scoring.ScoreManager.ShowAll();
System.Console.WriteLine("Terminé");
```

Le mot-clé **`using`** permet d'importer un namespace pour utiliser ses classes directement :

```csharp
using MyGame.Scoring;

// Avec using : nom court suffit
ScoreManager.AddPoints(0, 100);
ScoreManager.ShowAll();
```

### Exemples : Ce qui Fonctionne et Ce qui Ne Fonctionne Pas

#### Cas 1 : Using Correct

```csharp
using System;
using MyGame.Scoring;

// OK : Console vient de System
Console.WriteLine("Hello");

// OK : ScoreManager vient de MyGame.Scoring
ScoreManager.AddPoints(0, 100);
```

#### Cas 2 : Using Manquant

```csharp
// PAS de using MyGame.Scoring

ScoreManager.AddPoints(0, 100);  // ERREUR!
// CS0103: The name 'ScoreManager' does not exist in the current context
```

**Solution** : ajouter `using MyGame.Scoring;` ou utiliser le nom complet `MyGame.Scoring.ScoreManager.AddPoints(0, 100);`

#### Cas 3 : Using Partiel (Namespace Parent)

```csharp
using MyGame;  // Seulement le parent!

ScoreManager.AddPoints(0, 100);  // ERREUR!
// Le using de MyGame n'importe PAS automatiquement MyGame.Scoring

Scoring.ScoreManager.AddPoints(0, 100);  // OK : chemin relatif
```

**Règle** : `using MyGame` n'importe pas automatiquement les sous-namespaces.

#### Cas 4 : Using sur une Classe (Interdit)

```csharp
using MyGame.Scoring.ScoreManager;  // ERREUR!
// CS0138: A 'using namespace' directive can only be applied to namespaces;
// 'MyGame.Scoring.ScoreManager' is a type not a namespace
```

**Règle** : `using` s'applique aux **namespaces**, pas aux classes.

#### Cas 5 : Conflit de Noms avec Using

```csharp
using SpiritCraft;
using AudioSystem;

Player.Move();  // ERREUR!
// CS0104: 'Player' is an ambiguous reference between
// 'SpiritCraft.Player' and 'AudioSystem.Player'
```

**Solution** : utiliser le nom complet pour lever l'ambiguïté :

```csharp
using SpiritCraft;
using AudioSystem;

SpiritCraft.Player.Move();   // OK : explicite
SpiritCraft.Player.Build();  // OK : explicite
AudioSystem.Player.Play();   // OK : explicite
```

#### Cas 6 : Alias de Namespace

Pour simplifier les noms longs ou résoudre les conflits :

```csharp
using Builder = SpiritCraft.Player;
using Audio = AudioSystem.Player;

Builder.Move();   // OK : utilise l'alias
Builder.Build();  // OK : utilise l'alias
Audio.Play();     // OK : utilise l'alias
```

### Tableau Récapitulatif des Using

| Code                                 | Résultat                                                                |
| ------------------------------------ | ----------------------------------------------------------------------- |
| `using System;`                      | Importe `System`, permet d'écrire `Console` au lieu de `System.Console` |
| `using MyGame.Scoring;`              | Importe `MyGame.Scoring`, permet d'écrire `ScoreManager` directement    |
| `using MyGame;`                      | Importe **seulement** `MyGame`, pas ses sous-namespaces                 |
| `using MyGame.Scoring.ScoreManager;` | **ERREUR** : on ne peut pas importer une classe                         |
| `using X = Namespace.Classe;`        | Crée un alias `X` pour la classe                                        |

### Bonus : `using static`

Il existe un raccourci encore plus court : **`using static`**. Cette directive importe les **membres statiques** d'une classe, permettant de les utiliser sans préfixe.

#### Comparaison

```csharp
// Avec using System (classique)
using System;

Console.WriteLine("Hello");
Console.Clear();
double r = Math.Sqrt(16);
```

```csharp
// Avec using static (raccourci maximal)
using static System.Console;
using static System.Math;

WriteLine("Hello");      // Plus besoin de Console.
Clear();
double r = Sqrt(16);     // Plus besoin de Math.
double p = PI;           // Même pour les constantes
```

#### Règles de `using static`

| Code                           | Résultat                                                                          |
| ------------------------------ | --------------------------------------------------------------------------------- |
| `using static System.Console;` | Importe les membres de `Console` → `WriteLine()` au lieu de `Console.WriteLine()` |
| `using static System.Math;`    | Importe les membres de `Math` → `Sqrt()`, `PI`, `Abs()` directement               |
| `using static System;`         | **ERREUR** : `using static` s'applique à une **classe**, pas un namespace         |

#### Avantages et Inconvénients

| Avantages            | Inconvénients                              |
| -------------------- | ------------------------------------------ |
| Code plus concis     | Moins explicite (d'où vient `WriteLine` ?) |
| Moins de répétition  | Risque de confusion entre méthodes         |
| Pratique pour `Math` | Peut réduire la lisibilité                 |

#### Exemple complet

```csharp
using static System.Console;
using static System.Math;

// Programme sans préfixes
WriteLine("=== Calculatrice ===");
Write("Entrez un nombre : ");
string? input = ReadLine();

if (double.TryParse(input, out double n))
{
    WriteLine($"Racine carrée : {Sqrt(n)}");
    WriteLine($"Valeur absolue : {Abs(n)}");
    WriteLine($"Arrondi : {Round(n)}");
}
```

**Note** : `using static` est particulièrement utile pour les classes utilitaires comme `Math`, `Console`, ou vos propres classes statiques comme `SuperConsole`.

## Namespaces Standards de .NET

.NET fournit de nombreux namespaces prédéfinis :

| Namespace                    | Contenu                                           |
| ---------------------------- | ------------------------------------------------- |
| `System`                     | Types de base (`Console`, `Math`, `String`, etc.) |
| `System.Collections.Generic` | Collections (`List<T>`, `Dictionary<K,V>`)        |
| `System.IO`                  | Entrées/Sorties (fichiers)                        |
| `System.Text`                | Manipulation de texte                             |

### Exemple : Console et Math

```csharp
using System;

// Console.WriteLine vient de System
Console.WriteLine("Hello");

// Math.Sqrt vient aussi de System
double racine = Math.Sqrt(16);  // 4.0

// Math.PI est une constante statique
double aire = Math.PI * 5 * 5;  // ~78.54
```

`Console` et `Math` sont des classes statiques du namespace `System`.

### Sans Using System

```csharp
// Sans using : noms complets obligatoires
System.Console.WriteLine("Hello");
double racine = System.Math.Sqrt(16);
```

## Structure d'un Projet Complet

### Organisation des Fichiers

```
MyProject/
├── Program.cs           // Point d'entrée
├── Scoring/
│   └── ScoreManager.cs  // Classe ScoreManager
└── Display/
    └── Screen.cs        // Classe Screen
```

> Par défaut, on fait correspondre le namespace à l'arborescence du système de fichier. Ainsi, le namespace Test1.Test2.Test3 aura l'arborescence $project/Test1/Test2/Test3.

### Fichier ScoreManager.cs

```csharp
namespace MyProject.Scoring
{
    static class ScoreManager
    {
        static int[] scores = { 0, 0, 0 };
        static string[] names = { "Alice", "Bob", "Charlie" };

        public static void AddPoints(int playerIndex, int points)
        {
            scores[playerIndex] += points;
        }

        public static int GetScore(int playerIndex)
        {
            return scores[playerIndex];
        }

        public static string GetName(int playerIndex)
        {
            return names[playerIndex];
        }
    }
}
```

### Fichier Screen.cs

```csharp
namespace MyProject.Display
{
    static class Screen
    {
        public static void ShowMessage(string message)
        {
            Console.WriteLine($">>> {message} <<<");
        }

        public static void ShowPlayerScore(string name, int score)
        {
            Console.WriteLine($"{name}: {score} pts");
        }
    }
}
```

### Fichier Program.cs

```csharp
using MyProject.Scoring;
using MyProject.Display;

// Programme principal
ScoreManager.AddPoints(0, 100);

string name = ScoreManager.GetName(0);
int score = ScoreManager.GetScore(0);

Screen.ShowPlayerScore(name, score);
Screen.ShowMessage("Game Over");
```

## Résumé de la Progression

| Étape                  | Organisation        | Appel                                            |
| ---------------------- | ------------------- | ------------------------------------------------ |
| 1. Code en vrac        | Aucune              | `score1 = score1 + 100;`                         |
| 2. Fonctions           | Fonctions séparées  | `AddPoints(0, 100);`                             |
| 3. Fonctions préfixées | Préfixe manuel      | `Score_AddPoints(0, 100);`                       |
| 4. Classe statique     | Classe              | `ScoreManager.AddPoints(0, 100);`                |
| 5. Namespace           | Namespace + Classe  | `MyGame.Scoring.ScoreManager.AddPoints(0, 100);` |
| 6. Using               | Import du namespace | `ScoreManager.AddPoints(0, 100);`                |

## Points Importants

1. Une **classe** regroupe des données et des fonctions qui vont ensemble
2. **`static`** signifie "appartient à la classe, pas à une instance"
3. **`public`** rend un membre accessible depuis l'extérieur de la classe
4. Un **namespace** organise les classes et évite les conflits de noms
5. **`using`** importe un namespace pour éviter d'écrire le nom complet
6. `using` s'applique aux **namespaces**, jamais directement aux classes
7. `using` d'un namespace parent **n'importe pas** les sous-namespaces
8. En cas de conflit de noms, utiliser le **nom complet** ou un **alias**
9. Par défaut, chaque    classe est définie dans un fichier .cs distinct

## Prochaine Étape

Cette introduction aux classes statiques prépare le terrain pour la **Programmation Orientée Objet** complète, où les classes ne seront plus statiques mais permettront de créer des **instances** (objets) avec leurs propres données.
