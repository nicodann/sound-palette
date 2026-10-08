import { useAppContext } from "../context/useAppContext";

export default function ResetButton() {
  const { setUiState } = useAppContext();

  return (
    <button id="close" onClick={() => setUiState("empty")}>
      Reset Palette
    </button>
  );
}
