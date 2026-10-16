import { createPortal } from "react-dom";
import { useAppContext } from "../context/useAppContext";
import { buildGradientString } from "../lib/buildGradientString";
import type { SavedPalette } from "../types";
import ConfirmPaletteDeleteModal from "./ConfirmPaletteDeleteModal";
import { useState } from "react";

export default function PaletteContainer({
  paletteObject,
}: {
  paletteObject: SavedPalette;
}) {
  const { setCurrentPalette, currentPalette } = useAppContext();
  const [isOpenDeletePaletteModal, setIsOpenDeletePaletteModal] =
    useState(false);

  return (
    <div
      className={`paletteContainer ${currentPalette && currentPalette.id === paletteObject.id && "selected"}`}
    >
      <button
        onClick={() => {
          setCurrentPalette(paletteObject);
        }}
      >
        <h3>{paletteObject.name}</h3>
        <div
          className="paletteColourBox"
          style={{ background: buildGradientString(paletteObject.palette) }}
        />
      </button>
      <button
        onClick={(e) => {
          setIsOpenDeletePaletteModal(true);
          e.stopPropagation();
        }}
      >
        delete
      </button>
      {isOpenDeletePaletteModal &&
        createPortal(
          <ConfirmPaletteDeleteModal
            palette={paletteObject}
            onClose={() => setIsOpenDeletePaletteModal(false)}
          />,
          document.body,
        )}
    </div>
  );
}
