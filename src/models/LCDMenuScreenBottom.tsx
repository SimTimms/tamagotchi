import * as THREE from "three";
import { useContext } from "react";
import { ConfigurationContext } from "../App";

interface LCDMenuScreenBottomProps {
  screenSize: number;
  currentMenu: number;
  backMaterial: string;
}

function LCDMenuScreenBottom(props: LCDMenuScreenBottomProps) {
  const { screenSize, currentMenu, backMaterial } = props;
  const gameConfig = useContext(ConfigurationContext).gameConfig;
  const icons = gameConfig.iconTextures;

  const BoxGeometry = new THREE.PlaneGeometry(0.14, 0.14);

  const duckMaterialActive = new THREE.MeshStandardMaterial({
    color: "#fff",
    map: icons.iconDuck,
    transparent: true,
    opacity: currentMenu === 4 ? 1 : 0.3,
  });

  const tapeMaterialActive = new THREE.MeshStandardMaterial({
    color: "#fff",
    map: icons.iconTape,
    transparent: true,
    opacity: currentMenu === 5 ? 1 : 0.3,
  });

  const chatMaterialActive = new THREE.MeshStandardMaterial({
    color: "#fff",
    map: icons.iconChat,
    transparent: true,
    opacity: currentMenu === 6 ? 1 : 0.3,
  });
  const heartMaterialActive = new THREE.MeshStandardMaterial({
    color: "#fff",
    map: icons.iconHeart,
    transparent: true,
    opacity: currentMenu === 7 ? 1 : 0.3,
  });

  console.log("icons", icons);

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
        material={duckMaterialActive}
        scale={1}
      ></mesh>
      <mesh
        geometry={BoxGeometry}
        position={[0.29, 0, 0.02]}
        material={tapeMaterialActive}
        scale={1}
      ></mesh>{" "}
      <mesh
        geometry={BoxGeometry}
        position={[0.54, 0, 0.02]}
        material={chatMaterialActive}
        scale={1}
      ></mesh>
      <mesh
        geometry={BoxGeometry}
        position={[0.8, 0, 0.02]}
        material={heartMaterialActive}
        scale={1}
      ></mesh>
    </group>
  );
}
export default LCDMenuScreenBottom;
