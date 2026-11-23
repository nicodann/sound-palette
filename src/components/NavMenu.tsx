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
    setSaveStatus,
    openDrawer,
    setOpenDrawer,
  } = useAppContext();

  return (
    <header id="navMenu">
      <div id="nav">
        {loggedInUser ? <h1>{loggedInUser}</h1> : <LoginButton />}
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
              onAnimationEnd={() => setSaveStatus("idle")}
            >
              {saveStatus}
            </p>
            <button
              aria-expanded={openDrawer?.name === "words"}
              aria-controls="paletteWords"
              aria-label={
                openDrawer?.name === "words"
                  ? "Hide palette words"
                  : "Show palette words"
              }
              onClick={() =>
                setOpenDrawer((prev) =>
                  prev?.name === "words"
                    ? null
                    : { name: "words", auto: false },
                )
              }
            >
              {openDrawer?.name === "words" ? "words -->" : "<-- words"}
              {/* ▴ */}
            </button>
          </>
        )}
        {loggedInUser && (
          <button
            // className="expand"
            aria-expanded={openDrawer?.name === "palettes"}
            aria-controls="paletteObjects"
            aria-label={
              openDrawer?.name === "palettes"
                ? "Hide palette objects"
                : "Show palette objects"
            }
            onClick={() =>
              setOpenDrawer((prev) =>
                prev?.name === "palettes"
                  ? null
                  : { name: "palettes", auto: false },
              )
            }
          >
            {openDrawer?.name == "palettes"
              ? "<-- my palettes"
              : "my palettes -->"}
            {/* <span className="drawerArrow">▴</span>▴ */}
          </button>
        )}
      </div>
    </header>
  );
}
