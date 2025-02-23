import { useEffect, useState, useRef, createContext } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import "./app.css";
import Scene from "./Scene";
import select2 from "./assets/sounds/loop-3.mp3";
import clean from "./assets/sounds/clean.mp3";
import creatureAttention from "./assets/sounds/creature-attention.mp3";
import { Environment } from "@react-three/drei";
import { loadTextures, loadIconTextures } from "./utils/loadTextures";
import defaultConfig, { defaultConfigStats } from "./defaultConfig";
import { GameConfig } from "./defaultConfig";
//import { Perf } from "r3f-perf";
import backgroundImage from "./assets/background.jpg";
import * as THREE from "three";

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
  const [envMap, setEnvMap] = useState<boolean>(true);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const handleReset = () => {
    setResetState(true);
    setGameConfig((gameConfig) => {
      return { ...gameConfig, defaultConfigStats, isDead: false };
    });
  };

  useEffect(() => {
    const loadAndSetTextures = async () => {
      const {
        eggTexture,
        eggTextureOverlay,
        eggMetalOverlay,
        eggMetalTexture,
        eggRoughTexture,
        buttonNormal,
        music,
        music2,
        sad,
        happy,
        treeTexture,
        floorTexture,
        floorAlpha,
      } = await loadTextures();

      const {
        iconFood,
        iconLight,
        iconSkull,
        iconInject,
        iconDuck,
        iconTape,
        iconChat,
        iconHeart,
        iconGame,
      } = loadIconTextures();

      if (
        eggTexture &&
        eggTextureOverlay &&
        eggMetalOverlay &&
        eggMetalTexture &&
        eggRoughTexture &&
        buttonNormal
      ) {
        setGameConfig((prev) => ({
          ...prev,
          treeTexture,
          floorTexture,
          floorAlpha,
          eggTextures: {
            eggTexture: eggTexture,
            eggMetalOverlay: eggMetalOverlay,
            eggTextureOverlay: eggTextureOverlay,
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
          iconTextures: {
            iconFood,
            iconLight,
            iconSkull,
            iconInject,
            iconDuck,
            iconTape,
            iconChat,
            iconHeart,
            iconGame,
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
        audioRefClean.current.volume = 0.15;
        audioRefClean.current.play();
      }
    };

    const selectSound = () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current.volume = 0.05;
        audioRef.current.play();
      }
    };

    const creatureAttentionSound = () => {
      if (creatureAttentionRef.current) {
        creatureAttentionRef.current.pause();
        creatureAttentionRef.current.currentTime = 0;
        creatureAttentionRef.current.volume = 0.15;
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

  const treeMaterial = new THREE.MeshStandardMaterial({
    map: gameConfig.treeTexture,
    transparent: true,
    depthWrite: false,
    opacity: 0.4,
  });

  const floorMaterial = new THREE.MeshStandardMaterial({
    map: gameConfig.floorTexture,
    alphaMap: gameConfig.floorAlpha,
    transparent: true,
    opacity: 0.4,
    depthWrite: false,
  });

  const bgScale = 10;
  return (
    <div
      className="background"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="ui-title-wrapper">
        <h1 className="ui-title-text">たまごっち</h1>
        <h1 className="ui-title-text-back">Tamagotchi Challenge</h1>
      </div>
      <audio ref={audioRef} src={select2} />
      <audio ref={audioRefClean} src={clean} />
      <audio ref={creatureAttentionRef} src={creatureAttention} />
      <ConfigurationContext.Provider value={{ gameConfig, setGameConfig }}>
        <Canvas
          className="canvas"
          camera={{ position: [3, 3, 83.1], far: 1400 }}
          shadows
        >
          {/*<Perf position="top-right" />*/}
          <group scale={50}>
            <mesh
              geometry={new THREE.PlaneGeometry(bgScale * 5, bgScale * 5)}
              position={[0, -7, 0]}
              material={floorMaterial}
              rotation={[-Math.PI / 2, 0, 0]}
            ></mesh>
            <mesh
              geometry={new THREE.BoxGeometry(0.01, 4, 4)}
              position={[-bgScale, -3, -1]}
              material={treeMaterial}
            ></mesh>
            <mesh
              geometry={new THREE.BoxGeometry(0.01, 4, 4)}
              position={[-bgScale, -3, -bgScale]}
              rotation={[0, Math.PI / 1.5, 0]}
              material={treeMaterial}
            ></mesh>
            <mesh
              geometry={new THREE.BoxGeometry(0.01, 4, 4)}
              position={[bgScale, -3, -bgScale]}
              rotation={[0, -Math.PI / 1.5, 0]}
              material={treeMaterial}
            ></mesh>
            <mesh
              geometry={new THREE.BoxGeometry(0.01, 4, 4)}
              position={[bgScale, -3, -1]}
              material={treeMaterial}
            ></mesh>
            <mesh
              geometry={new THREE.BoxGeometry(4, 4, 0.01)}
              position={[0, -3, -bgScale]}
              material={treeMaterial}
            ></mesh>
          </group>
          {envMap && (
            <Environment
              files={[
                "./environment/py.png",
                "./environment/py.png",
                "./environment/py.png",
                "./environment/py.png",
                "./environment/py.png",
                "./environment/py.png",
              ]}
              blur={0.2}
            />
          )}
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
          <Scene
            resetState={resetState}
            setResetState={setResetState}
            setEnvMap={setEnvMap}
            envMap={envMap}
            setAutoRotate={setAutoRotate}
            autoRotate={autoRotate}
          />
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            maxZoom={1}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI - Math.PI / 3}
            autoRotate={autoRotate}
          />
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
        <span style={{ color: "rgba(255,255,255,1)" }}>Tim Simms</span>
        <span style={{ color: "rgba(255,255,255,1)" }}>
          React and Three.js Developer
        </span>
        <a
          href="https://www.linkedin.com/in/tim-simms-94404045/"
          target="_blank"
          rel="noreferrer"
          style={{ color: "rgba(255,255,255,1)" }}
        >
          <span>Message Me on LinkedIn</span>
        </a>
        <span style={{ color: "rgba(255,255,255,1)" }}>
          tim-simms@hotmail.com
        </span>
      </div>
    </div>
  );
}
export default App;
