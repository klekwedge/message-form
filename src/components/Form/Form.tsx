import { useEffect, useState } from "react";
import emojiGroups from "/public/emoji/emoji";
import IEmojiGroup from "/src/types/types";
import "./Form.scss";
import EmojiSection from "../EmojiSection/EmojiSection";

type visibilityType = "visible" | "hidden" | "collapse";

function Form() {
  const [emojiListVisibility, setEmojiListVisibility] =
    useState<visibilityType>("visible");

  const [emojiList, setEmojiList] = useState<IEmojiGroup[]>([]);

  useEffect(() => {
    setEmojiList(emojiGroups);
  }, []);

  return (
    <form className="app__form">
      <textarea className="app__textarea" placeholder="Ваше сообщение" />

      <div
        style={{
          visibility: `${emojiListVisibility}`,
        }}
        className="app__emoji-block"
      >
        <div className="app__emoji-list">
          {emojiList.map((item, index) => (
            <EmojiSection key={index} title={item.title} list={item.items} />
          ))}
        </div>
        <div className="app__emoji-tabs">
          <img className="_active" src='/public/svg/emoji-icon.svg'/>
          <img src='/public/svg/time-icon.svg'/>
        </div>
        <div className="app__emoji-dec"></div>
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
