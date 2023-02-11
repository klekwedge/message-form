import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import emojiGroups from "/public/emoji/emoji";
import IEmojiGroup from "/src/types/types";
import "./Form.scss";
import EmojiSection from "../EmojiSection/EmojiSection";

type visibilityType = "visible" | "hidden" | "collapse";
type tabType = "all" | "recent";

function Form() {
  const [emojiListVisibility, setEmojiListVisibility] =
    useState<visibilityType>("visible");

  const textArea = useRef(null);

  const [textAreaValue, setTextAreaValue] = useState("");
  const [activeTab, setActiveTab] = useState<tabType>("all");
  const [recentEmoji, setRecentEmoji] = useState([]);
  const [textAreaRows, setTextAreaRows] = useState(1);

  function changeTextAreaValue(e: React.FormEvent<HTMLTextAreaElement>) {
    setTextAreaValue(e.target.value);
  }

  function addEmoji(emoji: string) {
    if (textArea.current) {
      const pos = textArea.current.selectionStart;
      setTextAreaValue((value) => value + emoji);

      // setTextAreaValue(
      //   (value) => value.slice(0, pos) + emoji + value.slice(pos + 1)
      // );
    }
  }

  const [emojiList, setEmojiList] = useState<IEmojiGroup[]>([]);

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
        rows={textAreaRows}
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
        src="/public/svg/emoji-icon.svg"
      />
    </form>
  );
}

export default Form;
