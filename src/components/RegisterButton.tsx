import { useAppContext } from "../context/useAppContext";

export default function RegisterButton() {
  const { setUiState, loggedInUser } = useAppContext();
  const handleLoginClick = () => {
    setUiState("register");
  };
  return (
    <button id="login" onClick={handleLoginClick} hidden={!loggedInUser}>
      Login
    </button>
  );
}
