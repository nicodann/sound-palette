import { useAppContext } from "../context/useAppContext";

export default function ResetButton() {
  const {
    setAiResponse,
    setSubmittedPrompt,
    setPendingSave,
    setSavePaletteError,
  } = useAppContext();

  return (
    <button
      id="reset"
      onClick={() => {
        setAiResponse([]);
        setSubmittedPrompt("");
        setPendingSave(false);
        setSavePaletteError("");
      }}
    >
      Reset Palette
    </button>
  );
}
