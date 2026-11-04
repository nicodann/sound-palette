import { useAppContext } from "../context/useAppContext";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import PaletteControl from "./PaletteControl";
import PaletteGallery from "./PaletteGallery";
import RegisterButton from "./RegisterButton";

export default function NavMenu() {
  const { loggedInUser, currentPalette } = useAppContext();
  return (
    <header id="navMenu">
      <div id="nav">
        {loggedInUser ? <p>{loggedInUser}</p> : <LoginButton />}
        <RegisterButton />
        <LogoutButton />
        {currentPalette && (
          <PaletteControl
            key={currentPalette.palette.map((c) => c.colour).join()}
          />
        )}
      </div>
      <PaletteGallery />
    </header>
  );
}
