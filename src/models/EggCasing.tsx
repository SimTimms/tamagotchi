import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { useLoader } from "@react-three/fiber";

interface EggCasingProps {
  color: number;
}
function EggCasing(props: EggCasingProps) {
  const { color } = props;
  const egg = useLoader(GLTFLoader, "./models/egg.glb");
  const hue = 41 + color;
  const saturation = 100;
  const lightness = 68;

  const BoxMaterialDark = new THREE.MeshStandardMaterial({
    color: `hsl(${hue}, ${saturation}%, ${lightness - 5}%)`,
    roughness: 0.1,
  });

  return (
    <>
      {egg.scene && (
        <group
          rotation={[0, Math.PI * 2, 0]}
          scale={26.4}
          position={[0, -6, 0]}
        >
          <mesh
            geometry={(egg.scene.children[0] as THREE.Mesh).geometry}
            castShadow
            receiveShadow
            material={BoxMaterialDark}
          ></mesh>
          <mesh
            geometry={(egg.scene.children[1] as THREE.Mesh).geometry}
            castShadow
            receiveShadow
          >
            <meshStandardMaterial
              color={"#000"}
              metalness={0}
              roughness={0.5}
            />
          </mesh>{" "}
          <mesh
            geometry={(egg.scene.children[2] as THREE.Mesh).geometry}
            castShadow
            receiveShadow
          >
            <meshStandardMaterial
              color={"#000"}
              metalness={0}
              roughness={0.5}
            />
          </mesh>
        </group>
      )}
    </>
  );
}
export default EggCasing;
