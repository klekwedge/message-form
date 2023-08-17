/* eslint-disable jsx-a11y/no-static-element-interactions */
import { v4 as uuidv4 } from 'uuid';
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
          <span key={uuidv4()} onClick={() => addEmoji(item)}>{item}</span>
        ))}
      </div>
    </div>
  );
}

export default EmojiSection;
