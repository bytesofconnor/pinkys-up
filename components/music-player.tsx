'use client';

import { useState, useRef } from 'react';
import { Play, Pause } from 'lucide-react';

const START_AT_SECONDS = 20

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const startFromOffset = () => {
    const audio = audioRef.current
    if (!audio) {
      return
    }
    if (audio.currentTime < START_AT_SECONDS) {
      audio.currentTime = START_AT_SECONDS
    }
  }

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) {
      return
    }

    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
      return
    }

    startFromOffset()
    void audio.play()
    setIsPlaying(true)
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/te-estoy-correteando.mp3"
        onEnded={() => {
          const audio = audioRef.current
          if (!audio) {
            return
          }
          audio.currentTime = START_AT_SECONDS
          void audio.play()
        }}
      />
      <button
        type="button"
        onClick={togglePlay}
        className="inline-flex h-11 w-11 items-center justify-center text-gray-900 transition-colors hover:text-[#9d174d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9d174d]"
        aria-pressed={isPlaying}
        aria-label={isPlaying ? "Pause Te Estoy Correteando" : "Play Te Estoy Correteando"}
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
