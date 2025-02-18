import * as THREE from "three";
import gsap from "gsap";
import { useRef } from "react";
import { Html } from "@react-three/drei";

interface EggButtonProps {
  buttonClick: () => void;
  model: any;
  position: [number, number, number];
  label: string;
  color: string;
}
function EggButton(props: EggButtonProps) {
  const { buttonClick, model, position, label, color } = props;
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
        geometry={(model.children[0] as THREE.Mesh).geometry}
        castShadow
        receiveShadow
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
      <Html
        style={{
          color: "#aaa",
          fontSize: "2vh",
          top: 30,
          width: "10vh",
          left: "-5vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div style={{ border: "1px solid #000", height: "10vh" }}></div>
        <div
          style={{
            paddingRight: 10,
            color: "#000",
            textShadow: "2px 2px 5px rgba(0,0,0,0.6)",
          }}
        >
          {label}
        </div>
      </Html>
    </group>
  );
}
export default EggButton;
