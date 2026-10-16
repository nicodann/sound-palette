import { useEffect, useRef } from "react";
import type { SavedPalette } from "../types";
import DeletePaletteButton from "./DeletePaletteButton";

export default function ConfirmPaletteDeleteModal({
  palette,
  onCancel,
  onConfirm,
}: {
  palette: SavedPalette;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="confirm-delete-title"
      className="confirmDeletePaletteModal"
    >
      <h3 id="confirm-delete-title">
        {`Are You Sure You Want To Delete ${palette.name ? palette.name : "this palette"}?`}
      </h3>
      <DeletePaletteButton paletteId={palette.id} onConfirm={onConfirm} />
      <button onClick={onCancel}>Cancel</button>
    </dialog>
  );
}
