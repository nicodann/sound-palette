import { Fragment, useEffect, useState } from "react";
import { useAppContext } from "../context/useAppContext";
import { getPalettes } from "../api/palette";
import PaletteContainer from "./PaletteContainer";
import DeleteStatus from "./DeleteStatus";

export default function PaletteGallery() {
  const { loggedInUser, setUserPalettes, userPalettes, pendingDelete } =
    useAppContext();
  const [isExpanded, setIsExpanded] = useState(true);

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
    <div id="paletteGallery">
      <div className="bar">
        <button
          className="expand"
          aria-expanded={isExpanded}
          aria-controls="paletteWords"
          aria-label={isExpanded ? "Hide palette words" : "Show palette words"}
          onClick={() => setIsExpanded((prev) => !prev)}
        >
          <p>My Colours</p>▴
        </button>
      </div>
      <div className="drawer">
        <div className="drawerInner">
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
