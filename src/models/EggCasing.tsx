import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { useLoader } from "@react-three/fiber";
interface EggCasingProps {
  color: number;
  eggTextures: [
    THREE.Texture | null,
    THREE.Texture | null,
    THREE.Texture | null,
    THREE.Texture | null,
    THREE.Texture | null
  ];
}
function EggCasing(props: EggCasingProps) {
  const { color, eggTextures } = props;
  const egg = useLoader(GLTFLoader, "./models/egg.glb");
  const hue = 41 + color;

  const BoxMaterialDark = new THREE.MeshStandardMaterial({
    color: `hsl(${hue}, 40%, 68%)`,
    map: eggTextures[0],
    metalness: 0.1,
    roughness: 0.1,
  });

  const BoxMaterialFlowers = new THREE.MeshStandardMaterial({
    map: eggTextures[1],
    transparent: true,
    roughness: 1,
    roughnessMap: eggTextures[4],
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
            material={BoxMaterialContrast}
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
          </mesh>
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
          <mesh
            geometry={(egg.scene.children[3] as THREE.Mesh).geometry}
            castShadow
            receiveShadow
            material={BoxMaterialDark}
          ></mesh>
          <mesh
            geometry={(egg.scene.children[4] as THREE.Mesh).geometry}
            material={BoxMaterialFlowers}
            scale={1.01}
          ></mesh>
        </group>
      )}
    </>
  );
}
export default EggCasing;
