import { useAppContext } from "../context/useAppContext";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import PaletteGallery from "./PaletteGallery";
import RegisterButton from "./RegisterButton";

export default function NavMenu() {
  const { loggedInUser } = useAppContext();
  return (
    <div id="navMenu">
      {loggedInUser ? <p>{loggedInUser}</p> : <LoginButton />}
      <RegisterButton />
      <LogoutButton />
      <PaletteGallery />
    </div>
  );
}
