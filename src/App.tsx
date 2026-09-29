import { useEffect, useState } from "react";
import "./App.css";

import "@fontsource-variable/dm-sans";
import Header from "./components/Header";
import type { AiResponse } from "./types";
import PaletteForm from "./components/PaletteForm";

function App() {
  const [aiResponse, setAiResponse] = useState<AiResponse>([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const onReset = () => {
    setHasSubmitted(false);
  };

  useEffect(() => {
    console.log("RESPONSE:", aiResponse);
  }, [aiResponse]);

  useEffect(() => {
    console.log("hasSubmitted", hasSubmitted);
  }, [hasSubmitted]);

  const adjectiveString =
    aiResponse?.map((item) => item.adjective).join(" ") ?? "";
  const colours = aiResponse?.map((item) => item.colour);

  console.log("COLOURS:", colours);
  console.log("ADJECTIVEString:", adjectiveString);

  let percentage = 0;
  let backgroundGradientString = "linear-gradient(90deg, ";

  for (let i = 0; i < colours.length; i++) {
    backgroundGradientString += `${colours[i]} ${percentage}%`;
    percentage += 20;
    backgroundGradientString += i < colours.length - 1 ? "," : ")";
  }

  console.log("BACKGROUND GRADIENT STRING:", backgroundGradientString);

  return (
    <div
      id="background"
      className={`
        archivo-black-regular 
        ${hasSubmitted ? "hasSubmitted" : "beforeSubmitted"}
        `}
      style={{ background: backgroundGradientString }}
    >
      <Header
        aiResponse={aiResponse}
        onReset={onReset}
        hasSubmitted={hasSubmitted}
      />
      <main>
        <PaletteForm
          setHasSubmitted={setHasSubmitted}
          setAiResponse={setAiResponse}
        />
      </main>
    </div>
  );
}

export default App;
