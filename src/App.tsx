import { useState } from "react";
import "./App.css";

import "@fontsource-variable/dm-sans";
import Header from "./components/Header";
import type { AiResponse } from "./types";
import PaletteForm from "./components/PaletteForm";

function App() {
  const [aiResponse, setAiResponse] = useState<AiResponse>([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const onPaletteGenerated = (response: AiResponse) => {
    setAiResponse(response);
    setHasSubmitted(true);
  };

  const onReset = () => {
    setHasSubmitted(false);
  };

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
        `}
      style={{ background: buildGradientString(responseColours) }}
    >
      <Header
        aiResponse={aiResponse}
        onReset={onReset}
        hasSubmitted={hasSubmitted}
      />
      <main>
        <PaletteForm onSubmitSuccess={onPaletteGenerated} />
      </main>
    </div>
  );
}

export default App;
