import { StatsType } from "../Scene";

export function animateCreature(
  stats: StatsType,
  currentAnim: string,
  setCurrentAnim: (value: string) => void,
  currentSubMenu: number,
  creatureAttention: () => void,
  cleanSound: () => void
) {
  if (stats.dead) {
    if (currentAnim !== "dead") {
      setCurrentAnim("dead");
      creatureAttention();
    }
  } else if (stats.isSick) {
    if (currentAnim !== "sick") {
      setCurrentAnim("sick");
      creatureAttention();
    }
  } else if (stats.isStarving) {
    if (currentAnim !== "sick") {
      setCurrentAnim("sick");
      creatureAttention();
    }
  } else if (stats.isDirty) {
    console.log("isDirty");
    if (currentAnim !== "dirty") {
      setCurrentAnim("dirty");
      creatureAttention();
    }
  } else if (stats.action === "isPlaying") {
    if (currentAnim !== "playing") {
      setCurrentAnim("playing");
      creatureAttention();
    }
  } else if (stats.action === "isChatting") {
    if (currentAnim !== "chatting") {
      setCurrentAnim("chatting");
      creatureAttention();
    }
  } else if (!stats.isHungry && !stats.isSick) {
    if (stats.isSad) {
      if (currentAnim !== "sad") {
        setCurrentAnim("sad");
        creatureAttention();
      }
    } else {
      if (currentAnim !== "happy") {
        setCurrentAnim("happy");
        creatureAttention();
      }
    }
  } else if (stats.isHungry) {
    if (currentAnim !== "yes" && stats.wantsItem && currentSubMenu === 1) {
      setCurrentAnim("yes");
      cleanSound();
    } else if (
      currentAnim !== "no" &&
      !stats.wantsItem &&
      currentSubMenu === 1
    ) {
      setCurrentAnim("no");
      creatureAttention();
    } else if (
      currentAnim !== "hungry" &&
      !stats.wantsItem &&
      currentSubMenu === 0
    ) {
      setCurrentAnim("hungry");
      creatureAttention();
    }
  }
}
