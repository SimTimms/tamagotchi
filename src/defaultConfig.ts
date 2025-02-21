import * as THREE from "three";
export type GameConfig = {
  eggColour: number;
  ambientLight: number;
  directionalLight: number;
  directionalLightX: number;
  directionalLightY: number;
  directionalLightZ: number;
  debugShowCreature: boolean;
  debugShowBackground: boolean;
  debugShowCanvasBackground: boolean;
  debugShowItem: boolean;
  showGlass: boolean;
  showMenu: boolean;
  bornAge: number;
  isDead: boolean;
  selectSound: () => void;
  creatureAttentionSound: () => void;
  cleanSound: () => void;
  eggTextures: {
    eggTexture: THREE.Texture | null;
    eggMetalTexture: THREE.Texture | null;
    eggRoughTexture: THREE.Texture | null;
  };
  buttonTextures: {
    buttonNormal: THREE.Texture | null;
  };
  particleTextures: {
    musicOne: THREE.Texture | null;
    musicTwo: THREE.Texture | null;
    isSad: THREE.Texture | null;
    isHappy: THREE.Texture | null;
  };
  models: { eggModel: any; buttonModel: any };
  iconTextures: {
    iconFood: THREE.Texture | null;
    iconLight: THREE.Texture | null;
    iconSkull: THREE.Texture | null;
    iconInject: THREE.Texture | null;
    iconDuck: THREE.Texture | null;
    iconTape: THREE.Texture | null;
    iconChat: THREE.Texture | null;
    iconHeart: THREE.Texture | null;
    iconGame: THREE.Texture | null;
  };
};

export const defaultConfigStats = {
  eggColour: 10,
  ambientLight: 0.4,
  directionalLight: 4,
  directionalLightX: 2,
  directionalLightY: 3,
  directionalLightZ: 3,
  debugShowCreature: true,
  debugShowBackground: true,
  debugShowCanvasBackground: true,
  debugShowItem: true,
  showGlass: true,
  showMenu: true,
  bornAge: 7,
  isDead: false,
  selectSound: () => null,
  creatureAttentionSound: () => null,
  cleanSound: () => null,
  eggTextures: {
    eggTexture: null,
    eggMetalTexture: null,
    eggRoughTexture: null,
  },
  buttonTextures: {
    buttonNormal: null,
  },
  particleTextures: {
    musicOne: null,
    musicTwo: null,
    isSad: null,
    isHappy: null,
  },
  models: { eggModel: null, buttonModel: null },
  iconTextures: {
    iconFood: null,
    iconLight: null,
    iconSkull: null,
    iconInject: null,
    iconDuck: null,
    iconTape: null,
    iconChat: null,
    iconHeart: null,
    iconGame: null,
  },
};

const defaultConfigAssets = {
  eggTextures: {
    eggTexture: null,
    eggMetalTexture: null,
    eggRoughTexture: null,
  },
  buttonTextures: {
    buttonNormal: null,
  },
  particleTextures: {
    musicOne: null,
    musicTwo: null,
    isSad: null,
    isHappy: null,
  },
  models: { eggModel: null, buttonModel: null },
};

const defaultConfig: GameConfig = {
  ...defaultConfigStats,
  ...defaultConfigAssets,
};

export default defaultConfig;
