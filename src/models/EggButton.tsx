import * as THREE from "three";
import gsap from "gsap";
import { useRef, useMemo } from "react";
import { ConfigurationContext } from "../App";

interface EggButtonProps {
  buttonClick: () => void;
  model: any;
  position: [number, number, number];
  label: string;
  color: string;
}
function EggButton(props: EggButtonProps) {
  const { buttonClick, model, position } = props;
  const buttonMesh = useRef<THREE.Mesh>(null);
  const raycaster = new THREE.Raycaster();
  const rayOrigin = new THREE.Vector3(-3, 0, 0);
  const rayDirection = new THREE.Vector3(10, 0, 0);
  rayDirection.normalize();
  raycaster.set(rayOrigin, rayDirection);

  return (
    <group position={position}>
      <mesh
        ref={buttonMesh}
        geometry={useMemo(
          () => (model.children[0] as THREE.Mesh).geometry,
          [model]
        )}
        castShadow
        receiveShadow
        onPointerDown={() => {
          if (buttonMesh.current) {
            gsap.to(buttonMesh.current.position, {
              duration: 0.2,
              delay: 0,
              y: -1,
            });
            gsap.to(buttonMesh.current.position, {
              duration: 0.4,
              delay: 0.2,
              y: 0,
            });
          }
          buttonClick();
        }}
      >
        <ConfigurationContext.Consumer>
          {({ gameConfig }) => {
            return (
              <meshStandardMaterial
                color="#222"
                normalMap={gameConfig.buttonTextures.buttonNormal}
                metalness={0.3}
                roughness={1}
              />
            );
          }}
        </ConfigurationContext.Consumer>
      </mesh>
    </group>
  );
}
export default EggButton;
