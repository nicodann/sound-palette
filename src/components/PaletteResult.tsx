import { useAppContext } from "../context/useAppContext";
import ResetButton from "./ResetButton";

type PaletteResultProps = {
  hasSubmitted: boolean;
};

export default function PaletteResult({ hasSubmitted }: PaletteResultProps) {
  const { setUiState, aiResponse } = useAppContext();
  return (
    <header>
      {hasSubmitted && (
        <div id="response">
          {aiResponse.map((element, i) => {
            return <p key={i}>{element.adjective}</p>;
          })}
          <ResetButton />
          <button id="save" onClick={() => setUiState("loginRegister")}>
            save palette
          </button>
        </div>
      )}
    </header>
  );
}
