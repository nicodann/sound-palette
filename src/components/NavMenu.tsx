import { useAppContext } from "../context/useAppContext";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import RegisterButton from "./RegisterButton";
import ResetButton from "./ResetButton";
import SavePaletteButton from "./SavePaletteButton";

export default function NavMenu() {
  const { loggedInUser, currentPalette, saveStatus } = useAppContext();
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
          </>
        )}
      </div>
    </header>
  );
}
