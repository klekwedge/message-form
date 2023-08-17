import { KeyboardEvent, useEffect, useRef, useState } from "react";
import "./Contenteditable.scss";

function Contenteditable() {
  function changeContenteditableValue(e) {
    const text = e.target.textContent;

    const highlight = text.replace(
      /(#|@|http:\/\/|https:\/\/)\w*/g,
      (match: string) => {
        return `<span class="highlight">${match}</span>`;
      }
    );

    const parent = e.target;

    let selection = document.getSelection();
    let range = new Range();
    range.setStart(parent, 0);
    range.setEnd(selection.anchorNode, selection.anchorOffset);

    let pos = range.toString().length;

    e.target.innerHTML = highlight;

    let child = parent.firstChild;
    while (pos > 0) {
      let length = child.textContent.length;
      if (pos > length) {
        pos -= length;
        child = child.nextSibling;
      } else {
        if (child.nodeType == 3)
          return document.getSelection().collapse(child, pos);
        child = child.firstChild;
      }
    }
  }

  return (
    <div className="app__contenteditable">
      <div
        className="app__textarea"
        contentEditable="true"
        onKeyUp={(e) => changeContenteditableValue(e)}
      >
        See
      </div>

      <div className="app__emoji-block"></div>
      <img className="app__emoji-icon" src="/public/svg/emoji-icon.svg" />
    </div>
  );
}

export default Contenteditable;
