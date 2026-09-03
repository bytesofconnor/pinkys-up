'use client';

import { useState, useRef } from 'react';
import { Play, Pause } from 'lucide-react';

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        void audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/fire-for-you-cannons.mp3"
        loop
      />
      <button
        type="button"
        onClick={togglePlay}
        className="inline-flex h-11 w-11 items-center justify-center text-gray-900 transition-colors hover:text-[#9d174d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9d174d]"
        aria-pressed={isPlaying}
        aria-label={isPlaying ? "Pause ambient music" : "Play ambient music"}
      >
        {isPlaying ? (
          <Pause className="h-5 w-5" aria-hidden="true" />
        ) : (
          <Play className="h-5 w-5" aria-hidden="true" />
        )}
      </button>
    </>
  );
}
