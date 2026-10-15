import { useAppContext } from "../context/useAppContext";

export default function ResetButton() {
  const { setCurrentPalette, setPendingSave, setSaveStatus } = useAppContext();

  return (
    <button
      id="reset"
      onClick={() => {
        setCurrentPalette(null);
        setPendingSave(false);
        setSaveStatus("idle");
      }}
    >
      Reset Palette
    </button>
  );
}
