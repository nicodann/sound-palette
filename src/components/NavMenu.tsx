import { useAppContext } from "../context/useAppContext";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import RegisterButton from "./RegisterButton";
import ResetButton from "./ResetButton";
import SavePaletteButton from "./SavePaletteButton";

export default function NavMenu() {
  const {
    loggedInUser,
    currentPalette,
    saveStatus,
    isWordsDrawerExpanded,
    setIsWordsDrawerExpanded,
    isPaletteDrawerExpanded,
    setIsPaletteDrawerExpanded,
  } = useAppContext();
  return (
    <header id="navMenu">
      <div id="nav" data-expanded={isWordsDrawerExpanded}>
        {loggedInUser ? <p>{loggedInUser}</p> : <LoginButton />}
        <RegisterButton />
        <LogoutButton />
        {currentPalette && (
          <>
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
              // className="expand"
              aria-expanded={isWordsDrawerExpanded}
              aria-controls="paletteWords"
              aria-label={
                isWordsDrawerExpanded
                  ? "Hide palette words"
                  : "Show palette words"
              }
              onClick={() => setIsWordsDrawerExpanded((prev) => !prev)}
            >
              {isWordsDrawerExpanded ? "words -->" : "<-- words"}
              {/* ▴ */}
            </button>
            <button
              // className="expand"
              aria-expanded={isPaletteDrawerExpanded}
              aria-controls="paletteObjects"
              aria-label={
                isPaletteDrawerExpanded
                  ? "Hide palette objects"
                  : "Show palette objects"
              }
              onClick={() => setIsPaletteDrawerExpanded((prev) => !prev)}
            >
              {isPaletteDrawerExpanded ? "<-- palettes" : "palettes -->"}
              {/* <span className="drawerArrow">▴</span>▴ */}
            </button>
          </>
        )}
      </div>
    </header>
  );
}
