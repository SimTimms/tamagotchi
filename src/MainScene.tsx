import { useEffect, useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import "./app.css";
import Scene from "./Scene";
import clean from "./assets/sounds/clean.mp3";
import creatureAttention from "./assets/sounds/creature-attention.mp3";
import { Environment } from "@react-three/drei";
import { loadTextures, loadIconTextures } from "./utils/loadTextures";
import defaultConfig from "./data/defaultConfig";
import { GameConfigAssets, GameConfig } from "./data/defaultConfig";
//import { Perf } from "r3f-perf";

interface MainSceneProps {
  resetState: boolean;
  setResetState: React.Dispatch<React.SetStateAction<boolean>>;
  autoRotate: boolean;
  setAutoRotate: React.Dispatch<React.SetStateAction<boolean>>;
}

function MainScene(props: MainSceneProps) {
  const { resetState, autoRotate, setResetState, setAutoRotate } = props;
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioRefClean = useRef<HTMLAudioElement>(new Audio(clean));
  const creatureAttentionRef = useRef<HTMLAudioElement>(
    new Audio(creatureAttention)
  );

  const [gameConfig, setGameConfig] = useState<GameConfigAssets & GameConfig>(
    defaultConfig
  );
  const [envMap, setEnvMap] = useState<boolean>(true);

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
        playTexture,
        rotateTexture,
        shadowTexture,
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
        playTexture &&
        rotateTexture &&
        shadowTexture &&
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
            playTexture: playTexture,
            rotateTexture: rotateTexture,
            shadowTexture: null,
            sound: null,
            soundOn: null,
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
        audioRef.current.volume = 0.25;
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

  return (
    <Canvas
      className="canvas"
      camera={{ position: [3, 3, 83.1], far: 1400 }}
      shadows
    >
      {/*  <Perf position="top-right" />*/}

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
  );
}
export default MainScene;
