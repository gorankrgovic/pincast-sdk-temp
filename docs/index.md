# Pincast SDK Documentation

Welcome to the **Pincast SDK** documentation! The Pincast SDK provides tools for building location-based audio and interaction experiences. This SDK includes modules for recording audio, accessing geolocation, and more.

## Table of Contents

- [Modules](#modules)
- [Getting Started](#getting-started)
- [Usage](#usage)

---

## Modules

Each module in the Pincast SDK is designed to be standalone, so you can import only what you need.

- [Audio Module](audio.md): Tools for recording audio directly from the user’s device.
- [Geolocation Module](geolocation.md): Provides access to geolocation information in a standardized format.
- [Speech Synthesis Module](speechSynthesis.md): Converts text to speech, allowing control over voice, pitch, rate, and volume.
- [Speech Recognition Module](speechRecognition.md): Captures and transcribes speech input with options for language, continuous listening and interim results.
- [Categories Module](categories.md): Access predefined categories for content on the Pincast platform, with methods to retrieve categories by key or name.
- [PinIt Module](pinIt.md): Formats a standardized PIN object using an audio URL, category, location, and optional metadata, making it ready for storage or API submission.
- [Collections Module](collections.md): Allows the creation and management of collections of PINs, ideal for curating themed content or tours.
- [Audio Player Module](audioPlayer.md): Provides functionality for playing, pausing, and stopping audio files with volume control and event callbacks.

## Getting Started

To start using the Pincast SDK, follow these installation steps:

### Installation

Using npm, you can add the SDK to your project:

```bash
npm install pincast-sdk
```

Or, if you prefer using yarn:

```bash
yarn add pincast-sdk
```

## Usage

Once installed, you can import individual modules as needed. Here’s an example:

```typescript
import { AudioRecorder } from 'pincast-sdk';

const recorder = new AudioRecorder();
await recorder.startRecording();
const audioBlob = await recorder.stopRecording();
```

## Contributing

If you'd like to contribute to the Pincast SDK, please follow our contribution guidelines (coming soon).

## License
This SDK is open-source and available under the MIT License.