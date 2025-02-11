export function changeCreatureColor(setCreatureColor: any) {
  const creatureColors = [
    0, 10, 30, 60, 90, 100, 150, 180, 210, 240, 270, 300, 330,
  ];

  setCreatureColor((creatureColour: number) => {
    let index = creatureColors.indexOf(creatureColour);
    index++;
    if (index === creatureColors.length) {
      index = 0;
    }
    return creatureColors[index];
  });
}
