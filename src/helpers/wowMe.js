const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

const getFile = file => fetch(file)
  .then(response => response.arrayBuffer())
  .then(arrayBuffer => audioCtx.decodeAudioData(arrayBuffer));

const play = audioBuffer => (audioCtx.state === 'suspended' ? audioCtx.resume() : Promise.resolve())
  .then(() => {
    const sampleSource = audioCtx.createBufferSource();
    sampleSource.buffer = audioBuffer;
    sampleSource.connect(audioCtx.destination);
    sampleSource.start();
    return sampleSource;
  });

const wowMe = (() => {
  let counter = 0;
  const sounds = {};

  Promise.all(Array.from({ length: 17 }, (v, i) => getFile(`/assets/wow${i}.wav`)))
    .then((files) => {
      files.forEach((file, i) => {
        sounds[i] = file;
      });
    });

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
