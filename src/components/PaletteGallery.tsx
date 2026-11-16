import { Fragment, useEffect } from "react";
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
    <div id="paletteGallery" data-expanded={isPaletteDrawerExpanded}>
      <div className="bar">
        <h2>My Colours</h2>
        <button
          className="expand"
          aria-expanded={isPaletteDrawerExpanded}
          aria-controls="paletteObjects"
          aria-label={
            isPaletteDrawerExpanded
              ? "Hide palette objects"
              : "Show palette objects"
          }
          onClick={() => setIsPaletteDrawerExpanded((prev) => !prev)}
        >
          {/* <span className="drawerArrow">▴</span> */}▴
        </button>
      </div>
      <div className="drawer">
        <div className="drawerInner" id="paletteObjects">
          {userPalettes?.map((palette, i) => (
            <Fragment key={i}>
              <PaletteContainer paletteObject={palette} key={palette.id} />
              {palette.id === pendingDelete && <DeleteStatus />}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
