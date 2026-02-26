---
theme: default
title: Des Classes Statiques aux Instances
info: Introduction aux instances et à la POO en C#
author: ETML
transition: slide-left
mdc: true
---

# Des Classes Statiques aux Instances

## Créer plusieurs objets à partir d'une classe

<div class="pt-12">
  <span class="px-2 py-1 rounded bg-green-500 text-white">
    POO : les instances
  </span>
</div>

---

# Plan de la présentation

1. **Rappel** - Classes statiques
2. **Le problème** - Plusieurs escargots ?
3. **`new`** - Créer des instances
4. **En mémoire** - Visualiser les instances
5. **Constructeur** - Initialiser proprement
6. **Méthodes d'instance** - Comportement par objet
7. **Tableau d'objets** - Collections d'instances
8. **Deux classes** - Association, composition, injection
9. **`null` et références** - Pièges courants
10. **Valeur vs référence** - Deux familles de types

---
layout: section
---

# Partie 1
## Rappel : classes statiques

---

# Ce qu'on sait déjà

<v-clicks>

- Une **classe statique** regroupe des **champs** et des **méthodes**
- Les champs `static` appartiennent à la classe (pas à un objet)
- On appelle les méthodes sur la classe : `Snail.Move()`

</v-clicks>

<v-click>

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
}
```

</v-click>

<v-click>

<div class="mt-4 p-4 bg-blue-100 rounded text-blue-900">

Pour **un** escargot, ça fonctionne. Mais si on en veut **trois** ?

</div>

</v-click>

---

# Le problème : plusieurs escargots ?

Première idée : des **tableaux parallèles**

```csharp {0|1-3|5-6|8-9|all}
int[] snailX = { 0, 0, 0 };
int[] snailY = { 5, 7, 9 };
string[] snailNames = { "Turbo", "Speedy", "Flash" };

// Faire avancer l'escargot 0
snailX[0] = snailX[0] + 1;

// Afficher l'escargot 1
Console.SetCursorPosition(snailX[1], snailY[1]);
```

<v-click>

<div class="mt-4 p-4 bg-red-700 rounded text-red-100">

**Problèmes** : données liées mais séparées, indices fragiles, pas extensible

</div>

</v-click>

---

# `static` = une seule copie

`Snail.x` est **unique** : impossible d'avoir 3 valeurs différentes

<div class="grid grid-cols-2 gap-8 mt-4">

<div class="bg-red-100 text-red-900 p-4 rounded">

### Ce qu'on voudrait
```
Turbo.x  = 0
Speedy.x = 5
Flash.x  = 3
```
3 valeurs indépendantes

</div>

<v-click>
<div class="bg-orange-100 text-orange-900 p-4 rounded">

### Ce qu'on a avec `static`
```
Snail.x = ???
```
Une seule valeur partagée !

</div>
</v-click>

</div>

<v-click>

<div class="mt-8 p-4 bg-blue-900 rounded text-blue-100 text-center text-xl">

Il faut un mécanisme pour créer **plusieurs copies** des données

</div>

</v-click>

---
layout: section
---

# Partie 2
## Retirer `static` → créer des instances

---

# Retirer `static` de la classe

<div class="grid grid-cols-2 gap-8">

<div>

### Avant : statique

```csharp
static class Snail
{
    static int x;
    static int y;
    static string name;
}
```

<v-click>
Une seule copie de `x`, `y`, `name`
</v-click>

</div>

<v-click>
<div>

### Après : instanciable

```csharp
class Snail
{
    int x;
    int y;
    string name;
}
```

Chaque instance aura ses propres `x`, `y`, `name`

</div>
</v-click>

</div>

<v-click>

<div class="mt-8 p-4 bg-green-700 rounded text-green-200 text-center">

Le mot-clé **`new`** crée une **instance** (un objet) de la classe

</div>

</v-click>

---

# Créer des instances avec `new`

```csharp {0|1-3|5-7|9-11|all}
Snail s1 = new Snail();
s1.x = 0;
s1.y = 5;

Snail s2 = new Snail();
s2.x = 0;
s2.y = 7;

Snail s3 = new Snail();
s3.x = 0;
s3.y = 9;
```

<v-click>

<div class="grid grid-cols-3 gap-4 mt-8 text-center">

<div class="bg-green-500 text-white p-3 rounded">
<strong>s1</strong><br>
x=0, y=5
</div>

<div class="bg-blue-500 text-white p-3 rounded">
<strong>s2</strong><br>
x=0, y=7
</div>

<div class="bg-purple-500 text-white p-3 rounded">
<strong>s3</strong><br>
x=0, y=9
</div>

</div>

</v-click>

<v-click>

<div class="mt-4 text-center text-lg">

Chaque instance est **indépendante** : modifier `s1.x` ne change pas `s2.x`

</div>

</v-click>

---

# En mémoire : `static` vs instances

<div class="grid grid-cols-2 gap-6">

<div>

### `static class` — UN seul bloc

<div :class="$clicks >= 1 ? 'opacity-100' : 'opacity-0'" class="transition-all duration-500">
<div class="mt-2 border-2 border-red-400 rounded p-3 bg-red-50 text-red-900 text-sm font-mono">
<div class="text-center font-bold mb-2 text-red-600">RAM</div>
<div class="border border-red-300 rounded p-2 bg-white">
<div class="text-center text-xs text-red-400 mb-1">static class Snail</div>
<div>x &nbsp;&nbsp;&nbsp;= <span class="text-red-600 font-bold">???</span></div>
<div>y &nbsp;&nbsp;&nbsp;= <span class="text-red-600 font-bold">???</span></div>
<div>name = <span class="text-red-600 font-bold">???</span></div>
</div>
<div class="text-center text-xs mt-2 text-red-500">1 seul bloc, partagé par tout le programme</div>
</div>
</div>

</div>

<div>

<v-click at=2>

### `class` + `new` — UN bloc par instance

</v-click>

<div :class="$clicks >= 2 ? 'opacity-100' : 'opacity-0'" class="transition-all duration-500">
<div class="mt-2 border-2 border-green-400 rounded p-3 bg-green-50 text-green-900 text-sm font-mono">
<div class="text-center font-bold mb-2 text-green-600">RAM</div>

<div :class="$clicks >= 3 ? 'opacity-100' : 'opacity-0'" class="border border-yellow-400 rounded p-2 bg-yellow-50 mb-2 transition-all duration-300">
<div class="text-xs text-yellow-600">s1 →</div>
<div>x=<span class="font-bold">0</span>, y=<span class="font-bold">5</span>, name=<span class="font-bold">"Turbo"</span></div>
</div>

<div :class="$clicks >= 4 ? 'opacity-100' : 'opacity-0'" class="border border-cyan-400 rounded p-2 bg-cyan-50 mb-2 transition-all duration-300">
<div class="text-xs text-cyan-600">s2 →</div>
<div>x=<span class="font-bold">0</span>, y=<span class="font-bold">7</span>, name=<span class="font-bold">"Speedy"</span></div>
</div>

<div :class="$clicks >= 5 ? 'opacity-100' : 'opacity-0'" class="border border-purple-400 rounded p-2 bg-purple-50 transition-all duration-300">
<div class="text-xs text-purple-600">s3 →</div>
<div>x=<span class="font-bold">0</span>, y=<span class="font-bold">9</span>, name=<span class="font-bold">"Flash"</span></div>
</div>

</div>
</div>

</div>

</div>

<v-click at=1>
<span></span>
</v-click>
<v-click at=3>
<span></span>
</v-click>
<v-click at=4>
<span></span>
</v-click>
<v-click at=5>
<span></span>
</v-click>

<div :class="$clicks >= 5 ? 'opacity-100' : 'opacity-0'" class="mt-4 p-3 bg-green-700 rounded text-green-100 text-center transition-all duration-500">

Chaque `new` alloue un **nouveau bloc** en mémoire, indépendant des autres

</div>

---

# Que se passe-t-il avec `new` ?

```csharp
Snail s1 = new Snail(0, 5, "Turbo");
```

<div class="grid grid-cols-[1fr_40px_1fr] gap-0 mt-6 items-start">

<div>

### Variables (pile)

<div class="mt-4 font-mono text-sm border-2 border-gray-400 rounded p-3 bg-gray-50">

<div :class="$clicks >= 1 ? 'opacity-100' : 'opacity-0'" class="border border-yellow-400 rounded p-2 bg-yellow-50 mb-2 transition-all duration-300">
<span class="text-yellow-700">s1</span> = <span :class="$clicks >= 3 ? 'text-yellow-700 font-bold' : 'text-gray-400'" class="transition-all duration-300">{{ $clicks >= 3 ? '→ adresse 0xA3' : '???' }}</span>
</div>

<div :class="$clicks >= 5 ? 'opacity-100' : 'opacity-0'" class="border border-cyan-400 rounded p-2 bg-cyan-50 mb-2 transition-all duration-300">
<span class="text-cyan-700">s2</span> = <span class="text-cyan-700 font-bold">→ adresse 0xB7</span>
</div>

</div>

</div>

<div class="flex items-center justify-center h-full pt-16">
<div :class="$clicks >= 3 ? 'opacity-100' : 'opacity-0'" class="text-2xl transition-all duration-300">→</div>
</div>

<div>

### Objets (tas)

<div class="mt-4 font-mono text-sm border-2 border-green-400 rounded p-3 bg-green-50">

<div :class="$clicks >= 2 ? 'opacity-100' : 'opacity-0'" class="border border-yellow-400 rounded p-2 bg-yellow-50 mb-2 transition-all duration-500">
<div class="text-xs text-yellow-600">0xA3 — Snail</div>
<div :class="$clicks >= 3 ? '' : 'text-gray-400'">x = <span class="font-bold">0</span></div>
<div :class="$clicks >= 3 ? '' : 'text-gray-400'">y = <span class="font-bold">5</span></div>
<div :class="$clicks >= 3 ? '' : 'text-gray-400'">name = <span class="font-bold">"Turbo"</span></div>
</div>

<div :class="$clicks >= 5 ? 'opacity-100' : 'opacity-0'" class="border border-cyan-400 rounded p-2 bg-cyan-50 transition-all duration-500">
<div class="text-xs text-cyan-600">0xB7 — Snail</div>
<div>x = <span class="font-bold">0</span></div>
<div>y = <span class="font-bold">7</span></div>
<div>name = <span class="font-bold">"Speedy"</span></div>
</div>

</div>

</div>

</div>

<v-click at=1>
<span></span>
</v-click>
<v-click at=2>
<span></span>
</v-click>
<v-click at=3>
<span></span>
</v-click>
<v-click at=4>
<span></span>
</v-click>
<v-click at=5>
<span></span>
</v-click>

<div :class="$clicks >= 4 ? 'opacity-100' : 'opacity-0'" class="mt-3 text-center text-sm transition-all duration-300">

`s1` ne contient pas l'objet — il contient une **référence** (adresse) vers l'objet

</div>

---

# Modifier une instance en mémoire

```csharp
s1.x = 10;   // Modifie UNIQUEMENT le bloc de s1
```

<div class="grid grid-cols-3 gap-4 mt-6">

<div :class="$clicks >= 1 ? 'border-red-400 bg-red-50' : 'border-yellow-400 bg-yellow-50'" class="border-2 rounded p-4 font-mono text-sm transition-all duration-500">
<div class="text-center font-bold mb-2">s1 — Turbo</div>
<div>x = <span :class="$clicks >= 1 ? 'text-red-600 font-bold text-lg' : ''" class="transition-all duration-300">{{ $clicks >= 1 ? '10' : '0' }}</span> <span :class="$clicks >= 1 ? 'opacity-100' : 'opacity-0'" class="text-red-500 text-xs transition-all duration-300">← modifié !</span></div>
<div>y = 5</div>
<div>name = "Turbo"</div>
</div>

<div class="border-2 border-cyan-400 bg-cyan-50 rounded p-4 font-mono text-sm">
<div class="text-center font-bold mb-2">s2 — Speedy</div>
<div>x = <span :class="$clicks >= 1 ? 'text-green-600 font-bold' : ''" class="transition-all duration-300">0</span> <span :class="$clicks >= 1 ? 'opacity-100' : 'opacity-0'" class="text-green-500 text-xs transition-all duration-300">← intact</span></div>
<div>y = 7</div>
<div>name = "Speedy"</div>
</div>

<div class="border-2 border-purple-400 bg-purple-50 rounded p-4 font-mono text-sm">
<div class="text-center font-bold mb-2">s3 — Flash</div>
<div>x = <span :class="$clicks >= 1 ? 'text-green-600 font-bold' : ''" class="transition-all duration-300">0</span> <span :class="$clicks >= 1 ? 'opacity-100' : 'opacity-0'" class="text-green-500 text-xs transition-all duration-300">← intact</span></div>
<div>y = 9</div>
<div>name = "Flash"</div>
</div>

</div>

<v-click at=1>
<span></span>
</v-click>

<v-click>

<div class="mt-6 p-4 bg-blue-900 rounded text-blue-100 text-center">

Chaque instance a son **propre espace mémoire** → les modifications sont **isolées**

</div>

</v-click>

---

# Le moule et les gâteaux

<div class="grid grid-cols-2 gap-8 mt-4">

<div class="bg-yellow-100 text-yellow-900 p-6 rounded">

<div class="text-center">

### Classe = Moule

Définit la **forme** :
- quels champs ?
- quelles méthodes ?

</div>

```csharp
class Snail
{
    int x;
    int y;
    string name;
}
```

</div>

<v-click>
<div class="bg-green-100 text-green-900 p-6 rounded">

<div class="text-center">

### Instance = Gâteau

Chaque gâteau est **unique** :
- ses propres valeurs
- indépendant des autres

</div>

```csharp
Snail s1 = new Snail();
Snail s2 = new Snail();
Snail s3 = new Snail();
```

</div>
</v-click>

</div>

<v-click>

<div class="mt-6 p-4 bg-blue-900 rounded text-blue-100 text-center">

`new` = "utiliser le moule pour faire un nouveau gâteau"

</div>

</v-click>

---
layout: section
---

# Partie 3
## Le constructeur

---

# Le problème de l'initialisation

Créer un escargot = 4 lignes, et on peut oublier un champ :

```csharp {0|1-4|1-4,6|all}
Snail s1 = new Snail();
s1.x = 0;
s1.y = 5;
s1.name = "Turbo";

// Oups, on a oublié de mettre le nom de s2 !
Snail s2 = new Snail();
s2.x = 0;
s2.y = 7;
```

<v-click>

<div class="mt-4 p-4 bg-orange-100 rounded text-orange-900">

**Solution** : le **constructeur** — une méthode spéciale qui initialise l'objet à la création

</div>

</v-click>

---

# Le constructeur

```csharp {0|7-12|8|9-11|all}
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
}
```

<v-click>

### Le mot-clé `this`

- `this.x` = le **champ** de l'objet
- `x` = le **paramètre** du constructeur

</v-click>

<v-click>

```csharp
Snail s1 = new Snail(0, 5, "Turbo");   // 1 ligne, rien d'oublié !
Snail s2 = new Snail(0, 7, "Speedy");
Snail s3 = new Snail(0, 9, "Flash");
```

</v-click>

---

# Attention : le constructeur par défaut

<div class="grid grid-cols-2 gap-6">

<div>

### Sans constructeur écrit

```csharp
class Snail
{
    int x;
    int y;
    string name;
    // C# génère : public Snail() { }
}
```

<v-click>

```csharp
Snail s = new Snail();  // OK ✓
```

</v-click>

</div>

<v-click>
<div>

### Avec constructeur personnalisé

```csharp
class Snail
{
    int x; int y; string name;

    public Snail(int x, int y, string name)
    {
        this.x = x; this.y = y;
        this.name = name;
    }
}
```

</div>
</v-click>

</div>

<v-click>

<div class="grid grid-cols-2 gap-6 mt-2">

<div class="p-3 bg-green-700 rounded text-green-100 font-mono text-sm">
new Snail(0, 5, "Turbo"); <span class="text-green-300">// OK</span>
</div>

<div class="p-3 bg-red-700 rounded text-red-100 font-mono text-sm">
new Snail(); <span class="text-red-300">// ERREUR!</span>
</div>

</div>

</v-click>

<v-click>

<div class="mt-4 p-4 bg-orange-100 rounded text-orange-900">

**Règle** : dès qu'on écrit un constructeur, le constructeur par défaut (sans paramètres) **disparaît**. Pour le garder, il faut l'écrire explicitement.

</div>

</v-click>

---
layout: section
---

# Partie 4
## Méthodes d'instance

---

# Méthodes d'instance

Les méthodes perdent `static` → elles agissent sur **leur** objet :

<div class="grid grid-cols-2 gap-4">

<div>

### Avant (statique)

```csharp
static class Snail
{
    static int x;

    public static void Move(int dx)
    {
        x = x + dx;
    }
}

// Appel
Snail.Move(1);
```

</div>

<v-click>
<div>

### Après (instance)

```csharp
class Snail
{
    int x;

    public void Move(int dx)
    {
        this.x = this.x + dx;
    }
}

// Appel
s1.Move(1);
s2.Move(3);
```

</div>
</v-click>

</div>

<v-click>

<div class="mt-4 p-4 bg-green-700 rounded text-green-200 text-center">

Chaque escargot bouge **indépendamment** !

</div>

</v-click>

---

# Classe Snail complète

```csharp {0|1-5|7-12|14-18|20-24|26-30|all}
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

---
layout: section
---

# Partie 5
## Tableau d'objets

---

# Tableau d'objets

Au lieu de tableaux parallèles → un **tableau d'instances** :

```csharp {0|1-4|6-9|11-16|all}
Snail[] snails = new Snail[3];
snails[0] = new Snail(0, 5, "Turbo");
snails[1] = new Snail(0, 7, "Speedy");
snails[2] = new Snail(0, 9, "Flash");

// Dessiner tous les escargots
foreach (Snail snail in snails)
{
    snail.Draw();
}

// Faire avancer chaque escargot
Random rng = new Random();
foreach (Snail snail in snails)
{
    snail.Move(rng.Next(1, 4), 0);
}
```

---

# Avant / Après

<div class="grid grid-cols-2 gap-8">

<div class="bg-red-100 text-red-900 p-4 rounded">

### Tableaux parallèles

```csharp
int[] snailX = { 0, 0, 0 };
int[] snailY = { 5, 7, 9 };
string[] snailNames = { ... };

// Avancer l'escargot i
snailX[i] = snailX[i] + 1;

// 3 tableaux à synchroniser !
```

</div>

<v-click>
<div class="bg-green-100 text-green-900 p-4 rounded">

### Tableau d'objets

```csharp
Snail[] snails = new Snail[3];
snails[0] = new Snail(0, 5, "Turbo");
snails[1] = new Snail(0, 7, "Speedy");

// Avancer l'escargot i
snails[i].Move(1, 0);

// 1 seul tableau !
```

</div>
</v-click>

</div>

<v-click>

<div class="mt-4 p-4 bg-green-700 rounded text-green-200 text-center">

Chaque objet **transporte ses données avec lui**

</div>

</v-click>

---
layout: section
---

# Partie 6
## Deux classes qui collaborent

---

# Le piège : laisser une classe utilitaire statique

<div class="grid grid-cols-2 gap-4 text-sm">

<div>

### Deux classes statiques

```csharp
static class Renderer {
    public static void DrawAt(
            int x, int y, string text) {
        Console.SetCursorPosition(x, y);
        Console.Write(text);
    }
}

static class Snail {
    static int x = 0;
    public static void Draw() {
        Renderer.DrawAt(x, 0, "Turbo");
        // ↑ appel statique direct
    }
}
```

</div>

<v-click>
<div>

### On instancie Snail… mais pas Renderer

```csharp
class Snail {
    int x; string name;
    public void Draw() {
        Renderer.DrawAt(x, 0, name);
        // ↑ Renderer encore statique !
    }
}
```

<div class="mt-2 p-2 bg-red-700 rounded text-red-100">

Ça compile — mais `Renderer` ne pourra jamais être remplacé ou hérité !

</div>

</div>
</v-click>

</div>

<v-click>

<div class="mt-3 p-2 bg-blue-900 rounded text-blue-100 text-center">

Les classes **utilitaires** aussi doivent être instanciées pour garder les bénéfices OO

</div>

</v-click>

---

# Solution : injection par constructeur

```csharp {0|1-3|5-16|all}
class Renderer {
    public void DrawAt(int x, int y, string text)
        { Console.SetCursorPosition(x, y); Console.Write(text); }
}

class Snail {
    int x; string name;
    Renderer renderer;        // ← champ référence

    public Snail(int x, string name, Renderer renderer) {
        this.x        = x;
        this.name     = name;
        this.renderer = renderer;  // ← injection
    }

    public void Draw() { this.renderer.DrawAt(this.x, 0, this.name); }
}
```

---

# Utilisation — créer et partager le Renderer

```csharp
Renderer r = new Renderer();            // créer une fois
Snail s1 = new Snail(0, "Turbo", r);   // passer la référence
Snail s2 = new Snail(5, "Speedy", r);  // même r partagé

s1.Draw();
s2.Draw();
```

<v-click>

<div class="mt-6 p-3 bg-green-700 rounded text-green-200 text-center text-sm">

Avec l'héritage (chap. 06) : `new ColorRenderer(...)` en remplacement — **sans changer `Snail`**

</div>

</v-click>

---

# Association vs Composition

<div class="grid grid-cols-2 gap-4 mt-4 text-sm">

<div class="bg-blue-100 text-blue-900 rounded p-3">

### Association — A *utilise* B

B créé **à l'extérieur**, injecté dans A, cycle de vie indépendant

```csharp
Renderer r = new Renderer();
Snail s1 = new Snail(..., r);
Snail s2 = new Snail(..., r);
// s1 et s2 partagent r
```

</div>

<v-click>
<div class="bg-purple-100 text-purple-900 rounded p-3">

### Composition — A *possède* B

B créé **à l'intérieur** par A, cycle de vie lié

```csharp
class Snail {
    Renderer renderer;
    public Snail(...) {
        this.renderer = new Renderer();
    }
}
// chaque Snail a son propre Renderer
```

</div>
</v-click>

</div>

<v-click>

<div class="mt-3 p-3 bg-gray-100 text-gray-900 rounded text-sm">

| | Association | Composition |
|---|---|---|
| Qui crée B ? | L'extérieur | A lui-même |
| Partage ? | Oui | Non |
| UML | → | ◆→ |

</div>

</v-click>

---

# Dépendance cyclique : le setter

`Race` crée des `Snail[]` — `Snail` a besoin de `Race` — cercle vicieux !

<div class="grid grid-cols-2 gap-4 mt-4">

<div>

```csharp
class Race
{
    Snail[] snails;

    public Race()
    {
        snails = new Snail[2];
        snails[0] = new Snail(0, "Turbo");
        snails[1] = new Snail(5, "Speedy");

        // Fermer la boucle APRÈS
        foreach (Snail s in snails)
            s.Race = this; // ← propriété avec setter
    }
}
```

</div>

<v-click>
<div>

```csharp
class Snail
{
    // propriété nullable : pas encore assignée
    public Race? Race { get; set; }

    public Snail(int x, string name) { ... }

    public void Finish()
    {
        this.Race?.RegisterFinish();
    }
}
```

</div>
</v-click>

</div>

<v-click>

<div class="mt-2 p-3 bg-blue-900 rounded text-blue-100">

**Constructeur** pour dépendances normales — **Setter** pour dépendances **cycliques**

</div>

</v-click>

---

# `this` dans une affectation de propriété

Dans `s.Race = this`, `this` ne sert pas à retirer l'ambiguïté sur un champ — il **assigne l'objet courant à une propriété** :

```csharp {0|3-4|6|all}
public Race()
{
    // "this" = la Race en cours de construction
    // On peut l'assigner partout où ce type est attendu

    s.Race = this;  // équivalent à : Race moi = this; s.Race = moi;
}
```

<v-click>

<div class="grid grid-cols-2 gap-4 mt-4">

<div class="border-2 border-yellow-400 rounded p-3 bg-yellow-100 text-yellow-900 text-sm">

### Usage déjà connu

```csharp
this.x = x;
```

Retirer l'ambiguïté **champ** vs **paramètre**

</div>

<div class="border-2 border-green-400 rounded p-3 bg-green-100 text-green-900 text-sm">

### Nouvel usage

```csharp
s.Race = this;
```

Assigner **l'objet courant** à une propriété

</div>

</div>

</v-click>

<v-click>

<div class="mt-4 p-3 bg-blue-900 rounded text-blue-100 text-center text-sm">

`this` = référence vers l'instance courante — utilisable partout où ce type est attendu

</div>

</v-click>

---

# Quand garder `static` ?

`static` n'est pas mauvais — il est **inapproprié** quand on a besoin de plusieurs instances ou d'héritage.

<div class="grid grid-cols-3 gap-3 mt-4 text-sm">

<v-click>
<div class="bg-green-100 text-green-700 rounded p-3">

### Méthode pure

```csharp
static double Distance(
  int x1, int y1,
  int x2, int y2) { ... }
```

Pas d'état — même résultat quel que soit l'appelant (`Math.Sqrt`, `int.Parse`...)

</div>
</v-click>

<v-click>
<div class="bg-blue-100 text-blue-700 rounded p-3">

### Champ partagé

```csharp
class Snail {
  static int count = 0;
  // partagé par TOUS

  int id;
  // propre à chaque instance
}
```

`static` sur le champ, classe instanciable

</div>
</v-click>

<v-click>
<div class="bg-yellow-100 text-yellow-900 rounded p-3">

### `Main()`

```csharp
static void Main() {
  // appelé avant tout objet
  // → obligatoirement static
}
```

Aucune instance n'existe encore à ce stade

</div>
</v-click>

</div>

<v-click>

<div class="mt-3 p-2 bg-gray-100 text-gray-900 rounded text-sm">

| Question | Si oui → |
|---|---|
| État différent par instance ? | Classe instanciable |
| Besoin d'héritage / remplacement ? | Classe instanciable |
| Fonction pure sans état ? | Peut rester `static` |
| Valeur partagée entre toutes les instances ? | Champ `static` dans classe instanciable |

</div>

</v-click>

---
layout: section
---

# Partie 7
## `null`, références et types

---

# `null` — la référence vers rien

```csharp {0|1|2|4-5|all}
Snail s1 = new Snail(0, 5, "Turbo");  // s1 → objet en mémoire
Snail s2 = null;                       // s2 → RIEN

// Utiliser s2 ?
s2.Draw();  // NullReferenceException !
```

<v-click>

<div class="grid grid-cols-2 gap-6 mt-6">

<div class="border-2 border-green-400 rounded p-4 font-mono text-sm bg-green-50">
<div class="text-green-700 font-bold mb-1">s1</div>
<div>→ Snail { x=0, y=5, name="Turbo" }</div>
</div>

<div class="border-2 border-red-400 rounded p-4 font-mono text-sm bg-red-50">
<div class="text-red-700 font-bold mb-1">s2</div>
<div>→ <span class="text-red-600 font-bold">null</span> (aucun objet)</div>
</div>

</div>

</v-click>

<v-click>

<div class="mt-4 p-4 bg-red-700 rounded text-red-100">

**`NullReferenceException`** = on essaie d'utiliser une variable qui ne pointe vers aucun objet. Solution : vérifier avec `if (s2 != null)` ou s'assurer d'avoir fait `new`.

</div>

</v-click>

---

# `Snail?` — types nullables

Par défaut, le compilateur C# avertit si on met `null` dans une variable non prévue pour :

```csharp {0|1|3|all}
Snail s = null;   // ⚠ Warning : non-nullable type

Snail? s = null;  // OK : le ? autorise null
```

<v-click>

<div class="grid grid-cols-2 gap-6 mt-4">

<div class="border-2 border-red-400 rounded p-4 bg-red-50 text-sm">
<div class="font-bold text-red-700 mb-2">Sans `?` — non-nullable</div>
<div class="font-mono">Snail s = null;</div>
<div class="mt-1 text-red-600">⚠ Avertissement du compilateur</div>
</div>

<div class="border-2 border-green-400 rounded p-4 bg-green-50 text-sm">
<div class="font-bold text-green-700 mb-2">Avec `?` — nullable</div>
<div class="font-mono">Snail? s = null;</div>
<div class="mt-1 text-green-600">OK, explicitement nullable</div>
</div>

</div>

</v-click>

---

# Opérateurs pour les nullables

| Syntaxe | Signification |
| --- | --- |
| `Snail s` | Ne devrait pas être `null` |
| `Snail? s` | Peut être `null` |
| `s!.Name` | "Je garantis que `s` n'est pas `null`" |
| `s?.Name` | "Si `s` n'est pas `null`, accède à `Name`" |

<v-click>

```csharp
Snail? winner = null;
string? nom = winner?.Name;       // Retourne null si winner est null
Console.WriteLine(winner!.Name);  // ⚠ "Je garantis non-null" (risqué!)
```

</v-click>

---

# Deux variables, un seul objet

```csharp {0|1-2|4|6|all}
Snail s1 = new Snail(0, 5, "Turbo");
Snail s2 = s1;  // Copie la RÉFÉRENCE, pas l'objet !

s2.x = 99;

Console.WriteLine(s1.x);  // Affiche 99 !
```

<v-click>

<div class="grid grid-cols-[1fr_40px_1fr] gap-0 mt-6 items-center">

<div class="font-mono text-sm border-2 border-gray-400 rounded p-3 bg-gray-50">
<div class="border border-yellow-400 rounded p-2 bg-yellow-50 mb-2">
<span class="text-yellow-700">s1</span> = → adresse 0xA3
</div>
<div class="border border-cyan-400 rounded p-2 bg-cyan-50">
<span class="text-cyan-700">s2</span> = → adresse 0xA3
</div>
</div>

<div class="text-2xl text-center">→</div>

<div class="font-mono text-sm border-2 border-yellow-400 rounded p-3 bg-yellow-50">
<div class="text-xs text-yellow-600">0xA3 — Snail</div>
<div>x = <span class="text-red-600 font-bold">99</span></div>
<div>y = 5</div>
<div>name = "Turbo"</div>
</div>

</div>

</v-click>

<v-click>

<div class="mt-4 p-4 bg-orange-100 rounded text-orange-900">

**`=` copie la référence**, pas l'objet. `s1` et `s2` pointent vers le **même** bloc mémoire.

</div>

</v-click>

---

# Passer un objet à une fonction

<div class="grid grid-cols-2 gap-6">

<div>

### Objet → référence transmise

```csharp
void Accelerate(Snail s)
{
    s.Move(10, 0);
}

Snail turbo = new Snail(0, 5, "Turbo");
Accelerate(turbo);
Console.WriteLine(turbo.x);
// Affiche 10 !
```

<v-click>

<div class="mt-2 p-3 bg-orange-100 rounded text-orange-900 text-sm">

La fonction modifie l'**original**

</div>

</v-click>

</div>

<v-click>
<div>

### `int` → copie transmise

```csharp
void Double(int n)
{
    n = n * 2;
}

int score = 5;
Double(score);
Console.WriteLine(score);
// Affiche 5 (inchangé)
```

<div class="mt-2 p-3 bg-green-100 rounded text-green-900 text-sm">

La fonction travaille sur une **copie**

</div>

</div>
</v-click>

</div>

<v-click>

<div class="mt-4 p-4 bg-blue-900 rounded text-blue-100 text-center">

Objets = passage par **référence** | Types simples = passage par **valeur** (copie)

</div>

</v-click>

---

# Types valeur vs types référence

<v-clicks>

|                 | Type valeur                     | Type référence                      |
| --------------- | ------------------------------- | ----------------------------------- |
| **Exemples**    | `int`, `double`, `bool`, `char` | `class`, `string`, `int[]`, `Snail` |
| **Stockage**    | Directement dans la variable    | Référence vers le tas (heap)        |
| **Copie (`=`)** | Copie la **valeur**             | Copie la **référence** (même objet) |
| **Par défaut**  | `0`, `false`                    | `null`                              |
| **Paramètre**   | Copié                           | Référence transmise                 |

</v-clicks>

<v-click>

<div class="grid grid-cols-2 gap-6 mt-6 text-blue-900">

<div class="border-2 border-blue-400 rounded p-4 bg-blue-50 font-mono text-sm">
<div class="font-bold text-blue-700 mb-2">Type valeur</div>
<div>int a = 42</div>
<div>int b = a → <span class="text-blue-600 font-bold">copie : b = 42</span></div>
<div>b = 99</div>
<div>a vaut toujours <span class="text-green-600 font-bold">42</span></div>
</div>

<div class="border-2 border-purple-400 rounded p-4 bg-purple-50 font-mono text-sm">
<div class="font-bold text-purple-700 mb-2">Type référence</div>
<div>Snail a = new Snail(...)</div>
<div>Snail b = a → <span class="text-purple-600 font-bold">même objet</span></div>
<div>b.x = 99</div>
<div>a.x vaut aussi <span class="text-red-600 font-bold">99</span></div>
</div>

</div>

</v-click>

---

# Au fait : `int` est aussi un objet !

En C#, même les types simples sont des objets "en coulisses" :

```csharp {0|1-2|4-5|7-8|all}
int n = 42;
string s = n.ToString();  // "42" — int a des méthodes !

int a = 5;              // Écriture habituelle
int b = new int();      // Fonctionne ! (valeur par défaut : 0)

Int32 c = new Int32();  // Sans le raccourci
// int = System.Int32, double = System.Double, bool = System.Boolean
```

<v-click>

<div class="grid grid-cols-2 gap-6 mt-6 text-blue-900">

<div class="border-2 border-blue-400 rounded p-4 bg-blue-50 text-sm">
<div class="font-bold text-blue-700 mb-2">Type valeur (struct)</div>
<div class="font-mono">int, double, bool, char</div>
<div class="mt-2">Vit sur la <strong>pile</strong></div>
<div>Pas de <code class="text-blue-300">new</code> nécessaire</div>
<div>Pas de <code class="text-blue-300">null</code> possible</div>
</div>

<div class="border-2 border-purple-400 rounded p-4 bg-purple-50 text-sm">
<div class="font-bold text-purple-700 mb-2">Type référence (class)</div>
<div class="font-mono">Snail, string, int[]</div>
<div class="mt-2">Vit sur le <strong>tas</strong></div>
<div><code class="text-blue-300">new</code> obligatoire</div>
<div>Peut être <code class="text-blue-300">null</code></div>
</div>

</div>

</v-click>

<v-click>

<div class="mt-4 p-4 bg-blue-900 rounded text-blue-100 text-center">

En C#, **tout est objet** — mais les types valeur restent sur la pile pour la performance

</div>

</v-click>

---

# Récapitulatif

<v-clicks>

| Étape               | Concept                 | Code                          |
| ------------------- | ----------------------- | ----------------------------- |
| Tableaux parallèles | Données séparées        | `snailX[0]`, `snailY[0]`      |
| Classe statique     | Une seule copie         | `Snail.x`, `Snail.Move()`     |
| Classe instanciable | Plusieurs copies        | `new Snail()`, `s1.x`, `s2.x` |
| Constructeur        | Initialisation garantie | `new Snail(0, 5, "Turbo")`    |
| Méthodes d'instance | Comportement par objet  | `s1.Move(1, 0)`               |
| Tableau d'objets    | Collection d'instances  | `foreach (Snail s in snails)` |
| Deux classes        | Association / Composition / Propriété | `new Snail(x, name, r)` / `s.Race = this` |

</v-clicks>

---
layout: center
class: text-center
---

<v-click every=1>
Les classes statiques étaient le premier pas...

<div class="pt-12 mb-4">
  <span class="px-4 py-2 rounded bg-green-500 text-white text-xl">
    Prêts à instancier !
  </span>
</div>

# Questions ?

<div class="mt-8 text-gray-500">

Prochaine étape : protéger les données avec l'**encapsulation**

</div>
</v-click>
