import LCDBackgroundScreen from "./LCDBackgroundScreen";

import { StatsType } from "../Scene";

interface LCDScreenBackgroundProps {
  lightColor: string;
  stats: StatsType;
  creatureColor: number;
  screenSize: [number, number];
}

function LCDScreenBackground(props: LCDScreenBackgroundProps) {
  const { screenSize } = props;
  const scale = 1;
  const screenSizeOffsetX = (screenSize[0] / 2) * scale;
  const screenSizeOffsetY = (screenSize[1] / 2) * scale;

  return (
    <group
      position={[-screenSizeOffsetY + 0.5, screenSizeOffsetX - 4.9, 8]}
      scale={scale}
    >
      <LCDBackgroundScreen
        screenSize={screenSize}
        item={"city"}
        animateItem={true}
      />
    </group>
  );
}
export default LCDScreenBackground;
