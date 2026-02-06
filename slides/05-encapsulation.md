---
theme: default
title: "L'Encapsulation"
info: Protéger les données avec private et les propriétés en C#
author: ETML
transition: slide-left
mdc: true
---

# L'Encapsulation

## Protéger les données d'un objet

<div class="pt-12">
  <span class="px-2 py-1 rounded bg-blue-500 text-white">
    POO : l'encapsulation
  </span>
</div>

---

# Plan de la présentation

1. **Rappel** - Instances et champs
2. **Le problème** - Champs publics = danger
3. **`private`** - Cacher les champs
4. **Get/Set** - Accès contrôlé (Java-style)
5. **Propriétés C#** - La solution élégante
6. **Validation** - Full property avec logique
7. **Lecture seule** - `{ get; }` et `{ get; private set; }`
8. **L'escargot encapsulé** - Avant / Après

---
layout: section
---

# Partie 1
## Rappel : les instances

---

# Ce qu'on sait déjà

<v-clicks>

- Une **classe instanciable** sert de modèle pour créer des objets avec `new`
- Chaque instance a ses **propres champs** (données indépendantes)
- Les **méthodes d'instance** agissent sur les données de leur objet via `this`

</v-clicks>

<v-click>

```csharp
class Snail
{
    public int X;
    public int Energy;
    public string Name;

    public Snail(string name) { this.Name = name; this.Energy = 100; }
    public void Move(int dx) { this.X = this.X + dx; }
}
```

</v-click>

<v-click>

<div class="mt-4 p-4 bg-blue-700 rounded text-blue-300">

Tout fonctionne. Mais les champs sont notés `public`... **est-ce un problème ?**

</div>

</v-click>

---

# Le problème : `snail.Energy = 9999`

Avec des champs notés `public`, n'importe quel code peut écrire :

```csharp {0|1-2|4-5|7-8|all}
// Triche : énergie infinie
snail.Energy = 9999;

// Triche : victoire instantanée
snail.X = Race.FinishX;

// Valeur absurde
snail.Energy = -500;
```

<v-click>

<div class="mt-4 p-4 bg-red-700 rounded text-red-100">

**Tout compile, tout fonctionne.** `ReduceEnergy()` valide l'énergie, mais on peut la contourner en modifiant le champ directement. La validation est **inutile** si le champ est marqué `public`.

</div>

</v-click>

---

# État des lieux

<v-clicks>

| Problème           | Conséquence                      |
| ------------------ | -------------------------------- |
| Pas de contrôle    | N'importe quelle valeur acceptée |
| Pas de validation  | `Energy = -500` autorisé         |
| Logique contournée | `ReduceEnergy()` inutile         |

</v-clicks>


---
layout: section
---

# Partie 2
## `private` : cacher les champs

---

# `private` : interdire l'accès extérieur

<div class="grid grid-cols-2 gap-8">

<div>

### Avant : `public`

```csharp
class Snail
{
    public int Energy;
    public string Name;
}
```

<v-click>

```csharp
snail.Energy = 9999;  // OK 😱
```

</v-click>

</div>

<v-click>
<div>

### Après : `private`

```csharp
class Snail
{
    private int energy;
    private string name;
}
```

</div>
</v-click>

</div>

<v-click>

```
snail.energy = 9999;
// CS0122: 'Snail.energy' is inaccessible due to its protection level
```

</v-click>

<v-click>

<div class="mt-4 p-4 bg-green-700 rounded text-green-200">

**La triche est impossible.** Mais on ne peut plus non plus **lire** l'information : `snail.energy` est interdit partout en dehors de la classe.

</div>

</v-click>

---

# Les modificateurs d'accès

C# a plusieurs niveaux de visibilité — pas seulement `public` et `private` :

<v-clicks>

| Modificateur | Accès autorisé                         |
| ------------ | -------------------------------------- |
| `public`     | Partout                                |
| `private`    | Uniquement dans la classe              |
| `internal`   | Dans le même **projet** (assembly)     |
| `protected`  | Classe + classes dérivées (→ héritage) |

</v-clicks>

<v-click>

### Visibilité par défaut (sans modificateur)

```csharp
class Snail          // → internal (par défaut)
{
    int x;           // → private (par défaut)
    void Move() { }  // → private (par défaut)
}
```

</v-click>

---

# Bonne pratique

<div v-click class="mt-10 p-4 bg-blue-100 rounded text-blue-900 text-xl">

- Toujours écrire le modificateur explicitement

- Le code est plus lisible et l'intention plus claire.

</div>



---

# Mais comment lire / écrire ?

Avec `private`, les champs sont protégés... mais **inaccessibles** :

```csharp
Snail turbo = new Snail("Turbo");

Console.WriteLine(turbo.name);    // ERREUR !
Console.WriteLine(turbo.energy);  // ERREUR !
```

<v-click>

<div class="mt-4 p-4 bg-orange-100 rounded text-orange-900">

On a besoin d'un **accès contrôlé** : autoriser la lecture, mais interdire (ou contrôler) l'écriture.

</div>

</v-click>

<v-click>

<div class="mt-4 text-center text-lg">

Deux solutions possibles :

</div>

<div class="grid grid-cols-2 gap-6 mt-4">

<div class="p-4 bg-yellow-100 rounded text-yellow-900 text-center">

**Méthodes Get/Set**

Style Java, verbeux

</div>

<div class="p-4 bg-green-100 rounded text-green-900 text-center">

**Propriétés C#**

Élégant, idiomatique

</div>

</div>

</v-click>

---
layout: section
---

# Partie 3
## Accès contrôlé

---

# Get/Set en méthodes (style Java)

```csharp {0|1-4|6-12|all}
// Getter : permet de LIRE
public int GetEnergy()
{
    return this.energy;
}

// Setter : permet de MODIFIER (avec validation)
public void SetEnergy(int value)
{
    if (value >= 0 && value <= 100)
    {
        this.energy = value;
    }
}
```

<v-click>

```csharp
turbo.GetEnergy();       // Lire
turbo.SetEnergy(80);     // Écrire (avec validation)
turbo.SetEnergy(9999);   // Ignoré : hors plage
```

</v-click>

<v-click>

<div class="mt-4 p-4 bg-yellow-700 rounded text-yellow-300">

**Ça fonctionne, mais...** c'est verbeux. Pour chaque champ : 2 méthodes. Et la syntaxe est lourde : `turbo.GetEnergy()` au lieu de `turbo.Energy`.

</div>

</v-click>

---

# Propriétés C# : la solution élégante

C# offre une syntaxe dédiée : les **propriétés** :

<v-clicks>

```csharp
// Auto-propriété : C# génère le champ privé en coulisses
public string Name { get; set; }
```

```csharp
// Utilisation : exactement comme un champ !
Console.WriteLine(turbo.Name);  // Lecture → appelle get
turbo.Name = "Speedy";          // Écriture → appelle set
```

```csharp
// Propriété en lecture seule
public string Name { get; }  // Pas de set → immutable après construction
```

</v-clicks>

<v-click>

<div class="mt-4 p-4 bg-green-700 rounded text-green-200">

**La syntaxe est aussi simple qu'un champ**, mais la classe garde le contrôle. On peut ajouter de la validation sans changer le code appelant.

</div>

</v-click>

---

# Propriété avec validation (full property)

Pour ajouter de la **logique**, on écrit une propriété complète :

```csharp {0|1|3-5|6-13|all}
private int _energy;  // Convention Microsoft : préfixe _

public int Energy
{
    get { return _energy; }
    set
    {
        if (value >= 0 && value <= 100)
        {
            _energy = value;
        }
    }
}
```

<v-click>

```csharp
turbo.Energy = 80;    // value = 80 → valide → accepté
turbo.Energy = 9999;  // value = 9999 → ignoré !
turbo.Energy = -500;  // value = -500 → ignoré !
```

</v-click>

<v-click>

<div class="mt-4 p-4 bg-blue-700 rounded text-blue-300">

**`value`** = valeur assignée, **`_prefixe`** = convention Microsoft pour les champs privés

</div>

</v-click>

<v-drag-arrow v-click="" pos="160,395,-56,-152"/>
<v-drag-arrow v-click="" pos="175,386,-3,-107"/>

---

# Lecture seule


<h2 v-click> { get; } vs { get; private set; } </h2>

<div class="grid grid-cols-2 gap-8 mt-4">

<div>

<h3 v-click> { get; } —> immutable </h3>

```csharp {0|1|3-6|8-11|all}
public string Name { get; }

public Snail(string name)
{
    this.Name = name; // OK
}

public void Rename(string n)
{
    this.Name = n; // ERREUR !
}
```


<v-click>

<div class="mt-2 p-3 bg-blue-100 rounded text-blue-900 text-sm">

Assignable **uniquement** dans le constructeur, non modifiable après (immutable)

</div>

</v-click>

</div>

<v-click>
<div>

### `{ get; private set; }` — interne

```csharp
public int X { get; private set; }

public void Move(int dx)
{
    this.X = this.X + dx; // OK
}
```

```csharp
// Depuis l'extérieur :
turbo.X;       // OK (lecture)
turbo.X = 50;  // ERREUR !
```

<div class="mt-2 p-3 bg-green-100 rounded text-green-900 text-sm">

Modifiable **par la classe**, lecture seule dehors

</div>

</div>
</v-click>

</div>

---

# Synthèse des propriétés automatiques

<v-clicks>

| Syntaxe                 | Lecture | Écriture     | Cas d'usage     |
| ----------------------- | ------- | ------------ | --------------- |
| `{ get; set; }`         | Partout | Partout      | Données libres  |
| `{ get; private set; }` | Partout | Classe seule | Position, score |
| `{ get; }`              | Partout | Constructeur | Nom, couleur    |

</v-clicks>

---

# L'escargot encapsulé : avant / après

<div class="grid grid-cols-2 gap-4">

<div class="bg-red-50 text-red-900 p-4 rounded">

### Avant

```csharp
class Snail
{
    public int X;
    public int Energy;
    public string Name;
}
```

```csharp
snail.Energy = 9999; // OK 😱
snail.X = 50;        // OK 😱
snail.Name = "";     // OK 😱
```

</div>

<v-click>
<div class="bg-green-50 text-green-900 p-4 rounded">

### Après

```csharp
class Snail
{
    private int _energy;
    public string Name { get; }
    public int X { get; private set; }
    public int Energy
    {
        get { return _energy; }
        private set { /* validation */ }
    }
}
```

```csharp
snail.Energy = 9999; // ERREUR ✓
snail.X = 50;        // ERREUR ✓
snail.Name = "";     // ERREUR ✓
```

</div>
</v-click>

</div>

<v-click>

<div class="mt-4 p-4 bg-green-700 rounded text-green-200 text-center">

Les données sont **protégées**. La modification passe par les méthodes de la classe (`Move`, `ReduceEnergy`).

</div>

</v-click>

---

# Récapitulatif sur la visibilité

<v-clicks>

| Niveau                  | Syntaxe                                                     | Accès                           |
| ----------------------- | ----------------------------------------------------------- | ------------------------------- |
| Champ public            | `public int Energy;`                                        | Libre (dangereux)               |
| Private + full property | `private int _energy;` + `Energy { get {...}; set {...} }` | Contrôlé (validation)           |
| Auto-propriété          | `public int Energy { get; set; }`                           | Libre mais extensible           |
| Private set             | `public int X { get; private set; }`                        | Lecture libre, écriture interne |
| Lecture seule           | `public string Name { get; }`                               | Immutable                       |

</v-clicks>

<v-click>

### Points clés

1. **`private`** cache les données à l'extérieur
2. Les **propriétés** remplacent les méthodes Get/Set
3. **`value`** = la valeur assignée dans le `set`
4. `{ get; private set; }` = lecture partout, écriture interne
5. `{ get; }` = immutable après construction

</v-click>

---
layout: center
class: text-center
---

<v-click every=1>
Les champs publics, c'est fini...

<div class="pt-12 mb-4">
  <span class="px-4 py-2 rounded bg-blue-500 text-white text-xl">
    Données protégées !
  </span>
</div>

# Questions ?

<div class="mt-8 text-gray-500">

Prochaine étape : créer des classes spécialisées avec l'**héritage**

</div>
</v-click>
