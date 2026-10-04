import { useAppContext } from "../context/useAppContext";

export default function CloseButton() {
  const { setUiState } = useAppContext();

  return (
    <button id="close" onClick={() => setUiState("empty")}>
      X
    </button>
  );
}
