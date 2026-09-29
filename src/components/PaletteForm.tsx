import { useState } from "react";
import type { AiResponse } from "../types";
import { postAiQuery } from "../lib/postAiQuery";

type PaletteFormProps = {
  onSubmitSuccess: (response: AiResponse) => void;
};

type FormValues = {
  prompt: string;
};

export default function PaletteForm({ onSubmitSuccess }: PaletteFormProps) {
  const [formValues, setFormValues] = useState<FormValues>({ prompt: "" });

  const [error, setError] = useState<string>();

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formValues.prompt.trim()) {
      setError("Please enter some text.");
      return;
    }
    setError("");
    console.log("form submitted", formValues);
    const response = await postAiQuery({ query: formValues.prompt });
    onSubmitSuccess(response);
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <p id="error" hidden={!error} role="alert">
        {error}
      </p>
      <button type="submit">Submit</button>
    </form>
  );
}
