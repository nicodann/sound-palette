import type { AiResponse } from "../types";

type HeaderProps = {
  aiResponse: AiResponse;
  onReset: () => void;
  hasSubmitted: boolean;
};

export default function Header({
  aiResponse,
  onReset,
  hasSubmitted,
}: HeaderProps) {
  const handleSave = (aiResponse: AiResponse) => {
    console.log("AI Response: ", aiResponse);
  };

  return (
    <header>
      {hasSubmitted && (
        <div id="response">
          {aiResponse.map((element, i) => {
            return <p key={i}>{element.adjective}</p>;
          })}
          <button id="reset" onClick={() => onReset()}>
            X
          </button>
          <button id="save" onClick={() => handleSave(aiResponse)}>
            save palette
          </button>
        </div>
      )}
    </header>
  );
}
