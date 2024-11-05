# Audio Module

The Audio Module in the Pincast SDK allows you to record audio from a user's device and store it in various locations: AWS S3, Azure Blob Storage, or a specified local directory.

## Installation

To install the Pincast SDK and required dependencies, follow the [Getting Started](index.md#getting-started) instructions in the main documentation.

If you haven't already, make sure to install dependencies for AWS and Azure storage:

```bash
npm install @aws-sdk/client-s3 @azure/storage-blob
```

## Usage Example

### Basic Audio Recording

To record audio from the user’s device:

```typescript
import { AudioRecorder } from 'pincast-sdk';

const recorder = new AudioRecorder();

await recorder.startRecording();
// Record for a few seconds, then stop
const audioBlob = await recorder.stopRecording();
console.log("Recorded audio:", audioBlob);
```

### Storing the Audio Recording
Once the recording is complete, you can store the audio in any of the following locations:

1. AWS S3
2. Azure Blob Storage
3. Local Directory

Here’s an example for each storage option:

#### Storing in AWS S3

```typescript
const storageConfig = {
  s3: {
    bucketName: 'your-s3-bucket',
    accessKeyId: 'your-access-key-id',
    secretAccessKey: 'your-secret-access-key',
    region: 'your-region',
  },
};

const s3Url = await recorder.saveRecording(audioBlob, storageConfig);
console.log("Audio saved to S3 at:", s3Url);
```

####  Storing in Azure Blob Storage

```typescript
const storageConfig = {
  azure: {
    containerName: 'your-container-name',
    connectionString: 'your-azure-connection-string',
  },
};

const azureUrl = await recorder.saveRecording(audioBlob, storageConfig);
console.log("Audio saved to Azure Blob Storage at:", azureUrl);
```

#### Storing Locally

```typescript
const storageConfig = {
  local: {
    directory: '/path/to/save/audio/files',
  },
};

const localPath = await recorder.saveRecording(audioBlob, storageConfig);
console.log("Audio saved locally at:", localPath);
```

## API Reference

### Methods

`startRecording`

Starts recording audio from the user’s device. Requests microphone access.

**Usage:**

```typescript
await recorder.startRecording();
```

`stopRecording`

Stops the recording and returns the audio as a `Blob`.

Returns: `Promise<Blob>`

**Usage:**

```typescript
const audioBlob = await recorder.stopRecording();
```

`saveRecording`

Saves the recorded audio to the specified storage destination. The storage destination is configured through a `storageConfig` object, which may specify an S3 bucket, Azure Blob Storage container, or a local directory.

**Parameters:**
- `audioBlob` (Blob): The audio blob to be saved.
- `storageConfig` (object): Configuration for the storage location.

Returns: `Promise<string>` - URL or file path to the stored audio.

```typescript
const storageConfig = {
  s3: { ... },
  azure: { ... },
  local: { ... },
};

const resultUrl = await recorder.saveRecording(audioBlob, storageConfig);
```

### Configuration Options

The `storageConfig` parameter in `saveRecording` specifies the destination and credentials required for storage.

- **AWS S3 Configuration (`s3`)**
  - `bucketName` (string): The S3 bucket to store the audio.
  - `accessKeyId` (string): Your AWS Access Key ID.
  - `secretAccessKey` (string): Your AWS Secret Access Key.
  - `region` (string): AWS region for the bucket.

- **Azure Blob Storage Configuration (`azure`)**
  - `containerName` (string): The Azure Blob container name.
  - `connectionString` (string): Connection string for Azure storage.

- **Local Storage Configuration (`local`)**
  - `directory` (string): Directory path where audio will be saved.

## Examples

Here’s a complete example of recording audio and saving it to AWS S3:

```typescript
import { AudioRecorder } from 'pincast-sdk';

async function recordAndStoreAudio() {
  const recorder = new AudioRecorder();

  await recorder.startRecording();
  console.log("Recording...");
  // Wait a few seconds
  const audioBlob = await recorder.stopRecording();
  console.log("Recording stopped.");

  const storageConfig = {
    s3: {
      bucketName: 'your-s3-bucket',
      accessKeyId: 'your-access-key-id',
      secretAccessKey: 'your-secret-access-key',
      region: 'your-region',
    },
  };

  const s3Url = await recorder.saveRecording(audioBlob, storageConfig);
  console.log("Audio saved to S3 at:", s3Url);
}

recordAndStoreAudio();
```

This module provides a robust solution for capturing and saving audio data in a variety of storage locations, enabling flexibility in storage strategies for your app.