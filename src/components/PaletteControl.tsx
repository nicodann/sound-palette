import { useAppContext } from "../context/useAppContext";
import ResetButton from "./ResetButton";
import SavePaletteButton from "./SavePaletteButton";

export default function PaletteControl() {
  const { currentPalette, saveStatus } = useAppContext();

  return (
    <div id="paletteControl">
      {currentPalette && (
        <div id="response">
          {currentPalette.palette.map((element, i) => {
            return <p key={i}>{element.adjective}</p>;
          })}
          <ResetButton />
          {!currentPalette.id && <SavePaletteButton />}
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
    </div>
  );
}
