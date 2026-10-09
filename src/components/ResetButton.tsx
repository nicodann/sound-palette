import { useAppContext } from "../context/useAppContext";

export default function ResetButton() {
  const { setAiResponse, setSubmittedPrompt, setPendingSave, setSaveStatus } =
    useAppContext();

  return (
    <button
      id="reset"
      onClick={() => {
        setAiResponse([]);
        setSubmittedPrompt("");
        setPendingSave(false);
        setSaveStatus("idle");
      }}
    >
      Reset Palette
    </button>
  );
}
