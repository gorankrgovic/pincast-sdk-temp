# AudioPlayer Module

The AudioPlayer Module allows for easy playback of audio files within the Pincast SDK. It supports play, pause, stop, and volume control, with optional event callbacks for enhanced interactivity.

## Usage Example

```typescript
import { AudioPlayer } from 'pincast-sdk';

// Initialize the audio player with optional event callbacks
const player = new AudioPlayer({
  volume: 0.8,
  onPlay: () => console.log("Audio started playing"),
  onPause: () => console.log("Audio paused"),
  onStop: () => console.log("Audio stopped"),
  onEnd: () => console.log("Audio playback ended"),
});

// Play an audio file
player.play("https://example.com/audio/12345.mp3");
```

## API Reference

### Methods

#### `play`

Loads and plays audio from a specified URL.

- **Parameters**:
  - `url` (string): The URL of the audio file.
  
- **Returns**: `Promise<void>`

#### `pause`

Pauses the current audio playback.

- **Returns**: `void`

#### `stop`

Stops playback and resets the audio to the beginning.

- **Returns**: `void`

#### `setVolume`

Adjusts the playback volume.

- **Parameters**:
  - `volume` (number): Volume level between 0.0 (muted) and 1.0 (max).

- **Returns**: `void`

### Event Callbacks

- `onPlay`: Function to be called when audio starts playing.
- `onPause`: Function to be called when audio is paused.
- `onStop`: Function to be called when audio is stopped.
- `onEnd`: Function to be called when audio playback ends.