interface Collection {
    id: string;
    name: string;
    description?: string;
    pins: string[]; // Array of PIN IDs
  }
  
  export class CollectionsService {
    private static collections: Collection[] = [];
  
    // Creates a new collection and returns it
    static createCollection(name: string, description?: string): Collection {
      const newCollection: Collection = {
        id: this.generateId(),
        name,
        description,
        pins: [],
      };
      this.collections.push(newCollection);
      return newCollection;
    }
  
    // Adds a PIN to a specific collection
    static addPinToCollection(collectionId: string, pinId: string): void {
      const collection = this.collections.find((c) => c.id === collectionId);
      if (!collection) throw new Error("Collection not found.");
      if (!collection.pins.includes(pinId)) {
        collection.pins.push(pinId);
      }
    }
  
    // Removes a PIN from a specific collection
    static removePinFromCollection(collectionId: string, pinId: string): void {
      const collection = this.collections.find((c) => c.id === collectionId);
      if (!collection) throw new Error("Collection not found.");
      collection.pins = collection.pins.filter((id) => id !== pinId);
    }
  
    // Retrieves a collection by ID
    static getCollection(collectionId: string): Collection | undefined {
      return this.collections.find((c) => c.id === collectionId);
    }
  
    // Lists all collections
    static listCollections(): Collection[] {
      return this.collections;
    }
  
    // Helper function to generate unique IDs
    private static generateId(): string {
      return Math.random().toString(36).substr(2, 9);
    }
  }
  