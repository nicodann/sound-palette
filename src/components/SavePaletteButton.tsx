import { useAppContext } from "../context/useAppContext";

export default function SavePaletteButton() {
  const { setUiState } = useAppContext();
  return (
    <button id="save" onClick={() => setUiState("loginRegister")}>
      save palette
    </button>
  );
}
