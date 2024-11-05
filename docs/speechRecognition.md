# Speech Recognition Module

The Speech Recognition Module in the Pincast SDK provides an interface for capturing speech input and converting it to text using the Web Speech API. With this module, you can start, stop, and reset the speech recognition process, configure language, continuous listening, and access interim and final text results.

## Installation

To install the Pincast SDK and use the Speech Recognition module, follow the [Getting Started](index.md#getting-started) instructions in the main documentation.

## Usage Example

Here's how to use the Speech Recognition Module:

```typescript
import { useSpeechRecognition } from 'pincast-sdk';

const { start, stop, reset, finalText, interimText, error, isListening } = useSpeechRecognition({
  lang: 'en-US',
  continuous: true,
  interimResults: true,
});

// Start listening for speech
start();

// Stop listening
stop();

// Access recognized text
console.log("Final Text:", finalText);
console.log("Interim Text:", interimText);

// Reset transcriptions
reset();

// Handle any errors
if (error) {
  console.error("Speech Recognition Error:", error);
}
```

## Configuration Options

The `useSpeechRecognition` function accepts an optional configuration object to customize the speech recognition process.

- **`lang`** (string, optional): The language of the speech recognition (default is `en-US`).
- **`continuous`** (boolean, optional): If set to `true`, the recognition will continue listening for speech until stopped (default is `false`).
- **`interimResults`** (boolean, optional): If set to `true`, interim results (in-progress transcription) will be returned before the speech is finalized (default is `false`).

## API Reference

### Properties

- **`finalText`**: A string containing the final transcribed text from the recognition session.
- **`interimText`**: A string containing the interim (in-progress) transcription text.
- **`error`**: A string containing any error message if an error occurs during recognition, or `null` if there are no errors.
- **`isListening`**: A boolean indicating whether the recognition process is actively listening for speech input.

### Methods

#### `start`

Begins the speech recognition process. Resets `finalText`, `interimText`, and `error` before starting.

**Usage**:

```typescript
start();
```

#### `stop`

Stops the speech recognition process if it is actively listening.

**Usage**:

```typescript
stop();
```

#### `reset`

Clears `finalText`, `interimText`, and `error`.

**Usage**:

```typescript
reset();
```

## Example

Here’s a complete example of using the `useSpeechRecognition` function with various options:

```typescript
import { useSpeechRecognition } from 'pincast-sdk';

async function recognizeSpeech() {
  const { start, stop, reset, finalText, interimText, error, isListening } = useSpeechRecognition({
    lang: 'en-US',
    continuous: true,
    interimResults: true,
  });

  console.log("Starting speech recognition...");
  start();

  // Listen for 5 seconds, then stop
  setTimeout(() => {
    stop();
    console.log("Stopped listening.");
    console.log("Final Text:", finalText);
    console.log("Interim Text:", interimText);
    if (error) console.error("Recognition Error:", error);
  }, 5000);

  // Reset recognition state if needed
  reset();
}

recognizeSpeech();
```


