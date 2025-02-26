import LCDBackgroundScreen from "./LCDBackgroundScreen";
import LCDBackgroundScreenFront from "./LCDScreenBackgroundFront";
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
  return (
    <group scale={scale}>
      <group
        position={[-screenSizeOffsetY + 0.5, screenSizeOffsetX - 4.9, 4]}
        scale={scale}
      >
        <LCDBackgroundScreen
          screenSize={screenSize}
          item={lightColor === "#4287f5" ? "tree" : "night"}
          animateItem={true}
        />
      </group>
      <group
        position={[-screenSizeOffsetY + 0.5, screenSizeOffsetX - 5.9, 8]}
        scale={scale}
      >
        <LCDBackgroundScreenFront
          screenSize={screenSize}
          item={lightColor === "#4287f5" ? "flowersDay" : "flowersNight"}
          animateItem={true}
        />
      </group>
    </group>
  );
}
export default LCDScreenBackground;
