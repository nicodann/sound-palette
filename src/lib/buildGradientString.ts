import type { PaletteColours } from "../types";

export const buildGradientString = (paletteColours: PaletteColours) => {
  const colours = paletteColours?.map((item) => item.colour);

  if (colours.length === 0) return undefined;
  let percentage = 0;
  let backgroundGradientString = "linear-gradient(90deg, ";

  for (let i = 0; i < colours.length; i++) {
    backgroundGradientString += `${colours[i]} ${percentage}%`;
    percentage += 20;
    backgroundGradientString += i < colours.length - 1 ? "," : ")";
  }

  return backgroundGradientString;
};
