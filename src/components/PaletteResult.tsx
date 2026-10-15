import { useAppContext } from "../context/useAppContext";
import ResetButton from "./ResetButton";
import SavePaletteButton from "./SavePaletteButton";

type PaletteResultProps = {
  hasSubmitted: boolean;
};

export default function PaletteResult({ hasSubmitted }: PaletteResultProps) {
  const { aiResponse, saveStatus, currentPaletteId } = useAppContext();
  return (
    <header>
      {hasSubmitted && (
        <div id="response">
          {aiResponse.map((element, i) => {
            return <p key={i}>{element.adjective}</p>;
          })}
          <ResetButton />
          {!currentPaletteId && <SavePaletteButton />}
          <p
            id="saveStatus"
            className={`
              ${saveStatus === "error" && "error"}
              ${saveStatus === "saving" && "saving"}
              ${saveStatus === "saved" && "saved"}
            `}
            role="alert"
            hidden={saveStatus === "idle"}
          >
            {saveStatus}
          </p>
        </div>
      )}
    </header>
  );
}
