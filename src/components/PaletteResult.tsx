import { useAppContext } from "../context/useAppContext";
import ResetButton from "./ResetButton";
import SavePaletteButton from "./SavePaletteButton";

type PaletteResultProps = {
  hasSubmitted: boolean;
};

export default function PaletteResult({ hasSubmitted }: PaletteResultProps) {
  const { aiResponse, savePaletteError } = useAppContext();
  return (
    <header>
      {hasSubmitted && (
        <div id="response">
          {aiResponse.map((element, i) => {
            return <p key={i}>{element.adjective}</p>;
          })}
          <ResetButton />
          <SavePaletteButton />
          <p className="error" role="alert" hidden={!savePaletteError}>
            {savePaletteError}
          </p>
        </div>
      )}
    </header>
  );
}
