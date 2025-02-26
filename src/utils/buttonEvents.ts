import { items } from "../data/items";
import { changeLightColor } from "./changeLightColour";
import { changeCreatureColor } from "./changeCreatureColor";
import { StatsType } from "../Scene";

function scrollItems(
  setCurrentItem: any,
  scrollItems: number,
  stats: StatsType
) {
  setCurrentItem((currentItem: string) => {
    let index = items.indexOf(currentItem);
    index += scrollItems;
    if (index === items.length && scrollItems > 0) {
      index = 0;
    } else if (index < 0 && scrollItems < 0) {
      index = items.length - 1;
    }
    const selectedItem = items[index];
    if (stats.favouriteFood === selectedItem) {
      stats.wantsItem = true;
    } else {
      stats.wantsItem = false;
    }

    return selectedItem;
  });
}

export function executeEventsLeft(
  currentSubMenu: number,
  setCurrentMenu: any,
  setCurrentItem: any,
  stats: StatsType
) {
  //setAnimateItem(false);
  if (currentSubMenu === 1) {
    scrollItems(setCurrentItem, 1, stats);
  } else {
    setCurrentMenu((currentMenu: number) => {
      if (currentMenu + 1 > 7) {
        return 0;
      } else {
        return currentMenu + 1;
      }
    });
  }
}

export function executeEventsCentre(
  currentItem: string,
  setCurrentSubMenu: any,
  currentSubMenu: number,
  setCurrentItem: any,
  currentMenu: number,
  setLightColor: any,
  screenColours: string[],
  setAnimateItem: any,
  stats: StatsType,
  setCreatureColor: any
) {
  if (currentItem === "back") {
    setCurrentSubMenu(0);
    setCurrentItem("blank");
  } else {
    if (currentMenu === 0) {
      if (currentSubMenu === 0 && stats.poop < 100 && stats.action === "none") {
        setCurrentSubMenu(1);
        scrollItems(setCurrentItem, -1, stats);
      } else if (currentSubMenu === 1) {
        setAnimateItem(true);
        setCurrentSubMenu(0);
        stats.action = "isFeeding";
      }
    } else if (currentMenu === 1) {
      changeLightColor(setLightColor, screenColours);
      stats.action === "isSleeping"
        ? (stats.action = "none")
        : (stats.action = "isSleeping");
    } else if (currentMenu === 2 && stats.action === "none") {
      stats.action = "isPlaying";
    } else if (currentMenu === 3 && stats.action === "none") {
      stats.action = "isInjecting";
    } else if (currentMenu === 4 && stats.action === "none") {
      stats.action = "isCleaning";
    } else if (currentMenu === 6 && stats.action === "none") {
      stats.action = "isChatting";
    } else if (currentMenu === 7 && stats.action === "none") {
      changeCreatureColor(setCreatureColor);
    }
  }
}

export function executeEventsRight(
  currentSubMenu: number,
  setAnimateItem: any,
  setCurrentItem: any,
  stats: StatsType
) {
  setAnimateItem(false);
  if (currentSubMenu === 1) {
    scrollItems(setCurrentItem, -1, stats);
  }
}
