import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import "./app.css";
import LCDCreatureScreen from "./models/LCDCreatureScreen";
import * as THREE from "three";
interface IntroSceneProps {
  handleStart: () => void;
  playTexture: THREE.Texture | null;
  rotateTexture: THREE.Texture | null;
  shadowTexture: THREE.Texture | null;
  sound: THREE.Texture | null;
  soundOn: THREE.Texture | null;
  musicOn: boolean;

  startScreen: boolean;
  setMusic: () => void;
}
function IntroScene(props: IntroSceneProps) {
  const {
    handleStart,
    playTexture,
    rotateTexture,
    startScreen,
    shadowTexture,
    sound,
    soundOn,
    setMusic,
    musicOn,
  } = props;

  if (!startScreen) return <div className="canvas-welcome"></div>;
  return (
    <Canvas
      className="canvas-welcome"
      camera={{ position: [3, 4, 83.1], far: 1400 }}
    >
      <directionalLight
        color="#fff"
        position={[0, 2, 3]}
        castShadow
        intensity={6}
      />
      <ambientLight intensity={1.5} />
      <group scale={1} position={[22, 0, 0]} rotation={[0, -Math.PI * 0.25, 0]}>
        <LCDCreatureScreen
          screenSize={32}
          currentAnim={"happy"}
          age={7}
          creatureColor={260}
        />
        <mesh position={[5, -12, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial
            attach="material"
            map={shadowTexture}
            transparent
            depthTest={false}
            opacity={0.2}
            color={"rgba(128,56,56)"}
            alphaTest={0.01}
          />
        </mesh>
      </group>
      <group scale={1} position={[-29, 0, 0]} rotation={[0, Math.PI * 0.25, 0]}>
        <LCDCreatureScreen
          screenSize={32}
          currentAnim={"playing"}
          age={7}
          creatureColor={160}
        />
        <mesh position={[5, -12, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial
            attach="material"
            map={shadowTexture}
            transparent
            depthTest={false}
            opacity={0.2}
            color={"rgba(128,56,56)"}
            alphaTest={0.01}
          />
        </mesh>
      </group>
      <group scale={0.5} position={[15, 11.1, 0]} rotation={[0, Math.PI, 0]}>
        <LCDCreatureScreen
          screenSize={32}
          currentAnim={"hungry"}
          age={7}
          creatureColor={0}
        />
      </group>
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        maxZoom={1}
        minPolarAngle={-0.4 + Math.PI / 2}
        maxPolarAngle={-0.4 + Math.PI - Math.PI / 2}
      />
      <mesh
        onPointerDown={() => {
          handleStart();
        }}
      >
        <boxGeometry args={[32, 11, 0.2]} />
        <meshStandardMaterial attach="material-0" transparent opacity={0} />
        <meshStandardMaterial attach="material-1" transparent opacity={0} />
        <meshStandardMaterial attach="material-2" transparent opacity={0} />
        <meshStandardMaterial attach="material-3" transparent opacity={0} />
        <meshStandardMaterial
          map={playTexture}
          transparent
          depthWrite={false}
          attach="material-4"
        />
        <meshStandardMaterial
          map={playTexture}
          transparent
          depthWrite={false}
          attach="material-5"
        />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -10, -1]}>
        <planeGeometry args={[15, 15]} />
        <meshStandardMaterial
          attach="material"
          map={rotateTexture}
          transparent
          depthWrite={false}
        />
      </mesh>
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -10, 20]}
        onPointerDown={() => {
          setMusic();
        }}
      >
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial
          attach="material"
          map={musicOn ? soundOn : sound}
          transparent
          depthWrite={false}
        />
      </mesh>
    </Canvas>
  );
}
export default IntroScene;
