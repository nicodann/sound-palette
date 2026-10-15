import { useAppContext } from "../context/useAppContext";
import { buildGradientString } from "../lib/buildGradientString";
import type { SavedPalette } from "../types";

export default function PaletteContainer({
  paletteObject,
}: {
  paletteObject: SavedPalette;
}) {
  const { setCurrentPalette, currentPalette } = useAppContext();
  return (
    <div
      className={`paletteContainer ${currentPalette && currentPalette.id === paletteObject.id && "selected"}`}
      onClick={() => {
        setCurrentPalette(paletteObject);
      }}
    >
      <h3>{paletteObject.name}</h3>
      <div
        className="paletteColourBox"
        style={{ background: buildGradientString(paletteObject.palette) }}
      />
    </div>
  );
}
