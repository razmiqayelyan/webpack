import './index.scss';

import summerAudio from './assets/sounds/summer.mp3';
import autumnAudio from './assets/sounds/rain.mp3';
import winterAudio from './assets/sounds/winter.mp3';

interface CustomAudioElement extends HTMLAudioElement {
  season?: keyof AudioFiles;
}

interface AudioFiles {
  [key: string]: CustomAudioElement;
  summer: CustomAudioElement;
  autumn: CustomAudioElement;
  winter: CustomAudioElement;
}

type AudioTimes = {
  [key: string]: number;
};

const audioFiles: AudioFiles = {
  summer: new Audio(summerAudio as string) as CustomAudioElement,
  autumn: new Audio(autumnAudio as string) as CustomAudioElement,
  winter: new Audio(winterAudio as string) as CustomAudioElement
};

const audioTimes: AudioTimes = {
  summer: 0,
  autumn: 0,
  winter: 0
};



let currentPlayingAudio: null | CustomAudioElement = null;


document.querySelectorAll('.play-pause').forEach(( button :HTMLButtonElement) => {
  button.addEventListener('click', () => {
    const season = button.getAttribute('data-season');
    const selectedAudio = audioFiles[season];
    const progressBar  = button.nextElementSibling as HTMLProgressElement;

    if (!selectedAudio) {
      console.error(`No audio file found for season: ${season}`);
      return;
    }

    if (currentPlayingAudio === selectedAudio && !selectedAudio.paused) {
      selectedAudio.pause();
      audioTimes[season] = selectedAudio.currentTime;
      button.innerText = 'Play';
      progressBar.value = 0; 
      currentPlayingAudio = null;
      return;
    }

    if (currentPlayingAudio && currentPlayingAudio !== selectedAudio) {
      currentPlayingAudio.pause();
      audioTimes[currentPlayingAudio.season] = currentPlayingAudio.currentTime;
      let plyBtn: HTMLButtonElement = document.querySelector(`.play-pause[data-season="${currentPlayingAudio.season}"]`)
      plyBtn.innerText = 'Play';
    }

    selectedAudio.currentTime = audioTimes[season] || 0;
    selectedAudio.play();
    button.innerText = 'Pause';
    currentPlayingAudio = selectedAudio;
    currentPlayingAudio.season = season;

    selectedAudio.addEventListener('timeupdate', () => {
      progressBar.value = (selectedAudio.currentTime / selectedAudio.duration) * 100;
    });

    selectedAudio.addEventListener('ended', () => {
      button.innerText = 'Play';
      progressBar.value = 0;
      audioTimes[season] = 0;
      currentPlayingAudio = null;
    });
  });
});