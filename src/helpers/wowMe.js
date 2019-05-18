const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

const getFile = async (file) => {
  const response = await fetch(file);
  const arrayBuffer = await response.arrayBuffer();
  return audioCtx.decodeAudioData(arrayBuffer);
};

const play = async (audioBuffer) => {
  if (audioCtx.state === 'suspended') await audioCtx.resume();
  const sampleSource = audioCtx.createBufferSource();
  sampleSource.buffer = audioBuffer;
  sampleSource.connect(audioCtx.destination);
  sampleSource.start();
  return sampleSource;
};

const wowMe = (() => {
  let counter = 0;
  let sounds = [];

  Promise.all(Array.from({ length: 17 }, (v, i) => getFile(`/assets/wow${i}.wav`)))
    .then((buffers) => { sounds = buffers; });

  return () => {
    play(sounds[counter]).catch(console.error);

    if (counter === 16) {
      counter = 0;
    } else {
      counter += 1;
    }
  };
})();

export default wowMe;
