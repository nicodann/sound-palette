import { useAppContext } from "../context/useAppContext";
import LoginButton from "./LoginButton";

export default function LoginRegisterModal() {
  const { setUiState } = useAppContext();
  return (
    <div id="loginRegisterModal">
      <LoginButton />
      <button id="register">Register</button>
      <button id="close" onClick={() => setUiState("empty")}>
        X
      </button>
    </div>
  );
}
