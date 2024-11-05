import { CategoryService } from './categories';

interface PinLocation {
  latitude: number;
  longitude: number;
}

interface PinOptions {
  title?: string;
  description?: string;
  tags?: string[];
  [key: string]: any; // Allows additional custom data
}

interface Pin {
  pinId: string;
  audioUrl: string;
  category: string;
  location: PinLocation;
  options?: PinOptions;
  createdAt: Date;
}

export class PinIt {
  static createPin(
    audioUrl: string,
    category: string,
    location: PinLocation,
    options?: PinOptions
  ): Pin {
    if (!audioUrl) {
      throw new Error("Audio URL is required.");
    }

    // Validate category against CategoryService
    const categoryExists = CategoryService.getCategoryByKey(category);
    if (!categoryExists) {
      throw new Error(`Invalid category: ${category}`);
    }

    // Validate location structure
    if (!location || typeof location.latitude !== "number" || typeof location.longitude !== "number") {
      throw new Error("A valid location with latitude and longitude is required.");
    }

    // Generate a unique pinId
    const pinId = this.generateId();

    // Return the well-structured PIN object
    return {
      pinId,
      audioUrl,
      category,
      location,
      options,
      createdAt: new Date(),
    };
  }

  // Helper function to generate unique IDs
  private static generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
