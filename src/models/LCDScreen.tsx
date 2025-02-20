import LCDCreatureScreen from "./LCDCreatureScreen";
import LCDItemScreen from "./LCDItemScreen";
import LCDGlass from "./LCDGlass";
import LCDMenuScreen from "./LCDMenuScreen";
import LCDMenuScreenBottom from "./LCDMenuScreenBottom";
import { loadIconTextures } from "../utils/loadTextures";
import * as THREE from "three";
import { GameConfig } from "../defaultConfig";

export type LCDIcons = {
  iconFood: THREE.Texture;
  iconLight: THREE.Texture;
  iconSkull: THREE.Texture;
  iconInject: THREE.Texture;
  iconDuck: THREE.Texture;
  iconTape: THREE.Texture;
  iconChat: THREE.Texture;
  iconHeart: THREE.Texture;
  iconGame: THREE.Texture;
};

interface LCDSceenProps {
  currentAnim: string;
  currentItem: string;
  lightColor: string;
  currentMenu: number;
  animateItem: boolean;
  age: number;
  isSick: boolean;
  creatureColor: number;
  screenSize: number;
  config: GameConfig;
}

function LCDSceen(props: LCDSceenProps) {
  const {
    currentAnim,
    currentItem,
    lightColor,
    currentMenu,
    animateItem,
    age,
    isSick,
    creatureColor,
    screenSize,
    config,
  } = props;

  const icons = loadIconTextures();

  return (
    <group position={[-screenSize / 2 + 0.5, screenSize / 2 - 4, 12]}>
      {config.showGlass && (
        <LCDGlass screenSize={screenSize} lightColor={lightColor} />
      )}
      {config.showMenu && (
        <group position={[2, -3, -3]}>
          <LCDMenuScreen
            icons={icons}
            screenSize={screenSize}
            lightColor={lightColor}
            currentMenu={currentMenu}
            isSick={isSick}
            backMaterial={`hsl(${creatureColor + 42},100%,68%)`}
          />
        </group>
      )}
      <group position={[0, -13, -0.8]}>
        {config.debugShowCreature && (
          <LCDCreatureScreen
            screenSize={screenSize}
            currentAnim={currentAnim}
            age={age}
            creatureColor={creatureColor}
          />
        )}
        {config.debugShowItem && (
          <LCDItemScreen
            screenSize={screenSize}
            item={currentItem}
            animateItem={animateItem}
          />
        )}
      </group>
      {config.showMenu && (
        <group position={[2, -28.6, -3]}>
          <LCDMenuScreenBottom
            icons={icons}
            screenSize={screenSize}
            currentMenu={currentMenu}
            backMaterial={`hsl(${creatureColor + 42},100%,68%)`}
          />
        </group>
      )}
    </group>
  );
}
export default LCDSceen;
