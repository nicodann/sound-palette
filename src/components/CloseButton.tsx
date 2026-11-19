import { useAppContext } from "../context/useAppContext";

export default function CloseButton() {
  const { setUiState, setPendingSave, setSaveStatus } = useAppContext();
  return (
    <button
      id="close"
      onClick={() => {
        setUiState("empty");
        setPendingSave(false);
        setSaveStatus("idle");
      }}
    >
      X
    </button>
  );
}
