import { useAppContext } from "../context/useAppContext";
import { buildGradientString } from "../lib/buildGradientString";
import type { SavedPalette } from "../types";

export default function PaletteContainer({
  paletteObject,
}: {
  paletteObject: SavedPalette;
}) {
  const { setCurrentPalette } = useAppContext();
  return (
    <div
      className="paletteContainer"
      onClick={() => {
        setCurrentPalette(paletteObject);
        // setCurrentPaletteId(paletteObject.id);
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
