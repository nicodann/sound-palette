import { useState } from "react";
import { useAppContext } from "../context/useAppContext";
import ResetButton from "./ResetButton";
import SavePaletteButton from "./SavePaletteButton";

export default function PaletteControl() {
  const { currentPalette, saveStatus } = useAppContext();
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <>
      {currentPalette && (
        <header id="paletteControl" data-expanded={isExpanded}>
          <div className="drawer">
            <div className="drawerInner" id="paletteWords">
              <div id="response">
                {currentPalette.palette.map((element, i) => {
                  return <p key={i}>{element.adjective}</p>;
                })}
              </div>
            </div>
          </div>
          <div className="bar">
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
            <button
              className="expand"
              aria-expanded={isExpanded}
              aria-controls="paletteWords"
              aria-label={
                isExpanded ? "Hide palette words" : "Show palette words"
              }
              onClick={() => setIsExpanded((prev) => !prev)}
            >
              ▴
            </button>
          </div>
        </header>
      )}
    </>
  );
}
