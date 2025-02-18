import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { useLoader } from "@react-three/fiber";
import EggButton from "./EggButton";

interface EggButtonsProps {
  buttonOneClick: () => void;
  buttonTwoClick: () => void;
  buttonThreeClick: () => void;
  color: string;
}
function EggButtons(props: EggButtonsProps) {
  const { buttonOneClick, buttonTwoClick, buttonThreeClick, color } = props;
  const button = useLoader(GLTFLoader, "./models/button.glb");
  const raycaster = new THREE.Raycaster();
  const rayOrigin = new THREE.Vector3(-3, 0, 0);
  const rayDirection = new THREE.Vector3(10, 0, 0);
  rayDirection.normalize();

  raycaster.set(rayOrigin, rayDirection);
  return (
    <>
      {button.scene && (
        <group
          scale={4}
          position={[0, -29.6, 13]}
          rotation={[Math.PI * 0.5, 0, 0]}
        >
          <EggButton
            buttonClick={buttonOneClick}
            model={button.scene}
            position={[-3, 0, -0.96]}
            label="SELECT"
            color={color}
          />
          <EggButton
            buttonClick={buttonTwoClick}
            model={button.scene}
            position={[0, 0, 0]}
            label="ENTER"
            color={color}
          />
          <EggButton
            buttonClick={buttonThreeClick}
            model={button.scene}
            position={[3, 0, -0.96]}
            label="CANCEL"
            color={color}
          />
        </group>
      )}
    </>
  );
}
export default EggButtons;
