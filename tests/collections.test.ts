import { CollectionsService } from '../src/collections';

describe('CollectionsService', () => {
  let collectionId: string;
  const pinId = "pin12345";

  beforeAll(() => {
    // Create a new collection and save its ID for further testing
    const collection = CollectionsService.createCollection("Test Collection", "A test collection for PINs");
    collectionId = collection.id;
  });

  it('should create a new collection', () => {
    const collection = CollectionsService.createCollection("NYC Tour", "A curated collection of NYC's best spots.");

    expect(collection).toBeDefined();
    expect(collection.id).toBeDefined();
    expect(collection.name).toBe("NYC Tour");
    expect(collection.description).toBe("A curated collection of NYC's best spots.");
    expect(collection.pins).toEqual([]);
  });

  it('should add a PIN to the collection', () => {
    CollectionsService.addPinToCollection(collectionId, pinId);
    const collection = CollectionsService.getCollection(collectionId);

    expect(collection).toBeDefined();
    expect(collection?.pins).toContain(pinId);
  });

  it('should not add the same PIN twice to the collection', () => {
    CollectionsService.addPinToCollection(collectionId, pinId);
    const collection = CollectionsService.getCollection(collectionId);

    expect(collection).toBeDefined();
    expect(collection?.pins.filter(id => id === pinId).length).toBe(1); // Ensure the PIN is added only once
  });

  it('should remove a PIN from the collection', () => {
    CollectionsService.removePinFromCollection(collectionId, pinId);
    const collection = CollectionsService.getCollection(collectionId);

    expect(collection).toBeDefined();
    expect(collection?.pins).not.toContain(pinId);
  });

  it('should retrieve a collection by ID', () => {
    const collection = CollectionsService.getCollection(collectionId);

    expect(collection).toBeDefined();
    expect(collection?.id).toBe(collectionId);
    expect(collection?.name).toBe("Test Collection");
  });

  it('should return undefined for a non-existent collection', () => {
    const collection = CollectionsService.getCollection("nonexistent_id");

    expect(collection).toBeUndefined();
  });

  it('should list all collections', () => {
    const collections = CollectionsService.listCollections();

    expect(collections).toBeDefined();
    expect(Array.isArray(collections)).toBe(true);
    expect(collections.length).toBeGreaterThan(0);
  });
});
