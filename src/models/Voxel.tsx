import * as THREE from "three";

interface VoxelProps {
  position: [number, number, number];
  isActivated: boolean;
  geometry: THREE.BoxGeometry;
  material: THREE.MeshStandardMaterial;
  ref: React.MutableRefObject<THREE.Mesh>;
}
function Voxel(props: VoxelProps) {
  const { geometry, position, isActivated, material, ref } = props;
  return (
    <mesh
      ref={ref}
      geometry={geometry}
      scale={1}
      position={position}
      castShadow={isActivated ? true : false}
      material={material}
    ></mesh>
  );
}
export default Voxel;
