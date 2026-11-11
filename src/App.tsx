import { useEffect } from "react";
import "./App.css";

import "@fontsource-variable/dm-sans";
import PaletteForm from "./components/PaletteForm";
import LoginRegisterModal from "./components/LoginRegisterModal";
import LoginForm from "./components/LoginForm";
import { useAppContext } from "./context/useAppContext";
import RegisterForm from "./components/RegisterForm";
import NavMenu from "./components/NavMenu";
import { buildGradientString } from "./lib/buildGradientString";
import PaletteGallery from "./components/PaletteGallery";
import PaletteWordsDrawer from "./components/PaletteWordsDrawer";

function App() {
  const { uiState, currentPalette, loggedInUser, isPaletteDrawerExpanded } =
    useAppContext();

  useEffect(() => {
    console.log("uiState: ", uiState);
  }, [uiState]);

  return (
    <div
      id="background"
      className={`
        archivo-black-regular 
        `}
      data-ui={uiState}
      data-palette={currentPalette ? "hidden" : "visible"}
      style={{
        background: currentPalette
          ? buildGradientString(currentPalette?.palette)
          : "",
      }}
    >
      <NavMenu />

      <main data-expanded={isPaletteDrawerExpanded}>
        <PaletteWordsDrawer />
        <PaletteForm />
        <LoginRegisterModal />
        <LoginForm />
        <RegisterForm />
      </main>

      {loggedInUser && <PaletteGallery />}
    </div>
  );
}

export default App;
