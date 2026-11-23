import "./App.css";

import "@fontsource-variable/dm-sans";
import PaletteForm from "./components/PaletteForm";
import LoginRegisterModal from "./components/LoginRegisterModal";
import LoginForm from "./components/LoginForm";
import { useAppContext } from "./context/useAppContext";
import RegisterForm from "./components/RegisterForm";
import NavMenu from "./components/NavMenu";
import { buildBackgroundColorString } from "./lib/buildBackgroundColorString";
import PaletteGallery from "./components/PaletteGallery";
import PaletteWordsDrawer from "./components/PaletteWordsDrawer";

function App() {
  const { uiState, currentPalette, openDrawer } = useAppContext();

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
          ? buildBackgroundColorString(currentPalette?.palette)
          : "",
      }}
    >
      <NavMenu />

      <main
        data-words-expanded={openDrawer?.name === "words"}
        data-palettes-expanded={openDrawer?.name === "palettes"}
      >
        <PaletteWordsDrawer />
        <PaletteGallery />
        <PaletteForm />
        <LoginRegisterModal />
        <LoginForm />
        <RegisterForm />
      </main>
    </div>
  );
}

export default App;
