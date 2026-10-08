import { useEffect } from "react";
import "./App.css";

import "@fontsource-variable/dm-sans";
import Header from "./components/Header";
import PaletteForm from "./components/PaletteForm";
import LoginRegisterModal from "./components/LoginRegisterModal";
import LoginForm from "./components/LoginForm";
import { useAppContext } from "./context/useAppContext";
import RegisterForm from "./components/RegisterForm";

function App() {
  // const [aiResponse, setAiResponse] = useState<AiResponse>([]);

  const { uiState, setUiState, aiResponse, setAiResponse } = useAppContext();
  const hasSubmitted = aiResponse.length > 0;

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
        <PaletteForm />
        <LoginRegisterModal />
        <LoginForm />
        <RegisterForm />
      </main>
    </div>
  );
}

export default App;
