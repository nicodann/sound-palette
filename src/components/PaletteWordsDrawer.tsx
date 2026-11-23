import { useAppContext } from "../context/useAppContext";

export default function PaletteWordsDrawer() {
  const { currentPalette, setOpenDrawer } = useAppContext();

  if (!currentPalette) return null;

  return (
    <div className="wordsDrawer" id="paletteWords">
      <div id="response">
        {currentPalette.palette.map((element, i, all) => {
          return (
            <h2
              key={i}
              style={
                {
                  "--i": i,
                  "--n": currentPalette.palette.length,
                } as React.CSSProperties
              }
              onAnimationEnd={
                i === all.length - 1
                  ? (e) => {
                      if (e.target !== e.currentTarget) return;
                      setOpenDrawer((prev) =>
                        prev?.name === "words" && prev.auto ? null : prev,
                      );
                    }
                  : undefined
              }
            >
              {element.adjective}
            </h2>
          );
        })}
      </div>
    </div>
  );
}
