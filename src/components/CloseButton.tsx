import { useAppContext } from "../context/useAppContext";

export default function CloseButton() {
  const { setUiState, setPendingSave } = useAppContext();
  return (
    <button
      id="close"
      onClick={() => {
        setUiState("empty");
        setPendingSave(false);
      }}
    >
      X
    </button>
  );
}
