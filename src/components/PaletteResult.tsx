import { useAppContext } from "../context/useAppContext";
import ResetButton from "./ResetButton";
import SavePaletteButton from "./SavePaletteButton";

type PaletteResultProps = {
  hasSubmitted: boolean;
};

export default function PaletteResult({ hasSubmitted }: PaletteResultProps) {
  const { aiResponse } = useAppContext();
  return (
    <header>
      {hasSubmitted && (
        <div id="response">
          {aiResponse.map((element, i) => {
            return <p key={i}>{element.adjective}</p>;
          })}
          <ResetButton />
          <SavePaletteButton />
        </div>
      )}
    </header>
  );
}
