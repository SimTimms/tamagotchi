import * as THREE from "three";

export type GameConfig = {
  bornAge: number;
  isDead: boolean;
};

export type GameConfigAssets = {
  playMusic: boolean;
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
  selectSound: () => void;
  creatureAttentionSound: () => void;
  cleanSound: () => void;
  treeTexture: THREE.Texture | null;
  floorTexture: THREE.Texture | null;
  floorAlpha: THREE.Texture | null;
  eggTextures: {
    eggTexture: THREE.Texture | null;
    eggTextureOverlay: THREE.Texture | null;
    eggMetalOverlay: THREE.Texture | null;
    eggMetalTexture: THREE.Texture | null;
    eggRoughTexture: THREE.Texture | null;
  };
  buttonTextures: {
    buttonNormal: THREE.Texture | null;
    playTexture: THREE.Texture | null;
    rotateTexture: THREE.Texture | null;
    shadowTexture: THREE.Texture | null;
    sound: THREE.Texture | null;
    soundOn: THREE.Texture | null;
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

export const defaultConfigStats: GameConfig = {
  bornAge: 7,
  isDead: false,
};

const defaultConfigAssets: GameConfigAssets = {
  playMusic: false,
  eggColour: 10,
  ambientLight: 1,
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
  eggTextures: {
    eggTexture: null,
    eggTextureOverlay: null,
    eggMetalOverlay: null,
    eggMetalTexture: null,
    eggRoughTexture: null,
  },
  buttonTextures: {
    buttonNormal: null,
    playTexture: null,
    rotateTexture: null,
    shadowTexture: null,
    sound: null,
    soundOn: null,
  },
  particleTextures: {
    musicOne: null,
    musicTwo: null,
    isSad: null,
    isHappy: null,
  },
  models: { eggModel: null, buttonModel: null },
  selectSound: () => null,
  creatureAttentionSound: () => null,
  cleanSound: () => null,
  treeTexture: null,
  floorTexture: null,
  floorAlpha: null,
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

const defaultConfig: GameConfig & GameConfigAssets = {
  ...defaultConfigStats,
  ...defaultConfigAssets,
};

export default defaultConfig;
