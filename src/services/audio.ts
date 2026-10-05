const audioInstance = typeof Audio !== 'undefined' ? new Audio('/wedding-music.mp3') : null;

if (audioInstance) {
  audioInstance.loop = true;
  audioInstance.volume = 0.6;
  audioInstance.preload = 'none';
}

export const audioService = {
  play: () => audioInstance?.play().catch(() => {}),
  pause: () => audioInstance?.pause(),
  toggle: () => {
    if (!audioInstance) return;
    if (audioInstance.paused) {
      audioService.play();
    } else {
      audioService.pause();
    }
  },
  isPlaying: () => Boolean(audioInstance && !audioInstance.paused),
  subscribe: (callback: () => void) => {
    if (!audioInstance) return () => {};
    audioInstance.addEventListener('play', callback);
    audioInstance.addEventListener('pause', callback);
    return () => {
      audioInstance.removeEventListener('play', callback);
      audioInstance.removeEventListener('pause', callback);
    };
  },
};
