import { useAppContext } from "../context/useAppContext";

export default function LogoutButton() {
  const { setLoggedInUser } = useAppContext();

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
    } catch (error) {
      console.error("There was a logout error:", error);
    }
  };
  return (
    <button id="login" onClick={handleLogoutClick}>
      Logout
    </button>
  );
}
