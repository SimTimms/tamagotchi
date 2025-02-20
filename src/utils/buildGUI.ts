import GUI from "lil-gui";

export default function buildGUI(gameConfig: any, setGameConfig: any) {
  const gui = new GUI();
  const eggFolder = gui.addFolder("Egg");
  const lightFolder = gui.addFolder("Lighting");
  const debugFolder = gui.addFolder("Debug");
  debugFolder.add(gameConfig, "isDead").onChange((value: boolean) => {
    setGameConfig({ ...gameConfig, isDead: value });
  });
  debugFolder.add(gameConfig, "showMenu").onChange((value: boolean) => {
    setGameConfig({ ...gameConfig, showMenu: value });
  });
  debugFolder.add(gameConfig, "showGlass").onChange((value: boolean) => {
    setGameConfig({ ...gameConfig, showGlass: value });
  });
  debugFolder
    .add(gameConfig, "debugShowCreature")
    .onChange((value: boolean) => {
      setGameConfig({ ...gameConfig, debugShowCreature: value });
    });
  debugFolder
    .add(gameConfig, "debugShowBackground")
    .onChange((value: boolean) => {
      setGameConfig({ ...gameConfig, debugShowBackground: value });
    });
  debugFolder
    .add(gameConfig, "debugShowCanvasBackground")
    .onChange((value: boolean) => {
      setGameConfig({ ...gameConfig, debugShowCanvasBackground: value });
    });
  debugFolder.add(gameConfig, "debugShowItem").onChange((value: boolean) => {
    setGameConfig({ ...gameConfig, debugShowItem: value });
  });
  eggFolder.addColor(gameConfig, "eggColour").onChange((value: number) => {
    setGameConfig({ ...gameConfig, eggColour: value });
  });
  eggFolder
    .add(gameConfig, "bornAge", 0, 50)
    .step(1)
    .onChange((value: number) => {
      setGameConfig({ ...gameConfig, bornAge: value });
    });
  lightFolder
    .add(gameConfig, "ambientLight", 0, 1)
    .onChange((value: number) => {
      setGameConfig({ ...gameConfig, ambientLight: value });
    });
  lightFolder
    .add(gameConfig, "directionalLight", 0, 10)
    .onChange((value: number) => {
      setGameConfig({ ...gameConfig, directionalLight: value });
    });
  lightFolder
    .add(gameConfig, "directionalLightX", -10, 10)
    .onChange((value: number) => {
      setGameConfig({ ...gameConfig, directionalLightX: value });
    });
  lightFolder
    .add(gameConfig, "directionalLightY", -10, 10)
    .onChange((value: number) => {
      setGameConfig({ ...gameConfig, directionalLightY: value });
    });
  lightFolder
    .add(gameConfig, "directionalLightZ", -10, 10)
    .onChange((value: number) => {
      setGameConfig({ ...gameConfig, directionalLightZ: value });
    });
}
