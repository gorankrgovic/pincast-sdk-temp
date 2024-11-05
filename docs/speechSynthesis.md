# Speech Synthesis Module

The Speech Synthesis Module in the Pincast SDK provides an interface for converting text to speech using the Web Speech API. With this module, you can set text, control playback, adjust voice, pitch, rate, and volume, and manage playback using start, pause, resume, and cancel functions.

## Installation

To install the Pincast SDK and use the Speech Synthesis module, follow the [Getting Started](index.md#getting-started) instructions in the main documentation.

## Usage Example

Here's how to use the Speech Synthesis Module:

```typescript
import { useSpeechSynthesis } from 'pincast-sdk';

const { start, pause, resume, cancel, setText, setVoice, config } = useSpeechSynthesis();

// Set the text and start speaking
setText("Hello, welcome to Pincast SDK!");
start();

// Pause and resume as needed
pause();
resume();

// Change the voice or text and restart
const newVoice = window.speechSynthesis.getVoices().find(voice => voice.name === 'Google UK English Male');
if (newVoice) setVoice(newVoice);
setText("This is another example.");
start();
```

### Configuration Options

The `config` object contains various properties that control the speech synthesis output.

- **`text`** (string): The text to be spoken.
- **`lang`** (string, optional): The language of the speech synthesis (default is `en-US`).
- **`pitch`** (number, optional): Controls the pitch of the speech (default is `1`).
- **`rate`** (number, optional): Controls the speed of the speech (default is `1`).
- **`volume`** (number, optional): Controls the volume of the speech (default is `1`).
- **`voice`** (SpeechSynthesisVoice, optional): Specifies the voice to be used. Available voices can be retrieved from `window.speechSynthesis.getVoices()`.

## API Reference

### Methods

`start`

Starts speaking the configured text. Initializes a new speech synthesis utterance based on the `config` options.

**Usage**

```typescript
start();
```

`pause`

Pauses the current speech if it is speaking.

**Usage**

```typescript
pause();
```

`resume`

Resumes the speech if it was paused.

**Usage**

```typescript
resume();
```

`cancel`

Stops the speech synthesis and clears the current utterance.

**Usage**

```typescript
cancel();
```

`setVoice`

Sets the voice for speech synthesis.

Parameter:

- `voice` (SpeechSynthesisVoice): The voice to be used for speech synthesis.

**Usage**

```typescript
const newVoice = window.speechSynthesis.getVoices().find(voice => voice.name === 'Google UK English Male');
if (newVoice) setVoice(newVoice);
```

`setText`

Sets the text for speech synthesis.

Parameter:

- `text` (string): The text to be spoken.

**Usage**

```typescript
setText("This is the text to be spoken.");
```

## Example

Here’s a complete example of using the `useSpeechSynthesis` function with various options:

```typescript
import { useSpeechSynthesis } from 'pincast-sdk';

async function speakText() {
  const { start, pause, resume, cancel, setText, setVoice, config } = useSpeechSynthesis();

  setText("Welcome to the Pincast SDK's Speech Synthesis module!");
  const availableVoices = window.speechSynthesis.getVoices();
  const selectedVoice = availableVoices.find(voice => voice.lang === 'en-GB');
  
  if (selectedVoice) setVoice(selectedVoice);

  // Set configuration options
  config.pitch = 1.2;
  config.rate = 1;
  config.volume = 0.8;

  // Start speaking
  start();

  // Optional: Control playback
  setTimeout(() => pause(), 2000);  // Pause after 2 seconds
  setTimeout(() => resume(), 4000); // Resume after 4 seconds
  setTimeout(() => cancel(), 6000); // Cancel after 6 seconds
}

speakText();
```

This module provides a flexible way to add text-to-speech functionality to your app, with customizable voice, language, pitch, rate, and volume options.

