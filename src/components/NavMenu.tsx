import { useAppContext } from "../context/useAppContext";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import RegisterButton from "./RegisterButton";

export default function NavMenu() {
  const { loggedInUser } = useAppContext();
  return (
    <div className="navMenu">
      {loggedInUser ? <p>{loggedInUser}</p> : <LoginButton />}
      <RegisterButton />
      <LogoutButton />
    </div>
  );
}
