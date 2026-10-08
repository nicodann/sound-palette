import { useAppContext } from "../context/useAppContext";

export default function SavePaletteButton() {
  const { setUiState, setPendingSave } = useAppContext();
  return (
    <button
      id="save"
      onClick={() => {
        setUiState("loginRegister");
        setPendingSave(true);
      }}
    >
      save palette
    </button>
  );
}
