interface SpeechSynthesisConfig {
    text: string;
    lang?: string;
    pitch?: number;
    rate?: number;
    volume?: number;
    voice?: SpeechSynthesisVoice;
  }
  
  export function useSpeechSynthesis() {
    const synth = window.speechSynthesis;
    let utterance: SpeechSynthesisUtterance | null = null;
  
    const config: SpeechSynthesisConfig = {
      text: '',
      lang: 'en-US',
      pitch: 1,
      rate: 1,
      volume: 1,
      voice: synth.getVoices().find(v => v.lang === 'en-US'), // Now `undefined` if not found
    };
  
    const start = () => {
      if (!synth || !config.text) return;
  
      utterance = new SpeechSynthesisUtterance(config.text);
      utterance.lang = config.lang || 'en-US';
      utterance.pitch = config.pitch ?? 1;
      utterance.rate = config.rate ?? 1;
      utterance.volume = config.volume ?? 1;
      if (config.voice) utterance.voice = config.voice;
  
      synth.speak(utterance);
    };
  
    const pause = () => {
      if (synth && synth.speaking) synth.pause();
    };
  
    const resume = () => {
      if (synth && synth.paused) synth.resume();
    };
  
    const cancel = () => {
      if (synth) synth.cancel();
    };
  
    const setVoice = (voice: SpeechSynthesisVoice) => {
      config.voice = voice;
    };
  
    const setText = (text: string) => {
      config.text = text;
    };
  
    return {
      start,
      pause,
      resume,
      cancel,
      setVoice,
      setText,
      config,
    };
  }
  