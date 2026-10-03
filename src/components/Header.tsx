import { useAppContext } from "../context/useAppContext";
import type { AiResponse } from "../types";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

type HeaderProps = {
  aiResponse: AiResponse;
  onReset: () => void;
  hasSubmitted: boolean;
  onSave: () => void;
};

export default function Header({
  aiResponse,
  onReset,
  hasSubmitted,
  onSave,
}: HeaderProps) {
  const { loggedInUser } = useAppContext();

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
      <div className="navMenu">
        {loggedInUser ? <p>{loggedInUser}</p> : <LoginButton />}
        <LogoutButton />
      </div>
    </header>
  );
}
