const colors = [
  ["lightpink", "hotpink"],
  ["cornflowerblue", "blue"],
  ["mediumspringgreen", "mediumseagreen"]
];

const colorIndex = Math.floor(Math.random() * colors.length);

export const bgColor = colors[colorIndex][0];
export const primaryColor = colors[colorIndex][1];
