import { useAppContext } from "../context/useAppContext";
import { buildGradientString } from "../lib/buildGradientString";
import type { SavedPalette } from "../types";

export default function PaletteContainer({
  paletteObject,
}: {
  paletteObject: SavedPalette;
}) {
  const { setAiResponse } = useAppContext();
  return (
    <div
      className="paletteContainer"
      onClick={() => setAiResponse(paletteObject.palette)}
    >
      <h3>{paletteObject.name}</h3>
      <div
        className="paletteColourBox"
        style={{ background: buildGradientString(paletteObject.palette) }}
      />
    </div>
  );
}
