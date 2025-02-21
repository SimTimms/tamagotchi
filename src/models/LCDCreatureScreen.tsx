import * as THREE from "three";
import { useEffect, useState, useRef, createRef } from "react";
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
  const screenSize = 12;

  const blankRow = new Array(screenSize).fill("00");
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
    } = creatureAnimations(age);

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
  const voxelPosArr = [];
  const materialArr: any[] = [];

  for (let i = 0; i < screenSize; i++) {
    for (let j = 0; j < screenSize; j++) {
      voxelPosArr.push(0);
    }
  }
  const elementsRef = useRef<(React.RefObject<any> | null)[]>(
    voxelPosArr.map(() => createRef<null>())
  );

  const blankMaterial = new THREE.MeshStandardMaterial({
    color: "#000",
    transparent: true,
    opacity: 0,
  });
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
      let count = -1;
      for (let i = 0; i < screenSize; i++) {
        for (let j = 0; j < screenSize; j++) {
          count++;
          const thisRowArray = animArray[currentAnim][useAnimFrame][i];
          if (thisRowArray.length < screenSize) {
            for (let a = 0; a < screenSize - thisRowArray.length; a++) {
              thisRowArray.push("00");
            }
          }
          //Fill blanks
          if (animArray[currentAnim][useAnimFrame].length < screenSize) {
            for (
              let a = 0;
              a < screenSize - animArray[currentAnim][useAnimFrame].length;
              a++
            ) {
              animArray[currentAnim][useAnimFrame].push(blankRow);
            }
          }

          let isActivated = thisRowArray[j] !== "00";

          pixelsA.push(
            <mesh
              key={`voxel-${count}`}
              ref={elementsRef.current[count]}
              geometry={BoxGeometry}
              scale={1}
              position={[j, -i, isActivated ? 0 : -0.4]}
              castShadow={isActivated ? true : false}
              material={blankMaterial}
            ></mesh>
          );
        }
      }
      setPixels(pixelsA);
    }
    generateScreenPixels();
  }, [currentAnim, animArray]);

  useEffect(() => {
    if (!animArray[currentAnim]) {
      return;
    }

    function updateAnimation() {
      let count: number = -1;
      for (let i = 0; i < screenSize; i++) {
        for (let j = 0; j < screenSize; j++) {
          if (!animArray[currentAnim][animFrame]) return;
          const thisRowArray = animArray[currentAnim][animFrame][i];
          if (!thisRowArray[j]) {
            return;
          }

          count++;

          let colorIndex = thisRowArray[j];
          let isActivated = thisRowArray[j] !== "00";

          if (materialArr.indexOf(colorIndex) === -1) {
            if (colorIndex.toString().search("f") !== -1) {
              materialArr[colorIndex] = new THREE.MeshStandardMaterial({
                color: `hsl(0,0%,100%)`,
                roughness: 0.1,
              });
            } else if (colorIndex.toString().search("b") !== -1) {
              materialArr[colorIndex] = new THREE.MeshStandardMaterial({
                color: `hsl(${creatureColor + 42},100%,${colorIndex[1] * 10}%)`,
                roughness: 0.1,
              });
            } else {
              materialArr[colorIndex] = new THREE.MeshStandardMaterial({
                color: `hsl(${colorIndex + creatureColor + 42},100%,68%)`,
                roughness: 0.1,
              });
            }
          }
          const material = isActivated && materialArr[colorIndex];

          if (isActivated) {
            if (elementsRef.current[count]) {
              //@ts-ignore
              if (elementsRef.current[count].current) {
                //@ts-ignore
                elementsRef.current[count].current.material = material;
              }
            }
          } else {
            if (elementsRef.current[count]) {
              //@ts-ignore
              if (elementsRef.current[count].current) {
                //@ts-ignore
                elementsRef.current[count].current.material = blankMaterial;
              }
            }
          }
        }
      }
    }
    updateAnimation();
  }, [currentAnim, animFrame, pixels, animArray]);

  let newAnim = 0;
  useFrame((_, delta) => {
    newAnim += 5 * delta;

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

  return <group position={[4, 2, 1]}>{pixels}</group>;
}
export default LCDCreatureScreen;
