import { VolumeOff, Volume2 } from "lucide-react";
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

            <Html
              style={{
                marginLeft: "-50vw",
                marginTop: "-48vh",
                paddingLeft: "2vh",
                height: "96vh",
                width: "30vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "space-between",
              }}
            >
              <div className="ui">
                <h1 style={{ fontSize: "4vh" }}>Tamagotchi</h1>
                <h1 style={{ color: "#fff", fontSize: "4vh" }}>たまごっち</h1>
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
                  }}
                >
                  <div className="ui-row-small">
                    {isPlaying ? (
                      <Volume2
                        onClick={() => setIsPlaying((isPlaying) => !isPlaying)}
                        size={"4vh"}
                      />
                    ) : (
                      <VolumeOff
                        onClick={() => setIsPlaying((isPlaying) => !isPlaying)}
                        size={"4vh"}
                      />
                    )}
                    {isPlaying && (
                      <a
                        href="https://pixabay.com/music/video-games-8-bit-dream-land-142093/"
                        className="ui-href"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Music by moodmode
                      </a>
                    )}
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
