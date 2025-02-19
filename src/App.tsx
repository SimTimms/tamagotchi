import { useEffect, useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import "./app.css";
import Scene from "./Scene";
import select2 from "./assets/sounds/loop-3.mp3";
import clean from "./assets/sounds/clean.mp3";
import creatureAttention from "./assets/sounds/creature-attention.mp3";
import GUI from "lil-gui";
import { Environment } from "@react-three/drei";

import { loadTextures } from "./utils/loadTextures";
export type GameConfig = {
  eggColour: number;
  ambientLight: number;
  directionalLight: number;
  directionalLightX: number;
  directionalLightY: number;
  directionalLightZ: number;
  debugShowCreature: boolean;
  debugShowBackground: boolean;
  debugShowCanvasBackground: boolean;
  debugShowItem: boolean;
  showGlass: boolean;
  showMenu: boolean;
  bornAge: number;
  isDead: boolean;
};

function App() {
  const audioRef = useRef<HTMLAudioElement>(new Audio(select2));
  const audioRefClean = useRef<HTMLAudioElement>(new Audio(clean));
  const creatureAttentionRef = useRef<HTMLAudioElement>(
    new Audio(creatureAttention)
  );

  const [gameConfig, setGameConfig] = useState({
    eggColour: 10,
    ambientLight: 0.4,
    directionalLight: 4,
    directionalLightX: 2,
    directionalLightY: 3,
    directionalLightZ: 3,
    debugShowCreature: true,
    debugShowBackground: true,
    debugShowCanvasBackground: true,
    debugShowItem: true,
    showGlass: true,
    showMenu: true,
    bornAge: 7,
    isDead: false,
  });
  const { eggTexture, eggMetalTexture, eggRoughTexture } = loadTextures();

  useEffect(() => {
    const gui = new GUI();
    const eggFolder = gui.addFolder("Egg");
    const lightFolder = gui.addFolder("Lighting");
    const debugFolder = gui.addFolder("Debug");
    debugFolder.add(gameConfig, "isDead").onChange((value: boolean) => {
      setGameConfig({ ...gameConfig, isDead: value });
    });
    debugFolder.add(gameConfig, "showMenu").onChange((value: boolean) => {
      setGameConfig({ ...gameConfig, showMenu: value });
    });
    debugFolder.add(gameConfig, "showGlass").onChange((value: boolean) => {
      setGameConfig({ ...gameConfig, showGlass: value });
    });
    debugFolder
      .add(gameConfig, "debugShowCreature")
      .onChange((value: boolean) => {
        setGameConfig({ ...gameConfig, debugShowCreature: value });
      });
    debugFolder
      .add(gameConfig, "debugShowBackground")
      .onChange((value: boolean) => {
        setGameConfig({ ...gameConfig, debugShowBackground: value });
      });
    debugFolder
      .add(gameConfig, "debugShowCanvasBackground")
      .onChange((value: boolean) => {
        setGameConfig({ ...gameConfig, debugShowCanvasBackground: value });
      });
    debugFolder.add(gameConfig, "debugShowItem").onChange((value: boolean) => {
      setGameConfig({ ...gameConfig, debugShowItem: value });
    });
    eggFolder.addColor(gameConfig, "eggColour").onChange((value: number) => {
      setGameConfig({ ...gameConfig, eggColour: value });
    });
    eggFolder
      .add(gameConfig, "bornAge", 0, 50)
      .step(1)
      .onChange((value: number) => {
        setGameConfig({ ...gameConfig, bornAge: value });
      });
    lightFolder
      .add(gameConfig, "ambientLight", 0, 1)
      .onChange((value: number) => {
        setGameConfig({ ...gameConfig, ambientLight: value });
      });
    lightFolder
      .add(gameConfig, "directionalLight", 0, 10)
      .onChange((value: number) => {
        setGameConfig({ ...gameConfig, directionalLight: value });
      });
    lightFolder
      .add(gameConfig, "directionalLightX", -10, 10)
      .onChange((value: number) => {
        setGameConfig({ ...gameConfig, directionalLightX: value });
      });
    lightFolder
      .add(gameConfig, "directionalLightY", -10, 10)
      .onChange((value: number) => {
        setGameConfig({ ...gameConfig, directionalLightY: value });
      });
    lightFolder
      .add(gameConfig, "directionalLightZ", -10, 10)
      .onChange((value: number) => {
        setGameConfig({ ...gameConfig, directionalLightZ: value });
      });
  }, [audioRef]);

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

  return (
    <div className="background">
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
        <Scene
          selectSound={selectSound}
          creatureAttention={creatureAttentionSound}
          cleanSound={cleanSound}
          config={gameConfig}
          eggTextures={[eggTexture, eggMetalTexture, eggRoughTexture]}
        />
        <OrbitControls enablePan={false} enableZoom={false} maxZoom={1} />
      </Canvas>
    </div>
  );
}
export default App;
