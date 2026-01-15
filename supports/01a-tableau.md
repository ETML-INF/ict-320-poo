# Les Tableaux en C#

## Introduction

Un **tableau** (array) est une structure de données qui permet de stocker plusieurs valeurs du même type dans une seule variable. Chaque élément est accessible via un **indice** (index) qui commence à **0**.

## Déclaration et Initialisation

### Méthode 1 : Initialisation directe avec accolades

La manière la plus concise de créer un tableau avec des valeurs connues :

```csharp
// Array of integers
int[] scores = { 100, 85, 92, 78, 95 };

// Array of strings
string[] names = { "Alice", "Bob", "Charlie" };
```

Le compilateur détermine automatiquement la taille du tableau en comptant les éléments.

### Méthode 2 : Déclaration avec taille fixe

Quand on connaît la taille mais pas encore les valeurs :

```csharp
// Array of 7 integers (all initialized to 0)
int[] numbers = new int[7];

// Array of 5 strings (all initialized to null)
string[] cities = new string[5];
```

**Valeurs par défaut** :
- `int`, `double`, etc. → `0`
- `string`, objets → `null`
- `bool` → `false`

### Méthode 3 : Affectation élément par élément

On peut remplir le tableau index par index :

```csharp
// Create empty array
int[] values = new int[4];

// Fill each element
values[0] = 10;
values[1] = 20;
values[2] = 30;
values[3] = 40;

// Same with strings
string[] fruits = new string[3];
fruits[0] = "Apple";
fruits[1] = "Banana";
fruits[2] = "Cherry";
```

### Méthode 4 : Combinaison new + accolades

Syntaxe explicite avec `new` :

```csharp
int[] data = new int[] { 1, 2, 3, 4, 5 };

string[] colors = new string[] { "Red", "Green", "Blue" };

// Or with size (must match element count)
int[] fixed = new int[3] { 10, 20, 30 };
```

## Accès aux Éléments

### Lecture

```csharp
string[] days = { "Monday", "Tuesday", "Wednesday" };

string first = days[0];    // "Monday"
string second = days[1];   // "Tuesday"
string last = days[2];     // "Wednesday"
```

### Modification

```csharp
int[] scores = { 100, 85, 92 };

scores[1] = 90;  // Change 85 to 90
// scores is now { 100, 90, 92 }
```

### Propriété Length

Pour connaître la taille d'un tableau :

```csharp
int[] numbers = { 10, 20, 30, 40, 50 };
int size = numbers.Length;  // 5

// Access last element
int lastElement = numbers[numbers.Length - 1];  // 50
```

## Parcours d'un Tableau

### Avec une boucle for

```csharp
string[] menu = { "Play", "Options", "Quit" };

for (int i = 0; i < menu.Length; i++)
{
    Console.WriteLine($"{i + 1}. {menu[i]}");
}
```

### Avec une boucle foreach

```csharp
int[] scores = { 100, 85, 92, 78 };

foreach (int score in scores)
{
    Console.WriteLine(score);
}
```

## Modifier la Taille d'un Tableau

En C#, les tableaux ont une **taille fixe**. On ne peut pas directement ajouter ou supprimer des éléments. Il faut créer un nouveau tableau.

### Méthode 1 : Array.Resize

La méthode `Array.Resize` crée un nouveau tableau et copie les éléments existants :

```csharp
string[] names = { "Alice", "Bob" };
// names.Length = 2

// Increase size to 4
Array.Resize(ref names, 4);
// names.Length = 4
// names = { "Alice", "Bob", null, null }

// Add new elements
names[2] = "Charlie";
names[3] = "Diana";

// Decrease size (elements are lost)
Array.Resize(ref names, 2);
// names = { "Alice", "Bob" }
```

**Attention** : Le mot-clé `ref` est obligatoire car `Resize` remplace la référence du tableau.

### Méthode 2 : Array.Copy

Pour plus de contrôle, on peut copier manuellement vers un nouveau tableau :

```csharp
int[] original = { 10, 20, 30 };

// Create larger array
int[] larger = new int[5];

// Copy all elements from original to larger
Array.Copy(original, larger, original.Length);
// larger = { 10, 20, 30, 0, 0 }

// Add new elements
larger[3] = 40;
larger[4] = 50;
```

#### Copie partielle

On peut copier seulement une partie du tableau :

```csharp
int[] source = { 1, 2, 3, 4, 5 };
int[] destination = new int[3];

// Copy 3 elements starting from index 0
Array.Copy(source, 0, destination, 0, 3);
// destination = { 1, 2, 3 }

// Copy from middle of source
Array.Copy(source, 2, destination, 0, 3);
// destination = { 3, 4, 5 }
```

### Exemple complet : Ajouter un élément

Fonction pour ajouter un élément à la fin d'un tableau :

```csharp
int[] numbers = { 10, 20, 30 };

// Add element 40
numbers = AddElement(numbers, 40);
// numbers = { 10, 20, 30, 40 }

int[] AddElement(int[] array, int newValue)
{
    // Create new array with one more slot
    int[] newArray = new int[array.Length + 1];

    // Copy existing elements
    Array.Copy(array, newArray, array.Length);

    // Add new element at the end
    newArray[array.Length] = newValue;

    return newArray;
}
```

Version avec `Array.Resize` :

```csharp
int[] numbers = { 10, 20, 30 };

// Add element 40
Array.Resize(ref numbers, numbers.Length + 1);
numbers[numbers.Length - 1] = 40;
// numbers = { 10, 20, 30, 40 }
```

## Résumé

| Opération | Syntaxe |
|-----------|---------|
| Déclaration avec valeurs | `int[] arr = { 1, 2, 3 };` |
| Déclaration avec taille | `int[] arr = new int[5];` |
| Accès lecture | `int x = arr[0];` |
| Accès écriture | `arr[0] = 10;` |
| Taille | `arr.Length` |
| Redimensionner | `Array.Resize(ref arr, newSize);` |
| Copier | `Array.Copy(source, dest, length);` |

## Points Importants

1. Les indices commencent à **0** (le premier élément est `arr[0]`)
2. Accéder à un indice hors limites provoque une exception `IndexOutOfRangeException`
3. La taille d'un tableau est **fixe** après création
4. `Array.Resize` et `Array.Copy` créent de **nouveaux tableaux** en mémoire
5. Pour des collections dynamiques, préférer `List<T>` (hors scope de ce document)
