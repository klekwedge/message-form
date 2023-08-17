/* eslint-disable jsx-a11y/no-static-element-interactions */
import { KeyboardEvent } from 'react';
import './Contenteditable.scss';

function Contenteditable() {
  // function changeContenteditableValue(e: KeyboardEvent<HTMLDivElement>) {
  //   const target = e.target as HTMLDivElement;

  //   const text = target.textContent;

  //   if (text) {
  //     const highlight = text.replace(
  //       /(#|@|http:\/\/|https:\/\/)\w*/g,
  //       (match: string) => `<span class="highlight">${match}</span>`,
  //     );

  //     const parent = e.target;

  //     const selection = document.getSelection();
  //     const range = new Range();
  //     range.setStart(parent, 0);
  //     range.setEnd(selection.anchorNode, selection.anchorOffset);

  //     let pos = range.toString().length;

  //     target.innerHTML = highlight;

  //     let child = parent.firstChild;
  //     while (pos > 0) {
  //       const { length } = child.textContent;
  //       if (pos > length) {
  //         pos -= length;
  //         child = child.nextSibling;
  //       } else {
  //         if (child.nodeType === 3) {
  //           return document.getSelection().collapse(child, pos);
  //         }
  //         child = child.firstChild;
  //       }
  //     }
  //   }
  // }

  return (
    <div className="app__contenteditable">
      <div
        className="app__textarea"
        contentEditable="true"
        // onKeyUp={(e) => changeContenteditableValue(e)}
      >
        See
      </div>

      <div className="app__emoji-block" />
      <img className="app__emoji-icon" src="/public/svg/emoji-icon.svg" alt="emoji" />
    </div>
  );
}

export default Contenteditable;
