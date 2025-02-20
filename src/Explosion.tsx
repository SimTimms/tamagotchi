import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useState, useEffect } from "react";

const vertexShader = `
  uniform mat4 projectionMatrix;
  uniform mat4 viewMatrix;
  uniform mat4 modelMatrix;
  uniform float time;

  attribute vec3 position;
  attribute float size;
 void main() {
    float scale = 30.0 - mod(time, 10.0); // Decrease size over time
    gl_PointSize = size * scale;
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position.x,position.y*0.2,position.z, 1.0);
  }
`;

const fragmentShader = `
  precision mediump float;
  uniform sampler2D texture1;

  void main() {
    vec2 uv = gl_PointCoord.xy * 1.0 - 1.0;
    vec4 color = texture2D(texture1, gl_PointCoord);
    gl_FragColor = vec4(color.rgb * 1.5, color.a); // Increase brightness by multiplying RGB values
  }
`;
interface ExplosionProps {
  texture: THREE.Texture | null;
}
export default function Explosion(props: ExplosionProps) {
  const { texture } = props;
  const pointsRef = useRef<THREE.Group>(null);
  const pointCount = 20;
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    if (!geom.current) return;
    (geom.current.material as THREE.ShaderMaterial).uniforms.texture1.value =
      texture;
    if (Array.isArray(geom.current.material)) {
      geom.current.material.forEach(
        (material) => (material.needsUpdate = true)
      );
    } else {
      geom.current.material.needsUpdate = true;
    }
  }, [texture]);

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const [coords] = useMemo(() => {
    const positions = new Float32Array(pointCount * 3);
    const particleSize = 200;

    for (let i = 0; i < pointCount; i++) {
      const r = 50 + Math.random() * particleSize;
      const A = 50 * Math.random() * Math.PI * 2;
      let i3 = i * 3;
      positions[i3 + 0] = Math.sin(i3 * A) * r;
      positions[i3 + 1] = -250 + Math.random() * 500;
      positions[i3 + 2] = Math.cos(i3 * A) * r;
    }

    const coords = new Float32Array(positions);
    return [coords];
  }, [pointCount]);

  const [sizes] = useMemo(() => {
    const sizes = new Float32Array(pointCount);

    for (let i = 0; i < pointCount; i++) {
      sizes[i + 0] = screenSize.height / 500;
    }
    return [sizes];
  }, [pointCount]);

  const geom = useRef<THREE.Points>(null);

  useFrame(({ clock }, delta) => {
    pointsRef.current!.rotation.y += delta * 0.1;
    const timeElapsed = clock.getElapsedTime();
    if (!geom.current) return;
    for (let i = 0; i < pointCount; i++) {
      const i3 = i * 3;
      geom.current.geometry.attributes.position.array[i3 + 1] +=
        Math.sin(timeElapsed);
      geom.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group ref={pointsRef}>
      <points position={[0, 0, 0]} ref={geom}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={coords.length / 3}
            array={coords}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-size"
            count={sizes.length / 3}
            array={sizes}
            itemSize={1}
          />
        </bufferGeometry>
        <rawShaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          transparent={true}
          depthWrite={false}
          uniforms={{
            texture1: { value: texture },
          }}
          attach="material"
        />
      </points>
    </group>
  );
}
