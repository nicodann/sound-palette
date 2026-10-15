import { useAppContext } from "../context/useAppContext";

export default function ResetButton() {
  const {
    setCurrentPalette,
    // setSubmittedPrompt,
    setPendingSave,
    setSaveStatus,
  } = useAppContext();

  return (
    <button
      id="reset"
      onClick={() => {
        setCurrentPalette(null);
        // setSubmittedPrompt("");
        setPendingSave(false);
        setSaveStatus("idle");
      }}
    >
      Reset Palette
    </button>
  );
}
