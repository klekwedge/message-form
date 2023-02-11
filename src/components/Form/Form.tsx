import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import emojiGroups from "/public/emoji/emoji";
import IEmojiGroup from "/src/types/types";
import "./Form.scss";
import EmojiSection from "../EmojiSection/EmojiSection";

type visibilityType = "visible" | "hidden" | "collapse";
type tabType = "all" | "recent";

function Form() {
  const textArea = useRef(null);

  const [emojiListVisibility, setEmojiListVisibility] =
    useState<visibilityType>("visible");
  const [emojiList, setEmojiList] = useState<IEmojiGroup[]>([]);
  const [activeTab, setActiveTab] = useState<tabType>("all");

  const [textAreaValue, setTextAreaValue] = useState("");
  const [recentEmoji, setRecentEmoji] = useState<string[]>([]);

  function changeTextAreaValue(e: React.FormEvent<HTMLTextAreaElement>) {
    setTextAreaValue(e.target.value);
  }

  function addRecentEmoji(emoji: string) {
    setRecentEmoji([emoji, ...recentEmoji]);
  }

  function replaceRecentEmoji(emoji: string) {
    setRecentEmoji([emoji, ...recentEmoji.slice(0, recentEmoji.length - 1)]);
  }

  function addEmoji(emoji: string) {
    if (textArea.current) {
      const pos = textArea.current.selectionStart;
      setTextAreaValue((value) => value + emoji);

      // setTextAreaValue(
      //   (value) => value.slice(0, pos) + emoji + value.slice(pos + 1)
      // );

      if (
        recentEmoji.length < 20 &&
        !recentEmoji.find((item) => item === emoji)
      ) {
        addRecentEmoji(emoji);
      } else if (!recentEmoji.find((item) => item === emoji)) {
        replaceRecentEmoji(emoji);
      }
    }
  }

  console.log(recentEmoji);

  useEffect(() => {
    setEmojiList(emojiGroups);
  }, []);

  // useEffect(() => {

  //   // if (textArea.current) {
  //   //   textArea.current.setSelectionRange(2, 2);
  //   // }
  // }, [textAreaValue]);

  return (
    <form className="app__form">
      <textarea
        ref={textArea}
        className="app__textarea"
        placeholder="Ваше сообщение"
        value={textAreaValue}
        onInput={(e) => changeTextAreaValue(e)}
      >
        <span>FFFFFFFF</span>
      </textarea>

      <div
        style={{
          visibility: `${emojiListVisibility}`,
        }}
        className="app__emoji-block"
        onMouseLeave={() => setEmojiListVisibility("hidden")}
      >
        <div className="app__emoji-list">
          {activeTab === "all" ? (
            emojiList.map((item, index) => (
              <EmojiSection
                key={uuidv4()}
                title={item.title}
                list={item.items}
                addEmoji={addEmoji}
              />
            ))
          ) : (
            <div className="app__emoji-section" style={{ height: "246px" }}>
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
              <div className="app__emoji-section-list">
                {recentEmoji.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
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
        src="/public/svg/emoji-icon.svg"
      />
    </form>
  );
}

export default Form;
