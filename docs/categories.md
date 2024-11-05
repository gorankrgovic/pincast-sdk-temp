# Categories Module

The Categories Module in the Pincast SDK provides access to predefined content categories on the platform. You can use this module to retrieve the full list of categories or look up specific categories by their key or name.

## Usage Example

Here’s how to use the Categories Module to interact with Pincast categories:

```typescript
import { CategoryService } from 'pincast-sdk';

// Get all categories
const allCategories = CategoryService.getAllCategories();
console.log(allCategories);

// Get a specific category by key
const toursCategory = CategoryService.getCategoryByKey('tours_sightseeing');
console.log(toursCategory);

// Get a specific category by name (case-insensitive)
const fitnessCategory = CategoryService.getCategoryByName('Fitness & Wellness');
console.log(fitnessCategory);
```

## API Reference

Retrieves the complete list of available categories on the Pincast platform.

```typescript
const categories = CategoryService.getAllCategories();
console.log(categories);
```

Retrieves a category by its unique `key`.

```typescript
const category = CategoryService.getCategoryByKey('tours_sightseeing');
console.log(category);
```

Returns: `Category | undefined` - The category object if found, or undefined if not found.


Retrieves a category by its name, using a case-insensitive match.

```typescript
const category = CategoryService.getCategoryByName('Fitness & Wellness');
console.log(category);
```

Returns: `Category | undefined` - The category object if found, or undefined if not found.

## Example

Here’s a complete example of using the `CategoryService` module to retrieve categories:

```typescript
import { CategoryService } from 'pincast-sdk';

function displayCategories() {
  // Retrieve and log all categories
  const allCategories = CategoryService.getAllCategories();
  console.log("All Categories:", allCategories);

  // Find and display a category by key
  const categoryByKey = CategoryService.getCategoryByKey('historical_cultural');
  console.log("Category by Key:", categoryByKey);

  // Find and display a category by name
  const categoryByName = CategoryService.getCategoryByName('Local Hidden Gems');
  console.log("Category by Name:", categoryByName);

  // Attempt to retrieve a non-existent category to test undefined result
  const invalidCategory = CategoryService.getCategoryByKey('nonexistent_key');
  console.log("Invalid Category:", invalidCategory);
}

displayCategories();
```

This module provides a structured way to interact with Pincast’s content categories, enabling easy access by key or name and supporting flexible content organization.