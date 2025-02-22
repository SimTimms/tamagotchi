import { VolumeOff, Volume2, Gem, RotateCw } from "lucide-react";
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
                <div
                  style={{
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "14vh",
                  }}
                >
                  <h1
                    style={{
                      color: "#fff",
                      fontSize: "8vh",
                      position: "absolute",
                    }}
                  >
                    たまごっち
                  </h1>
                  <h1
                    style={{
                      fontSize: "4vh",
                      position: "absolute",
                      top: 0,
                      textShadow: "0 0 20px rgba(0,0,0,0.5)",
                    }}
                  >
                    Tamagotchi Challenge
                  </h1>
                </div>

                <div className="ui-row">
                  <span>Hunger:</span>
                  <span>{(100 - hunger).toFixed(0)}</span>
                </div>
                <div className="ui-row">
                  <span>Cleanliness: </span>
                  <span>{cleanliness.toFixed(0)}</span>
                </div>
                <div className="ui-row">
                  <span>Health:</span>
                  <span>{health.toFixed(0)}</span>
                </div>
                <div className="ui-row">
                  <span>Happiness:</span>
                  <span>{happiness.toFixed(0)}</span>
                </div>
                {isHungry && (
                  <div className="ui-row">
                    <span>Starving:</span>
                    <span>🍗</span>
                  </div>
                )}
                {isSick && (
                  <div className="ui-row">
                    <span>Sick</span>
                    <span>🤢</span>
                  </div>
                )}
                <div className="ui-row">
                  <span>Mood</span>
                  <span>{isHappy ? "😊" : "😥"}</span>
                </div>
                {isDirty && (
                  <div className="ui-row">
                    <span>Dirty</span>
                    <span>💩</span>
                  </div>
                )}
                {isDead && (
                  <div className="ui-row">
                    <span>Dead</span>
                    <span>💀</span>
                  </div>
                )}
                <audio ref={audioRef} src="./dreamland.mp3" loop />

                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    cursor: "pointer",
                    width: "100%",
                  }}
                >
                  <div
                    className="ui-row-small"
                    onClick={() =>
                      setAutoRotate((autoRotate: boolean) => !autoRotate)
                    }
                  >
                    <RotateCw size={"4vh"} />
                    {`${autoRotate ? "Disable" : "Enable"} Rotate`}
                  </div>
                  <div
                    className="ui-row-small"
                    onClick={() => setEnvMap((envMap: boolean) => !envMap)}
                  >
                    <Gem size={"4vh"} />
                    {`${envMap ? "Disable" : "Enable"} Environment`}
                  </div>
                  <div
                    className="ui-row-small"
                    onClick={() => setIsPlaying((isPlaying) => !isPlaying)}
                  >
                    {isPlaying ? (
                      <Volume2 size={"4vh"} />
                    ) : (
                      <VolumeOff size={"4vh"} />
                    )}

                    {`${isPlaying ? "Disable" : "Enable"}   Music by moodmode`}
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
