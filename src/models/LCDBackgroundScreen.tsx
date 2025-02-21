import * as THREE from "three";
import { useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { city, desert, rain } from "../data/backgrounds";

function LCDBackgroundScreen(props: {
  item: string;
  screenSize: [number, number];
  animateItem: boolean;
}) {
  const { item, screenSize } = props;
  const [animFrame, setAnimFrame] = useState(0);
  const [pixels, setPixels] = useState<any>([]);
  let newAnim = 0;

  const blankRow = new Array(screenSize[0]).fill(0);

  const tamagotchiArray: { [key: string]: any[] } = {
    city: city(),
    desert: desert(),
    rain: rain(),
  };

  const BoxGeometry = new THREE.BoxGeometry(1, 1, 1, 1);

  const saturation = 100;
  const lightness = 80;

  const materialArr: THREE.MeshStandardMaterial[] = [];
  materialArr.push(
    new THREE.MeshStandardMaterial({
      color: `#222`,
    })
  );
  materialArr.push(
    new THREE.MeshStandardMaterial({
      color: `#222`,
    })
  );
  materialArr.push(
    new THREE.MeshStandardMaterial({
      color: `#666`,
    })
  );
  for (let c = 0; c < 360; c += 10) {
    materialArr.push(
      new THREE.MeshStandardMaterial({
        color: `hsl(${c}, ${saturation}%, ${lightness}%)`,
      })
    );
  }

  useEffect(() => {
    setAnimFrame(0);
  }, [item]);

  let scrollFrame = 0;

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

      for (let i = 0; i < screenSize[0]; i++) {
        for (let j = 0; j < screenSize[1]; j++) {
          var thisRowArray = tamagotchiArray[item][useAnimFrame][i];
          if (!thisRowArray) {
            thisRowArray = blankRow;
          }

          if (thisRowArray.length < screenSize[0]) {
            for (let a = 0; a < screenSize[0] - thisRowArray.length; a++) {
              thisRowArray.push(0);
            }
          }

          if (tamagotchiArray[item][useAnimFrame].length < screenSize[1]) {
            for (
              let a = 0;
              a < screenSize[1] - tamagotchiArray[item][useAnimFrame].length;
              a++
            ) {
              tamagotchiArray[item][useAnimFrame].push(blankRow);
            }
          }

          let isActivated = thisRowArray[j + 1] > 0;
          let colorIndex = thisRowArray[j + 1];

          const material = materialArr[colorIndex];

          if (isActivated) {
            pixelsA.push(
              <mesh
                key={`${i}-${j}`}
                geometry={BoxGeometry}
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
  }, [item, animFrame, scrollFrame]);

  useFrame((_, delta) => {
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
  });

  return <group>{pixels}</group>;
}
export default LCDBackgroundScreen;
