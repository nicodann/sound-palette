import { useAppContext } from "../context/useAppContext";

export default function PaletteWordsDrawer() {
  const {
    currentPalette,
    // isPaletteDrawerExpanded,
    setIsPaletteDrawerExpanded,
  } = useAppContext();

  if (!currentPalette) return null;

  return (
    <div className="drawer">
      <div className="drawerInner" id="paletteWords">
        <div id="response">
          {currentPalette.palette.map((element, i, all) => {
            return (
              <h2
                key={i}
                style={
                  {
                    "--i": i,
                  } as React.CSSProperties
                }
                onAnimationEnd={
                  i === all.length - 1
                    ? () => setIsPaletteDrawerExpanded(false)
                    : undefined
                }
              >
                {element.adjective}
              </h2>
            );
          })}
        </div>
        {/* <button
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
        </button> */}
      </div>
    </div>
  );
}
