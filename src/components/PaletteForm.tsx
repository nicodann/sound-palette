import { useState } from "react";

import { useAppContext } from "../context/useAppContext";
import { postAiQuery } from "../api/ai";

type FormValues = {
  prompt: string;
};

export default function PaletteForm() {
  const [formValues, setFormValues] = useState<FormValues>({ prompt: "" });
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState<string>();

  const { setAiResponse, setSubmittedPrompt } = useAppContext();

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formValues.prompt.trim()) {
      setError("Please enter some text.");
      return;
    }
    setError("");
    try {
      setIsLoading(true);
      setSubmittedPrompt(formValues.prompt);
      const response = await postAiQuery({ query: formValues.prompt });
      setAiResponse(response);
      setFormValues({ prompt: "" });
    } catch {
      setError("Couldn't generate a palette, please try again.");
    } finally {
      setIsLoading(false);
    }
    console.log("form submitted", formValues);
  };

  return (
    <form id="paletteForm" onSubmit={handleSubmit}>
      <p>Describe a scene or feeling.</p>
      <input
        aria-invalid={!!error}
        aria-describedby="prompt-error"
        id="prompt"
        type="text"
        value={formValues.prompt}
        placeholder="A misty lake full of poison fishies..."
        onChange={(e) => {
          setError("");
          setFormValues((prev) => {
            return { ...prev, prompt: e.target.value };
          });
        }}
      />
      <p id="prompt-error" className="error" hidden={!error} role="alert">
        {error}
      </p>
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Colouring..." : "Submit"}
      </button>
    </form>
  );
}
