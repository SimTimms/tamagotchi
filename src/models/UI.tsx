import { ConfigurationContext } from "../App";
import { useEffect, useRef, useState } from "react";
import MusicParticles from "./MusicParticles";
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

  return (
    <ConfigurationContext.Consumer>
      {({ gameConfig, setGameConfig }) => {
        return (
          <>
            {gameConfig.playMusic && (
              <>
                <MusicParticles
                  texture={gameConfig.particleTextures.musicOne}
                />
                <MusicParticles
                  texture={gameConfig.particleTextures.musicTwo}
                />
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
                    onClick={() =>
                      setGameConfig((gameConfig) => {
                        return {
                          ...gameConfig,
                          playMusic: !gameConfig.playMusic,
                        };
                      })
                    }
                  >
                    {`${
                      gameConfig.playMusic ? "Disable" : "Enable"
                    }   Music by moodmode`}
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
                    {`Improve ${envMap ? "Performance" : "Visuals"}`}
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
