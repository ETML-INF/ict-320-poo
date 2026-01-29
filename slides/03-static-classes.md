---
theme: default
title: Des Fonctions aux Classes Statiques
info: Introduction aux namespaces et classes statiques en C#
author: ETML
transition: slide-left
mdc: true
---

# Des Fonctions aux Classes Statiques

## Organiser son code de manière professionnelle

<div class="pt-12">
  <span class="px-2 py-1 rounded bg-blue-500 text-white">
    Premiers pas vers la POO
  </span>
</div>

---

# Plan de la présentation

1. **Program.cs** - Anatomie d'un programme C#
2. **Namespaces** - Organiser les classes
3. **using** - Importer des namespaces
4. **Console avancée** - Fonctions couleur
5. **SuperConsole** - Notre première classe statique

---
layout: section
---

# Partie 1
## Anatomie de Program.cs

---

# Le fichier Program.cs classique

Voici la structure complète d'un programme C# :

```csharp
using System;

namespace MyProject
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello World!");
        }
    }
}
```

<v-click>

<div class="mt-4 p-4 bg-blue-100 rounded text-blue-900">

Décortiquons chaque élément...

</div>

</v-click>

---

# Les 4 couches du programme

```csharp {0|1|3,4,12|5,6,11|7-10|all}
using System;                              // 1. Imports

namespace MyProject                        // 2. Namespace
{
    class Program                          // 3. Classe
    {
        static void Main(string[] args)    // 4. Méthode statique
        {
            Console.WriteLine("Hello!");
        }
    }
}
```

<div class="grid grid-cols-4 gap-2 mt-8 text-center text-sm">

<div :class="$clicks >= 1 ? 'opacity-100' : 'text-gray-500 opacity-50'" class="p-2 rounded transition-all duration-300 bg-purple-500 text-white">
<strong>using</strong><br>
Imports
</div>

<div :class="$clicks >= 2 ? 'opacity-100' : 'text-gray-500 opacity-50'" class="p-2 rounded transition-all duration-300 bg-blue-500 text-white">
<strong>namespace</strong><br>
Organisation
</div>

<div :class="$clicks >= 3 ? 'opacity-100' : 'opacity-50 text-gray-500'" class="p-2 rounded transition-all duration-300 bg-green-500 text-white">
<strong>class</strong><br>
Conteneur
</div>

<div :class="$clicks >= 4 ? 'opacity-100' : 'opacity-50 text-gray-500'" class="p-2 rounded transition-all duration-300 bg-orange-500 text-white">
<strong>static</strong><br>
Méthode
</div>

</div>

---

# Le mot-clé `static`

`static` signifie : **"appartient à la classe, pas à un objet"**

S'applique aux **méthodes** ET aux **variables** (appelées **champs**) :

```csharp
class Program
{
    static int count = 0;              // Variable (champ) statique
    static void Main(string[] args)    // Méthode statique
    {
        count++;
    }
}
```

<v-click>

<div class="grid grid-cols-2 gap-8 mt-8">

<div class="bg-green-700 text-green-200 p-4 rounded">

### Avec `static`
- Appel direct : `Program.Main()`
- Accès direct : `Program.count`
- Pas besoin de créer d'objet

</div>

<div class="bg-gray-700 text-gray-200 p-4 rounded">

### Sans `static` (plus tard)
- Nécessite un objet
- Chaque objet a sa propre copie
- C'est la POO !

</div>

</div>

</v-click>

---
layout: section
---

# Partie 2
## La classe Console

---

# Console : une classe statique de .NET

`Console` est une classe **statique** fournie par .NET :

```csharp
Console.WriteLine("Hello!");     // Méthode statique
Console.ReadLine();              // Méthode statique
Console.Clear();                 // Méthode statique
```

<v-click>

On n'écrit **jamais** :

```csharp
Console c = new Console();  // ERREUR! Console est statique
c.WriteLine("Hello");       // Impossible
```

</v-click>

<v-click>

<div class="mt-4 p-4 bg-yellow-100 rounded text-yellow-900">

**Retenir** : Une classe statique s'utilise directement via son nom, sans créer d'objet.

</div>

</v-click>

---

# D'où vient Console ?

`Console` appartient au **namespace** `System` :

```csharp
// Nom complet
System.Console.WriteLine("Hello!");
System.Console.Clear();
System.Console.ReadLine();
```

<v-click>

C'est long ! Le mot-clé `using` simplifie :

```csharp
using System;  // Importer le namespace

Console.WriteLine("Hello!");  // Nom court suffit
Console.Clear();
Console.ReadLine();
```

</v-click>

---

# Avec ou sans `using` ?

<div class="grid grid-cols-2 gap-8">

<div>

### Sans using System

```csharp
// Pas de using

System.Console.WriteLine("A");
System.Console.WriteLine("B");
System.Console.Clear();

double r = System.Math.Sqrt(16);
```

Répétitif !

</div>

<v-click>
<div>

### Avec using System

```csharp
using System;

Console.WriteLine("A");
Console.WriteLine("B");
Console.Clear();

double r = Math.Sqrt(16);
```

Beaucoup mieux !

</div>
</v-click>

</div>

<v-click>

<div class="mt-4 p-4 bg-green-700 rounded text-green-200 text-center">

`using` = raccourci pour éviter d'écrire le nom complet

</div>

</v-click>

---
layout: section
---

# Partie 3
## Les Namespaces

---

# Pourquoi les namespaces ?

Imaginons deux développeurs qui créent une classe `Player` :

```csharp {0|1|1-6|8|8-13|all}
// Alice : jeu de construction
static class Player
{
    public static void Build() { }
    public static void Move() { }
}

// Bob : lecteur audio
static class Player
{
    public static void Play() { }
    public static void Pause() { }
}

// ERREUR! Deux classes "Player" = conflit !
```

---

# Solution : les namespaces

Chaque classe dans son **espace de noms** :

```csharp {0|1-8|9-16|all}
namespace SpiritCraft
{
    static class Player
    {
        public static void Build() { }
        public static void Move() { }
    }
}

namespace AudioSystem
{
    static class Player
    {
        public static void Play() { }
        public static void Pause() { }
    }
}
```

---

# Utilisation avec nom complet

Plus d'ambiguïté grâce au **nom complet** :

```csharp {0|1|1,2|1-3|1-5|1-6|all}
// Classe du jeu SpiritCraft
SpiritCraft.Player.Move();
SpiritCraft.Player.Build();

// Classe du système audio
AudioSystem.Player.Play();
AudioSystem.Player.Pause();
```

<v-click>

<div class="mt-8 p-4 bg-blue-700 rounded text-blue-200">

**Namespace** = "nom de famille" de la classe

- `SpiritCraft.Player` ≠ `AudioSystem.Player`
- Comme : `Dupont.Alice` ≠ `Martin.Alice`

</div>

</v-click>

---

# Using et conflits

<div class="grid grid-cols-2 gap-4">

<div>

<v-click at=3 >
<h2>Conflit !</h2>
</v-click>

```csharp {0|1|1-2|1-4|all}
using SpiritCraft;
using AudioSystem;

Player.Move();
// Quelle classe Player ?
```

</div>


<v-click>
<div>

### Solution : nom complet

```csharp
using SpiritCraft;
using AudioSystem;

SpiritCraft.Player.Move();  // OK
AudioSystem.Player.Play();  // OK
```

</div>
</v-click>

</div>

<v-click>

### Ou avec alias

```csharp
using Game = SpiritCraft.Player;
using Audio = AudioSystem.Player;

Game.Move();   // OK : alias vers SpiritCraft.Player
Audio.Play();  // OK : alias vers AudioSystem.Player
```

</v-click>

---

# Règles des using
<v-clicks>

| Code                          | Résultat                                                 |
| ----------------------------- | -------------------------------------------------------- |
| `using System;`               | Importe `System` → `Console` au lieu de `System.Console` |
| `using MyGame.Scoring;`       | Importe le namespace complet                             |
| `using MyGame;`               | N'importe **PAS** `MyGame.Scoring` !                     |
| `using MyGame.Scoring.Score;` | **ERREUR** : on n'importe pas une classe                 |

</v-clicks>

<v-click>

<div class="mt-4 p-4 bg-red-700 rounded text-red-100">

**Attention** : `using MyGame` n'importe pas automatiquement `MyGame.Scoring` !

</div>

</v-click>

---

# Bonus : `using static`

Il existe un raccourci encore plus court : **`using static`**

<div class="grid grid-cols-2 gap-4">

<div>

### Avec `using System`

```csharp {1|all}
using System;

Console.WriteLine("Hello");
Console.Clear();
Console.ReadKey();

double r = Math.Sqrt(16);
```

<v-click>
On écrit `Console.` à chaque fois
</v-click>

</div>


<div>

<v-click>
<h3>Avec `using static`</h3>
</v-click>

```csharp {0|1|1-6|all}
using static System.Console;

WriteLine("Hello");
Clear();
ReadKey();

// Math nécessite son propre using static
```

<v-click>
Plus besoin du préfixe !
</v-click>

</div>


</div>

---

# `using static` en détail

`using static` importe les **membres statiques** d'une classe :

```csharp {0|1|1,5|1,5,6|1,5-7|1,4-7|2|2,10|2,10-11|2,10-12|2,10-12,9|all}
using static System.Console;
using static System.Math;

// Console : plus besoin du préfixe
WriteLine("Hello!");
Clear();
ForegroundColor = ConsoleColor.Green;

// Math : plus besoin du préfixe
double r = Sqrt(16);      // au lieu de Math.Sqrt(16)
double p = PI;            // au lieu de Math.PI
double a = Abs(-5);       // au lieu de Math.Abs(-5)
```

<v-click>

<div class="mt-4 p-4 bg-yellow-700 rounded text-yellow-100">

**Attention** : `using static` importe une **classe**, pas un namespace !

- `using static System.Console;` OK
- `using static System;` ERREUR

</div>

</v-click>

---

# Tableau récapitulatif complet
<v-clicks>

| Code | Ce qu'on peut écrire |
|------|---------------------|
| (rien) | `System.Console.WriteLine("Hi")` |
| `using System;` | `Console.WriteLine("Hi")` |
| `using static System.Console;` | `WriteLine("Hi")` |

</v-clicks>
<v-click>

<div class="grid grid-cols-2 gap-8 mt-8">

<div class="bg-green-900 text-green-100 p-4 rounded">

### Avantages
- Code plus concis
- Moins de répétition
- Pratique pour `Math`

</div>

<div class="bg-orange-900 text-orange-100 p-4 rounded">

### Inconvénients
- Moins explicite
- Risque de confusion
- D'où vient `WriteLine` ?

</div>

</div>

</v-click>

---
layout: section
---

# Partie 4
## Console Avancée avec Couleurs

---

# Les couleurs dans la Console

.NET permet de colorer le texte :

```csharp {0|1|1,2|4|4,5|7|all}
Console.ForegroundColor = ConsoleColor.Green;
Console.WriteLine("Texte vert");

Console.ForegroundColor = ConsoleColor.Red;
Console.WriteLine("Texte rouge");

Console.ResetColor();  // Retour à la normale
```

<div :class="$clicks >= 2 ? 'opacity-100' : 'opacity-0'" class="transition-all duration-300">

### Couleurs disponibles

<div class="grid grid-cols-4 gap-2 text-sm mt-4">
<div :class="$clicks > 5 ? 'opacity-100' : 'opacity-10'" class="bg-black text-white p-1 rounded text-center transition-all duration-300">Black</div>
<div :class="$clicks > 5 ? 'opacity-100' : 'opacity-10'" class="bg-blue-900 text-white p-1 rounded text-center transition-all duration-300">DarkBlue</div>
<div :class="$clicks > 5 ? 'opacity-100' : 'opacity-10'" class="bg-green-900 text-white p-1 rounded text-center transition-all duration-300">DarkGreen</div>
<div :class="$clicks > 5 ? 'opacity-100' : 'opacity-10'" class="bg-cyan-900 text-white p-1 rounded text-center transition-all duration-300">DarkCyan</div>
<div :class="$clicks > 5 ? 'opacity-100' : 'opacity-10'" class="bg-red-900 text-white p-1 rounded text-center transition-all duration-300">DarkRed</div>
<div :class="$clicks > 5 ? 'opacity-100' : 'opacity-10'" class="bg-purple-900 text-white p-1 rounded text-center transition-all duration-300">DarkMagenta</div>
<div :class="$clicks > 5 ? 'opacity-100' : 'opacity-10'" class="bg-yellow-700 text-white p-1 rounded text-center transition-all duration-300">DarkYellow</div>

<div :class="$clicks > 4 ? 'opacity-100' : 'opacity-10'" class="bg-gray-500 text-white p-1 rounded text-center transition-all duration-300">Gray</div>

<div :class="$clicks > 5 ? 'opacity-100' : 'opacity-10'" class="bg-gray-700 text-white p-1 rounded text-center transition-all duration-300">DarkGray</div>
<div :class="$clicks > 5 ? 'opacity-100' : 'opacity-10'" class="bg-blue-500 text-white p-1 rounded text-center transition-all duration-300">Blue</div>

<div :class="$clicks > 1 ? 'opacity-100' : 'opacity-10'" class="bg-green-500 text-white p-1 rounded text-center transition-all duration-300">Green</div>

<div :class="$clicks > 5 ? 'opacity-100' : 'opacity-10'" class="bg-cyan-500 text-black p-1 rounded text-center transition-all duration-300">Cyan</div>

<div :class="$clicks > 3 ? 'opacity-100' : 'opacity-10'" class="bg-red-500 text-white p-1 rounded text-center transition-all duration-300">Red</div>

<div :class="$clicks > 5 ? 'opacity-100' : 'opacity-10'" class="bg-purple-500 text-white p-1 rounded text-center transition-all duration-300">Magenta</div>
<div :class="$clicks > 5 ? 'opacity-100' : 'opacity-10'" class="bg-yellow-400 text-black p-1 rounded text-center transition-all duration-300">Yellow</div>

<div :class="$clicks > 4 ? 'opacity-100' : 'opacity-10'" class="bg-white text-black p-1 rounded text-center transition-all duration-300">White</div>
</div>

</div>

---

# Code répétitif...

Pour afficher du texte coloré, on répète toujours le même pattern :

```csharp {1|1-2|1-3|1-4|1-6|1-7|1-8|1-10|1-11|1-12|1-13|all}
// Afficher "Succès!" en vert
Console.ForegroundColor = ConsoleColor.Green;
Console.WriteLine("Succès!");
Console.ResetColor();

// Afficher "Erreur!" en rouge
Console.ForegroundColor = ConsoleColor.Red;
Console.WriteLine("Erreur!");
Console.ResetColor();

// Afficher "Attention!" en jaune
Console.ForegroundColor = ConsoleColor.Yellow;
Console.WriteLine("Attention!");
Console.ResetColor();
```

<v-click>

<div class="mt-4 p-4 bg-orange-100 rounded text-orange-900 text-center text-xl">

3 lignes pour chaque message coloré... Et les couleurs sont "en dur" partout !

</div>

</v-click>

---

# Étape 1 : Créer des fonctions

Regroupons ce code dans des **fonctions** :

```csharp {0|1|1-6|1-6,8-11|all}
void WriteLineColor(string text, ConsoleColor color)
{
    Console.ForegroundColor = color;
    Console.WriteLine(text);
    Console.ResetColor();
}

void WriteSuccess(string text)
{
    WriteLineColor(text, ConsoleColor.Green);
}

void WriteError(string text)
{
    WriteLineColor(text, ConsoleColor.Red);
}
```

---

# Utilisation des fonctions

Le code devient plus lisible :

```csharp {0|1|2|3|all}
WriteSuccess("Fichier sauvegardé !");
WriteError("Connexion impossible !");
WriteLineColor("Information", ConsoleColor.Cyan);
```

<v-click>

<div class="grid grid-cols-2 gap-8 mt-8">

<div class="bg-red-100 text-red-900 p-4 rounded">

### Avant
```csharp
Console.ForegroundColor = ConsoleColor.Green;
Console.WriteLine("Succès!");
Console.ResetColor();
```

</div>

<div class="bg-green-100 text-green-900 p-4 rounded">

### Après
```csharp
WriteSuccess("Succès!");
```

</div>

</div>

</v-click>

---

# Étape 2 : Préfixer les fonctions

Pour indiquer que ces fonctions "étendent" Console, ajoutons un **préfixe** :

```csharp {0|1|1-6|8-11|13-16|18-21|all}
void SuperConsole_WriteLineColor(string text, ConsoleColor color)
{
    Console.ForegroundColor = color;
    Console.WriteLine(text);
    Console.ResetColor();
}

void SuperConsole_WriteSuccess(string text)
{
    SuperConsole_WriteLineColor(text, ConsoleColor.Green);
}

void SuperConsole_WriteError(string text)
{
    SuperConsole_WriteLineColor(text, ConsoleColor.Red);
}

void SuperConsole_WriteWarning(string text)
{
    SuperConsole_WriteLineColor(text, ConsoleColor.Yellow);
}
```

---

# Observation clé

Le préfixe `SuperConsole_` indique un **groupe logique** :

```csharp {0|1|2|3|4|5|6-7|all}
// Toutes ces fonctions forment une "famille"
SuperConsole_WriteLineColor(...)
SuperConsole_WriteSuccess(...)
SuperConsole_WriteError(...)
SuperConsole_WriteWarning(...)
// Et les variables liées aussi !
ConsoleColor successColor = ConsoleColor.Green;
```

<div :class="$clicks >= 8 ? 'opacity-100' : 'opacity-0'" class="mt-8 p-4 bg-blue-900 rounded text-blue-100 text-center text-xl transition-all duration-300">

Le préfixe `SuperConsole_` → va devenir le nom de la **classe** !

Fonctions **ET** variables → regroupées ensemble.

</div>

---
layout: section
---

# Partie 5
## Notre Classe SuperConsole

---

# Transformation en classe statique

```csharp {0|1-2,30|3-6|8-14|16-19|21-24|25-29|all}
static class SuperConsole
{
    // Variables (champs) → stockées dans la classe
    static ConsoleColor successColor = ConsoleColor.Green;
    static ConsoleColor errorColor = ConsoleColor.Red;
    static ConsoleColor warningColor = ConsoleColor.Yellow;

    public static void WriteLineColor(string text, ConsoleColor color)
    {
        Console.ForegroundColor = color;
        Console.WriteLine(text);
        Console.ResetColor();
    }

    public static void WriteSuccess(string text)
    {
        WriteLineColor(text, successColor);
    }

    public static void WriteError(string text)
    {
        WriteLineColor(text, errorColor);
    }

    public static void WriteWarning(string text)
    {
        WriteLineColor(text, warningColor);
    }
}
```

---

# Ce qui a changé

<div class="grid grid-cols-[1fr_1px_1fr] gap-0 text-sm">
<div class="font-bold border-b-2 p-2">Avant (fonction)</div>
<div class="bg-gray-400"></div>
<div class="font-bold border-b-2 p-2">Après (méthode)</div>

<div v-click="1" class="p-2 bg-purple-100 border-b"><code class="text-purple-700 bg-purple-50 px-1 rounded font-normal">void SuperConsole_WriteSuccess(...)</code></div>
<div v-click="1" class="bg-gray-300"></div>
<div v-click="1" class="p-2 bg-purple-100 border-b"><code class="text-purple-700 bg-purple-50 px-1 rounded font-normal">public static void WriteSuccess(...)</code></div>

<div v-click="2" class="p-2 bg-green-100 text-green-800 border-b">Variables globales</div>
<div v-click="2" class="bg-gray-300"></div>
<div v-click="2" class="p-2 bg-green-100 text-green-800 border-b">Champs <code class="text-green-700 bg-green-50 px-1 rounded font-normal">static</code> de la classe</div>

<div v-click="3" class="p-2 bg-orange-100 text-orange-800">Appel : <code class="text-orange-700 bg-orange-50 px-1 rounded font-normal">SuperConsole_WriteSuccess("OK")</code></div>
<div v-click="3" class="bg-gray-300"></div>
<div v-click="3" class="p-2 bg-orange-100 text-orange-800">Appel : <code class="text-orange-700 bg-orange-50 px-1 rounded font-normal">SuperConsole.WriteSuccess("OK")</code></div>
</div>

<div class="grid grid-cols-3 gap-4 mt-8 text-center">

<div v-click="1" class="bg-purple-500 text-white p-3 rounded">
<strong>static class</strong><br>
Pas d'instanciation
</div>

<div v-click="2" class="bg-green-500 text-white p-3 rounded">
<strong>Variables → Champs</strong><br>
Données dans la classe
</div>

<div v-click="3" class="bg-orange-500 text-white p-3 rounded">
<strong>public static</strong><br>
Accessible de l'extérieur
</div>

</div>

---

# Utilisation de SuperConsole

Notre classe s'utilise comme `Console` :

```csharp {0|1-3|5-6|7|8|9|all}
// Classe .NET standard
Console.WriteLine("Texte normal");
Console.Clear();

// Notre classe personnalisée
SuperConsole.WriteSuccess("Opération réussie !");
SuperConsole.WriteError("Fichier non trouvé !");
SuperConsole.WriteWarning("Attention aux données !");
SuperConsole.WriteLineColor("Info", ConsoleColor.Cyan);
```

<div :class="$clicks >= 6 ? 'opacity-100' : 'opacity-0'" class="mt-4 p-4 bg-green-100 rounded text-green-900 text-center transition-all duration-300">

On a désormais accès à une forme "d'extension" de la Console !

</div>

---

# Ajoutons plus de méthodes

```csharp {0|1-2,24|4-9|10-17|18-23|all}
static class SuperConsole
{
    // ... méthodes précédentes ...

    public static void WriteAt(int x, int y, string text)
    {
        Console.SetCursorPosition(x, y);
        Console.Write(text);
    }

    public static void WriteAtColor(int x, int y, string text, ConsoleColor color)
    {
        Console.SetCursorPosition(x, y);
        Console.ForegroundColor = color;
        Console.Write(text);
        Console.ResetColor();
    }

    public static void ClearAt(int x, int y, int length)
    {
        Console.SetCursorPosition(x, y);
        Console.Write(new string(' ', length));
    }
}
```

---

# Programme complet

```csharp {0|1|3-4|6-8|10-11|13-14|16-17|19|all}
using System;

// Notre classe dans le même fichier (pour l'instant)
static class SuperConsole { /* ... */ }

// Programme principal
Console.Clear();
Console.CursorVisible = false;

SuperConsole.WriteSuccess("=== Bienvenue dans le jeu ===");
SuperConsole.WriteLineColor("", ConsoleColor.White);

SuperConsole.WriteAtColor(10, 5, "Joueur 1", ConsoleColor.Cyan);
SuperConsole.WriteAtColor(10, 7, "Joueur 2", ConsoleColor.Magenta);

SuperConsole.WriteWarning("\nAppuyez sur une touche...");
Console.ReadKey(true);

SuperConsole.WriteSuccess("\nPartie terminée !");
```

---

# Avec un namespace

Version finale organisée :

```csharp {0|1|1-2|1-3|1-6,8|all}
// Fichier Program.cs
using System;
using MyGame.Display;  // Importer notre namespace

public static void Main(string[] args)
{
    SuperConsole.WriteSuccess("Ça marche !");
}
```

```csharp {0|1|1-3,13|1-13}
// Fichier SuperConsole.cs
namespace MyGame.Display
{
    static class SuperConsole
    {
        public static void WriteSuccess(string text) { /* ... */ }
        public static void WriteError(string text) { /* ... */ }
        public static void WriteWarning(string text) { /* ... */ }
        public static void WriteLineColor(string text, ConsoleColor c) { /* ... */ }
        public static void WriteAt(int x, int y, string text) { /* ... */ }
        // ...
    }
}
```

---

# Récapitulatif de la progression
<v-clicks>

| Étape           | Fonctions                             | Variables                        |
| --------------- | ------------------------------------- | -------------------------------- |
| 1. Code en vrac | `Console.ForegroundColor = ...`       | variables globales               |
| 2. Fonction     | `void WriteSuccess(...)`              | variables globales               |
| 3. Préfixe      | `void SuperConsole_WriteSuccess(...)` | variables globales               |
| 4. Classe       | `static class SuperConsole`           | champs `static` dans la classe   |
| 5. Namespace    | `namespace MyGame.Display`            | + `using MyGame.Display;`        |
</v-clicks>

<v-click>

<div class="mt-4 p-4 bg-blue-900 rounded text-blue-100 text-center">

Ça ressemble beaucoup à ce qui a été vu inittialement avec `Console` dans `System` !

</div>

</v-click>

---

# Points clés



<div class="grid grid-cols-2 gap-8">

<div>

### Structure

<v-clicks every=1>

- **namespace** = organise les classes
- **class** = conteneur de méthodes ET de variables
- **static** = pas d'instanciation
- **public** = visible de l'extérieur

</v-clicks>

</div>

<div>


<h3 v-click>using</h3>


<v-clicks every=1>

- Importe un namespace
- Permet les noms courts
- N'importe pas les sous-namespaces
- Ne peut pas importer une classe

</v-clicks>

</div>

</div>



<v-click>

<div class="mt-8 p-4 bg-yellow-900 rounded text-yellow-100">

### Correspondances
- `System.Console` → `MyGame.Display.SuperConsole`
- `using System;` → `using MyGame.Display;`
- `Console.WriteLine()` → `SuperConsole.WriteSuccess()`

</div>

</v-click>

---
layout: center
class: text-center
---

<v-click every=1>
`Console` était une classe statique depuis le début...


<div class="pt-12 mb-4">
  <span class="px-4 py-2 rounded bg-green-500 text-white text-xl">
    Prêts à créer vos propres classes !
  </span>
</div>


# Questions ?

<div class="mt-8 text-gray-500">

À vous de jouer !

</div>
</v-click>
