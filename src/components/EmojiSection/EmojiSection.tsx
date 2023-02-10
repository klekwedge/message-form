import "./EmojiSection.scss";

interface EmojiSectionProps {
  title: string;
  list: string[];
  addEmoji: (item: string) => void;
}

function EmojiSection({ title, list, addEmoji }: EmojiSectionProps) {
  return (
    <div className="app__emoji-section">
      <h2>{title}</h2>
      <div className="app__emoji-section-list">
        {list.map((item) => (
          <span onClick={() => addEmoji(item)}>{item}</span>
        ))}
      </div>
    </div>
  );
}

export default EmojiSection;
