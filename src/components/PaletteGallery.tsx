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
      <div className="bar"></div>
      <div className="galleryDrawer">
        <div className="galleryDrawerInner" id="paletteObjects">
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
