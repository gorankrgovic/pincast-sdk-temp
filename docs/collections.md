# Collections Module

The Collections Module in the Pincast SDK allows you to create and manage collections of PINs. Collections are groups of PINs, identified by unique IDs, that can be used to curate themed content, tours, or related items.

Currently, collections are stored in memory within the SDK, making this module suitable for testing and prototyping. This setup is also future-ready for eventual API integration.

## Usage Example

Here's how to use the Collections Module to create, manage, and retrieve collections:

```typescript
import { CollectionsService } from 'pincast-sdk';

// Create a new collection
const newCollection = CollectionsService.createCollection("NYC Tour", "A curated collection of NYC's best spots.");
console.log("New Collection:", newCollection);

// Add a PIN to the collection
CollectionsService.addPinToCollection(newCollection.id, "abc123xyz");

// Retrieve and view the collection
const collection = CollectionsService.getCollection(newCollection.id);
console.log("Retrieved Collection:", collection);

// List all collections
const allCollections = CollectionsService.listCollections();
console.log("All Collections:", allCollections);

// Remove a PIN from the collection
CollectionsService.removePinFromCollection(newCollection.id, "abc123xyz");

// Verify that the PIN has been removed
const updatedCollection = CollectionsService.getCollection(newCollection.id);
console.log("Updated Collection:", updatedCollection);
```

## API Reference

### Methods

#### `createCollection`

Creates a new collection and returns it.

**Parameters**:
- `name` (string): The name of the collection.
- `description` (string, optional): A description of the collection.

**Returns**: `Collection` - The newly created collection object with an empty `pins` array and a unique `id`.

**Usage**: See code example below.

```typescript
const newCollection = CollectionsService.createCollection("NYC Tour", "A curated collection of NYC's best spots.");
console.log(newCollection);
```

#### `addPinToCollection`

Adds a PIN to a specific collection, identified by `collectionId`.

**Parameters**:
- `collectionId` (string): The unique ID of the collection.
- `pinId` (string): The unique ID of the PIN to be added.

**Usage**: See code example below.

```typescript
CollectionsService.addPinToCollection(newCollection.id, "pin12345");
```

#### `removePinFromCollection`

Removes a specific PIN from a collection.

**Parameters**:
- `collectionId` (string): The unique ID of the collection.
- `pinId` (string): The unique ID of the PIN to be removed.

**Usage**: See code example below.

```typescript
CollectionsService.removePinFromCollection(newCollection.id, "pin12345");
```

#### `getCollection`

Retrieves a collection by its unique ID, including all associated PINs.

**Parameters**:
- `collectionId` (string): The unique ID of the collection.

**Returns**: `Collection | undefined` - The collection object if found, or `undefined` if not found.

**Usage**: See code example below.

```typescript
const collection = CollectionsService.getCollection(newCollection.id);
console.log(collection);
```

#### `listCollections`

Lists all collections currently stored in memory.

**Returns**: `Collection[]` - An array of all collection objects.

**Usage**: See code example below.

```typescript
const allCollections = CollectionsService.listCollections();
console.log(allCollections);
```

## Example Output

Creating a collection and adding a PIN might produce the following:

```json
{
  "id": "xyz789abc",
  "name": "NYC Tour",
  "description": "A curated collection of NYC's best spots.",
  "pins": ["abc123xyz"],
  "createdAt": "2024-11-05T12:34:56.789Z"
}
```

This module provides a flexible way to group related content, organize themed collections, and curate content for specific purposes.