import { useEffect, useRef, useState } from "react";
import "./Contenteditable.scss";

function Contenteditable() {
  const divRef = useRef(null);

  function changeContenteditableValue() {
    if (divRef.current) {
      const text = divRef.current.textContent;

      const hashtag = text.replace(
        /(#\w+)/g,
        '<span class="hashtag">$1</span>'
      );

      divRef.current.innerHTML = hashtag;
      placeCaretAtEnd();
    }
  }

  useEffect(() => {
    if (divRef.current) {
      divRef.current.addEventListener("keyup", changeContenteditableValue);
    }

    return () => {
      if (divRef.current) {
        divRef.current.removeEventListener(changeContenteditableValue);
      }
    };
  }, [divRef]);

  function placeCaretAtEnd() {
    if (divRef.current) {
      divRef.current.focus();
      if (
        typeof window.getSelection != "undefined" &&
        typeof document.createRange != "undefined"
      ) {
        const range = document.createRange();
        range.selectNodeContents(divRef.current);
        range.collapse(false);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
      } else if (typeof document.body.createTextRange != "undefined") {
        var textRange = document.body.createTextRange();
        textRange.moveToElementText(divRef.current);
        textRange.collapse(false);
        textRange.select();
      }
    }
  }

  return (
    <div className="app__contenteditable">
      <div ref={divRef} className="app__textarea" contentEditable="true">
        Example
      </div>

      <div className="app__emoji-block"></div>
      <img className="app__emoji-icon" src="/public/svg/emoji-icon.svg" />
    </div>
  );
}

export default Contenteditable;
