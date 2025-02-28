import { useEffect, useRef } from "react";

interface UIProps {
  isPlaying: boolean;
}
export default function UI(props: UIProps) {
  const { isPlaying } = props;
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current && audioRef.current.paused) {
      if (isPlaying) {
        audioRef.current.volume = 0.2;
        audioRef.current.play();
      }
    } else if (audioRef.current && !audioRef.current.paused) {
      if (!isPlaying) {
        audioRef.current.pause();
      }
    }
  }, [audioRef.current, isPlaying]);
  return <audio ref={audioRef} src="./dreamland.mp3" loop />;
}
