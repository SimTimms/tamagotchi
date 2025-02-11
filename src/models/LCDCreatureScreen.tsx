import * as THREE from "three";
import { useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { creatureAnimations } from "../data/creatureAnimations";

function LCDCreatureScreen(props: {
  currentAnim: string;
  screenSize: number;
  age: number;
  creatureColor: number;
}) {
  const { currentAnim, age, creatureColor } = props;
  const [animFrame, setAnimFrame] = useState(0);
  const [animArray, setAnimArray] = useState<{ [key: string]: any[] }>({});
  const [pixels, setPixels] = useState<any>([]);
  const screenSize = 32;

  const blankRow = new Array(screenSize).fill(0);
  useEffect(() => {
    const {
      sad,
      happy,
      hungry,
      yes,
      no,
      dead,
      playing,
      chatting,
      sick,
      dirty,
    } = creatureAnimations(screenSize, age);

    setAnimArray({
      sad: sad,
      happy: happy,
      hungry: hungry,
      yes: yes,
      no: no,
      dead: dead,
      playing: playing,
      chatting: chatting,
      sick: sick,
      dirty: dirty,
    });
  }, [age, screenSize]);

  const BoxGeometry = new THREE.BoxGeometry(1, 1, 1, 1);
  const BoxMaterialInactive = new THREE.MeshStandardMaterial({
    color: "#a7cbbf",
  });
  const BoxMaterialActive = new THREE.MeshStandardMaterial({
    color: "#000",
    roughness: 0.1,
  });

  const hue = 41 + creatureColor;
  const saturation = 100;
  const lightness = 68;

  const BoxMaterialDark = new THREE.MeshStandardMaterial({
    color: `hsl(${hue}, ${saturation}%, ${lightness - 5}%)`,
    roughness: 0.1,
  });

  const BoxMaterial = new THREE.MeshStandardMaterial({
    color: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
    roughness: 0.1,
  });

  const BoxMaterialLight = new THREE.MeshStandardMaterial({
    color: `hsl(${hue}, ${saturation}%, ${lightness + 5}%)`,
    roughness: 0.1,
  });

  const ghostHue = 187;
  const ghostSaturation = 52;
  const ghostLightness = 82;

  const ghostMaterialDark = new THREE.MeshStandardMaterial({
    color: `hsl(${ghostHue}, ${ghostSaturation}%, ${ghostLightness - 10}%)`,
    roughness: 0.1,
  });

  const ghostMaterial = new THREE.MeshStandardMaterial({
    color: `hsl(${ghostHue}, ${ghostSaturation}%, ${ghostLightness}%)`,
    roughness: 0.1,
  });

  const ghostMaterialLight = new THREE.MeshStandardMaterial({
    color: `hsl(${ghostHue}, ${ghostSaturation}%, ${ghostLightness + 10}%)`,
    roughness: 0.1,
  });

  const materialArr = [
    BoxMaterialActive,
    BoxMaterialActive,
    BoxMaterial,
    BoxMaterialDark,
    BoxMaterialLight,
    ghostMaterialDark,
    ghostMaterial,
    ghostMaterialLight,
  ];

  useEffect(() => {
    if (!animArray[currentAnim]) {
      return;
    }
    function generateScreenPixels() {
      const pixelsA = [];
      let useAnimFrame = animFrame;
      if (!animArray[currentAnim]) {
        setAnimFrame(0);
      }
      if (!animArray[currentAnim][useAnimFrame]) {
        useAnimFrame = 0;
      }
      for (let i = 0; i < screenSize / 2; i++) {
        for (let j = 0; j < screenSize; j++) {
          const thisRowArray = animArray[currentAnim][useAnimFrame][i];
          if (thisRowArray.length < screenSize) {
            for (let a = 0; a < screenSize - thisRowArray.length; a++) {
              thisRowArray.push(0);
            }
          }
          if (animArray[currentAnim][useAnimFrame].length < screenSize) {
            for (
              let a = 0;
              a < screenSize - animArray[currentAnim][useAnimFrame].length;
              a++
            ) {
              animArray[currentAnim][useAnimFrame].push(blankRow);
            }
          }
          let isActivated = thisRowArray[j] > 0;
          let colorIndex = thisRowArray[j];

          const material = isActivated
            ? materialArr[colorIndex]
            : BoxMaterialInactive;

          if (isActivated) {
            pixelsA.push(
              <mesh
                key={`${i}-${j}`}
                geometry={BoxGeometry}
                scale={1}
                position={[j, -i, isActivated ? 0 : -0.4]}
                castShadow={isActivated ? true : false}
                receiveShadow={(isActivated = true)}
                material={material}
              ></mesh>
            );
          }
        }
      }
      setPixels(pixelsA);
    }
    generateScreenPixels();
  }, [currentAnim, animFrame, animArray]);

  let newAnim = 0;
  useFrame((_, delta) => {
    newAnim += 2 * delta;

    if (newAnim > 1) {
      setAnimFrame((animFrame) => {
        if (animFrame + 1 > animArray[currentAnim].length - 1) {
          return 0;
        } else {
          return animFrame + 1;
        }
      });
      newAnim = 0;
    }
  });

  return <group position={[4, 0, 1]}>{pixels}</group>;
}
export default LCDCreatureScreen;
