import CloseButton from "./CloseButton";
import LoginButton from "./LoginButton";

export default function LoginRegisterModal() {
  return (
    <div id="loginRegisterModal">
      <LoginButton />
      <button id="register">Register</button>
      <CloseButton />
    </div>
  );
}
