import * as THREE from "three";
import { LCDIcons } from "./LCDScreen";

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
      <mesh
        geometry={BoxGeometry}
        position={[0.04, 0, 0.02]}
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
