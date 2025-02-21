import {
  useState,
  useRef,
  useEffect,
  useContext,
  createContext,
  useMemo,
} from "react";
import { LCDScreen, LCDScreenBackground } from "./models";
import EggCasing from "./models/EggCasing";
import EggButtons from "./models/EggButtons";
import {
  executeEventsLeft,
  executeEventsCentre,
  executeEventsRight,
} from "./utils/buttonEvents";
import { useFrame } from "@react-three/fiber";
import { animateCreature } from "./utils/animateCreature";
import { screenColors } from "./utils/screenColors";
import { ConfigurationContext } from "./App";
import UI from "./UI";
const cleanSpeed = 25;
const healthSpeed = 1;
const hungerThreshold = 55;
const hungerSickThreshold = 63;

export const GameContext = createContext<{
  gameContext: StatsType | null;
}>({
  gameContext: null,
});

export type StatsType = {
  health: number;
  hunger: number;
  happiness: number;
  cleanliness: number;
  age: number;
  favouriteFood: string;
  wantsItem: boolean;
  poop: number;
  isHungry: boolean;
  action: string;
  isSick: boolean;
  isDirty: boolean;
  isStarving: boolean;
  isSad: boolean;
  dead: boolean;
};

interface SceneProps {
  resetState: boolean;
  setResetState: React.Dispatch<React.SetStateAction<boolean>>;
  setEnvMap: React.Dispatch<React.SetStateAction<boolean>>;
}
function Scene(props: SceneProps) {
  const { resetState, setResetState, setEnvMap } = props;
  const gameConfig = useContext(ConfigurationContext).gameConfig;

  const { selectSound, creatureAttentionSound, cleanSound, bornAge, isDead } =
    gameConfig;

  const [currentAnim, setCurrentAnim] = useState<string>("happy");
  const [animateItem, setAnimateItem] = useState<boolean>(false);
  const [currentItem, setCurrentItem] = useState<string>("blank");
  const [currentMenu, setCurrentMenu] = useState<number>(0);
  const [currentSubMenu, setCurrentSubMenu] = useState<number>(0);
  const [stage, setStage] = useState<number>(0);
  const [lightColor, setLightColor] = useState<string>(screenColors[0]);
  const [creatureColor, setCreatureColor] = useState<number>(0);
  const [time, setTime] = useState<number>(0);

  const stats = useRef<StatsType>({
    health: 100,
    hunger: 100,
    happiness: 100,
    cleanliness: 100,
    poop: 0,
    age: 0,
    favouriteFood: "pizza",
    wantsItem: false,
    action: "none",
    isSick: false,
    isHungry: false,
    isDirty: false,
    isStarving: false,
    isSad: false,
    dead: false,
  });

  const statSpeed = 1;

  useEffect(() => {
    if (resetState) {
      stats.current = {
        health: 100,
        hunger: 100,
        happiness: 100,
        cleanliness: 100,
        poop: 0,
        age: 0,
        favouriteFood: "pizza",
        wantsItem: false,
        action: "none",
        isSick: false,
        isHungry: false,
        isDirty: false,
        isStarving: false,
        isSad: false,
        dead: false,
      };
      setStage(0);
      setCurrentItem("blank");
      setCurrentMenu(0);
      setCurrentSubMenu(0);
      setLightColor(screenColors[0]);
      setCreatureColor(0);
      setResetState(false);
    }
  }, [resetState]);

  useEffect(() => {
    if (isDead) {
      stats.current.dead = true;
      setAction("isDead");
    } else {
      stats.current.dead = false;
      setAction("none");
    }
  }, [isDead]);

  function increasePoop(amount: number) {
    stats.current.poop = stats.current.poop + amount;
  }

  function hatch() {
    setStage(1);
    creatureAttentionSound();
  }

  function setToHatch() {
    if (stats.current.age > bornAge && stage === 0) {
      hatch();
    }
  }

  function setToPoop() {
    if (stats.current.poop >= 100 && stage === 1) {
      setCurrentItem("poop");
    }
  }

  function setHealth(delta: number) {
    const isSick = stats.current.isSick;
    if (isSick) {
      return stats.current.health - delta * statSpeed * healthSpeed;
    }

    return stats.current.health;
  }

  function setSickness() {
    const isGettingSick =
      stats.current.cleanliness < 70 && stats.current.action !== "isInjecting";

    if (isGettingSick && !stats.current.isSick) {
      stats.current.isSick = true;
    }
  }

  function setToHungry() {
    if (stats.current.hunger < hungerThreshold && !stats.current.isHungry) {
      stats.current.isHungry = true;
    }
    if (stats.current.hunger < hungerSickThreshold) {
      stats.current.isStarving = true;
    }
  }

  function countDownHunger(delta: number) {
    return stats.current.age > bornAge
      ? stats.current.hunger - delta * statSpeed
      : 100;
  }

  function countDownHappiness(delta: number) {
    if (stats.current.action !== "isPlaying") {
      return stats.current.happiness - delta * statSpeed;
    }
    return stats.current.happiness;
  }

  function countUpAge(delta: number) {
    return stats.current.age + delta * statSpeed;
  }

  function setPoop(amount: number) {
    if (stats.current.poop < 0) {
      return 0;
    }
    return stats.current.poop + amount;
  }

  function setDead() {
    if (stats.current.health <= 0 && !stats.current.dead) {
      stats.current.dead = true;
      setAction("isDead");
      setCurrentItem("blank");
    }
  }

  function setSad() {
    if (stats.current.happiness <= 50 && !stats.current.isSad) {
      stats.current.isSad = true;
    }
  }

  function setDirty() {
    const isDirty = stats.current.cleanliness < 40;
    if (isDirty) {
      stats.current.isDirty = true;
    }
  }

  function setAction(action: string) {
    if (stats.current.action !== action && stats.current.dead === false) {
      stats.current.action = action;
    }
  }

  function injectAction(delta: number) {
    const isInjecting = stats.current.action === "isInjecting";
    const finishedInjecting = stats.current.health >= 100 && isInjecting;
    const canInject = stats.current.isSick && currentItem !== "poop";
    if (finishedInjecting) {
      stats.current.isSick = false;
      setCurrentItem("blank");
      cleanSound();
      setAnimateItem(false);
      setAction("none");
    } else if (canInject) {
      if (currentItem !== "inject") {
        setCurrentItem("inject");
        setAnimateItem(true);
      }
      stats.current.health = stats.current.health + delta * statSpeed * 10;
    } else {
      setAction("none");
    }
  }

  function cleaningAction(delta: number) {
    const isCleaning = stats.current.action === "isCleaning";

    const finishedCleaning =
      stats.current.cleanliness >= 100 && stats.current.poop <= 0 && isCleaning;

    const canClean = stats.current.poop > 0 || stats.current.cleanliness < 100;

    if (finishedCleaning) {
      setCurrentItem("blank");
      cleanSound();
      setAnimateItem(false);
      setAction("none");
      stats.current.isDirty = false;
    } else if (canClean) {
      if (currentItem !== "clean") {
        setCurrentItem("clean");
        setAnimateItem(true);
      }
      if (stats.current.cleanliness < 100) {
        stats.current.cleanliness =
          stats.current.cleanliness + delta * statSpeed * cleanSpeed;
      }
      if (stats.current.poop > 0) {
        stats.current.poop =
          stats.current.poop - delta * statSpeed * cleanSpeed;
      }
    } else if (isCleaning && !canClean) {
      setAction("none");
    }
  }

  function feedAction() {
    stats.current = {
      ...stats.current,
      hunger: 100,
      isHungry: false,
      wantsItem: false,
      isStarving: false,
    };
    increasePoop(30);
    setAction("none");
    setToPoop();
  }

  function playingAction(delta: number) {
    const isPlaying = stats.current.action === "isPlaying";
    const finishedPlaying = stats.current.happiness >= 100 && isPlaying;
    const canPlay =
      stats.current.happiness < 100 &&
      currentItem !== "poop" &&
      !stats.current.isSick &&
      !stats.current.isHungry &&
      stats.current.age > bornAge;

    if (finishedPlaying) {
      cleanSound();
      setAction("none");
      stats.current.isSad = false;
    } else if (canPlay) {
      if (stats.current.happiness < 100) {
        stats.current.happiness =
          stats.current.happiness + delta * statSpeed * 10;
      }
    } else if (isPlaying && !canPlay) {
      setAction("none");
    }
  }

  function chatAction(delta: number) {
    const isChatting = stats.current.action === "isChatting";
    const finishedPlaying = stats.current.happiness >= 100 && isChatting;
    const canChat =
      stats.current.happiness < 100 &&
      currentItem !== "poop" &&
      !stats.current.isSick &&
      !stats.current.isHungry &&
      stats.current.age > 4;

    if (finishedPlaying) {
      cleanSound();
      setAction("none");
      stats.current.isSad = false;
    } else if (canChat) {
      if (stats.current.happiness < 100) {
        stats.current.happiness =
          stats.current.happiness + delta * statSpeed * 10;
      }
    } else if (isChatting && !canChat) {
      setAction("none");
    }
  }

  function actionEvents(delta: number) {
    if (stats.current.action === "isCleaning") {
      cleaningAction(delta);
    } else if (stats.current.action === "isInjecting") {
      injectAction(delta);
    } else if (stats.current.action === "isFeeding") {
      feedAction();
    } else if (stats.current.action === "isPlaying") {
      playingAction(delta);
    } else if (stats.current.action === "isChatting") {
      chatAction(delta);
    }
  }

  function setCleanliness(delta: number) {
    if (time < -10000) {
      return 0;
    }
    if (stats.current.age > bornAge) {
      const isClean = stats.current.cleanliness > 0;
      const isPooped =
        stats.current.cleanliness > 0 && stats.current.poop >= 100;

      if (isPooped) {
        return stats.current.cleanliness - delta * statSpeed;
      } else if (isClean) {
        return stats.current.cleanliness - delta * statSpeed * 2;
      }
    }
    return stats.current.cleanliness;
  }

  useFrame(({ clock }, delta) => {
    const thisTime = clock.getElapsedTime();
    if (thisTime > 1) {
      setTime(thisTime);
    }
    setToHungry();
    setToHatch();
    setSickness();
    setDead();
    setDirty();
    setSad();

    stats.current = {
      ...stats.current,
      hunger: countDownHunger(delta),
      happiness: countDownHappiness(delta),
      age: countUpAge(delta),
      cleanliness: setCleanliness(delta),
      health: setHealth(delta),
      poop: setPoop(0),
    };

    animateCreature(
      stats.current,
      currentAnim,
      setCurrentAnim,
      currentSubMenu,
      creatureAttentionSound,
      cleanSound
    );
    actionEvents(delta);
  });

  const memoScreen = useMemo(
    () => (
      <LCDScreen
        currentAnim={currentAnim}
        currentItem={currentItem}
        lightColor={lightColor}
        currentMenu={currentMenu}
        animateItem={animateItem}
        age={stage}
        isSick={stats.current.isSick}
        creatureColor={creatureColor}
        screenSize={32}
        config={gameConfig}
      />
    ),
    [
      currentAnim,
      currentItem,
      lightColor,
      currentMenu,
      animateItem,
      stage,
      stats.current.isSick,
      creatureColor,
      gameConfig,
    ]
  );
  return (
    <GameContext.Provider value={{ gameContext: stats.current }}>
      <ConfigurationContext.Consumer>
        {({ gameConfig }) => {
          return (
            <>
              <UI
                hunger={stats.current.hunger}
                cleanliness={stats.current.cleanliness}
                health={stats.current.health}
                happiness={stats.current.happiness}
                isHungry={stats.current.isHungry}
                isSick={stats.current.isSick}
                isDirty={stats.current.isDirty}
                isHappy={!stats.current.isSad}
                isDead={stats.current.dead}
                setEnvMap={setEnvMap}
              />

              {memoScreen}
              {gameConfig.debugShowBackground && (
                <LCDScreenBackground
                  lightColor={lightColor}
                  stats={stats.current}
                  creatureColor={creatureColor}
                  screenSize={[22, 32]}
                />
              )}

              <EggCasing
                color={creatureColor}
                eggTextures={[
                  gameConfig.eggTextures.eggTexture || null,
                  gameConfig.eggTextures.eggMetalTexture || null,
                  gameConfig.eggTextures.eggRoughTexture || null,
                ]}
              />
              <EggButtons
                buttonOneClick={() => {
                  selectSound();
                  executeEventsLeft(
                    currentSubMenu,
                    setCurrentMenu,
                    setCurrentItem,
                    stats.current
                  );
                }}
                buttonTwoClick={() => {
                  selectSound();
                  executeEventsCentre(
                    currentItem,
                    setCurrentSubMenu,
                    currentSubMenu,
                    setCurrentItem,
                    currentMenu,
                    setLightColor,
                    screenColors,
                    setAnimateItem,
                    stats.current,
                    setCreatureColor
                  );
                }}
                buttonThreeClick={() => {
                  selectSound();
                  executeEventsRight(
                    currentSubMenu,
                    setAnimateItem,
                    setCurrentItem,
                    stats.current
                  );
                }}
                color={`hsl(${creatureColor + 42},100%,68%)`}
              />
            </>
          );
        }}
      </ConfigurationContext.Consumer>
    </GameContext.Provider>
  );
}
export default Scene;
