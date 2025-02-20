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
  const eggTexture = TextureLoader.load("./textures/texture.png");
  eggTexture.colorSpace = THREE.SRGBColorSpace;
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
  return {
    eggTexture,
    eggMetalTexture,
    eggRoughTexture,
    buttonNormal,
    music,
    music2,
    sad,
    happy,
  };
};
