import { useEffect, useState } from "react";
import emojiGroups from "/public/emoji/emoji";
import IEmojiGroup from "/src/types/types";
import "./Form.scss";

type visibilityType = "visible" | "hidden" | "collapse";

function Form() {
  const [emojiListVisibility, setEmojiListVisibility] =
    useState<visibilityType>("hidden");

  const [emojiList, setEmojiList] = useState<IEmojiGroup[]>([]);

  useEffect(() => {
    setEmojiList(emojiGroups);
  }, []);

  return (
    <form className="app__form">
      <textarea className="app__textarea" placeholder="Ваше сообщение" />
      <div
        className="app__emoji-list"
        style={{
          visibility: `${emojiListVisibility}`,
        }}
      >
        {emojiList.map((item, index) => (
          <span key={index}> '1'</span>
        ))}
      </div>
      <img
        className="app__emoji-icon"
        onMouseOver={() => setEmojiListVisibility("visible")}
        onMouseLeave={() => setEmojiListVisibility("hidden")}
        src="/public/svg/emoji-icon.svg"
      />
    </form>
  );
}

export default Form;
