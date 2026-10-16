import { ApiError } from "../api/client";
import { deletePalette } from "../api/palette";
import { useAppContext } from "../context/useAppContext";

export default function DeletePaletteButton({
  paletteId,
}: {
  paletteId: string;
}) {
  const { setUserPalettes, setCurrentPalette } = useAppContext();

  const handleClick = async () => {
    try {
      await deletePalette(paletteId);
    } catch (error) {
      if (!(error instanceof ApiError && error.status === 404)) {
        console.error("Failed to delete:", error);
        return;
      }
    }
    setUserPalettes((prev) =>
      prev.filter((palette) => palette.id !== paletteId),
    );
    setCurrentPalette((prev) => (prev?.id === paletteId ? null : prev));
  };
  return (
    <button
      className="deletePalette"
      onClick={(e) => {
        e.stopPropagation();
        handleClick();
      }}
    >
      Yes, Delete
    </button>
  );
}
