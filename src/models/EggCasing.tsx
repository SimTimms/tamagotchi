import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { useLoader } from "@react-three/fiber";
interface EggCasingProps {
  color: number;
  eggTextures: [THREE.Texture, THREE.Texture, THREE.Texture];
}
function EggCasing(props: EggCasingProps) {
  const { color, eggTextures } = props;
  const egg = useLoader(GLTFLoader, "./models/egg.glb");
  const hue = 41 + color;

  console.log(egg.scene);
  const BoxMaterialDark = new THREE.MeshStandardMaterial({
    color: `hsl(${hue}, 100%, 68%)`,
    roughness: 1,
    map: eggTextures[0],
    metalnessMap: eggTextures[1],
    metalness: 0.01,
    roughnessMap: eggTextures[2],
  });

  const BoxMaterialContrast = new THREE.MeshStandardMaterial({
    color: `hsl(${hue}, 100%,10%)`,
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
            material={BoxMaterialContrast}
          ></mesh>
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
