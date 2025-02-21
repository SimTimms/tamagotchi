import LCDBackgroundScreen from "./LCDBackgroundScreen";

import { StatsType } from "../Scene";

interface LCDScreenBackgroundProps {
  lightColor: string;
  stats: StatsType;
  creatureColor: number;
  screenSize: [number, number];
}

function LCDScreenBackground(props: LCDScreenBackgroundProps) {
  const { screenSize, lightColor } = props;
  const scale = 1;
  const screenSizeOffsetX = (screenSize[0] / 2) * scale;
  const screenSizeOffsetY = (screenSize[1] / 2) * scale;
  console.log("LCDScreenBackground", screenSize, lightColor);
  return (
    <group
      position={[-screenSizeOffsetY + 0.5, screenSizeOffsetX - 4.9, 4]}
      scale={scale}
    >
      <LCDBackgroundScreen
        screenSize={screenSize}
        item={
          lightColor === "#f48bba"
            ? "desert"
            : lightColor === "#555"
            ? "rain"
            : "city"
        }
        animateItem={true}
      />
    </group>
  );
}
export default LCDScreenBackground;
