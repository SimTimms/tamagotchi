import * as THREE from "three";
const TextureLoader = new THREE.TextureLoader();

export const loadTextures = () => {
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
