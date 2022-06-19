import { createSignal, onMount } from 'solid-js';

// @ts-expect-error
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

const getFile = async (file: string) => {
  const response = await fetch(file);
  const arrayBuffer = await response.arrayBuffer();
  return audioCtx.decodeAudioData(arrayBuffer);
};

const play = async (audioBuffer: AudioBuffer) => {
  if (audioCtx.state === 'suspended') await audioCtx.resume();
  const sampleSource = audioCtx.createBufferSource();
  sampleSource.buffer = audioBuffer;
  sampleSource.connect(audioCtx.destination);
  sampleSource.start();
  return sampleSource;
};

export default function createWow() {
  const [counter, setCounter] = createSignal(0);
  const [files, setFiles] = createSignal([] as AudioBuffer[]);

  onMount(() => {
    Promise.all(
      Array.from({ length: 17 }, (_, i) => getFile(`/wow${i}.wav`)),
    ).then(setFiles);
  });

  return () => {
    const loadedFiles = files();
    if (loadedFiles.length === 0) return;
    const current = counter();
    setCounter((current + 1) % loadedFiles.length);
    play(loadedFiles[current]).catch(console.error);
  };
}
