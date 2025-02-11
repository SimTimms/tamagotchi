import LCDBackgroundScreen from "./LCDBackgroundScreen";

import { StatsType } from "../Scene";

interface LCDScreenBackgroundProps {
  lightColor: string;
  stats: StatsType;
  creatureColor: number;
  screenSize: number;
}

function LCDScreenBackground(props: LCDScreenBackgroundProps) {
  const { screenSize } = props;
  const scale = 1;
  const screenSizeOffset = (screenSize / 2) * scale;

  return (
    <group
      position={[-screenSizeOffset + 0.5, screenSizeOffset - 3.3, 2]}
      scale={scale}
    >
      <LCDBackgroundScreen
        screenSize={screenSize}
        item={"rainbow"}
        animateItem={true}
      />
    </group>
  );
}
export default LCDScreenBackground;
