import type { PaletteColours } from "../types";

export const buildBackgroundColorString = (
  paletteColours: PaletteColours,
  style?: "gradiant" | "striped",
) => {
  const colours = paletteColours?.map((item) => item.colour);

  if (colours.length === 0) return undefined;
  const portion = 100 / colours.length;
  let percentage = 0;
  let backgroundGradientString = "linear-gradient(90deg, ";

  for (let i = 0; i < colours.length; i++) {
    if (style === "striped") {
      backgroundGradientString += `${colours[i]} ${percentage}% ${percentage + portion}%`;
      percentage += portion;
      backgroundGradientString += i < colours.length - 1 ? "," : ")";
    } else {
      backgroundGradientString += `${colours[i]} ${percentage}%`;
      percentage += portion;
      backgroundGradientString += i < colours.length - 1 ? "," : ")";
    }
  }

  return backgroundGradientString;
};
