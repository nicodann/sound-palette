import { useAppContext } from "../context/useAppContext";

export default function ResetButton() {
  const { setAiResponse } = useAppContext();

  return (
    <button id="reset" onClick={() => setAiResponse([])}>
      Reset Palette
    </button>
  );
}
