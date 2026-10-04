import { useEffect, useState } from "react";
import "./App.css";

import "@fontsource-variable/dm-sans";
import Header from "./components/Header";
import type { AiResponse } from "./types";
import PaletteForm from "./components/PaletteForm";
import LoginRegisterModal from "./components/LoginRegisterModal";
import LoginForm from "./components/LoginForm";
import { useAppContext } from "./context/useAppContext";

function App() {
  const [aiResponse, setAiResponse] = useState<AiResponse>([]);

  const hasSubmitted = aiResponse.length > 0;

  const { uiState, setUiState } = useAppContext();

  const onPaletteGenerated = (response: AiResponse) => {
    setAiResponse(response);
  };

  const onReset = () => {
    setAiResponse([]);
  };

  const onSave = () => {
    setUiState("loginRegister");
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
      data-palette={hasSubmitted ? "hidden" : "visible"}
      style={{ background: buildGradientString(responseColours) }}
    >
      <Header
        aiResponse={aiResponse}
        onReset={onReset}
        hasSubmitted={hasSubmitted}
        onSave={onSave}
      />
      <main>
        <PaletteForm onSubmitSuccess={onPaletteGenerated} />
        <LoginRegisterModal />
        <LoginForm />
      </main>
    </div>
  );
}

export default App;
