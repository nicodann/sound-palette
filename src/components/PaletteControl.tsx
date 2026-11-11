import { useAppContext } from "../context/useAppContext";
import PaletteWordsDrawer from "./PaletteWordsDrawer";

export default function PaletteControl() {
  const {
    currentPalette,
    isPaletteDrawerExpanded,
    setIsPaletteDrawerExpanded,
  } = useAppContext();

  if (!currentPalette) return null;

  return (
    <div id="paletteControl" data-expanded={isPaletteDrawerExpanded}>
      <div className="bar">
        <button
          className="expand"
          aria-expanded={isPaletteDrawerExpanded}
          aria-controls="paletteWords"
          aria-label={
            isPaletteDrawerExpanded
              ? "Hide palette words"
              : "Show palette words"
          }
          onClick={() => setIsPaletteDrawerExpanded((prev) => !prev)}
        >
          ▴
        </button>
      </div>
      <PaletteWordsDrawer />
    </div>
  );
}
