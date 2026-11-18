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
    openDrawer,
    setOpenDrawer,
  } = useAppContext();

  return (
    <header id="navMenu">
      <div id="nav">
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
              aria-expanded={openDrawer === "words"}
              aria-controls="paletteWords"
              aria-label={
                openDrawer === "words"
                  ? "Hide palette words"
                  : "Show palette words"
              }
              onClick={() =>
                setOpenDrawer((prev) => (prev === "words" ? null : "words"))
              }
            >
              {openDrawer === "words" ? "words -->" : "<-- words"}
              {/* ▴ */}
            </button>
          </>
        )}
        {loggedInUser && (
          <button
            // className="expand"
            aria-expanded={openDrawer === "palettes"}
            aria-controls="paletteObjects"
            aria-label={
              openDrawer === "palettes"
                ? "Hide palette objects"
                : "Show palette objects"
            }
            onClick={() =>
              setOpenDrawer((prev) => (prev === "palettes" ? null : "palettes"))
            }
          >
            {openDrawer == "palettes" ? "<-- palettes" : "palettes -->"}
            {/* <span className="drawerArrow">▴</span>▴ */}
          </button>
        )}
      </div>
    </header>
  );
}
