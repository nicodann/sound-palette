import { useEffect, useState } from "react";
import "./App.css";

import "@fontsource-variable/dm-sans";
import Header from "./components/Header";
import type { AiResponse } from "./types";
import PaletteForm from "./components/PaletteForm";
import LoginRegisterModal from "./components/LoginRegisterModal";

function App() {
  const [aiResponse, setAiResponse] = useState<AiResponse>([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [loginRegisterModalOpen, setLoginRegisterModalOpen] = useState(false);

  const onPaletteGenerated = (response: AiResponse) => {
    setAiResponse(response);
    setHasSubmitted(true);
  };

  const onReset = () => {
    setHasSubmitted(false);
    setLoginRegisterModalOpen(false);
  };

  const onSave = () => {
    setLoginRegisterModalOpen(true);
  };

  const onCloseRegisterLoginModal = () => {
    setLoginRegisterModalOpen(false);
  };

  useEffect(() => {
    console.log("RegisterMOdalOpen?", loginRegisterModalOpen);
  }, [loginRegisterModalOpen]);

  const responseColours = aiResponse?.map((item) => item.colour);

  const buildGradientString = (colours: string[]) => {
    let percentage = 0;
    let backgroundGradientString = "linear-gradient(90deg, ";

    for (let i = 0; i < colours.length; i++) {
      backgroundGradientString += `${colours[i]} ${percentage}%`;
      percentage += 20;
      backgroundGradientString += i < colours.length - 1 ? "," : ")";
    }

    return backgroundGradientString;
  };

  return (
    <div
      id="background"
      className={`
        archivo-black-regular 
        ${hasSubmitted ? "hasSubmitted" : "beforeSubmitted"}
        ${loginRegisterModalOpen ? "loginRegisterActive" : "loginRegisterInactive"}
        `}
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
        <LoginRegisterModal
          onCloseRegisterLoginModal={onCloseRegisterLoginModal}
        />
      </main>
    </div>
  );
}

export default App;
