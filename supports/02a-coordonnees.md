# Les Coordonnées 2D en Console C#

## Introduction

En programmation, positionner des éléments à l'écran nécessite de comprendre le **système de coordonnées 2D**. Ce système permet de placer du texte, des caractères ou des graphiques à des positions précises dans la console.

**Attention** : le système de coordonnées en programmation est **différent** de celui des mathématiques !

## Le Système de Coordonnées

### En Mathématiques (rappel)

En cours de maths, on apprend que :
- L'axe **X** va de gauche à droite
- L'axe **Y** va de **bas en haut**
- L'origine (0,0) est en **bas à gauche**

```
    Y
    ↑
  3 |     • (3,2)
  2 |
  1 |
  0 +---+---+---+--→ X
    0   1   2   3
```

### En Programmation Console

En console (et dans la plupart des systèmes graphiques) :
- L'axe **X** va de gauche à droite (identique)
- L'axe **Y** va de **haut en bas** (inversé !)
- L'origine (0,0) est en **haut à gauche**

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

### Pourquoi cette Inversion ?

L'écran affiche le texte **ligne par ligne**, de haut en bas, comme quand on lit un livre. La première ligne est donc la ligne 0, et chaque nouvelle ligne incrémente Y.

```csharp
Console.WriteLine("Ligne 0");  // Y = 0
Console.WriteLine("Ligne 1");  // Y = 1
Console.WriteLine("Ligne 2");  // Y = 2
```

### Tableau Comparatif

| Aspect | Mathématiques | Console |
|--------|---------------|---------|
| Origine (0,0) | Bas-gauche | **Haut-gauche** |
| X augmente | → droite | → droite |
| Y augmente | ↑ haut | **↓ bas** |
| Pour monter | Y++ | **Y--** |
| Pour descendre | Y-- | **Y++** |

## Positionner le Curseur

### La Méthode SetCursorPosition

`Console.SetCursorPosition(x, y)` déplace le curseur à la position spécifiée :

```csharp
Console.SetCursorPosition(x, y);
//                        ↑  ↑
//                        |  └── ligne (vertical, 0 = haut)
//                        └───── colonne (horizontal, 0 = gauche)
```

### Premier Exemple

```csharp
Console.Clear();

// Position (0,0) = coin haut-gauche
Console.SetCursorPosition(0, 0);
Console.Write("A");

// Position (10,0) = 10 colonnes à droite, toujours en haut
Console.SetCursorPosition(10, 0);
Console.Write("B");

// Position (0,5) = colonne 0, ligne 5 (5 lignes vers le BAS)
Console.SetCursorPosition(0, 5);
Console.Write("C");

// Position (10,5) = 10 à droite, 5 vers le bas
Console.SetCursorPosition(10, 5);
Console.Write("D");
```

Résultat :
```
A         B




C         D
```

### Masquer le Curseur

Pour un affichage plus propre, on peut cacher le curseur clignotant :

```csharp
Console.CursorVisible = false;  // Masquer
Console.CursorVisible = true;   // Réafficher
```

## Afficher un Caractère à une Position

### Fonction d'Affichage

```csharp
void DrawAt(int x, int y, char character)
{
    Console.SetCursorPosition(x, y);
    Console.Write(character);
}

// Usage
DrawAt(5, 3, '*');   // Affiche '*' à la position (5,3)
DrawAt(10, 7, '@');  // Affiche '@' à la position (10,7)
```

### Avec Couleur

```csharp
void DrawAt(int x, int y, char character, ConsoleColor color)
{
    Console.SetCursorPosition(x, y);
    Console.ForegroundColor = color;
    Console.Write(character);
    Console.ResetColor();
}

// Usage
DrawAt(5, 3, '*', ConsoleColor.Yellow);
DrawAt(10, 7, '@', ConsoleColor.Cyan);
```

### Effacer une Position

Pour "effacer" un caractère, on le remplace par un espace :

```csharp
void ClearAt(int x, int y)
{
    Console.SetCursorPosition(x, y);
    Console.Write(' ');
}
```

## Déplacer un Élément

### Le Principe du Déplacement

Pour créer l'illusion de mouvement :
1. **Effacer** l'élément à l'ancienne position
2. **Modifier** les coordonnées
3. **Dessiner** l'élément à la nouvelle position

```csharp
int playerX = 5;
int playerY = 3;

Console.Clear();
Console.CursorVisible = false;

// Dessiner à la position initiale
DrawAt(playerX, playerY, '@', ConsoleColor.Green);

// Attendre une touche
Console.ReadKey(true);

// Déplacer vers la droite
ClearAt(playerX, playerY);   // 1. Effacer
playerX = playerX + 1;       // 2. Modifier X
DrawAt(playerX, playerY, '@', ConsoleColor.Green);  // 3. Dessiner
```

### Les Directions

```
              ↑ Haut
              Y--

   ← Gauche   @    → Droite
      X--          X++

              ↓ Bas
              Y++
```

| Touche | Effet sur X | Effet sur Y |
|--------|-------------|-------------|
| Flèche droite | X++ | - |
| Flèche gauche | X-- | - |
| Flèche haut | - | **Y--** |
| Flèche bas | - | **Y++** |

**Piège classique** : la flèche haut **diminue** Y (on monte vers 0) !

### Exemple avec Clavier

```csharp
int x = 10;
int y = 5;

Console.Clear();
Console.CursorVisible = false;
DrawAt(x, y, '@', ConsoleColor.Yellow);

bool running = true;
while (running)
{
    ConsoleKeyInfo key = Console.ReadKey(true);

    // Sauvegarder l'ancienne position
    int oldX = x;
    int oldY = y;

    // Modifier selon la touche
    switch (key.Key)
    {
        case ConsoleKey.RightArrow: x++; break;
        case ConsoleKey.LeftArrow:  x--; break;
        case ConsoleKey.UpArrow:    y--; break;  // Haut = Y diminue !
        case ConsoleKey.DownArrow:  y++; break;  // Bas = Y augmente !
        case ConsoleKey.Escape:     running = false; break;
    }

    // Mettre à jour l'affichage si position changée
    if (x != oldX || y != oldY)
    {
        ClearAt(oldX, oldY);
        DrawAt(x, y, '@', ConsoleColor.Yellow);
    }
}
```

## Limites de l'Écran

### Dimensions de la Console

```csharp
int width = Console.WindowWidth;   // Largeur en colonnes
int height = Console.WindowHeight; // Hauteur en lignes
```

### Éviter les Erreurs

Si on positionne le curseur hors de l'écran, une exception est levée. Il faut vérifier les limites :

```csharp
// Définir les limites de jeu
int minX = 0;
int maxX = 40;
int minY = 0;
int maxY = 20;

// Après modification de x et y, vérifier les limites
if (x < minX) x = minX;
if (x > maxX) x = maxX;
if (y < minY) y = minY;
if (y > maxY) y = maxY;
```

## Stocker des Positions

### Avec Deux Variables

```csharp
int playerX = 10;
int playerY = 5;

int enemyX = 30;
int enemyY = 8;

int goalX = 45;
int goalY = 12;
```

### Avec des Tableaux (Plusieurs Éléments)

Pour gérer plusieurs éléments du même type, on utilise des **tableaux parallèles** :

```csharp
// 4 étoiles à l'écran
int[] starX = { 5, 15, 25, 35 };
int[] starY = { 2, 8, 4, 10 };

// Afficher toutes les étoiles
for (int i = 0; i < starX.Length; i++)
{
    DrawAt(starX[i], starY[i], '*', ConsoleColor.White);
}
```

### Vérifier une Collision

Deux éléments se "touchent" si leurs coordonnées sont identiques :

```csharp
bool CollisionAt(int x1, int y1, int x2, int y2)
{
    return x1 == x2 && y1 == y2;
}

// Vérifier si le joueur touche l'objectif
if (CollisionAt(playerX, playerY, goalX, goalY))
{
    Console.WriteLine("Objectif atteint !");
}
```

## Partie Avancée : Dessiner des Formes

### Dessiner une Ligne Horizontale

```csharp
void DrawHorizontalLine(int startX, int y, int length, char character)
{
    for (int x = startX; x < startX + length; x++)
    {
        Console.SetCursorPosition(x, y);
        Console.Write(character);
    }
}

// Usage : ligne de 20 tirets à partir de (5, 3)
DrawHorizontalLine(5, 3, 20, '-');
```

### Dessiner une Ligne Verticale

```csharp
void DrawVerticalLine(int x, int startY, int length, char character)
{
    for (int y = startY; y < startY + length; y++)
    {
        Console.SetCursorPosition(x, y);
        Console.Write(character);
    }
}

// Usage : ligne de 10 barres à partir de (5, 2)
DrawVerticalLine(5, 2, 10, '|');
```

### Dessiner un Rectangle Vide

```csharp
void DrawRectangle(int x, int y, int width, int height)
{
    // Ligne du haut
    DrawHorizontalLine(x, y, width, '-');

    // Ligne du bas
    DrawHorizontalLine(x, y + height - 1, width, '-');

    // Côté gauche
    DrawVerticalLine(x, y, height, '|');

    // Côté droit
    DrawVerticalLine(x + width - 1, y, height, '|');

    // Coins
    Console.SetCursorPosition(x, y);
    Console.Write('+');
    Console.SetCursorPosition(x + width - 1, y);
    Console.Write('+');
    Console.SetCursorPosition(x, y + height - 1);
    Console.Write('+');
    Console.SetCursorPosition(x + width - 1, y + height - 1);
    Console.Write('+');
}

// Usage
DrawRectangle(5, 2, 20, 8);
```

Résultat :
```
    +------------------+
    |                  |
    |                  |
    |                  |
    |                  |
    |                  |
    |                  |
    +------------------+
```

### Dessiner un Rectangle Plein

```csharp
void FillRectangle(int x, int y, int width, int height, char fill)
{
    for (int row = y; row < y + height; row++)
    {
        for (int col = x; col < x + width; col++)
        {
            Console.SetCursorPosition(col, row);
            Console.Write(fill);
        }
    }
}

// Usage : rectangle plein de '#'
FillRectangle(10, 5, 15, 6, '#');
```

### Dessiner avec Couleur de Fond

```csharp
void FillRectangleColor(int x, int y, int width, int height, ConsoleColor bgColor)
{
    Console.BackgroundColor = bgColor;

    for (int row = y; row < y + height; row++)
    {
        Console.SetCursorPosition(x, row);
        Console.Write(new string(' ', width));
    }

    Console.ResetColor();
}

// Usage : rectangle bleu
FillRectangleColor(5, 3, 20, 10, ConsoleColor.Blue);
```

### Exemple : Mini Canvas

```csharp
Console.Clear();
Console.CursorVisible = false;

// Fond gris foncé
FillRectangleColor(0, 0, 60, 20, ConsoleColor.DarkGray);

// Rectangle rouge
FillRectangleColor(5, 3, 15, 8, ConsoleColor.Red);

// Rectangle vert
FillRectangleColor(25, 5, 20, 10, ConsoleColor.Green);

// Rectangle bleu (superposé)
FillRectangleColor(15, 8, 18, 6, ConsoleColor.Blue);

// Cadre autour du canvas
Console.ForegroundColor = ConsoleColor.White;
DrawRectangle(0, 0, 60, 20);

Console.SetCursorPosition(0, 22);
```

## Résumé

| Opération | Code |
|-----------|------|
| Positionner le curseur | `Console.SetCursorPosition(x, y);` |
| Masquer le curseur | `Console.CursorVisible = false;` |
| Effacer l'écran | `Console.Clear();` |
| Couleur de texte | `Console.ForegroundColor = color;` |
| Couleur de fond | `Console.BackgroundColor = color;` |
| Réinitialiser couleurs | `Console.ResetColor();` |
| Taille console | `Console.WindowWidth`, `Console.WindowHeight` |

## Points Importants

1. L'origine **(0,0)** est en **haut à gauche**, pas en bas à gauche
2. **Y augmente vers le bas** (inverse des maths)
3. Pour **monter** à l'écran, il faut **diminuer Y**
4. Pour **descendre**, il faut **augmenter Y**
5. Toujours **vérifier les limites** avant de positionner le curseur
6. Le mouvement = effacer + modifier coordonnées + redessiner
7. Les **tableaux parallèles** permettent de gérer plusieurs éléments avec leurs positions
