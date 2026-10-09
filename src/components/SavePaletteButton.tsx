import { useAppContext } from "../context/useAppContext";
import useSavePalette from "../hooks/useSavePalette";

export default function SavePaletteButton() {
  const { setUiState, setPendingSave, loggedInUser } = useAppContext();

  const saveCurrentPalette = useSavePalette();

  return (
    <button
      id="save"
      onClick={async () => {
        if (loggedInUser) {
          await saveCurrentPalette();
        } else {
          setUiState("loginRegister");
          setPendingSave(true);
        }
      }}
    >
      save palette
    </button>
  );
}
