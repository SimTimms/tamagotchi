export const items = ["rainbow"];

export const rainbow = (screenSize: number) => {
  const blankRow = new Array(screenSize).fill(0);
  const fullRow = new Array(screenSize).fill(1);
  return [
    [
      blankRow,
      blankRow,
      blankRow,
      blankRow,
      blankRow,
      blankRow,
      blankRow,
      fullRow,
      fullRow,
      fullRow,
      fullRow,
      fullRow,
      fullRow,
      [
        3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
        3, 3, 3, 3, 3, 3, 3, 3,
      ],
      fullRow,
      fullRow,
      fullRow,
      fullRow,
      fullRow,
      fullRow,
      fullRow,
      fullRow,
      fullRow,
      fullRow,
      fullRow,
      fullRow,
    ],
  ];
};
