import * as THREE from "three";
import { useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { rainbow } from "../data/backgrounds";

function LCDBackgroundScreen(props: {
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
    rainbow: rainbow(screenSize),
  };

  const BoxGeometry = new THREE.BoxGeometry(1, 1, 1, 1);

  const saturation = 52;
  const lightness = 38;

  const materialArr: THREE.MeshBasicMaterial[] = [];

  for (let i = 0; i < 3; i + 30) {}

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

          const material = materialArr[colorIndex];

          if (isActivated) {
            pixelsA.push(
              <mesh
                key={`${i}-${j}`}
                geometry={BoxGeometry}
                scale={1}
                position={[j, -i, isActivated ? 0 : -0.4]}
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

  return <group>{pixels}</group>;
}
export default LCDBackgroundScreen;
