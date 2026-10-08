import type { AiResponse } from "../types";

type PaletteResultProps = {
  aiResponse: AiResponse;
  onReset: () => void;
  hasSubmitted: boolean;
  onSave: () => void;
};

export default function PaletteResult({
  aiResponse,
  onReset,
  hasSubmitted,
  onSave,
}: PaletteResultProps) {
  return (
    <header>
      {hasSubmitted && (
        <div id="response">
          {aiResponse.map((element, i) => {
            return <p key={i}>{element.adjective}</p>;
          })}
          <button id="reset" onClick={() => onReset()}>
            X
          </button>
          <button id="save" onClick={() => onSave()}>
            save palette
          </button>
        </div>
      )}
    </header>
  );
}
