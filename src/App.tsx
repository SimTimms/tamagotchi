import { useEffect, useState, useRef, createContext } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import "./app.css";
import Scene from "./Scene";
import select2 from "./assets/sounds/loop-3.mp3";
import clean from "./assets/sounds/clean.mp3";
import creatureAttention from "./assets/sounds/creature-attention.mp3";
import { Environment } from "@react-three/drei";
import { loadTextures } from "./utils/loadTextures";
import defaultConfig, { defaultConfigStats } from "./defaultConfig";
import { GameConfig } from "./defaultConfig";

export const ConfigurationContext = createContext<{
  gameConfig: typeof defaultConfig;
  setGameConfig: React.Dispatch<React.SetStateAction<typeof defaultConfig>>;
}>({
  gameConfig: defaultConfig,
  setGameConfig: () => {},
});

function App() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioRefClean = useRef<HTMLAudioElement>(new Audio(clean));
  const creatureAttentionRef = useRef<HTMLAudioElement>(
    new Audio(creatureAttention)
  );

  const [gameConfig, setGameConfig] = useState<GameConfig>(defaultConfig);
  const [resetState, setResetState] = useState<boolean>(false);

  const handleReset = () => {
    setResetState(true);
    console.log("reset");
    setGameConfig((gameConfig) => {
      return { ...gameConfig, defaultConfigStats, isDead: false };
    });
  };

  useEffect(() => {
    const loadAndSetTextures = async () => {
      const {
        eggTexture,
        eggMetalTexture,
        eggRoughTexture,
        buttonNormal,
        music,
        music2,
        sad,
        happy,
      } = await loadTextures();
      if (eggTexture && eggMetalTexture && eggRoughTexture && buttonNormal) {
        setGameConfig((prev) => ({
          ...prev,
          eggTextures: {
            eggTexture: eggTexture,
            eggMetalTexture: eggMetalTexture,
            eggRoughTexture: eggRoughTexture,
          },
          buttonTextures: {
            buttonNormal: buttonNormal,
          },
          particleTextures: {
            musicOne: music,
            musicTwo: music2,
            isSad: sad,
            isHappy: happy,
          },
        }));
      }
    };

    loadAndSetTextures();
  }, []);

  useEffect(() => {
    const cleanSound = () => {
      if (audioRefClean.current) {
        audioRefClean.current.pause();
        audioRefClean.current.currentTime = 0;
        audioRefClean.current.volume = 0.5;
        audioRefClean.current.play();
      }
    };

    const selectSound = () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current.volume = 0.5;
        audioRef.current.play();
      }
    };

    const creatureAttentionSound = () => {
      if (creatureAttentionRef.current) {
        creatureAttentionRef.current.pause();
        creatureAttentionRef.current.currentTime = 0;
        creatureAttentionRef.current.volume = 0.5;
        creatureAttentionRef.current.play();
      }
    };
    setGameConfig((prev) => ({
      ...prev,
      selectSound,
      creatureAttentionSound,
      cleanSound,
    }));
  }, []);

  if (
    !gameConfig.eggTextures.eggTexture ||
    !gameConfig.eggTextures.eggMetalTexture ||
    !gameConfig.eggTextures.eggRoughTexture ||
    !gameConfig.buttonTextures.buttonNormal ||
    !gameConfig.particleTextures.musicOne ||
    !gameConfig.particleTextures.musicTwo ||
    !gameConfig.particleTextures.isSad ||
    !gameConfig.particleTextures.isHappy
  ) {
    return "Loading...";
  }
  return (
    <div className="background">
      <audio ref={audioRef} src={select2} />
      <audio ref={audioRefClean} src={clean} />
      <audio ref={creatureAttentionRef} src={creatureAttention} />
      <ConfigurationContext.Provider value={{ gameConfig, setGameConfig }}>
        <Canvas className="canvas" camera={{ position: [3, 3, 83] }} shadows>
          <Environment
            files={[
              "./environment/px.png",
              "./environment/nx.png",
              "./environment/py.png",
              "./environment/ny.png",
              "./environment/pz.png",
              "./environment/nz.png",
            ]}
            background={true}
            blur={0.3}
            backgroundIntensity={1.5}
          />
          <ambientLight intensity={gameConfig.ambientLight} />
          <directionalLight
            color="#fff"
            position={[
              gameConfig.directionalLightX,
              gameConfig.directionalLightY,
              gameConfig.directionalLightZ,
            ]}
            castShadow
            intensity={gameConfig.directionalLight}
          />
          <Scene resetState={resetState} setResetState={setResetState} />
          <OrbitControls enablePan={false} enableZoom={false} maxZoom={1} />
        </Canvas>
      </ConfigurationContext.Provider>
      {gameConfig.isDead && (
        <div className="ui-wrapper">
          <span className="dead-text">💀 Oh no! Your creature has died 💀</span>
          <div
            className="reset-button"
            onClick={() => {
              handleReset();
            }}
          >
            RESET
          </div>
        </div>
      )}

      <div className="ui-right">
        <a
          href="https://www.linkedin.com/in/tim-simms-94404045/"
          target="_blank"
          rel="noreferrer"
          className="ui-row-small"
        >
          <span>Tim Simms | React and Three.js Developer</span>
        </a>
        <span className="ui-row-small">
          <span>
            This is in development for the Three.js Journey Tamagotchi Challenge
          </span>
        </span>
      </div>
    </div>
  );
}
export default App;
