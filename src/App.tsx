import { useEffect, useState } from "react";
import "./App.css";

import "@fontsource-variable/dm-sans";
import Header from "./components/Header";
import type { AiResponse } from "./types";
import PaletteForm from "./components/PaletteForm";
import LoginRegisterModal from "./components/LoginRegisterModal";
import LoginForm from "./components/LoginForm";

type UiState = "empty" | "paletteForm" | "loginRegister" | "login" | "register";

function App() {
  const [loggedInUser, setLoggedInUser] = useState<string>();
  const [aiResponse, setAiResponse] = useState<AiResponse>([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [uiState, setUiState] = useState<UiState>("paletteForm");

  const onPaletteGenerated = (response: AiResponse) => {
    setAiResponse(response);
    setHasSubmitted(true);
  };

  const onReset = () => {
    setHasSubmitted(false);
    setUiState("paletteForm");
    setAiResponse([]);
  };

  const onSave = () => {
    setUiState("loginRegister");
  };

  const onCloseRegisterLoginModal = () => {
    setUiState("paletteForm");
  };

  const responseColours = aiResponse?.map((item) => item.colour);

  const buildGradientString = (colours: string[]) => {
    if (colours.length === 0) return undefined;
    let percentage = 0;
    let backgroundGradientString = "linear-gradient(90deg, ";

    for (let i = 0; i < colours.length; i++) {
      backgroundGradientString += `${colours[i]} ${percentage}%`;
      percentage += 20;
      backgroundGradientString += i < colours.length - 1 ? "," : ")";
    }

    return backgroundGradientString;
  };

  useEffect(() => {
    console.log("uiState: ", uiState);
  }, [uiState]);

  return (
    <div
      id="background"
      className={`
        archivo-black-regular 
        ${hasSubmitted ? "hasSubmitted" : "beforeSubmitted"}
        ${uiState === "loginRegister" ? "loginRegisterActive" : "loginRegisterInactive"}
        `}
      data-ui={uiState}
      style={{ background: buildGradientString(responseColours) }}
    >
      <Header
        aiResponse={aiResponse}
        onReset={onReset}
        hasSubmitted={hasSubmitted}
        onSave={onSave}
        loggedInUser={loggedInUser}
      />
      <main>
        <PaletteForm onSubmitSuccess={onPaletteGenerated} />
        <LoginRegisterModal
          onCloseRegisterLoginModal={onCloseRegisterLoginModal}
        />
        <LoginForm setLoggedInUser={setLoggedInUser} />
      </main>
    </div>
  );
}

export default App;
