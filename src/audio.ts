import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { BlobServiceClient } from '@azure/storage-blob';
import { promises as fs } from 'fs';
import path from 'path';

interface S3Config {
  bucketName: string;
  accessKeyId: string;
  secretAccessKey: string;
  region: string;
}

interface AzureConfig {
  containerName: string;
  connectionString: string;
}

interface LocalConfig {
  directory: string;
}

type StorageConfig = {
  s3?: S3Config;
  azure?: AzureConfig;
  local?: LocalConfig;
};

export class AudioRecorder {
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];

  async startRecording() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    this.mediaRecorder = new MediaRecorder(stream);
    this.mediaRecorder.ondataavailable = (event) => {
      this.audioChunks.push(event.data);
    };
    this.mediaRecorder.start();
  }

  async stopRecording(): Promise<Blob> {
    return new Promise((resolve, reject) => {
      if (!this.mediaRecorder) {
        return reject(new Error("No active recording"));
      }
      this.mediaRecorder.onstop = () => {
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
        this.audioChunks = []; // Clear chunks for the next recording
        resolve(audioBlob);
      };
      this.mediaRecorder.stop();
    });
  }

  async saveRecording(audioBlob: Blob, storageConfig: StorageConfig): Promise<string> {
    if (storageConfig.s3) {
      return this.uploadToS3(audioBlob, storageConfig.s3);
    } else if (storageConfig.azure) {
      return this.uploadToAzure(audioBlob, storageConfig.azure);
    } else if (storageConfig.local) {
      return this.saveLocally(audioBlob, storageConfig.local);
    } else {
      throw new Error("No valid storage configuration provided");
    }
  }

  private async uploadToS3(audioBlob: Blob, config: S3Config): Promise<string> {
    const s3Client = new S3Client({
      credentials: {
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
      },
      region: config.region,
    });
    const audioBuffer = await audioBlob.arrayBuffer();
    const audioFileName = `audio_${Date.now()}.wav`;
    const putCommand = new PutObjectCommand({
        Bucket: config.bucketName,
        Key: audioFileName,
        Body: new Uint8Array(audioBuffer), // Convert ArrayBuffer to Uint8Array
        ContentType: 'audio/wav',
      });
    await s3Client.send(putCommand);
    return `s3://${config.bucketName}/${audioFileName}`;
  }

  private async uploadToAzure(audioBlob: Blob, config: AzureConfig): Promise<string> {
    const blobServiceClient = BlobServiceClient.fromConnectionString(config.connectionString);
    const containerClient = blobServiceClient.getContainerClient(config.containerName);
    const audioBuffer = await audioBlob.arrayBuffer();
    const audioFileName = `audio_${Date.now()}.wav`;
    const blockBlobClient = containerClient.getBlockBlobClient(audioFileName);
    await blockBlobClient.uploadData(new Uint8Array(audioBuffer), { blobHTTPHeaders: { blobContentType: 'audio/wav' } });
    return `${config.containerName}/${audioFileName}`;
  }

  private async saveLocally(audioBlob: Blob, config: LocalConfig): Promise<string> {
    const audioBuffer = await audioBlob.arrayBuffer();
    const audioFileName = `audio_${Date.now()}.wav`;
    const filePath = path.join(config.directory, audioFileName);
    await fs.writeFile(filePath, Buffer.from(audioBuffer));
    return filePath;
  }
}
