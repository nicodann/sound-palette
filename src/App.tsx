import { useEffect, useState } from "react";
import "./App.css";
import { postAiQuery } from "./lib/postAiQuery";

type FormValues = {
  prompt: string;
};

function App() {
  const [formValues, setFormValues] = useState<FormValues>({ prompt: "" });
  const [aiResponse, setAiResponse] = useState<
    { adjective: string; colour: string }[]
  >([]);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("form submitted", formValues);
    const answer = await postAiQuery({ query: formValues.prompt });
    setAiResponse(answer);
  };

  useEffect(() => {
    console.log("RESPONSE:", aiResponse);
  }, [aiResponse]);

  const adjectives = aiResponse?.map((item) => item.adjective).join(", ") ?? "";
  const colours = aiResponse?.map((item) => item.colour);

  console.log("COLOURS:", colours);
  console.log("ADJECTIVES:", adjectives);

  let percentage = 0;
  let backgroundGradientString = "linear-gradient(90deg, ";

  for (let i = 0; i < colours.length; i++) {
    backgroundGradientString += `${colours[i]} ${percentage}%`;
    percentage += 20;
    backgroundGradientString += i < colours.length - 1 ? "," : ")";
  }

  console.log("BACKGROUND GRADIENT STRING:", backgroundGradientString);

  return (
    <main style={{ background: backgroundGradientString }}>
      <div id="body">
        <form onSubmit={handleSubmit}>
          <p>Describe a scene or feeling.</p>
          <input
            id="prompt"
            type="text"
            value={formValues.prompt}
            placeholder="A misty lake full of poison fishies"
            onChange={(e) =>
              setFormValues((prev) => {
                return { ...prev, prompt: e.target.value };
              })
            }
          />
          <button type="submit">Submit</button>
        </form>
        {/* <div id="response">{adjectives}</div> */}
        <div id="response">Puple, flightly, yellow, beige, boring</div>
      </div>
    </main>
  );
}

export default App;
