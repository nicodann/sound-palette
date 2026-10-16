import { ApiError } from "../api/client";
import { deletePalette } from "../api/palette";
import { useAppContext } from "../context/useAppContext";

export default function DeletePaletteButton({
  paletteId,
  onConfirm,
}: {
  paletteId: string;
  onConfirm: () => void;
}) {
  const { setCurrentPalette, setDeleteStatus } = useAppContext();

  const handleClick = async () => {
    onConfirm();
    setDeleteStatus("deleting");
    try {
      await deletePalette(paletteId);
    } catch (error) {
      if (!(error instanceof ApiError && error.status === 404)) {
        console.error("Failed to delete:", error);
        setDeleteStatus("error");
        return;
      }
    }

    setCurrentPalette((prev) => (prev?.id === paletteId ? null : prev));
    setDeleteStatus("deleted");
  };
  return (
    <button
      className="deletePalette"
      onClick={(e) => {
        e.stopPropagation();
        handleClick();
      }}
    >
      delete
    </button>
  );
}
