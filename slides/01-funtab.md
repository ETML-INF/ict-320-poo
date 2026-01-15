---
theme: default
title: Tableaux et Fonctions en C#
info: Synthèse pré-orientée objet
author: ETML
transition: slide-left
mdc: true
---

# Tableaux et Fonctions en C#

## Synthèse pré-orientée objet

<div class="pt-12">
  <span class="px-2 py-1 rounded bg-blue-500 text-white">
    Préparation à la POO
  </span>
</div>

---

# Plan

1. **Tableaux** - Stocker plusieurs valeurs
2. **Fonctions** - Organiser le code
3. **Combinaison** - Tableaux + Fonctions
4. **Vers la POO** - Prochaines étapes

---
layout: section
---

# Partie 1
## Les Tableaux

---

# Tableau : Définition

Un **tableau** stocke plusieurs valeurs du **même type** dans une variable.

```csharp
// Sans tableau : 5 variables
int score1 = 100;
int score2 = 85;
int score3 = 92;
int score4 = 78;
int score5 = 95;

// Avec tableau : 1 variable
int[] scores = { 100, 85, 92, 78, 95 };
```

<v-click>

**Avantages :**
- Code plus compact
- Parcours avec boucles
- Taille dynamique

</v-click>

---

# Déclaration : 3 méthodes

<div class="grid grid-cols-2 gap-4">

<div>

### Méthode 1 : Valeurs directes
```csharp
int[] scores = { 100, 85, 92 };
string[] names = { "Alice", "Bob" };
```

### Méthode 2 : Taille fixe
```csharp
int[] numbers = new int[5];
// → { 0, 0, 0, 0, 0 }

string[] words = new string[3];
// → { null, null, null }
```

</div>

<div>

### Méthode 3 : Élément par élément
```csharp
int[] data = new int[3];
data[0] = 10;
data[1] = 20;
data[2] = 30;
// → { 10, 20, 30 }
```

</div>

</div>

---

# Accès aux éléments

Les indices commencent à **0** !

```csharp
string[] menu = { "Play", "Options", "Quit" };
//                  [0]      [1]       [2]
```

<div class="grid grid-cols-2 gap-4 mt-4">

<div>

### Lecture
```csharp
string first = menu[0];  // "Play"
string last = menu[2];   // "Quit"
```

</div>

<div>

### Écriture
```csharp
menu[1] = "Settings";
// → { "Play", "Settings", "Quit" }
```

</div>

</div>

<v-click>

### Propriété Length
```csharp
int size = menu.Length;              // 3
string last = menu[menu.Length - 1]; // "Quit"
```

</v-click>

---

# Parcours d'un tableau

<div class="grid grid-cols-2 gap-4">

<div>

### Boucle for
```csharp
string[] menu = { "Play", "Options", "Quit" };

for (int i = 0; i < menu.Length; i++)
{
    Console.WriteLine($"{i+1}. {menu[i]}");
}
```

**Résultat :**
```
1. Play
2. Options
3. Quit
```

</div>

<div>

### Boucle foreach
```csharp
int[] scores = { 100, 85, 92 };
int total = 0;

foreach (int score in scores)
{
    total += score;
}
// total = 277
```

<v-click>

⚠️ `foreach` = lecture seule

</v-click>

</div>

</div>

---

# Modifier la taille

Les tableaux ont une **taille fixe**. Solutions :

<div class="grid grid-cols-2 gap-4">

<div>

### Array.Resize
```csharp
string[] names = { "Alice", "Bob" };

Array.Resize(ref names, 4);
// → { "Alice", "Bob", null, null }

names[2] = "Charlie";
names[3] = "Diana";
```

</div>

<div>

### Array.Copy
```csharp
int[] old = { 1, 2, 3 };
int[] bigger = new int[5];

Array.Copy(old, bigger, old.Length);
// bigger → { 1, 2, 3, 0, 0 }
```

</div>

</div>

<v-click>

### ⚠️ Attention
- `Resize` nécessite le mot-clé `ref`
- Ces opérations créent de **nouveaux tableaux** en mémoire

</v-click>

---
layout: section
---

# Partie 2
## Les Fonctions

---

# Fonction : Définition

Un **bloc de code réutilisable** qui effectue une tâche spécifique.

```csharp
// Sans fonction : code dupliqué
Console.WriteLine("════════════════");
Console.WriteLine("  MENU PRINCIPAL");
Console.WriteLine("════════════════");
// ... plus tard ...
Console.WriteLine("════════════════");
Console.WriteLine("  MENU PRINCIPAL");
Console.WriteLine("════════════════");

// Avec fonction : code réutilisable
ShowTitle();
// ... plus tard ...
ShowTitle();
```

---

# Anatomie d'une fonction

```csharp
int Add(int a, int b)
{
    return a + b;
}
```

<div class="grid grid-cols-4 gap-2 mt-8 text-center">

<div class="bg-blue-500 text-white p-2 rounded">
<strong>int</strong><br>
Type de retour
</div>

<div class="bg-green-500 text-white p-2 rounded">
<strong>Add</strong><br>
Nom
</div>

<div class="bg-orange-500 text-white p-2 rounded">
<strong>(int a, int b)</strong><br>
Paramètres
</div>

<div class="bg-purple-500 text-white p-2 rounded">
<strong>return</strong><br>
Valeur retournée
</div>

</div>

---

# Niveau 1 : void, sans paramètre

La forme la plus simple.

```csharp
void ShowMenu()
{
    Console.WriteLine("1. Play");
    Console.WriteLine("2. Options");
    Console.WriteLine("3. Quit");
}

// Appel
ShowMenu();
```

<v-click>

**`void`** = la fonction ne retourne rien

</v-click>

---

# Niveau 2 : Avec retour

La fonction calcule et **renvoie** une valeur.

```csharp
int GetMagicNumber()
{
    return 42;
}

string GetTitle()
{
    return "Super Game";
}

// Utilisation
int num = GetMagicNumber();      // 42
Console.WriteLine(GetTitle());   // Super Game
```

---

# Niveau 3 : Avec paramètres

La fonction reçoit des **données en entrée**.

```csharp
void SayHello(string name)
{
    Console.WriteLine($"Hello, {name}!");
}

void ShowScore(string player, int score)
{
    Console.WriteLine($"{player}: {score} pts");
}

// Appels
SayHello("Alice");           // Hello, Alice!
ShowScore("Bob", 1500);      // Bob: 1500 pts
```

---

# Niveau 4 : Paramètres + Retour

La forme complète : entrée → traitement → sortie.

```csharp
int Add(int a, int b)
{
    return a + b;
}

bool IsEven(int number)
{
    return number % 2 == 0;
}

// Utilisation
int sum = Add(10, 5);        // 15
bool even = IsEven(42);      // true
```

---

# Niveau 5 : Retours multiples

Utiliser un **tableau** pour retourner plusieurs valeurs.

```csharp
int[] GetMinMax(int[] values)
{
    int min = values[0];
    int max = values[0];

    foreach (int v in values)
    {
        if (v < min) min = v;
        if (v > max) max = v;
    }

    return new int[] { min, max };
}

// Utilisation
int[] data = { 5, 2, 8, 1, 9 };
int[] result = GetMinMax(data);
// result[0] = 1 (min)
// result[1] = 9 (max)
```

---

# Modificateurs : ref, out, in

<div class="grid grid-cols-3 gap-4 text-sm">

<div>

### ref
Modifier l'original
```csharp
void Double(ref int x)
{
    x = x * 2;
}

int n = 5;
Double(ref n);
// n = 10
```

</div>

<div>

### out
Retour obligatoire
```csharp
void Split(int n,
           out int tens,
           out int units)
{
    tens = n / 10;
    units = n % 10;
}

Split(42, out int t, out int u);
// t=4, u=2
```

</div>

<div>

### in
Lecture seule
```csharp
int Calc(in int x)
{
    // x = 10; ❌ Interdit
    return x * 2;
}
```

</div>

</div>

---
layout: section
---

# Partie 3
## Combinaison

---

# Tableaux + Fonctions

Exemple concret : **Menu de jeu**

```csharp
string[] options = { "Play", "Options", "Highscores", "Quit" };

Menu_Show(options);
int choice = Menu_GetChoice(options.Length);
Menu_Handle(options, choice);
```

<v-click>

### Séparation des responsabilités

| Fonction | Rôle |
|----------|------|
| `Menu_Show` | Afficher |
| `Menu_GetChoice` | Lire l'entrée |
| `Menu_Handle` | Exécuter l'action |

</v-click>

---

# Exemple complet

```csharp
string[] options = { "Play", "Options", "Quit" };

void Menu_Show(string[] items)
{
    for (int i = 0; i < items.Length; i++)
    {
        Console.WriteLine($"{i + 1}. {items[i]}");
    }
}

int Menu_GetChoice(int max)
{
    Console.Write($"Choix (1-{max}): ");
    string? input = Console.ReadLine();

    if (int.TryParse(input, out int choice))
    {
        if (choice >= 1 && choice <= max)
            return choice;
    }
    return -1;
}
```

---

# Ajouter une option dynamiquement

```csharp
string[] options = { "Play", "Quit" };

options = Menu_AddOption(options, "Options");
options = Menu_AddOption(options, "Credits");
// → { "Play", "Quit", "Options", "Credits" }

string[] Menu_AddOption(string[] menu, string newOption)
{
    string[] result = new string[menu.Length + 1];
    Array.Copy(menu, result, menu.Length);
    result[menu.Length] = newOption;
    return result;
}
```

---
layout: section
---

# Partie 4
## Vers la POO

---

# Du procédural à l'objet

<div class="grid grid-cols-2 gap-8">

<div>

### Maintenant (Procédural)
```csharp
// Variables globales
string[] options;
int selectedIndex;

// Fonctions préfixées
void Menu_Init() { }
void Menu_Show() { }
int Menu_GetChoice() { }
```

</div>

<div>

### Bientôt (POO)
```csharp
// Classe
class Menu
{
    // Attributs
    string[] options;
    int selectedIndex;

    // Méthodes
    void Init() { }
    void Show() { }
    int GetChoice() { }
}
```

</div>

</div>

---

# Ce qui change avec la POO

| Concept | Procédural | POO |
|---------|-----------|-----|
| Données | Variables globales | Attributs |
| Code | Fonctions | Méthodes |
| Organisation | Préfixes (Menu_) | Classes |
| Réutilisation | Copier/coller | Héritage |
| Protection | Aucune | public/private |

---

# Récapitulatif

<div class="grid grid-cols-2 gap-8">

<div>

### Tableaux
- Stocker plusieurs valeurs
- Indices commencent à 0
- `Length` pour la taille
- `Array.Resize` / `Array.Copy`

</div>

<div>

### Fonctions
- `void` = pas de retour
- `return` = renvoyer valeur
- Paramètres = données en entrée
- `ref`/`out`/`in` = modificateurs

</div>

</div>

<div class="mt-8 text-center">

### Combinés = Base de la POO 🎯

Les **tableaux** deviennent des **attributs**

Les **fonctions** deviennent des **méthodes**

</div>

---
layout: center
class: text-center
---

# Questions ?

<div class="pt-12">
  <span class="px-4 py-2 rounded bg-green-500 text-white text-xl">
    Prêts pour la POO !
  </span>
</div>
