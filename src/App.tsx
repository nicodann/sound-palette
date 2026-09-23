import { useEffect, useState } from "react";
import "./App.css";
import { postAiQuery } from "./lib/postAiQuery";
import "@fontsource-variable/dm-sans";

type FormValues = {
  prompt: string;
};

function App() {
  const [formValues, setFormValues] = useState<FormValues>({ prompt: "" });
  const [aiResponse, setAiResponse] = useState<
    { adjective: string; colour: string }[]
  >([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [error, setError] = useState<string>();

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formValues.prompt.trim()) {
      setError("Please enter some text.");
      return;
    }
    setError("");
    console.log("form submitted", formValues);
    const answer = await postAiQuery({ query: formValues.prompt });
    setAiResponse(answer);
    setHasSubmitted(true);
  };

  const reset = () => {
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
      <header>
        <button id="reset" hidden={!hasSubmitted} onClick={() => reset()}>
          X
        </button>
        {/* <div id="response">Puple, flightly, yellow, beige, boring</div> */}
        <div id="response">
          {aiResponse.map((element, i) => {
            return <p key={i}>{element.adjective}</p>;
          })}
        </div>
      </header>
      <main>
        <form onSubmit={handleSubmit}>
          <p>Describe a scene or feeling.</p>
          <input
            aria-invalid={!!error}
            aria-describedby="prompt-error"
            id="prompt"
            type="text"
            value={formValues.prompt}
            placeholder="A misty lake full of poison fishies"
            onChange={(e) => {
              setError("");
              setFormValues((prev) => {
                return { ...prev, prompt: e.target.value };
              });
            }}
          />
          <p id="error" hidden={!error} role="alert">
            {error}
          </p>
          <button type="submit">Submit</button>
        </form>
      </main>
    </div>
  );
}

export default App;
