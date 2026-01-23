---
theme: default
title: Coordonnées 2D en Console C#
info: Synthèse pré-orientée objet
author: ETML
transition: slide-left
mdc: true
---

# Coordonnées 2D en Console C#

## Positionner et déplacer des éléments

<div class="pt-12">
  <span class="px-2 py-1 rounded bg-blue-500 text-white">
    Préparation à la POO
  </span>
</div>

---

# Plan

1. **Système de coordonnées** - Différence avec les maths
2. **Positionner** - SetCursorPosition
3. **Déplacer** - Effacer / Modifier / Dessiner
4. **Dessiner** - Formes et rectangles

---
layout: section
---

# Partie 1
## Le Système de Coordonnées

---

# Le piège classique

<div class="grid grid-cols-2 gap-8">

<div>

### En Mathématiques

```
    Y
    ↑
  3 |     • (3,2)
  2 |
  1 |
  0 +---+---+---→ X
    0   1   2   3
```

- Origine en **bas à gauche**
- Y augmente vers le **haut**

</div>

<div>

### En Console

```
    0   1   2   3   → X
  +---+---+---+---+
0 |
1 |
2 |         • (3,2)
3 |
↓
Y
```

- Origine en **haut à gauche**
- Y augmente vers le **bas**

</div>

</div>

---

# Pourquoi cette inversion ?

L'écran affiche le texte **ligne par ligne**, de haut en bas.

```csharp
Console.WriteLine("Ligne 0");  // Y = 0
Console.WriteLine("Ligne 1");  // Y = 1
Console.WriteLine("Ligne 2");  // Y = 2
Console.WriteLine("Ligne 3");  // Y = 3
```

<v-click>

<div class="mt-8 p-4 bg-orange-100 rounded text-orange-800">

**Retenir** : Comme quand on lit un livre, on commence en haut !

</div>

</v-click>

---

# Comparaison

| Aspect | Maths | Console |
|--------|-------|---------|
| Origine (0,0) | Bas-gauche | **Haut-gauche** |
| X augmente | → droite | → droite |
| Y augmente | ↑ haut | **↓ bas** |
| Pour monter | Y++ | **Y--** |
| Pour descendre | Y-- | **Y++** |

<v-click>

<div class="mt-4 p-4 bg-red-100 rounded text-red-800 text-xl text-center">

⚠️ **Flèche haut = Y diminue !**

</div>

</v-click>

---
layout: section
---

# Partie 2
## Positionner le Curseur

---

# SetCursorPosition

```csharp
Console.SetCursorPosition(x, y);
//                        ↑  ↑
//                        |  └── ligne (vertical, 0 = haut)
//                        └───── colonne (horizontal, 0 = gauche)
```

<v-click>

<div class="grid grid-cols-2 gap-4 mt-8">

<div class="bg-blue-100 text-blue-900 p-4 rounded">

**X** = Colonne (Left)
- 0 = bord gauche
- Augmente vers la droite

</div>

<div class="bg-green-100 text-green-900 p-4 rounded">

**Y** = Ligne (Top)
- 0 = bord **supérieur**
- Augmente vers le **bas**

</div>

</div>

</v-click>

---

# Exemple pratique

```csharp
Console.Clear();

Console.SetCursorPosition(0, 0);   // Coin haut-gauche
Console.Write("A");

Console.SetCursorPosition(20, 0);  // 20 colonnes à droite
Console.Write("B");

Console.SetCursorPosition(0, 5);   // 5 lignes vers le BAS
Console.Write("C");

Console.SetCursorPosition(20, 5);  // 20 droite, 5 bas
Console.Write("D");
```

<v-click>

**Résultat :**
```
A                   B




C                   D
```

</v-click>

---

# Masquer le curseur

Pour un affichage propre, on cache le curseur clignotant :

```csharp
Console.CursorVisible = false;  // Masquer
Console.CursorVisible = true;   // Réafficher
```

<v-click>

### Effacer l'écran

```csharp
Console.Clear();  // Tout effacer et repositionner en (0,0)
```

</v-click>

---
layout: section
---

# Partie 3
## Déplacer un Élément

---

# Fonction d'affichage

```csharp
void DrawAt(int x, int y, char character, ConsoleColor color)
{
    Console.SetCursorPosition(x, y);
    Console.ForegroundColor = color;
    Console.Write(character);
    Console.ResetColor();
}

void ClearAt(int x, int y)
{
    Console.SetCursorPosition(x, y);
    Console.Write(' ');
}
```

<v-click>

```csharp
// Usage
DrawAt(10, 5, '@', ConsoleColor.Yellow);
ClearAt(10, 5);
```

</v-click>

---

# Le principe du mouvement

Pour créer l'illusion de mouvement :

<div class="grid grid-cols-3 gap-4 text-center mt-8">

<div class="bg-red-100 text-red-900 p-4 rounded">

### 1. Effacer
```csharp
ClearAt(oldX, oldY);
```
Ancienne position

</div>

<div class="bg-yellow-100 text-yellow-900 p-4 rounded">

### 2. Modifier
```csharp
x = x + 1;
// ou y = y - 1;
```
Coordonnées

</div>

<div class="bg-green-100 text-green-900 p-4 rounded">

### 3. Dessiner
```csharp
DrawAt(x, y, '@', color);
```
Nouvelle position

</div>

</div>

<v-click>

<div class="mt-8 text-center text-xl">

C'est le principe de **toute animation** en programmation !

</div>

</v-click>

---

# Les directions

```
              ↑ Haut
              Y--

   ← Gauche        Droite →
      X--     @       X++

              ↓ Bas
              Y++
```

| Touche | Action |
|--------|--------|
| Flèche droite | `x++` |
| Flèche gauche | `x--` |
| Flèche haut | `y--` ⚠️ |
| Flèche bas | `y++` ⚠️ |

---

# Contrôle au clavier

```csharp
switch (key.Key)
{
    case ConsoleKey.RightArrow:
        x++;
        break;
    case ConsoleKey.LeftArrow:
        x--;
        break;
    case ConsoleKey.UpArrow:
        y--;        // Haut = Y diminue !
        break;
    case ConsoleKey.DownArrow:
        y++;        // Bas = Y augmente !
        break;
}
```

---

# Boucle de jeu complète

```csharp
int x = 10, y = 5;
Console.CursorVisible = false;
DrawAt(x, y, '@', ConsoleColor.Yellow);

while (true)
{
    ConsoleKeyInfo key = Console.ReadKey(true);
    int oldX = x, oldY = y;

    // Modifier x ou y selon la touche...

    if (x != oldX || y != oldY)
    {
        ClearAt(oldX, oldY);
        DrawAt(x, y, '@', ConsoleColor.Yellow);
    }
}
```

---

# Vérifier les limites

Éviter les erreurs si on sort de l'écran :

```csharp
int minX = 0, maxX = 40;
int minY = 0, maxY = 20;

// Après modification de x et y
if (x < minX) x = minX;
if (x > maxX) x = maxX;
if (y < minY) y = minY;
if (y > maxY) y = maxY;
```

<v-click>

### Dimensions de la console

```csharp
int width = Console.WindowWidth;   // Largeur
int height = Console.WindowHeight; // Hauteur
```

</v-click>

---

# Gérer plusieurs éléments

Avec des **tableaux parallèles** :

```csharp
// 4 étoiles à l'écran
int[] starX = { 5, 15, 25, 35 };
int[] starY = { 2,  8,  4, 10 };

// Afficher toutes les étoiles
for (int i = 0; i < starX.Length; i++)
{
    DrawAt(starX[i], starY[i], '*', ConsoleColor.White);
}
```

<v-click>

| Index | starX[i] | starY[i] | Position |
|:-----:|:--------:|:--------:|:--------:|
| 0 | 5 | 2 | (5, 2) |
| 1 | 15 | 8 | (15, 8) |
| 2 | 25 | 4 | (25, 4) |
| 3 | 35 | 10 | (35, 10) |

</v-click>

---

# Détecter une collision

Deux éléments se touchent si leurs coordonnées sont identiques :

```csharp
bool CollisionAt(int x1, int y1, int x2, int y2)
{
    return x1 == x2 && y1 == y2;
}
```

<v-click>

```csharp
// Vérifier si le joueur touche l'objectif
if (CollisionAt(playerX, playerY, goalX, goalY))
{
    Console.WriteLine("Objectif atteint !");
}
```

</v-click>

---
layout: section
---

# Partie 4
## Dessiner des Formes

---

# Lignes

<div class="grid grid-cols-2 gap-4">

<div>

### Horizontale
```csharp
void DrawHLine(int x, int y, int len)
{
    for (int i = 0; i < len; i++)
    {
        Console.SetCursorPosition(x + i, y);
        Console.Write('-');
    }
}
```

</div>

<div>

### Verticale
```csharp
void DrawVLine(int x, int y, int len)
{
    for (int i = 0; i < len; i++)
    {
        Console.SetCursorPosition(x, y + i);
        Console.Write('|');
    }
}
```

</div>

</div>

---

# Rectangle vide

```csharp
void DrawRectangle(int x, int y, int width, int height)
{
    // Lignes horizontales
    DrawHLine(x, y, width);                    // Haut
    DrawHLine(x, y + height - 1, width);       // Bas

    // Lignes verticales
    DrawVLine(x, y, height);                   // Gauche
    DrawVLine(x + width - 1, y, height);       // Droite
}
```

<v-click>

```
+------------------+
|                  |
|                  |
|                  |
+------------------+
```

</v-click>

---

# Rectangle plein

```csharp
void FillRectangle(int x, int y, int width, int height, char fill)
{
    for (int row = 0; row < height; row++)
    {
        for (int col = 0; col < width; col++)
        {
            Console.SetCursorPosition(x + col, y + row);
            Console.Write(fill);
        }
    }
}
```

<v-click>

```csharp
FillRectangle(5, 3, 15, 5, '#');
```

```
###############
###############
###############
###############
###############
```

</v-click>

---

# Rectangle avec couleur de fond

```csharp
void FillColor(int x, int y, int w, int h, ConsoleColor bg)
{
    Console.BackgroundColor = bg;

    for (int row = 0; row < h; row++)
    {
        Console.SetCursorPosition(x, y + row);
        Console.Write(new string(' ', w));
    }

    Console.ResetColor();
}
```

<v-click>

```csharp
// Mini canvas avec rectangles colorés
FillColor(0, 0, 50, 15, ConsoleColor.DarkGray);   // Fond
FillColor(5, 3, 15, 6, ConsoleColor.Red);          // Rouge
FillColor(25, 5, 18, 8, ConsoleColor.Blue);        // Bleu
```

</v-click>

---

# Récapitulatif

<div class="grid grid-cols-2 gap-8">

<div>

### Coordonnées
- Origine (0,0) en **haut-gauche**
- **X** = colonne (gauche/droite)
- **Y** = ligne (**inversé !**)
- Haut = Y-- / Bas = Y++

</div>

<div>

### Méthodes clés
- `SetCursorPosition(x, y)`
- `Console.Clear()`
- `CursorVisible = false`
- `ForegroundColor` / `BackgroundColor`

</div>

</div>

<v-click>

<div class="mt-8 p-4 bg-blue-100 text-blue-900 rounded text-center">

### Mouvement = Effacer + Modifier + Dessiner

</div>

</v-click>

---

# Vers la POO

<div class="grid grid-cols-2 gap-8">

<div>

### Maintenant (Procédural)
```csharp
// Tableaux parallèles
int[] snailX = { 2, 2, 2 };
int[] snailY = { 2, 4, 6 };
int[] snailEnergy = { 100, 100, 100 };

// Fonctions préfixées
void Snail_Draw(int i) { }
void Snail_Move(int i) { }
```

</div>

<div>

### Bientôt (POO)
```csharp
class Snail
{
    // Attributs
    int x;
    int y;
    int energy;

    // Méthodes
    void Draw() { }
    void Move() { }
}
```

</div>

</div>

<v-click>

<div class="mt-4 text-center text-xl">

Les **tableaux parallèles** → **attributs d'objet**

</div>

</v-click>

---
layout: center
class: text-center
---

# Questions ?

<div class="pt-12">
  <span class="px-4 py-2 rounded bg-green-500 text-white text-xl">
    Prêts à faire bouger des objets !
  </span>
</div>
