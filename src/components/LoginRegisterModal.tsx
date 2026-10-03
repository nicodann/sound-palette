import LoginButton from "./LoginButton";

export default function LoginRegisterModal({
  onCloseRegisterLoginModal,
}: {
  onCloseRegisterLoginModal: () => void;
}) {
  return (
    <div id="loginRegisterModal">
      <LoginButton />
      <button id="register">Register</button>
      <button id="close" onClick={() => onCloseRegisterLoginModal()}>
        X
      </button>
    </div>
  );
}
