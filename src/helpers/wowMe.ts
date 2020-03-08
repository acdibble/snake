// @ts-ignore
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

const wowMe = (() => {
  let counter = 0;
  let sounds: AudioBuffer[] = [];

  Promise.all(Array.from({ length: 17 }, (_, i) => getFile(`/assets/wow${i}.wav`)))
    .then((buffers) => { sounds = buffers; });

  return () => {
    play(sounds[counter % 17]).catch(console.error);
    counter += 1;
  };
})();

export default wowMe;
