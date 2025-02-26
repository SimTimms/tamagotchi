import { ConfigurationContext } from "./App";
import { useEffect, useRef, useState } from "react";
import Explosion from "./Explosion";
import { Html } from "@react-three/drei";

interface UIProps {
  hunger: number;
  cleanliness: number;
  health: number;
  happiness: number;
  isHungry: boolean;
  isSick: boolean;
  isDirty: boolean;
  isHappy: boolean;
  isDead: boolean;
  setEnvMap: any;
  envMap: boolean;
  setAutoRotate: any;
  autoRotate: boolean;
}
export default function UI(props: UIProps) {
  const {
    hunger,
    cleanliness,
    health,
    happiness,
    isHungry,
    isSick,
    isDirty,
    isHappy,
    isDead,
    setEnvMap,
    envMap,
    setAutoRotate,
    autoRotate,
  } = props;

  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (audioRef.current && audioRef.current.paused) {
      if (isPlaying) {
        audioRef.current.volume = 0.5;
        audioRef.current.play();
      }
    } else if (audioRef.current && !audioRef.current.paused) {
      if (!isPlaying) {
        audioRef.current.pause();
      }
    }
  }, [audioRef.current, isPlaying]);
  return (
    <ConfigurationContext.Consumer>
      {({ gameConfig }) => {
        return (
          <>
            {isPlaying && (
              <>
                <Explosion texture={gameConfig.particleTextures.musicOne} />
                <Explosion texture={gameConfig.particleTextures.musicTwo} />
              </>
            )}

            <Html className="ui-html">
              <div className="ui">
                <div className="ui-row">
                  {isDead ? "💀" : "🍗"}
                  {isHungry && <span className="alert-icon">⚠️</span>}
                  <span>{hunger.toFixed(0)}</span>
                </div>
                <div className="ui-row">
                  {isDead ? "💀" : "💦"}
                  {isDirty && <span className="alert-icon">💩</span>}
                  <span>{cleanliness.toFixed(0)}</span>
                </div>
                <div className="ui-row">
                  {isDead ? "💀" : "💉"}
                  {isSick && <span className="alert-icon">🤢</span>}
                  <span>{health.toFixed(0)}</span>
                </div>
                <div className="ui-row">
                  {isDead ? "💀" : isHappy ? "😊" : "😥"}
                  {!isHappy && <span className="alert-icon">⚠️</span>}
                  <span>{happiness.toFixed(0)}</span>
                </div>

                <audio ref={audioRef} src="./dreamland.mp3" loop />

                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    cursor: "pointer",
                    width: "20vw",
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "flex-start",
                  }}
                >
                  <div
                    className="ui-row-small-icon"
                    onClick={() => setIsPlaying((isPlaying) => !isPlaying)}
                  >
                    {`${isPlaying ? "Disable" : "Enable"}   Music by moodmode`}
                  </div>
                  <div
                    className="ui-row-small-icon"
                    onClick={() =>
                      setAutoRotate((autoRotate: boolean) => !autoRotate)
                    }
                  >
                    {`${autoRotate ? "Disable" : "Enable"} Rotate`}
                  </div>
                  <div
                    className="ui-row-small-icon"
                    onClick={() => setEnvMap((envMap: boolean) => !envMap)}
                  >
                    {`${envMap ? "Disable" : "Enable"} Environment`}
                  </div>
                </div>
              </div>
            </Html>
          </>
        );
      }}
    </ConfigurationContext.Consumer>
  );
}
