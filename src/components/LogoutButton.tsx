import { useAppContext } from "../context/useAppContext";

export default function LogoutButton() {
  const {
    setLoggedInUser,
    loggedInUser,
    setSaveStatus,
    setUserPalettes,
    currentPaletteId,
    setAiResponse,
  } = useAppContext();

  const handleLogoutClick = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/logout`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-type": "application/json" },
        },
      );

      if (!response.ok) {
        console.log("Failed to logout");
        return;
      }
      setLoggedInUser(undefined);
      setUserPalettes([]);
      setSaveStatus("idle");
      if (currentPaletteId) setAiResponse([]);
    } catch (error) {
      console.error("There was a logout error:", error);
    }
  };
  return (
    <button id="logout" onClick={handleLogoutClick} hidden={!loggedInUser}>
      Logout
    </button>
  );
}
