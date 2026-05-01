import { useState } from "react";
import "./App.css";
import { postAiQuery } from "./lib/postAiQuery";

type FormValues = {
  prompt: string;
};

function App() {
  const [formValues, setFormValues] = useState<FormValues>({ prompt: "" });
  const [aiResponse, setAiResponse] = useState("");

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("form submitted", formValues);
    const answer = await postAiQuery({ query: formValues.prompt });
    setAiResponse(answer);
  };
  return (
    <main>
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
        <div>{aiResponse}</div>
      </form>
    </main>
  );
}

export default App;
