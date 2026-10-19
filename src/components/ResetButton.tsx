import { useAppContext } from "../context/useAppContext";

export default function ResetButton() {
  const { setCurrentPalette, setPendingSave, setSaveStatus, setUiState } =
    useAppContext();

  return (
    <button
      id="reset"
      onClick={() => {
        setCurrentPalette(null);
        setPendingSave(false);
        setSaveStatus("idle");
        setUiState("empty");
      }}
    >
      Reset Palette
    </button>
  );
}
