import * as THREE from "three";

interface LCDGlassProps {
  screenSize: number;
  lightColor: string;
}

function LCDGlass(props: LCDGlassProps) {
  const { screenSize, lightColor } = props;

  const screenGeometry = new THREE.BoxGeometry(
    screenSize,
    screenSize,
    1,
    1,
    1,
    1
  );

  return (
    <group position={[0, 0, -12]}>
      <mesh
        geometry={screenGeometry}
        position={[screenSize / 2 - 0.5, -screenSize / 2 + 0.5, -1]}
        receiveShadow
        castShadow
      >
        <meshStandardMaterial
          color={lightColor}
          emissive={lightColor}
          emissiveIntensity={0.4}
        />
      </mesh>
      <mesh
        geometry={screenGeometry}
        position={[screenSize / 2 - 0.5, -screenSize / 2 + 0.5, 10]}
      >
        <meshStandardMaterial
          opacity={0.6}
          transparent
          color="black"
          metalness={1}
          roughness={0.25}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
export default LCDGlass;
