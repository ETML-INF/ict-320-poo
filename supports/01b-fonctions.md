# Les Fonctions en C#

## Introduction

Une **fonction** (ou méthode) est un bloc de code réutilisable qui effectue une tâche spécifique. Les fonctions permettent de :
- **Organiser** le code en parties logiques
- **Réutiliser** du code sans le dupliquer
- **Simplifier** la lecture et la maintenance

## Structure d'une Fonction

```
[type_retour] NomFonction([paramètres])
{
    // Corps de la fonction
    // Instructions...
}
```

## Niveau 1 : Fonction sans retour, sans paramètre

La forme la plus simple : une fonction qui exécute une action sans recevoir ni renvoyer de données.

### Mot-clé void

`void` signifie "aucun retour". La fonction fait quelque chose mais ne renvoie pas de valeur.

```csharp
void SayHello()
{
    Console.WriteLine("Hello!");
}

void ShowMenu()
{
    Console.WriteLine("=== MENU ===");
    Console.WriteLine("1. Play");
    Console.WriteLine("2. Options");
    Console.WriteLine("3. Quit");
}

void DrawLine()
{
    Console.WriteLine("─────────────────────");
}
```

### Appel de la fonction

```csharp
// Call the functions
SayHello();      // Prints: Hello!
DrawLine();      // Prints: ─────────────────────
ShowMenu();      // Prints the menu
DrawLine();      // Prints: ─────────────────────
```

### Exemple complet

```csharp
// Main program
ShowWelcome();
ShowMenu();
ShowFooter();

// Functions
void ShowWelcome()
{
    Console.WriteLine("*************************");
    Console.WriteLine("*   WELCOME TO THE GAME *");
    Console.WriteLine("*************************");
    Console.WriteLine();
}

void ShowMenu()
{
    Console.WriteLine("1. New Game");
    Console.WriteLine("2. Load Game");
    Console.WriteLine("3. Exit");
    Console.WriteLine();
}

void ShowFooter()
{
    Console.WriteLine("Version 1.0 - 2024");
}
```

## Niveau 2 : Fonction avec retour, sans paramètre

La fonction effectue un calcul ou récupère une valeur et la **renvoie** à l'appelant.

### Mot-clé return

`return` termine la fonction et renvoie une valeur du type spécifié.

```csharp
int GetMagicNumber()
{
    return 42;
}

string GetGameTitle()
{
    return "Super Game";
}

double GetPi()
{
    return 3.14159;
}

bool IsDebugMode()
{
    return true;
}
```

### Utilisation de la valeur retournée

```csharp
// Store in variable
int number = GetMagicNumber();
Console.WriteLine(number);  // 42

// Use directly
Console.WriteLine(GetGameTitle());  // Super Game

// Use in expression
double area = GetPi() * 10 * 10;

// Use in condition
if (IsDebugMode())
{
    Console.WriteLine("Debug mode is ON");
}
```

### Exemple pratique

```csharp
string title = GetGameTitle();
int version = GetVersion();

Console.WriteLine($"{title} v{version}");

string GetGameTitle()
{
    return "Space Invaders";
}

int GetVersion()
{
    return 2;
}
```

## Niveau 3 : Fonction sans retour, avec paramètres

La fonction reçoit des **données en entrée** pour adapter son comportement.

### Paramètres

Les paramètres sont des variables déclarées entre les parenthèses :

```csharp
void SayHelloTo(string name)
{
    Console.WriteLine($"Hello, {name}!");
}

void PrintNumber(int value)
{
    Console.WriteLine($"The number is: {value}");
}

void ShowScore(string player, int score)
{
    Console.WriteLine($"{player}: {score} points");
}
```

### Appel avec arguments

Les **arguments** sont les valeurs passées lors de l'appel :

```csharp
// One parameter
SayHelloTo("Alice");       // Hello, Alice!
SayHelloTo("Bob");         // Hello, Bob!

PrintNumber(100);          // The number is: 100
PrintNumber(42);           // The number is: 42

// Multiple parameters
ShowScore("Player1", 1500);  // Player1: 1500 points
ShowScore("Player2", 2300);  // Player2: 2300 points
```

### Exemple : Affichage personnalisé

```csharp
DrawBox("GAME OVER");
DrawBox("YOU WIN!");

void DrawBox(string text)
{
    int width = text.Length + 4;
    string line = new string('═', width);

    Console.WriteLine($"╔{line}╗");
    Console.WriteLine($"║  {text}  ║");
    Console.WriteLine($"╚{line}╝");
}
```

### Plusieurs paramètres

```csharp
void DrawRectangle(int width, int height, char symbol)
{
    for (int row = 0; row < height; row++)
    {
        for (int col = 0; col < width; col++)
        {
            Console.Write(symbol);
        }
        Console.WriteLine();
    }
}

// Usage
DrawRectangle(10, 3, '*');
// **********
// **********
// **********

DrawRectangle(5, 2, '#');
// #####
// #####
```

## Niveau 4 : Fonction avec retour et paramètres

La forme la plus complète : recevoir des données, les traiter, et renvoyer un résultat.

```csharp
int Add(int a, int b)
{
    return a + b;
}

int Multiply(int x, int y)
{
    return x * y;
}

double CalculateAverage(int sum, int count)
{
    return (double)sum / count;
}

string FormatScore(string name, int score)
{
    return $"{name}: {score} pts";
}

bool IsEven(int number)
{
    return number % 2 == 0;
}
```

### Utilisation

```csharp
// Arithmetic
int sum = Add(10, 5);           // 15
int product = Multiply(4, 7);   // 28

// Chained calls
int result = Add(Multiply(2, 3), 4);  // (2*3) + 4 = 10

// Formatting
string display = FormatScore("Alice", 9500);
Console.WriteLine(display);  // Alice: 9500 pts

// Conditions
if (IsEven(42))
{
    Console.WriteLine("42 is even");
}
```

### Exemple complet : Calculatrice

```csharp
int a = 20;
int b = 5;

Console.WriteLine($"{a} + {b} = {Add(a, b)}");
Console.WriteLine($"{a} - {b} = {Subtract(a, b)}");
Console.WriteLine($"{a} * {b} = {Multiply(a, b)}");
Console.WriteLine($"{a} / {b} = {Divide(a, b)}");

int Add(int x, int y)
{
    return x + y;
}

int Subtract(int x, int y)
{
    return x - y;
}

int Multiply(int x, int y)
{
    return x * y;
}

int Divide(int x, int y)
{
    return x / y;
}
```

## Niveau 5 : Retourner plusieurs valeurs avec un tableau

En C#, une fonction ne peut retourner qu'**une seule valeur**. Pour retourner plusieurs valeurs, on peut utiliser un **tableau**.

### Retourner un tableau

```csharp
int[] GetFirstThreeNumbers()
{
    return new int[] { 1, 2, 3 };
}

string[] GetMenuOptions()
{
    return new string[] { "Play", "Options", "Quit" };
}
```

### Exemple : Statistiques

```csharp
int[] scores = { 85, 92, 78, 95, 88 };

int[] stats = CalculateStats(scores);

Console.WriteLine($"Min: {stats[0]}");   // 78
Console.WriteLine($"Max: {stats[1]}");   // 95
Console.WriteLine($"Sum: {stats[2]}");   // 438

// Returns array with [min, max, sum]
int[] CalculateStats(int[] values)
{
    int min = values[0];
    int max = values[0];
    int sum = 0;

    for (int i = 0; i < values.Length; i++)
    {
        if (values[i] < min) min = values[i];
        if (values[i] > max) max = values[i];
        sum += values[i];
    }

    return new int[] { min, max, sum };
}
```

### Exemple : Coordonnées

```csharp
int[] position = GetPlayerPosition();
int x = position[0];
int y = position[1];

Console.WriteLine($"Player is at ({x}, {y})");

int[] GetPlayerPosition()
{
    return new int[] { 100, 250 };
}
```

### Exemple : Recherche avec résultat et statut

```csharp
int[] result = FindValue(numbers, 42);
bool found = result[0] == 1;
int index = result[1];

if (found)
{
    Console.WriteLine($"Found at index {index}");
}
else
{
    Console.WriteLine("Not found");
}

// Returns [found (0 or 1), index]
int[] FindValue(int[] array, int target)
{
    for (int i = 0; i < array.Length; i++)
    {
        if (array[i] == target)
        {
            return new int[] { 1, i };  // Found at index i
        }
    }
    return new int[] { 0, -1 };  // Not found
}
```

## Modificateurs de Paramètres : in, out, ref

Par défaut, les paramètres sont passés **par valeur** : la fonction reçoit une copie. Les modificateurs `in`, `out` et `ref` changent ce comportement.

### Passage par valeur (défaut)

La fonction travaille sur une **copie** de la variable :

```csharp
int number = 10;
DoubleValue(number);
Console.WriteLine(number);  // Still 10! (not modified)

void DoubleValue(int x)
{
    x = x * 2;  // Only modifies the copy
}
```

### Modificateur ref

`ref` passe la **référence** à la variable originale. La fonction peut modifier la variable de l'appelant.

**Règles :**
- La variable doit être **initialisée** avant l'appel
- Le mot-clé `ref` est requis à la déclaration ET à l'appel

```csharp
int number = 10;
DoubleValue(ref number);
Console.WriteLine(number);  // 20 (modified!)

void DoubleValue(ref int x)
{
    x = x * 2;  // Modifies the original variable
}
```

#### Exemple pratique : Échanger deux valeurs

```csharp
int a = 5;
int b = 10;

Console.WriteLine($"Before: a={a}, b={b}");  // a=5, b=10

Swap(ref a, ref b);

Console.WriteLine($"After: a={a}, b={b}");   // a=10, b=5

void Swap(ref int x, ref int y)
{
    int temp = x;
    x = y;
    y = temp;
}
```

#### Exemple : Incrémenter un compteur

```csharp
int counter = 0;

Increment(ref counter);  // counter = 1
Increment(ref counter);  // counter = 2
Increment(ref counter);  // counter = 3

Console.WriteLine(counter);  // 3

void Increment(ref int value)
{
    value = value + 1;
}
```

### Modificateur out

`out` est similaire à `ref`, mais la variable n'a **pas besoin d'être initialisée** avant. La fonction **doit** lui assigner une valeur.

**Règles :**
- La variable peut être non-initialisée
- La fonction **doit** assigner une valeur avant de retourner
- Le mot-clé `out` est requis à la déclaration ET à l'appel

```csharp
int result;  // Not initialized
Square(5, out result);
Console.WriteLine(result);  // 25

void Square(int number, out int squared)
{
    squared = number * number;  // Must assign a value
}
```

#### Exemple pratique : Retourner plusieurs valeurs

```csharp
int quotient;
int remainder;

Divide(17, 5, out quotient, out remainder);

Console.WriteLine($"17 / 5 = {quotient} remainder {remainder}");
// 17 / 5 = 3 remainder 2

void Divide(int a, int b, out int q, out int r)
{
    q = a / b;
    r = a % b;
}
```

#### Exemple : Validation avec résultat

```csharp
string input = "42";
int value;

if (TryParse(input, out value))
{
    Console.WriteLine($"Parsed successfully: {value}");
}
else
{
    Console.WriteLine("Invalid input");
}

bool TryParse(string text, out int number)
{
    number = 0;  // Must assign a value

    foreach (char c in text)
    {
        if (c < '0' || c > '9')
        {
            return false;  // Invalid character
        }
        number = number * 10 + (c - '0');
    }
    return true;
}
```

#### Déclaration inline (C# 7+)

On peut déclarer la variable directement dans l'appel :

```csharp
if (TryParse("123", out int value))
{
    Console.WriteLine(value);  // 123
}

Divide(20, 6, out int q, out int r);
Console.WriteLine($"{q} remainder {r}");  // 3 remainder 2
```

### Modificateur in

`in` passe la référence mais en **lecture seule**. La fonction ne peut pas modifier la variable.

**Utilité :** Performance pour les grandes structures (évite la copie) tout en garantissant l'immutabilité.

```csharp
int bigNumber = 1000000;
PrintDouble(in bigNumber);
Console.WriteLine(bigNumber);  // Still 1000000 (guaranteed)

void PrintDouble(in int value)
{
    Console.WriteLine(value * 2);
    // value = 10;  // ERROR! Cannot modify 'in' parameter
}
```

#### Exemple : Calcul sans modification

```csharp
int width = 10;
int height = 5;

int area = CalculateArea(in width, in height);
Console.WriteLine($"Area: {area}");  // 50

// width and height guaranteed unchanged

int CalculateArea(in int w, in int h)
{
    return w * h;
    // Cannot modify w or h
}
```

## Tableau Récapitulatif

### Types de fonctions

| Type | Syntaxe | Exemple |
|------|---------|---------|
| void, sans param | `void Func()` | `void ShowMenu()` |
| retour, sans param | `int Func()` | `int GetScore()` |
| void, avec params | `void Func(int x)` | `void Print(int n)` |
| retour + params | `int Func(int x)` | `int Double(int n)` |
| retour multiple | `int[] Func()` | `int[] GetStats()` |

### Modificateurs de paramètres

| Modificateur | Init requise | Modifiable | Usage |
|--------------|--------------|------------|-------|
| (aucun) | Oui | Non (copie) | Cas standard |
| `ref` | Oui | Oui | Modifier la variable |
| `out` | Non | Oui (obligatoire) | Retours multiples |
| `in` | Oui | Non (lecture seule) | Performance |

## Points Importants

1. Le nom de la fonction doit décrire **ce qu'elle fait** (verbe + complément)
2. Une fonction devrait faire **une seule chose** (principe de responsabilité unique)
3. Préférer des fonctions **courtes** (10-20 lignes maximum)
4. `return` termine immédiatement la fonction
5. Les paramètres `out` doivent **toujours** recevoir une valeur
6. Utiliser `ref` avec parcimonie : préférer les retours quand possible
