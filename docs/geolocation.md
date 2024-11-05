# Geolocation Module

The Geolocation Module in the Pincast SDK provides an easy way to access the user's geolocation. This module returns an object similar to VueUse’s `useGeolocation` function, including latitude, longitude, and other geolocation information. Additionally, it provides methods to pause and resume geolocation tracking.

## Installation

To install the Pincast SDK, follow the [Getting Started](index.md#getting-started) instructions in the main documentation.

## Usage Example

Here's how to use the Geolocation Module:

```typescript
import { useGeolocation } from 'pincast-sdk';

const { coords, locatedAt, error, resume, pause } = useGeolocation();

console.log(coords); // Access latitude, longitude, etc.
```

## Output Example

The `coords` object may look like this:

```json
{
  "accuracy": 0,
  "latitude": null,
  "longitude": null,
  "altitude": null,
  "altitudeAccuracy": null,
  "heading": null,
  "speed": null
}
```

`locatedAt` will contain the timestamp when geolocation was last updated, and `error` will contain any error message if geolocation fails.

## API Reference

- **`coords`**: An object containing the geolocation data.
  - `latitude`: The latitude in decimal degrees.
  - `longitude`: The longitude in decimal degrees.
  - `accuracy`: Accuracy of the latitude and longitude in meters.
  - `altitude`: The altitude in meters above sea level.
  - `altitudeAccuracy`: Accuracy of the altitude in meters.
  - `heading`: The direction the device is facing in degrees relative to true north.
  - `speed`: The speed in meters per second.

- **`locatedAt`**: A `Date` object representing the timestamp of the last successful geolocation retrieval, or `null` if not available.

- **`error`**: A string containing the error message if geolocation fails, or `null` if there are no errors.

- **`resume`**: A method to start or resume watching the user’s geolocation.

- **`pause`**: A method to pause geolocation tracking.

## Example

```typescript
import { useGeolocation } from 'pincast-sdk';

const { coords, locatedAt, error, resume, pause } = useGeolocation();

// Start tracking geolocation
resume();

// Pause tracking
pause();

// Check for errors
if (error) {
  console.error("Geolocation error:", error);
}
```

This module provides a straightforward way to access and manage geolocation data within your app, making it easy to build location-based experiences.