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
    openDrawer,
    setOpenDrawer,
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
    <div
      id="paletteGallery"
      data-palettes-expanded={openDrawer?.name === "palettes"}
    >
      <div className="galleryDrawer">
        {userPalettes?.map((palette, i, all) => (
          <div
            key={palette.id}
            style={
              {
                "--i": i,
                "--n": userPalettes.length,
              } as React.CSSProperties
            }
            onAnimationEnd={
              i === all.length - 1
                ? (e) => {
                    if (e.target !== e.currentTarget) return;
                    setOpenDrawer((prev) =>
                      prev?.name === "palettes" && prev.auto ? null : prev,
                    );
                  }
                : undefined
            }
          >
            <PaletteContainer paletteObject={palette} />
            {palette.id === pendingDelete && <DeleteStatus />}
          </div>
        ))}
      </div>
    </div>
  );
}
