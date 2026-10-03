import { useAppContext } from "../context/useAppContext";

export default function LoginButton() {
  const { setUiState } = useAppContext();
  const handleLoginClick = () => {
    setUiState("login");
  };
  return (
    <button id="login" onClick={handleLoginClick}>
      Login
    </button>
  );
}
