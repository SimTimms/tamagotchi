import * as THREE from "three";
import gsap from "gsap";
import { useRef } from "react";

interface EggButtonProps {
  buttonClick: () => void;
  model: any;
  position: [number, number, number];
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
    <>
      <mesh
        ref={buttonMesh}
        geometry={(model.children[0] as THREE.Mesh).geometry}
        castShadow
        receiveShadow
        position={position}
        onPointerEnter={() => console.log("hover")}
        onPointerDown={() => {
          if (buttonMesh.current) {
            gsap.to(buttonMesh.current.position, {
              duration: 0.5,
              delay: 0,
              y: -1,
            });
            gsap.to(buttonMesh.current.position, {
              duration: 1,
              delay: 0.5,
              y: 0,
            });
          }
          buttonClick();
        }}
      >
        <meshStandardMaterial color="#000" metalness={0.3} roughness={1} />
      </mesh>
    </>
  );
}
export default EggButton;
