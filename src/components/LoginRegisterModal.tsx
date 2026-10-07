import CloseButton from "./CloseButton";
import LoginButton from "./LoginButton";
import RegisterButton from "./RegisterButton";

export default function LoginRegisterModal() {
  return (
    <div id="loginRegisterModal">
      <LoginButton />
      <RegisterButton />
      <CloseButton />
    </div>
  );
}
