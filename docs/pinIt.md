# PinIt Module

The PinIt Module in the Pincast SDK provides a simple way to create a standardized "PIN" object, which includes audio content, category, location, and optional metadata. This PIN object is structured to be easily stored in a database or sent to an API for further use.

## Usage Example

Here's how to use the PinIt Module to create a PIN object:

```typescript
import { PinIt } from 'pincast-sdk';
import { useGeolocation } from 'pincast-sdk';
import { CategoryService } from 'pincast-sdk';

// Define audio URL and fetch a valid category
const audioUrl = 'https://example.com/audio/12345.mp3';
const categoryKey = 'tours_sightseeing';
const category = CategoryService.getCategoryByKey(categoryKey);

if (!category) {
  throw new Error(`Category ${categoryKey} is invalid.`);
}

// Initialize and activate geolocation
const { coords, resume } = useGeolocation();
resume(); // Trigger location retrieval

// Check if location data is available
if (!coords.latitude || !coords.longitude) {
  throw new Error("Geolocation data is not available.");
}

// Use the coordinates from geolocation
const location = {
  latitude: coords.latitude,
  longitude: coords.longitude,
};

// Optional metadata
const options = {
  title: "New York City Tour",
  description: "A comprehensive audio guide through NYC’s iconic spots.",
  tags: ["tour", "NYC", "landmarks"],
};

// Create a PIN object
const pin = PinIt.createPin(audioUrl, categoryKey, location, options);
console.log(pin);
```

## API Reference

### Methods

#### `createPin`

Creates a new PIN object with the specified audio URL, category, location, and optional metadata.

**Parameters**:
- `audioUrl` (string): The URL or identifier for the audio file. This is required.
- `category` (string): The key for the category. This is validated against Pincast categories and must match a predefined category key.
- `location` (object): An object with `latitude` and `longitude` properties representing the coordinates for the PIN location. Both properties are required.
  - **`latitude`** (number): Latitude in decimal degrees.
  - **`longitude`** (number): Longitude in decimal degrees.
- `options` (object, optional): Additional metadata for the PIN. This is optional but allows for greater customization and includes:
  - **`title`** (string, optional): A title for the PIN.
  - **`description`** (string, optional): A description providing more context about the PIN.
  - **`tags`** (array of strings, optional): Tags to categorize or label the PIN.

**Returns**: `Pin` - A well-formatted PIN object that includes all specified parameters and a `createdAt` timestamp indicating when the PIN was created.

**Usage**:

```typescript
const pin = PinIt.createPin(audioUrl, category, location, options);
console.log(pin);
```

## Example Output

```json
{
  "pinId": "abc123xyz",
  "audioUrl": "https://example.com/audio/12345.mp3",
  "category": "tours_sightseeing",
  "location": {
    "latitude": 40.7128,
    "longitude": -74.0060
  },
  "options": {
    "title": "New York City Tour",
    "description": "A comprehensive audio guide through NYC’s iconic spots.",
    "tags": ["tour", "NYC", "landmarks"]
  },
  "createdAt": "2024-11-05T12:34:56.789Z"
}
```


## Example

Here's a complete example showing how to use createPin with geolocation and category validation:

```typescript
import { PinIt } from 'pincast-sdk';
import { useGeolocation } from 'pincast-sdk';
import { CategoryService } from 'pincast-sdk';

// Audio URL and category key
const audioUrl = 'https://example.com/audio/12345.mp3';
const categoryKey = 'tours_sightseeing';
const category = CategoryService.getCategoryByKey(categoryKey);

if (!category) {
  throw new Error(`Category ${categoryKey} is invalid.`);
}

// Fetch the current location
const { coords, resume } = useGeolocation();
resume(); 

const location = {
  latitude: coords.latitude,
  longitude: coords.longitude,
};

// Optional custom data
const options = {
  title: "Iconic New York Tour",
  description: "Discover NYC's most famous landmarks.",
  tags: ["tour", "NYC", "landmarks"],
};

// Create a PIN object
const pin = PinIt.createPin(audioUrl, categoryKey, location, options);
console.log(pin);
```

This module ensures a consistent format for PIN objects, making it easy to work with and extend in future applications.