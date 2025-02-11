import * as THREE from "three";
import { useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import {
  pizza,
  poop,
  cake,
  fish,
  blank,
  press,
  back,
  clearPoop,
  inject,
} from "../data/items";

function LCDItemScreen(props: {
  item: string;
  screenSize: number;
  animateItem: boolean;
}) {
  const { item, animateItem, screenSize } = props;
  const [animFrame, setAnimFrame] = useState(0);
  const [pixels, setPixels] = useState<any>([]);
  let newAnim = 0;

  const blankRow = new Array(screenSize).fill(0);

  const tamagotchiArray: { [key: string]: any[] } = {
    blank: blank(screenSize),
    pizza: pizza(screenSize),
    poop: poop(screenSize),
    cake: cake(screenSize),
    fish: fish(screenSize),
    press: press(screenSize),
    back: back(screenSize),
    clean: clearPoop(screenSize),
    inject: inject(screenSize),
  };

  const BoxGeometry = new THREE.BoxGeometry(1, 1, 1, 1);

  const hue = 41;
  const saturation = 52;
  const lightness = 38;

  const BoxMaterialDark = new THREE.MeshStandardMaterial({
    color: `hsl(${hue}, ${saturation}%, ${lightness - 20}%)`,
    roughness: 0.1,
  });

  const BoxMaterial = new THREE.MeshStandardMaterial({
    color: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
    roughness: 0.1,
  });

  const BoxMaterialLight = new THREE.MeshStandardMaterial({
    color: `hsl(${hue}, ${saturation}%, ${lightness + 20}%)`,
    roughness: 0.1,
  });

  const blueMaterialDark = new THREE.MeshStandardMaterial({
    color: `hsl(${hue + 120}, ${saturation}%, ${lightness - 10}%)`,
    roughness: 0.1,
  });

  const blueMaterial = new THREE.MeshStandardMaterial({
    color: `hsl(${hue + 120}, ${saturation}%, ${lightness}%)`,
    roughness: 0.1,
  });

  const blueMaterialLight = new THREE.MeshStandardMaterial({
    color: `hsl(${hue + 120}, ${saturation}%, ${lightness + 20}%)`,
    roughness: 0.1,
  });

  const pinkMaterialDark = new THREE.MeshStandardMaterial({
    color: `hsl(${hue + 300}, ${saturation}%, ${lightness - 10}%)`,
    roughness: 0.1,
  });

  const pinkMaterial = new THREE.MeshStandardMaterial({
    color: `hsl(${hue + 250}, ${saturation}%, ${lightness}%)`,
    roughness: 0.1,
  });

  const pinkMaterialLight = new THREE.MeshStandardMaterial({
    color: `hsl(${hue + 300}, ${saturation}%, ${lightness + 20}%)`,
    roughness: 0.1,
  });

  const greenMaterialDark = new THREE.MeshStandardMaterial({
    color: `hsl(${hue + 120}, ${saturation}%, ${lightness - 10}%)`,
    roughness: 0.1,
  });

  const greenMaterial = new THREE.MeshStandardMaterial({
    color: `hsl(${hue + 220}, ${saturation}%, ${lightness}%)`,
    roughness: 0.1,
  });

  const greenMaterialLight = new THREE.MeshStandardMaterial({
    color: `hsl(${hue + 120}, ${saturation}%, ${lightness + 20}%)`,
    roughness: 0.1,
  });

  const BoxMaterialInactive = new THREE.MeshStandardMaterial({
    color: "#a7cbbf",
    metalness: 0,
  });

  const BoxMaterialActive = new THREE.MeshStandardMaterial({
    color: "#000",
    metalness: 1,
    roughness: 0.1,
  });

  const materialArr = [
    BoxMaterialActive,
    BoxMaterialActive,
    BoxMaterial,
    BoxMaterialDark,
    BoxMaterialLight,
    blueMaterial,
    blueMaterialLight,
    blueMaterialDark,
    pinkMaterial,
    pinkMaterialLight,
    pinkMaterialDark,
    greenMaterial,
    greenMaterialLight,
    greenMaterialDark,
  ];
  useEffect(() => {
    setAnimFrame(0);
  }, [item]);

  useEffect(() => {
    function generateScreenPixels() {
      let useAnimFrame = animFrame;
      const pixelsA = [];
      if (!tamagotchiArray[item]) {
        useAnimFrame = 0;
      }
      if (!tamagotchiArray[item][animFrame]) {
        useAnimFrame = 0;
      }
      for (let i = 0; i < screenSize; i++) {
        for (let j = 0; j < screenSize; j++) {
          const thisRowArray = tamagotchiArray[item][useAnimFrame][i];
          if (thisRowArray.length < screenSize) {
            for (let a = 0; a < screenSize - thisRowArray.length; a++) {
              thisRowArray.push(0);
            }
          }
          if (tamagotchiArray[item][useAnimFrame].length < screenSize) {
            for (
              let a = 0;
              a < screenSize - tamagotchiArray[item][useAnimFrame].length;
              a++
            ) {
              tamagotchiArray[item][useAnimFrame].push(blankRow);
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
                material={material}
              ></mesh>
            );
          }
        }
      }
      setPixels(pixelsA);
    }
    generateScreenPixels();
  }, [item, animFrame]);

  useFrame((_, delta) => {
    if (animateItem === true) {
      newAnim += 2 * delta;

      if (newAnim > 1) {
        setAnimFrame((animFrame) => {
          if (animFrame + 1 > tamagotchiArray[item].length - 1) {
            return 0;
          } else {
            return animFrame + 1;
          }
        });
        newAnim = 0;
      }
    }
  });

  return <group position={[20, 0, 1]}>{pixels}</group>;
}
export default LCDItemScreen;
