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
  return (
    <header>
      {/* <div id="response">Puple, flightly, yellow, beige, boring</div> */}
      {hasSubmitted && (
        <div id="response">
          {aiResponse.map((element, i) => {
            return <p key={i}>{element.adjective}</p>;
          })}
          <button id="reset" onClick={() => onReset()}>
            X
          </button>
        </div>
      )}
    </header>
  );
}
