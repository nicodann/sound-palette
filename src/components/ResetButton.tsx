import { useAppContext } from "../context/useAppContext";

export default function ResetButton() {
  const { setAiResponse, setSubmittedPrompt, setPendingSave } = useAppContext();

  return (
    <button
      id="reset"
      onClick={() => {
        setAiResponse([]);
        setSubmittedPrompt("");
        setPendingSave(false);
      }}
    >
      Reset Palette
    </button>
  );
}
