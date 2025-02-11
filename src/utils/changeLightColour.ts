export function changeLightColor(setLightColor: any, screenColours: string[]) {
  setLightColor((lightColor: string) => {
    let index = screenColours.indexOf(lightColor);
    index++;
    if (index === screenColours.length) {
      index = 0;
    }
    return screenColours[index];
  });
}
