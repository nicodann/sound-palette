import { useAppContext } from "../context/useAppContext";

export default function RegisterButton() {
  const { setUiState, loggedInUser } = useAppContext();
  const handleLoginClick = () => {
    setUiState("register");
  };
  return (
    <button
      id="register"
      onClick={handleLoginClick}
      hidden={loggedInUser ? true : false}
    >
      Register
    </button>
  );
}
