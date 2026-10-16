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
  const {
    setCurrentPalette,
    currentPalette,
    setDeleteStatus,
    setPendingDelete,
  } = useAppContext();
  const [isOpenDeletePaletteModal, setIsOpenDeletePaletteModal] =
    useState(false);

  const closeModal = () => setIsOpenDeletePaletteModal(false);

  const cancelDelete = () => {
    closeModal();
    setPendingDelete(undefined);
    setDeleteStatus("idle");
  };

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
          e.stopPropagation();
          setIsOpenDeletePaletteModal(true);
          setPendingDelete(paletteObject.id);
        }}
      >
        delete
      </button>
      {isOpenDeletePaletteModal &&
        createPortal(
          <ConfirmPaletteDeleteModal
            palette={paletteObject}
            onCancel={cancelDelete}
            onConfirm={closeModal}
          />,
          document.body,
        )}
    </div>
  );
}
