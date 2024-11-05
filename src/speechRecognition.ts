// Define minimal custom types for `SpeechRecognitionEvent` and `SpeechRecognitionErrorEvent`
interface SpeechRecognitionResult {
    isFinal: boolean;
    [key: number]: { transcript: string };
  }
  
  interface SpeechRecognitionEvent {
    results: SpeechRecognitionResult[];
  }
  
  interface SpeechRecognitionErrorEvent {
    error: string;
  }
  
  // Extend the global Window interface to add optional `SpeechRecognition` types without direct reference
  declare global {
    interface Window {
      SpeechRecognition?: any;
      webkitSpeechRecognition?: any;
    }
  }
  
  interface SpeechRecognitionConfig {
    lang?: string;
    continuous?: boolean;
    interimResults?: boolean;
  }
  
  export function useSpeechRecognition(config: SpeechRecognitionConfig = {}) {
    // Use `window.SpeechRecognition` or fallback to `window.webkitSpeechRecognition`
    const SpeechRecognitionConstructor = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognitionConstructor) {
      throw new Error('Speech Recognition API is not supported in this browser.');
    }
  
    const recognition = new SpeechRecognitionConstructor();
    recognition.lang = config.lang || 'en-US';
    recognition.continuous = config.continuous ?? false;
    recognition.interimResults = config.interimResults ?? false;
  
    let isListening = false;
    let finalText = '';
    let interimText = '';
    let error: string | null = null;
  
    recognition.onresult = (event: SpeechRecognitionEvent) => {
      interimText = '';
      for (const result of event.results) {
        if (result.isFinal) {
          finalText += result[0].transcript;
        } else {
          interimText += result[0].transcript;
        }
      }
    };
  
    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      error = event.error;
      stop();
    };
  
    const start = () => {
      if (!isListening) {
        finalText = '';
        interimText = '';
        error = null;
        recognition.start();
        isListening = true;
      }
    };
  
    const stop = () => {
      if (isListening) {
        recognition.stop();
        isListening = false;
      }
    };
  
    const reset = () => {
      finalText = '';
      interimText = '';
      error = null;
    };
  
    return {
      start,
      stop,
      reset,
      isListening,
      finalText,
      interimText,
      error,
    };
  }
  