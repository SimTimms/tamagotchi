import * as THREE from "three";

export type TexturesType = {
  hexNormal: THREE.Texture;
  timSimmsEmissive: THREE.Texture;
  roadNormal: THREE.Texture;
  roadARM: THREE.Texture;
  wallNormal: THREE.Texture;
  wallARM: THREE.Texture;
  officeDiff: THREE.Texture;
  officeEmissive: THREE.Texture;
  carAlpha: THREE.Texture;
  shopNormal: THREE.Texture;
  shopDiff: THREE.Texture;
  shopEmissive: THREE.Texture;
  shopSignEmissive: THREE.Texture;
  skyscraperDiff: THREE.Texture;
  floorDiff: THREE.Texture;
  floorEmissive: THREE.Texture;
};

export type ModelsType = {
  building: THREE.Object3D;
};
