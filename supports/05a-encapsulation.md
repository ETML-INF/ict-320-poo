# L'Encapsulation

## Introduction

Au chapitre précédent, on a appris à créer des **classes instanciables** avec des champs et des méthodes. Chaque escargot est un objet indépendant avec sa position, son nom et son énergie. Le code est plus propre qu'avec les tableaux parallèles.

Mais il reste un problème majeur : **rien n'empêche de modifier les champs avec des valeurs absurdes**.

```csharp
Snail turbo = new Snail("Turbo", ConsoleColor.Yellow);

// Triche : énergie infinie !
turbo.Energy = 9999;

// Triche : victoire instantanée !
turbo.X = Race.FinishX;

// Valeur absurde : énergie négative
turbo.Energy = -500;
```

Ce code **compile et fonctionne** sans erreur. N'importe quel développeur (ou n'importe quel bout de code) peut modifier les données internes d'un escargot sans aucun contrôle.

L'**encapsulation** est le principe qui consiste à **protéger les données** d'un objet et à **contrôler l'accès** via des mécanismes dédiés.

## Étape 1 : Le problème des champs publics

Reprenons la classe `Snail` du module précédent :

```csharp
class Snail
{
    public int X;
    public int Y;
    public int Energy;
    public string Name;
    public ConsoleColor Color;

    public Snail(string name, ConsoleColor color)
    {
        this.Name = name;
        this.Color = color;
        this.X = 0;
        this.Y = 0;
        this.Energy = 100;
    }

    public void ReduceEnergy(int amount)
    {
        this.Energy = this.Energy - amount;
        if (this.Energy < 10)
        {
            this.Energy = 10;
        }
    }
}
```

Tous les champs sont `public`. En cours de jeu, n'importe qui peut écrire :

```csharp
// Un joueur malveillant pourrait faire :
snail.Energy = 9999;       // Énergie infinie
snail.X = Race.FinishX;    // Victoire instantanée
snail.Energy = -500;       // Énergie négative (absurde)
snail.Y = -10;             // Position hors écran
```

### Pourquoi c'est un problème ?

| Problème           | Conséquence                                                              |
| ------------------ | ------------------------------------------------------------------------ |
| Pas de contrôle    | N'importe quelle valeur est acceptée                                     |
| Pas de validation  | `Energy = -500` est autorisé                                             |
| Couplage fort      | Le code extérieur dépend de la structure interne                         |
| Logique contournée | `ReduceEnergy()` limite à 10, mais `snail.Energy = 0` ignore cette règle |

La méthode `ReduceEnergy()` fait un effort de validation (l'énergie ne descend pas sous 10), mais comme le champ `Energy` est `public`, cette validation est inutile : on peut la contourner en modifiant directement le champ.

> **Principe** : si une donnée a des règles (plage de valeurs, format, contraintes), il faut **empêcher** l'accès direct et **forcer** le passage par un mécanisme de contrôle.

## Étape 2 : `private` — cacher les champs

Le mot-clé **`private`** interdit l'accès depuis l'extérieur de la classe. Seul le code à l'intérieur de la classe peut lire ou modifier un membre `private`.

```csharp
class Snail
{
    private int x;
    private int y;
    private int energy;
    private string name;
    private ConsoleColor color;

    public Snail(string name, ConsoleColor color)
    {
        this.name = name;
        this.color = color;
        this.x = 0;
        this.y = 0;
        this.energy = 100;
    }

    public void Draw()
    {
        // OK : la classe peut accéder à ses propres champs privés
        Console.SetCursorPosition(this.x, this.y);
        Console.Write(this.name);
    }
}
```

Depuis l'extérieur :

```csharp
Snail turbo = new Snail("Turbo", ConsoleColor.Yellow);

turbo.energy = 9999;  // ERREUR de compilation !
turbo.x = 50;         // ERREUR de compilation !
```

```
CS0122: 'Snail.energy' is inaccessible due to its protection level
```

Les champs sont **protégés**. Le code extérieur ne peut plus les modifier directement.

### Les modificateurs d'accès en C#

`public` et `private` ne sont pas les seuls choix. Voici les **modificateurs d'accès** principaux en C# :

| Modificateur | Accès autorisé                             | Cas d'usage                                |
| ------------ | ------------------------------------------ | ------------------------------------------ |
| `public`     | Partout                                    | API de la classe (méthodes, propriétés)    |
| `private`    | Uniquement dans la classe                  | Données internes, détails d'implémentation |
| `internal`   | Dans le même **projet** (assembly)         | Classes utilitaires internes au projet     |
| `protected`  | Dans la classe et ses **classes dérivées** | Sera vu avec l'héritage                    |

#### Visibilité par défaut (sans modificateur)

En C#, si on n'écrit **aucun** modificateur, la visibilité par défaut dépend de l'élément :

| Élément                      | Visibilité par défaut |
| ---------------------------- | --------------------- |
| Classe (top-level)           | `internal`            |
| Champs, méthodes, propriétés | `private`             |

```csharp
class Snail          // → internal (accessible dans le projet)
{
    int x;           // → private (inaccessible hors de la classe)
    string name;     // → private

    void Move() { }  // → private
}
```

Au chapitre précédent, les champs de `Snail` étaient écrits sans modificateur (`int x;`). Par défaut, ils sont donc **`private`**. Pour y accéder depuis l'extérieur, il fallait en réalité les déclarer `public` — ce qu'on avait simplifié pour se concentrer sur les instances.

> **Bonne pratique** : toujours écrire le modificateur d'accès **explicitement** (`public`, `private`, etc.), même quand la valeur par défaut conviendrait. Cela rend le code plus lisible et l'intention plus claire.

### Le problème : on ne peut plus RIEN faire

Avec `private`, la triche est impossible, mais on ne peut plus **lire** non plus :

```csharp
Snail turbo = new Snail("Turbo", ConsoleColor.Yellow);

Console.WriteLine(turbo.name);    // ERREUR ! On ne peut même pas lire le nom
Console.WriteLine(turbo.energy);  // ERREUR ! On ne peut pas voir l'énergie
```

On a besoin d'un **accès contrôlé** : autoriser la lecture, mais interdire (ou contrôler) l'écriture.

## Étape 3 : Méthodes GetX() / SetX()

Une première solution (inspirée de Java) est d'écrire des **méthodes d'accès** :

```csharp
class Snail
{
    private int energy;
    private string name;

    public Snail(string name)
    {
        this.name = name;
        this.energy = 100;
    }

    // Getter : permet de LIRE l'énergie
    public int GetEnergy()
    {
        return this.energy;
    }

    // Setter : permet de MODIFIER l'énergie (avec validation)
    public void SetEnergy(int value)
    {
        if (value >= 0 && value <= 100)
        {
            this.energy = value;
        }
    }

    // Getter seulement (pas de setter → lecture seule)
    public string GetName()
    {
        return this.name;
    }
}
```

Utilisation :

```csharp
Snail turbo = new Snail("Turbo");

Console.WriteLine(turbo.GetEnergy());  // OK : 100
turbo.SetEnergy(80);                   // OK : valeur valide
turbo.SetEnergy(9999);                 // Ignoré : hors de la plage [0, 100]
turbo.SetEnergy(-500);                 // Ignoré : valeur négative

Console.WriteLine(turbo.GetName());    // OK : "Turbo"
// turbo.SetName("Tricheur");          // Impossible : pas de méthode SetName
```

### Ça fonctionne, mais...

Cette approche résout le problème de validation, mais elle est **verbeuse** :

```csharp
// Avant (champ public) :
Console.WriteLine(turbo.Energy);

// Après (getter/setter) :
Console.WriteLine(turbo.GetEnergy());
```

Pour chaque champ, il faut écrire deux méthodes (`GetX` + `SetX`). C# propose une syntaxe plus élégante : les **propriétés**.

## Étape 4 : Les propriétés C# (get / set)

### Auto-propriétés

La syntaxe la plus simple est l'**auto-propriété**. C# génère automatiquement un champ privé en coulisses :

```csharp
class Snail
{
    public string Name { get; set; }
    public int Energy { get; set; }

    public Snail(string name)
    {
        this.Name = name;
        this.Energy = 100;
    }
}
```

Utilisation — exactement comme un champ :

```csharp
Snail turbo = new Snail("Turbo");

Console.WriteLine(turbo.Name);    // Lecture → appelle le get
turbo.Energy = 80;                // Écriture → appelle le set
Console.WriteLine(turbo.Energy);  // Lecture → 80
```

L'avantage : la syntaxe est aussi simple qu'un champ public, mais on peut ajouter de la logique plus tard sans changer le code qui utilise la classe.

### Propriété avec logique (full property)

Pour ajouter de la **validation**, on écrit une propriété complète avec un champ privé :

```csharp
class Snail
{
    private int energy;

    public int Energy
    {
        get
        {
            return this.energy;
        }
        set
        {
            if (value >= 0 && value <= 100)
            {
                this.energy = value;
            }
        }
    }

    public Snail(string name)
    {
        this.Name = name;
        this.energy = 100;  // Utilise le champ directement dans le constructeur
    }

    public string Name { get; set; }
}
```

Le mot-clé **`value`** représente la valeur qu'on essaie d'assigner :

```csharp
turbo.Energy = 80;    // value = 80 → valide → accepté
turbo.Energy = 9999;  // value = 9999 → invalide → ignoré
turbo.Energy = -500;  // value = -500 → invalide → ignoré
```

### Convention de nommage

Quand on a un champ privé et une propriété publique, on distingue les deux par la casse :

| Élément            | Convention                        | Exemple   |
| ------------------ | --------------------------------- | --------- |
| Champ privé        | `_prefixe` (recommandé Microsoft) | `_energy` |
| Champ privé        | camelCase (alternatif)            | `energy`  |
| Propriété publique | PascalCase                        | `Energy`  |

#### Recommandation Microsoft : le préfixe `_`

Microsoft recommande officiellement le préfixe **underscore** (`_`) pour les champs privés. Cette convention présente plusieurs avantages :

```csharp
private int _energy;      // Champ privé avec _ (recommandé)
public int Energy { ... } // Propriété publique

public void ReduceEnergy(int amount)
{
    _energy = _energy - amount;  // Visuellement distinct
}
```

| Avantage                   | Explication                                                     |
| -------------------------- | --------------------------------------------------------------- |
| Distinction visuelle       | `_energy` vs `Energy` — impossible de confondre                 |
| Pas de conflit avec `this` | Plus besoin d'écrire `this.energy` pour distinguer du paramètre |
| IntelliSense               | Taper `_` liste tous les champs privés                          |
| Standard .NET              | Utilisé dans le code source de .NET lui-même                    |

```csharp
// Sans _ : besoin de this pour distinguer
public Snail(int energy)
{
    this.energy = energy;  // this obligatoire
}

// Avec _ : pas d'ambiguïté
public Snail(int energy)
{
    _energy = energy;  // Clair sans this
}
```

> **Note** : les deux conventions (`_energy` et `energy`) sont acceptables. L'important est d'être **cohérent** dans tout le projet. Dans ce cours, on utilise parfois `energy` (sans `_`) pour simplifier, mais en projet professionnel, préférez `_energy`.

### Comparaison des approches

| Approche             | Syntaxe d'accès                             | Validation               | Simplicité            |
| -------------------- | ------------------------------------------- | ------------------------ | --------------------- |
| Champ public         | `snail.Energy = 80`                         | Aucune                   | Simple mais dangereux |
| Getter/Setter (Java) | `snail.GetEnergy()` / `snail.SetEnergy(80)` | Possible                 | Verbeux               |
| Auto-propriété       | `snail.Energy = 80`                         | Aucune (mais extensible) | Simple et propre      |
| Full property        | `snail.Energy = 80`                         | Oui                      | Contrôle total        |

> **À retenir** : en C#, on utilise des **propriétés** (pas des méthodes Get/Set). La syntaxe d'utilisation est identique à celle d'un champ, mais la classe garde le contrôle.

## Étape 5 : Propriétés en lecture seule

Certaines données ne devraient **jamais** changer après la création de l'objet, ou ne devraient être modifiables **que par la classe elle-même**.

### `{ get; }` — lecture seule, assignable dans le constructeur

```csharp
class Snail
{
    public string Name { get; }  // Lecture seule

    public Snail(string name)
    {
        this.Name = name;  // OK : le constructeur peut assigner
    }

    public void Rename(string newName)
    {
        this.Name = newName;  // ERREUR : impossible de modifier après la construction
    }
}
```

Le nom est **immutable** : une fois créé, il ne change plus. C'est le cas le plus strict.

### `{ get; private set; }` — modifiable par la classe, lecture seule dehors

```csharp
class Snail
{
    public int X { get; private set; }
    public int Energy { get; private set; }

    public Snail(string name)
    {
        this.X = 0;
        this.Energy = 100;
    }

    public void Move(int dx, int dy)
    {
        this.X = this.X + dx;  // OK : la classe peut modifier
    }

    public void ReduceEnergy(int amount)
    {
        this.Energy = this.Energy - amount;
        if (this.Energy < 10)
        {
            this.Energy = 10;
        }
    }
}
```

Depuis l'extérieur :

```csharp
Snail turbo = new Snail("Turbo");

Console.WriteLine(turbo.X);       // OK : lecture autorisée
Console.WriteLine(turbo.Energy);  // OK : lecture autorisée

turbo.X = 50;                     // ERREUR ! Écriture interdite depuis l'extérieur
turbo.Energy = 9999;              // ERREUR ! Écriture interdite depuis l'extérieur

turbo.Move(1, 0);                 // OK : passe par la méthode de la classe
turbo.ReduceEnergy(5);            // OK : passe par la méthode de la classe
```

### Quel type choisir ?

| Syntaxe                 | Qui peut lire ? | Qui peut écrire ?      | Cas d'usage                                |
| ----------------------- | --------------- | ---------------------- | ------------------------------------------ |
| `{ get; set; }`         | Tout le monde   | Tout le monde          | Données sans contrainte                    |
| `{ get; private set; }` | Tout le monde   | La classe seulement    | Position, énergie (modification contrôlée) |
| `{ get; }`              | Tout le monde   | Constructeur seulement | Nom, couleur (immutable)                   |

## Étape 6 : L'escargot encapsulé (version complète)

### Avant : tout est public

```csharp
class Snail
{
    public int X;
    public int Y;
    public int Energy;
    public string Name;
    public ConsoleColor Color;

    public Snail(string name, ConsoleColor color)
    {
        this.Name = name;
        this.Color = color;
        this.X = 0;
        this.Y = 0;
        this.Energy = 100;
    }

    public void Move(int dx, int dy)
    {
        this.X = this.X + dx;
        this.Y = this.Y + dy;
    }

    public void ReduceEnergy(int amount)
    {
        this.Energy = this.Energy - amount;
        if (this.Energy < 10)
        {
            this.Energy = 10;
        }
    }

    public void Draw()
    {
        Console.SetCursorPosition(this.X, this.Y);
        Console.Write("@");
    }

    public void Erase()
    {
        Console.SetCursorPosition(this.X, this.Y);
        Console.Write(".");
    }
}
```

Problèmes :
- `snail.Energy = 9999` → triche possible
- `snail.X = Race.FinishX` → victoire instantanée
- `snail.Name = ""` → nom vide
- La validation dans `ReduceEnergy()` est contournable

### Après : données protégées

```csharp
class Snail
{
    private int _energy;  // Convention Microsoft : préfixe _

    public string Name { get; }
    public ConsoleColor Color { get; }
    public int X { get; private set; }
    public int Y { get; private set; }

    public int Energy
    {
        get { return _energy; }
        private set
        {
            if (value < 10)
                _energy = 10;
            else if (value > 100)
                _energy = 100;
            else
                _energy = value;
        }
    }

    public Snail(string name, ConsoleColor color, int x, int y)
    {
        Name = name;    // Pas besoin de this. avec les propriétés
        Color = color;
        X = x;
        Y = y;
        Energy = 100;
    }

    public void Move(int dx, int dy)
    {
        X = X + dx;
        Y = Y + dy;
    }

    public void ReduceEnergy(int amount)
    {
        Energy = Energy - amount;  // La propriété gère la validation
    }

    public void Draw()
    {
        Console.SetCursorPosition(X, Y);
        Console.Write("@");
    }

    public void Erase()
    {
        Console.SetCursorPosition(X, Y);
        Console.Write(".");
    }
}
```

### Ce qui a changé

| Élément      | Avant                       | Après                                | Pourquoi                                                |
| ------------ | --------------------------- | ------------------------------------ | ------------------------------------------------------- |
| `Name`       | `public string Name`        | `public string Name { get; }`        | Ne change jamais                                        |
| `Color`      | `public ConsoleColor Color` | `public ConsoleColor Color { get; }` | Ne change jamais                                        |
| `X`, `Y`     | `public int X`              | `public int X { get; private set; }` | Modifiable uniquement via `Move()`                      |
| `Energy`     | `public int Energy`         | Full property avec validation        | Toujours entre 10 et 100                                |
| Constructeur | `Snail(name, color)`        | `Snail(name, color, x, y)`           | Position passée à la création (plus de `X = 0` externe) |

Depuis l'extérieur :

```csharp
Snail turbo = new Snail("Turbo", ConsoleColor.Yellow, 0, 2);

// Lecture : toujours possible
Console.WriteLine(turbo.Name);     // "Turbo"
Console.WriteLine(turbo.Energy);   // 100
Console.WriteLine(turbo.X);        // 0

// Écriture directe : IMPOSSIBLE
turbo.Energy = 9999;  // ERREUR de compilation
turbo.X = 50;         // ERREUR de compilation
turbo.Name = "Hack";  // ERREUR de compilation

// Modification contrôlée : via les méthodes
turbo.Move(1, 0);         // X passe à 1
turbo.ReduceEnergy(5);    // Energy passe à 95
```

> **La validation est maintenant centralisée** : que ce soit le constructeur, `ReduceEnergy()`, ou n'importe quel code dans la classe, toute modification de `Energy` passe par la propriété qui garantit la plage [10, 100]. Impossible de contourner.

## Résumé

### Tableau récapitulatif

| Niveau                    | Syntaxe                               | Accès                           | Usage typique            |
| ------------------------- | ------------------------------------- | ------------------------------- | ------------------------ |
| Champ public              | `public int Energy;`                  | Lecture/écriture libre          | À éviter en général      |
| Private + propriété       | `private int energy;` + full property | Contrôlé (validation)           | Données avec contraintes |
| Auto-propriété            | `public int Energy { get; set; }`     | Lecture/écriture (extensible)   | Données sans contrainte  |
| Lecture seule (privé set) | `public int X { get; private set; }`  | Lecture libre, écriture interne | Position, score          |
| Lecture seule (immutable) | `public string Name { get; }`         | Lecture libre, set constructeur | Identité, configuration  |

### Points importants

1. Les champs `public` sont **dangereux** : aucun contrôle sur les valeurs assignées
2. Le mot-clé **`private`** cache un membre à l'extérieur de la classe
3. **`internal`** (visibilité par défaut des classes) limite l'accès au même projet
4. Sans modificateur, un champ est **`private`** par défaut — toujours écrire le modificateur explicitement
5. Les **propriétés** (`{ get; set; }`) offrent la syntaxe d'un champ avec le contrôle d'une méthode
6. Une **full property** (avec un champ privé) permet d'ajouter de la **validation**
7. `{ get; private set; }` autorise la lecture partout, l'écriture seulement dans la classe
8. `{ get; }` rend la donnée **immutable** après la construction
9. Le mot-clé **`value`** dans le `set` représente la valeur qu'on essaie d'assigner
10. L'encapsulation **centralise la validation** : les règles sont à un seul endroit

## Glossaire : terminologie POO

En programmation orientée objet, plusieurs termes désignent des concepts similaires selon les langages et les contextes. Voici un lexique pour s'y retrouver :

### Champ / Attribut / Variable d'instance

Ces trois termes désignent la même chose : une **donnée stockée dans un objet**.

| Terme                    | Contexte                         | Exemple                                         |
| ------------------------ | -------------------------------- | ----------------------------------------------- |
| **Champ** (field)        | C#, Java                         | `private int _energy;`                          |
| **Attribut** (attribute) | UML, Python, vocabulaire général | "L'attribut `energy` de la classe `Snail`"      |
| **Variable d'instance**  | Vocabulaire pédagogique          | "Chaque instance a sa propre variable `energy`" |

En C#, on dit généralement **champ**. Le terme **attribut** est parfois utilisé dans les diagrammes UML ou dans d'autres langages (Python). En C#, "attribute" a un sens technique différent (`[Obsolete]`, `[Serializable]`...).

> **À retenir** : en C#, préférez le terme **champ** pour les données d'une classe.

### Propriété

Une **propriété** est un mécanisme d'accès contrôlé à une donnée. Ce n'est ni un champ ni une méthode, mais quelque chose entre les deux :

| Élément   | Stocke une donnée ? | Contient de la logique ? | Syntaxe d'accès |
| --------- | ------------------- | ------------------------ | --------------- |
| Champ     | Oui                 | Non                      | `obj.field`     |
| Propriété | Parfois (auto-prop) | Oui (get/set)            | `obj.Property`  |
| Méthode   | Non                 | Oui                      | `obj.Method()`  |

```csharp
// Champ : stockage brut
private int _energy;

// Propriété : accès contrôlé (peut avoir de la logique)
public int Energy
{
    get { return _energy; }
    set { _energy = Math.Clamp(value, 10, 100); }
}

// Méthode : action avec logique
public void ReduceEnergy(int amount) { ... }
```

Les propriétés sont **spécifiques à C#** (et quelques autres langages comme Kotlin). En Java, on utilise des méthodes `getEnergy()` / `setEnergy()`.

### Méthode / Fonction / Procédure

Ces termes désignent tous un **bloc de code réutilisable**, mais avec des nuances :

| Terme         | Définition                                                        | Retourne une valeur ? |
| ------------- | ----------------------------------------------------------------- | --------------------- |
| **Fonction**  | Bloc de code qui calcule et **retourne** un résultat              | Oui (toujours)        |
| **Procédure** | Bloc de code qui **effectue une action** sans retourner de valeur | Non (`void`)          |
| **Méthode**   | Fonction ou procédure **appartenant à une classe**                | Oui ou non            |

```csharp
// Fonction : retourne un résultat
public int GetEnergy()
{
    return _energy;
}

// Procédure : effectue une action, ne retourne rien
public void Draw()
{
    Console.Write("@");
}

// Les deux sont des MÉTHODES car elles appartiennent à une classe
```

En C# et en POO, on utilise presque toujours le terme **méthode**, qu'elle retourne une valeur ou non. Les termes "fonction" et "procédure" viennent de la programmation procédurale (Pascal, C).

> **À retenir** : en C#, tout est **méthode**. On précise parfois "méthode `void`" pour une procédure.

### Récapitulatif du vocabulaire

| Concept                           | Terme C#                 | Autres termes                     |
| --------------------------------- | ------------------------ | --------------------------------- |
| Donnée dans un objet              | **Champ** (field)        | Attribut, variable d'instance     |
| Accès contrôlé à une donnée       | **Propriété** (property) | Accesseur (getter/setter en Java) |
| Code réutilisable dans une classe | **Méthode** (method)     | Fonction, procédure               |
| Méthode sans retour (`void`)      | Méthode `void`           | Procédure                         |
| Méthode avec retour               | Méthode                  | Fonction                          |

## Prochaine Étape

Nos escargots sont maintenant protégés : on ne peut plus tricher. Mais que se passe-t-il si on veut créer des **types** d'escargots (rapide, lent, bonus) ? La prochaine étape introduira l'**héritage** : créer des classes spécialisées à partir d'une classe de base.
