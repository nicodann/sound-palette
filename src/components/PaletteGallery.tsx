import { useEffect } from "react";
import { useAppContext } from "../context/useAppContext";
import { getPalettes } from "../api/palette";
import PaletteContainer from "./PaletteContainer";
import DeleteStatus from "./DeleteStatus";

export default function PaletteGallery() {
  const {
    loggedInUser,
    setUserPalettes,
    userPalettes,
    pendingDelete,
    isPaletteDrawerExpanded,
    setIsPaletteDrawerExpanded,
  } = useAppContext();

  useEffect(() => {
    if (!loggedInUser) return;

    getPalettes()
      .then((palettes) => {
        if (palettes.length === 0) return;

        setUserPalettes(palettes);
      })
      .catch((err) => {
        console.error("Failed to fetch palettes or no palettes found: ", err);
      });
  }, [loggedInUser, setUserPalettes]);

  if (!loggedInUser) return null;

  return (
    <div id="paletteGallery" data-palettes-expanded={isPaletteDrawerExpanded}>
      <div className="galleryDrawer">
        {userPalettes?.map((palette, i, all) => (
          <div
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
            <PaletteContainer paletteObject={palette} key={palette.id} />
            {palette.id === pendingDelete && <DeleteStatus />}
          </div>
        ))}
      </div>
    </div>
  );
}
