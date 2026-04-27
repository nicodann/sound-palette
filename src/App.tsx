import { useState } from "react";
import "./App.css";

type FormValues = {
  prompt: string;
};

function App() {
  const [formValues, setFormValues] = useState<FormValues>({ prompt: "" });

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("form submitted", formValues);
  };
  return (
    <section>
      <form onSubmit={handleSubmit}>
        <label>Describe a scene or feeling.</label>
        <input
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
    </section>
  );
}

export default App;
