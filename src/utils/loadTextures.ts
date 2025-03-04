import * as THREE from "three";
const TextureLoader = new THREE.TextureLoader();

export const loadIconTextures = () => {
  const iconFood = TextureLoader.load("./textures/icon-food.png");
  iconFood.colorSpace = THREE.SRGBColorSpace;
  const iconLight = TextureLoader.load("./textures/icon-light.png");
  iconLight.colorSpace = THREE.SRGBColorSpace;
  const iconSkull = TextureLoader.load("./textures/icon-skull.png");
  iconSkull.colorSpace = THREE.SRGBColorSpace;
  const iconInject = TextureLoader.load("./textures/icon-inject.png");
  iconInject.colorSpace = THREE.SRGBColorSpace;
  const iconDuck = TextureLoader.load("./textures/icon-duck.png");
  iconDuck.colorSpace = THREE.SRGBColorSpace;
  const iconTape = TextureLoader.load("./textures/icon-tape.png");
  iconTape.colorSpace = THREE.SRGBColorSpace;
  const iconChat = TextureLoader.load("./textures/icon-chat.png");
  iconChat.colorSpace = THREE.SRGBColorSpace;
  const iconHeart = TextureLoader.load("./textures/icon-heart.png");
  iconHeart.colorSpace = THREE.SRGBColorSpace;
  const iconGame = TextureLoader.load("./textures/icon-game.png");
  iconGame.colorSpace = THREE.SRGBColorSpace;

  return {
    iconFood,
    iconLight,
    iconSkull,
    iconInject,
    iconDuck,
    iconTape,
    iconChat,
    iconHeart,
    iconGame,
  };
};

export const loadTextures = () => {
  const treeTexture = TextureLoader.load("./textures/tree.png");
  treeTexture.colorSpace = THREE.SRGBColorSpace;
  const floorAlpha = TextureLoader.load("./textures/floor-alpha.jpg");
  const floorTexture = TextureLoader.load("./textures/floor.jpg");
  floorTexture.colorSpace = THREE.SRGBColorSpace;
  const eggTexture = TextureLoader.load("./textures/egg-diffuse.jpg");
  eggTexture.flipY = false;
  eggTexture.colorSpace = THREE.SRGBColorSpace;
  const eggTextureOverlay = TextureLoader.load(
    "./textures/egg-diffuse-overlay.png"
  );
  eggTextureOverlay.flipY = false;
  eggTextureOverlay.colorSpace = THREE.SRGBColorSpace;
  const eggMetalOverlay = TextureLoader.load(
    "./textures/egg-metal-overlay.jpg"
  );
  const eggMetalTexture = TextureLoader.load("./textures/texture-metal.png");
  const eggRoughTexture = TextureLoader.load("./textures/texture-rough.png");
  const buttonNormal = TextureLoader.load("./textures/button-normal.jpg");
  const music = TextureLoader.load("./textures/music.png");
  music.colorSpace = THREE.SRGBColorSpace;
  const music2 = TextureLoader.load("./textures/music-2.png");
  music2.colorSpace = THREE.SRGBColorSpace;
  const sad = TextureLoader.load("./textures/sad.png");
  sad.colorSpace = THREE.SRGBColorSpace;
  const happy = TextureLoader.load("./textures/happy.png");
  happy.colorSpace = THREE.SRGBColorSpace;
  const playTexture = TextureLoader.load("./textures/play.png");
  playTexture.colorSpace = THREE.SRGBColorSpace;
  const rotateTexture = TextureLoader.load("./textures/rotate.png");
  rotateTexture.colorSpace = THREE.SRGBColorSpace;
  rotateTexture.minFilter = THREE.LinearFilter;
  const shadowTexture = TextureLoader.load("./textures/shadow.png");
  const sound = TextureLoader.load("./textures/sound.png");
  sound.colorSpace = THREE.SRGBColorSpace;
  sound.minFilter = THREE.NearestFilter;
  sound.magFilter = THREE.NearestFilter;
  const soundOn = TextureLoader.load("./textures/sound-on.png");
  soundOn.colorSpace = THREE.SRGBColorSpace;
  soundOn.minFilter = THREE.NearestFilter;
  soundOn.magFilter = THREE.NearestFilter;
  return {
    eggTexture,
    eggTextureOverlay,
    eggMetalTexture,
    eggRoughTexture,
    buttonNormal,
    music,
    music2,
    sad,
    happy,
    eggMetalOverlay,
    treeTexture,
    floorTexture,
    playTexture,
    floorAlpha,
    rotateTexture,
    shadowTexture,
    sound,
    soundOn,
  };
};
