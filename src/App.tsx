import { useEffect, useState, useRef, createContext } from "react";
import "./app.css";
import select2 from "./assets/sounds/loop-3.mp3";
import clean from "./assets/sounds/clean.mp3";
import creatureAttention from "./assets/sounds/creature-attention.mp3";
import { loadTextures, loadIconTextures } from "./utils/loadTextures";
import defaultConfig, { defaultConfigStats } from "./data/defaultConfig";
import { GameConfigAssets, GameConfig } from "./data/defaultConfig";
import backgroundImage from "./assets/background.jpg";
import IntroScene from "./IntroScene";
import MainScene from "./MainScene";
import MusicPlayer from "./MusicPlayer";

export const ConfigurationContext = createContext<{
  gameConfig: typeof defaultConfig;
  setGameConfig: React.Dispatch<React.SetStateAction<typeof defaultConfig>>;
}>({
  gameConfig: defaultConfig,
  setGameConfig: () => {},
});

function App() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioRefClean = useRef<HTMLAudioElement>(new Audio(clean));
  const creatureAttentionRef = useRef<HTMLAudioElement>(
    new Audio(creatureAttention)
  );

  const [gameConfig, setGameConfig] = useState<GameConfigAssets & GameConfig>(
    defaultConfig
  );
  const [resetState, setResetState] = useState<boolean>(false);
  const [startScreen, setStartScreen] = useState<boolean>(true);
  const [autoRotate, setAutoRotate] = useState<boolean>(false);

  const handleReset = () => {
    setResetState(true);
    setGameConfig((gameConfig) => {
      return { ...gameConfig, ...defaultConfigStats, isDead: false };
    });
  };

  useEffect(() => {
    const loadAndSetTextures = async () => {
      const {
        eggTexture,
        eggTextureOverlay,
        eggMetalOverlay,
        eggMetalTexture,
        eggRoughTexture,
        buttonNormal,
        music,
        music2,
        sad,
        happy,
        treeTexture,
        floorTexture,
        floorAlpha,
        playTexture,
        rotateTexture,
        shadowTexture,
        sound,
        soundOn,
      } = await loadTextures();

      const {
        iconFood,
        iconLight,
        iconSkull,
        iconInject,
        iconDuck,
        iconTape,
        iconChat,
        iconHeart,
        iconGame,
      } = loadIconTextures();

      if (
        eggTexture &&
        eggTextureOverlay &&
        eggMetalOverlay &&
        eggMetalTexture &&
        eggRoughTexture &&
        playTexture &&
        rotateTexture &&
        buttonNormal
      ) {
        setGameConfig((prev) => ({
          ...prev,
          treeTexture,
          floorTexture,
          floorAlpha,
          eggTextures: {
            eggTexture: eggTexture,
            eggMetalOverlay: eggMetalOverlay,
            eggTextureOverlay: eggTextureOverlay,
            eggMetalTexture: eggMetalTexture,
            eggRoughTexture: eggRoughTexture,
          },
          buttonTextures: {
            buttonNormal: buttonNormal,
            playTexture: playTexture,
            rotateTexture: rotateTexture,
            shadowTexture: shadowTexture,
            sound: sound,
            soundOn: soundOn,
          },
          particleTextures: {
            musicOne: music,
            musicTwo: music2,
            isSad: sad,
            isHappy: happy,
          },
          iconTextures: {
            iconFood,
            iconLight,
            iconSkull,
            iconInject,
            iconDuck,
            iconTape,
            iconChat,
            iconHeart,
            iconGame,
          },
        }));
      }
    };

    loadAndSetTextures();
  }, []);

  useEffect(() => {
    const cleanSound = () => {
      if (audioRefClean.current) {
        audioRefClean.current.pause();
        audioRefClean.current.currentTime = 0;
        audioRefClean.current.volume = 0.15;
        audioRefClean.current.play();
      }
    };

    const selectSound = () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current.volume = 0.25;
        audioRef.current.play();
      }
    };

    const creatureAttentionSound = () => {
      if (creatureAttentionRef.current) {
        creatureAttentionRef.current.pause();
        creatureAttentionRef.current.currentTime = 0;
        creatureAttentionRef.current.volume = 0.15;
        creatureAttentionRef.current.play();
      }
    };
    setGameConfig((prev) => ({
      ...prev,
      selectSound,
      creatureAttentionSound,
      cleanSound,
    }));
  }, []);

  function handleStart() {
    handleReset();
    setStartScreen(false);
    setAutoRotate(false);
  }

  function setMusic() {
    setGameConfig((prev) => ({ ...prev, playMusic: !prev.playMusic }));
  }

  return (
    <div
      className="background"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="ui-title-wrapper">
        <h1 className="ui-title-text">たまごっち</h1>
        <h1 className="ui-title-text-back">Tama-not-chi Challenge</h1>
      </div>
      <audio ref={audioRef} src={select2} />
      <audio ref={audioRefClean} src={clean} />
      <audio ref={creatureAttentionRef} src={creatureAttention} />
      <div
        className="canvas-scroll"
        style={{ marginLeft: startScreen ? `0` : `-100vw` }}
      >
        <IntroScene
          handleStart={handleStart}
          playTexture={gameConfig.buttonTextures.playTexture}
          rotateTexture={gameConfig.buttonTextures.rotateTexture}
          shadowTexture={gameConfig.buttonTextures.shadowTexture}
          sound={gameConfig.buttonTextures.sound}
          soundOn={gameConfig.buttonTextures.soundOn}
          musicOn={gameConfig.playMusic}
          startScreen={startScreen}
          setMusic={setMusic}
        />

        <ConfigurationContext.Provider value={{ gameConfig, setGameConfig }}>
          <MainScene
            resetState={resetState}
            setResetState={setResetState}
            autoRotate={autoRotate}
            setAutoRotate={setAutoRotate}
          />
        </ConfigurationContext.Provider>
      </div>
      {gameConfig.isDead && (
        <div className="ui-wrapper">
          <span className="dead-text">💀 Oh no! Your creature has died 💀</span>
          <div
            className="reset-button"
            onClick={() => {
              handleReset();
            }}
          >
            RESET
          </div>
        </div>
      )}

      <MusicPlayer isPlaying={gameConfig.playMusic} />
      <div className="ui-right">
        <span style={{ color: "rgba(255,255,255,1)" }}>Tim Simms</span>
        <span style={{ color: "rgba(255,255,255,1)" }}>
          React and Three.js Developer
        </span>
        <a
          href="mailto:tim-simms@reactiveweb.co.uk"
          target="_blank"
          rel="noreferrer"
          style={{ color: "rgba(255,255,255,1)" }}
        >
          tim-simms@reactiveweb.co.uk
        </a>
        <a
          href="https://www.linkedin.com/in/tim-simms-94404045/"
          target="_blank"
          rel="noreferrer"
          style={{ color: "rgba(255,255,255,1)" }}
        >
          <span>LinkedIn</span>
        </a>
      </div>
    </div>
  );
}
export default App;
