import * as THREE from "three";
import { LCDIcons } from "./LCDScreen";
import { Html } from "@react-three/drei";
interface LCDMenuScreenProps {
  icons: LCDIcons;
  screenSize: number;
  lightColor: string;
  currentMenu: number;
  isSick: boolean;
  backMaterial: string;
}

function LCDMenuScreen(props: LCDMenuScreenProps) {
  const { icons, screenSize, currentMenu, isSick, backMaterial } = props;

  const BoxGeometry = new THREE.PlaneGeometry(0.14, 0.14);

  const foodMaterialActive = new THREE.MeshStandardMaterial({
    color: "#fff",
    map: icons.iconFood,
    transparent: true,
    opacity: currentMenu === 0 ? 1 : 0.3,
  });

  const lightMaterialActive = new THREE.MeshStandardMaterial({
    color: "#fff",
    map: icons.iconLight,
    transparent: true,
    opacity: currentMenu === 1 ? 1 : 0.3,
  });

  const gameMaterialActive = new THREE.MeshStandardMaterial({
    color: "#fff",
    map: icons.iconGame,
    transparent: true,
    opacity: currentMenu === 2 ? 1 : 0.3,
  });

  const skullMaterialActive = new THREE.MeshStandardMaterial({
    color: "#fff",
    map: icons.iconSkull,
    transparent: true,
    opacity: !isSick ? 0 : currentMenu === 3 ? 1 : 0.3,
  });

  const injectMaterialActive = new THREE.MeshStandardMaterial({
    color: "#fff",
    map: icons.iconInject,
    transparent: true,
    opacity: isSick ? 0 : currentMenu === 3 ? 1 : 0.3,
  });

  return (
    <group scale={screenSize}>
      <mesh
        geometry={new THREE.BoxGeometry(1, 0.2, 0.3)}
        position={[0.42, 0.01, -0.15]}
      >
        <meshStandardMaterial attach="material-0" color="#000" />
        <meshStandardMaterial attach="material-1" color="#000" />
        <meshStandardMaterial attach="material-2" color="#000" />
        <meshStandardMaterial attach="material-3" color="#000" />
        <meshStandardMaterial attach="material-4" color={backMaterial} />
        <meshStandardMaterial attach="material-5" color={backMaterial} />
      </mesh>
      {currentMenu < 4 && (
        <group position={[0.04, 0, 0.02]}>
          <Html
            style={{
              fontSize: "2vh",
              width: "20vw",
              left: "-28vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              top: "-2vh",
            }}
          >
            <div
              style={{
                paddingRight: 10,
                color: "#000",
                textShadow: "2px 2px 5px rgba(0,0,0,0.6)",
              }}
            >
              {currentMenu === 0
                ? "FOOD"
                : currentMenu === 1
                ? "LIGHT"
                : currentMenu === 2
                ? "PLAY"
                : currentMenu === 3
                ? "SICK"
                : ""}
            </div>
            <div
              style={{ border: `1px solid #000`, width: "20vw", opacity: 0.4 }}
            ></div>
          </Html>
        </group>
      )}
      <mesh
        position={[0.0, 0, 0.02]}
        geometry={BoxGeometry}
        material={foodMaterialActive}
        scale={1}
      ></mesh>

      <mesh
        geometry={BoxGeometry}
        position={[0.29, 0, 0.02]}
        material={lightMaterialActive}
        scale={1}
      ></mesh>
      <mesh
        geometry={BoxGeometry}
        position={[0.54, 0, 0.02]}
        material={gameMaterialActive}
        scale={1}
      ></mesh>
      <mesh
        geometry={BoxGeometry}
        position={[0.8, 0, 0.02]}
        material={skullMaterialActive}
        scale={1}
      ></mesh>
      <mesh
        geometry={BoxGeometry}
        position={[0.8, 0, 0.02]}
        material={injectMaterialActive}
        scale={1}
      ></mesh>
    </group>
  );
}
export default LCDMenuScreen;
