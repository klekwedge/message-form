import "./EmojiSection.scss";

interface EmojiSectionProps {
  title: string;
  list: string[];
}

function EmojiSection({ title, list }: EmojiSectionProps) {
  return (
    <div className="app__emoji-section">
      <h2>{title}</h2>
      <div className="app__emoji-section-list">
        {list.map((item) => (
          <span>{item}</span>
        ))}
      </div>
    </div>
  );
}

export default EmojiSection;
