import { useEffect, useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import "./app.css";
import * as THREE from "three";
import Scene from "./Scene";
import select from "./assets/sounds/select-2.mp3";
import select1 from "./assets/sounds/select.mp3";
import select2 from "./assets/sounds/loop-3.mp3";
import clean from "./assets/sounds/clean.mp3";
import creatureAttention from "./assets/sounds/creature-attention.mp3";

function App() {
  const [mouse, setMouse] = useState<THREE.Vector2>(new THREE.Vector2());
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioRef2 = useRef<HTMLAudioElement>(null);
  const audioRef3 = useRef<HTMLAudioElement>(null);
  const audioRefClean = useRef<HTMLAudioElement>(null);
  const creatureAttentionRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // @ts-ignore
    audioRef.current = new Audio(select);
    // @ts-ignore
    audioRef2.current = new Audio(select1);
    // @ts-ignore
    audioRef3.current = new Audio(select2);
    // @ts-ignore
    creatureAttentionRef.current = new Audio(creatureAttention);
    // @ts-ignore
    audioRefClean.current = new Audio(clean);
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

  const selectSound2 = () => {
    if (audioRef2.current) {
      audioRef2.current.pause();
      audioRef2.current.currentTime = 0;
      audioRef2.current.volume = 0.5;
      audioRef2.current.play();
    }
  };

  const selectSound3 = () => {
    if (audioRef3.current) {
      audioRef3.current.pause();
      audioRef3.current.currentTime = 0;
      audioRef3.current.volume = 0.5;
      audioRef3.current.play();
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

  useEffect(() => {
    window.addEventListener("resize", () => {
      // Update sizes
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;
    });
    window.addEventListener("mousemove", (event) => {
      mouse.x = (event.clientX / sizes.width) * 2 - 1;
      mouse.y = -(event.clientY / sizes.height) * 2 + 1;
      setMouse(mouse);
    });
  }, []);

  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };
  return (
    <>
      <Canvas className="canvas" camera={{ position: [3, 3, 83] }} shadows>
        <color attach="background" args={["#000"]} />
        <ambientLight intensity={0.4} />
        <directionalLight
          color="#fff"
          position={[2, 1, 3]}
          castShadow
          intensity={2}
        />
        <Scene
          selectSound={selectSound}
          selectSound2={selectSound2}
          selectSound3={selectSound3}
          creatureAttention={creatureAttentionSound}
          cleanSound={cleanSound}
        />
        <OrbitControls />
      </Canvas>
    </>
  );
}
export default App;
