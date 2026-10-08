import { useAppContext } from "../context/useAppContext";

export default function ResetButton() {
  const { setAiResponse, setSubmittedPrompt } = useAppContext();

  return (
    <button
      id="reset"
      onClick={() => {
        setAiResponse([]);
        setSubmittedPrompt("");
      }}
    >
      Reset Palette
    </button>
  );
}
