import { useEffect, useState } from "react";
import emojiGroups from "/public/emoji/emoji";
import IEmojiGroup from "/src/types/types";
import "./Form.scss";
import EmojiSection from "../EmojiSection/EmojiSection";

type visibilityType = "visible" | "hidden" | "collapse";
type tabType = "all" | "recent";

function Form() {
  const [emojiListVisibility, setEmojiListVisibility] =
    useState<visibilityType>("visible");

  const [textAreaValue, setTextAreaValue] = useState("");
  const [activeTab, setActiveTab] = useState<tabType>("all");
  const [recentEmoji, setRecentEmoji] = useState([]);

  function changeTextAreaValue(e: React.FormEvent<HTMLTextAreaElement>) {
    setTextAreaValue(e.target.value);
  }

  function addEmoji(emoji: string) {
    setTextAreaValue((value) => value + emoji);
  }

  const [emojiList, setEmojiList] = useState<IEmojiGroup[]>([]);

  useEffect(() => {
    setEmojiList(emojiGroups);
  }, []);

  console.log(textAreaValue);

  return (
    <form className="app__form">
      <textarea
        className="app__textarea"
        placeholder="Ваше сообщение"
        value={textAreaValue}
        onInput={(e) => changeTextAreaValue(e)}
      />

      <div
        style={{
          visibility: `${emojiListVisibility}`,
        }}
        className="app__emoji-block"
      >
        <div className="app__emoji-list">
          {activeTab === "all" ? (
            emojiList.map((item, index) => (
              <EmojiSection
                key={index}
                title={item.title}
                list={item.items}
                addEmoji={addEmoji}
              />
            ))
          ) : (
            <div style={{ height: "246px" }}>
              <h2
                style={{
                  fontStyle: "normal",
                  fontWeight: 400,
                  fontSize: "13px",
                  lineHeight: "15px",
                  color: "#939393",
                }}
              >
                Часто используемые
              </h2>
            </div>
          )}
        </div>

        <div className="app__emoji-tabs">
          <img
            className={activeTab === "all" ? "_active" : ""}
            onClick={() => setActiveTab("all")}
            src="/public/svg/emoji-icon.svg"
          />
          <img
            className={activeTab === "recent" ? "_active" : ""}
            onClick={() => setActiveTab("recent")}
            src="/public/svg/time-icon.svg"
          />
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
