# Pincast SDK

Pincast SDK is a location-based social audio platform that enables lightweight augmented reality experiences, such as interactive scavenger hunts, immersive tours, live performances, and more. This SDK provides tools for recording audio, managing geolocation, synthesizing speech, recognizing speech, organizing content into collections, and playing audio files.

## Features

- **Audio Recording**: Record audio directly from the user's device.
- **Geolocation Access**: Retrieve geolocation information in a standardized format.
- **Speech Synthesis**: Convert text to speech with customizable options.
- **Speech Recognition**: Capture and transcribe speech input.
- **Content Management**: Organize PINs into collections for themed content curation.
- **Audio Playback**: Play, pause, and stop audio files with volume control.

## Installation

To install the Pincast SDK, use npm:

```bash
npm install pincast-sdk
```

## Usage

Here’s a quick example of how to use the SDK:

- Initialize the audio player and play an audio file.

## Modules

Each module in the Pincast SDK is designed to be standalone, so you can import only what you need.

- [Audio Module](docs/audio.md): Tools for recording audio directly from the user’s device, with options to store the audio in AWS S3, Azure Blob Storage, or locally.
- [Geolocation Module](docs/geolocation.md): Provides access to geolocation information in a standardized format.
- [Speech Synthesis Module](docs/speechSynthesis.md): Converts text to speech, allowing control over voice, pitch, rate, and volume.
- [Speech Recognition Module](docs/speechRecognition.md): Captures and transcribes speech input with options for language, continuous listening, and interim results.
- [Categories Module](docs/categories.md): Access predefined categories for content on the Pincast platform, with methods to retrieve categories by key or name.
- [PinIt Module](docs/pinIt.md): Formats a standardized PIN object using an audio URL, category, location, and optional metadata, making it ready for storage or API submission.
- [Collections Module](docs/collections.md): Allows the creation and management of collections of PINs, ideal for curating themed content or tours.
- [Audio Player Module](docs/audioPlayer.md): Provides functionality for playing, pausing, and stopping audio files with volume control and event callbacks.

## Contributing

Contributions are welcome! Please read the [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.