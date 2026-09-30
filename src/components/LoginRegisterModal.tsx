export default function LoginRegisterModal({
  onCloseRegisterLoginModal,
}: {
  onCloseRegisterLoginModal: () => void;
}) {
  return (
    <div id="loginRegisterModal">
      <button id="login">Login</button>
      <button id="register">Register</button>
      <button id="close" onClick={() => onCloseRegisterLoginModal()}>
        X
      </button>
    </div>
  );
}
