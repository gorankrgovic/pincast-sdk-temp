type AudioPlayerOptions = {
    volume?: number;
    onPlay?: () => void;
    onPause?: () => void;
    onStop?: () => void;
    onEnd?: () => void;
  };
  
  export class AudioPlayer {
    private audio: HTMLAudioElement | null = null;
    private options: AudioPlayerOptions;
  
    constructor(options: AudioPlayerOptions = {}) {
      this.options = options;
    }
  
    // Load and play audio from a given URL
    async play(url: string): Promise<void> {
      if (this.audio) {
        this.stop(); // Stop any currently playing audio
      }
  
      this.audio = new Audio(url);
      this.audio.volume = this.options.volume ?? 1.0;
  
      // Set up event listeners for optional callbacks
      if (this.options.onPlay) {
        this.audio.addEventListener("play", this.options.onPlay);
      }
      if (this.options.onPause) {
        this.audio.addEventListener("pause", this.options.onPause);
      }
      this.audio.addEventListener("ended", this.onAudioEnd.bind(this));
  
      try {
        await this.audio.play(); // Ensure the play is triggered by user interaction
      } catch (error) {
        console.error("Error playing audio:", error);
        // Notify the user or provide a fallback mechanism
      }
    }
  
    // Pause the audio playback
    pause(): void {
      if (this.audio && !this.audio.paused) {
        this.audio.pause();
      }
    }
  
    // Stop audio playback and reset to the beginning
    stop(): void {
      if (this.audio) {
        this.audio.pause();
        this.audio.currentTime = 0;
        this.onAudioStop();
        this.audio = null;
      }
    }
  
    // Adjust volume (0.0 to 1.0)
    setVolume(volume: number): void {
      if (this.audio) {
        this.audio.volume = volume;
      }
      this.options.volume = volume; // Save the volume preference
    }
  
    // Handle audio end event
    private onAudioEnd(): void {
      this.options.onEnd?.();
      this.audio = null; // Reset the audio element
    }
  
    // Handle manual stop
    private onAudioStop(): void {
      this.options.onStop?.();
    }
  }
  