export const items = ["back", "pizza", "cake", "fish"];

export const blank = (screenSize: number) => {
  const blankRow = new Array(screenSize).fill(0);
  return [
    [
      blankRow,
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      blankRow,
    ],
  ];
};
export const back = (screenSize: number) => {
  const blankRow = new Array(screenSize).fill(0);
  return [
    [
      blankRow,
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0],
      [0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0],
      [0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      blankRow,
    ],
  ];
};

export const press = (screenSize: number) => {
  const blankRow = new Array(screenSize).fill(0);
  return [
    [
      blankRow,
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
      [0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0],
      [1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1],
      [0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0],
      [0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      blankRow,
    ],
    [
      blankRow,
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0],
      [1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1],
      [1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1],
      [1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1],
      [0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      blankRow,
    ],
  ];
};

export const fish = (screenSize: number) => {
  const blankRow = new Array(screenSize).fill(0);
  return [
    [
      blankRow,
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0],
      [0, 1, 0, 1, 6, 6, 6, 6, 6, 1, 0],
      [0, 1, 1, 5, 5, 5, 5, 5, 1, 5, 1],
      [0, 1, 1, 5, 5, 5, 5, 5, 5, 5, 1],
      [0, 1, 0, 1, 7, 7, 7, 7, 7, 1, 0],
      [1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      blankRow,
    ],
  ];
};

export const cake = (screenSize: number) => {
  const blankRow = new Array(screenSize).fill(0);
  return [
    [
      blankRow,
      [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
      [0, 0, 0, 1, 6, 1, 6, 1, 0, 0, 0],
      [0, 1, 1, 1, 6, 6, 6, 1, 1, 1, 0],
      [1, 9, 9, 9, 1, 6, 1, 9, 9, 9, 1],
      [1, 9, 9, 9, 9, 1, 9, 9, 9, 9, 1],
      [0, 1, 9, 9, 9, 9, 9, 9, 9, 1, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 1, 4, 1, 4, 1, 4, 1, 4, 1, 0],
      [0, 1, 4, 1, 4, 1, 4, 1, 4, 1, 0],
      [0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
      blankRow,
    ],
  ];
};

export const pizza = (screenSize: number) => {
  const blankRow = new Array(screenSize).fill(0);
  const blankScreen = new Array(screenSize).fill(blankRow);
  return [
    [
      blankRow,
      [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
      [0, 0, 1, 4, 4, 4, 4, 4, 4, 1, 0, 0],
      [0, 0, 0, 1, 4, 1, 4, 4, 1, 0, 0, 0],
      [0, 0, 0, 1, 4, 4, 4, 4, 1, 0, 0, 0],
      [0, 0, 0, 1, 1, 4, 1, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 1, 4, 4, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 1, 4, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 4, 4, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
      blankRow,
    ],
    [
      blankRow,
      [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
      [0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0],
      [0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 1, 1, 0, 1, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      blankRow,
    ],
    [
      blankRow,
      [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
      [0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0],
      [0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      blankRow,
    ],
    [
      blankRow,
      [0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      blankRow,
    ],
    blankScreen,
  ];
};

export const inject = (screenSize: number) => {
  return [
    [
      [0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 1, 12, 12, 12, 1, 0, 0, 0],
      [0, 0, 0, 0, 1, 12, 12, 13, 1, 0, 0, 0],
      [0, 0, 0, 0, 1, 12, 12, 13, 1, 0, 0, 0],
      [0, 0, 0, 0, 1, 12, 12, 13, 1, 0, 0, 0],
      [0, 0, 0, 0, 1, 12, 13, 13, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    ],
    [
      [0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 1, 12, 12, 13, 1, 0, 0, 0],
      [0, 0, 0, 0, 1, 12, 12, 13, 1, 0, 0, 0],
      [0, 0, 0, 0, 1, 12, 13, 13, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    ],
    [
      [0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 1, 12, 13, 13, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    ],
  ];
};
export const clearPoop = (screenSize: number) => {
  const blankRow = new Array(screenSize).fill(0);

  return [
    [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 5, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 5, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 5, 5, 5, 1, 0, 0, 0, 0],
      [0, 0, 0, 1, 5, 5, 5, 1, 0, 0, 0, 0],
      [0, 0, 0, 1, 7, 5, 7, 1, 0, 0, 0, 0],
      [0, 0, 0, 1, 7, 7, 7, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],

    [
      blankRow,
      blankRow,
      blankRow,
      blankRow,
      blankRow,
      blankRow,
      blankRow,
      blankRow,
      blankRow,
      blankRow,
      blankRow,
      blankRow,
    ],
  ];
};

export const poop = (screenSize: number) => {
  const blankRow = new Array(screenSize).fill(0);
  return [
    [
      blankRow,
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
      blankRow,
      [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 2, 2, 1, 0, 0, 0, 0],
      [0, 0, 0, 1, 2, 2, 1, 2, 1, 0, 0, 0],
      [0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0],
      blankRow,
    ],
    [
      blankRow,
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
      blankRow,
      [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 2, 2, 1, 0, 0, 0, 0],
      [0, 0, 0, 1, 2, 2, 1, 2, 1, 0, 0, 0],
      [0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0],
      blankRow,
    ],
    [
      blankRow,
      [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      blankRow,
      [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 2, 2, 1, 0, 0, 0, 0],
      [0, 0, 0, 1, 2, 2, 1, 2, 1, 0, 0, 0],
      [0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0],
      blankRow,
    ],
  ];
};
