import type { AiResponse } from "../types";

type HeaderProps = {
  aiResponse: AiResponse;
  onReset: () => void;
  hasSubmitted: boolean;
  onSave: () => void;
  loggedInUser?: string;
};

export default function Header({
  aiResponse,
  onReset,
  hasSubmitted,
  onSave,
  loggedInUser,
}: HeaderProps) {
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
          <button id="save" onClick={() => onSave()}>
            save palette
          </button>
        </div>
      )}
      <div className="navMenu">{loggedInUser && <p>{loggedInUser}</p>}</div>
    </header>
  );
}
