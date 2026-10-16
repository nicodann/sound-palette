import { useEffect } from "react";
import "./App.css";

import "@fontsource-variable/dm-sans";
import PaletteForm from "./components/PaletteForm";
import LoginRegisterModal from "./components/LoginRegisterModal";
import LoginForm from "./components/LoginForm";
import { useAppContext } from "./context/useAppContext";
import RegisterForm from "./components/RegisterForm";
import NavMenu from "./components/NavMenu";
import PaletteControl from "./components/PaletteControl";
import { buildGradientString } from "./lib/buildGradientString";

function App() {
  const { uiState, currentPalette } = useAppContext();

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
      <PaletteControl />

      <main>
        <PaletteForm />
        <LoginRegisterModal />
        <LoginForm />
        <RegisterForm />
      </main>

      <NavMenu />
    </div>
  );
}

export default App;
