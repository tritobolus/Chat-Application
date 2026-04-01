import React from "react";
import EmojiPicker, {Theme} from "emoji-picker-react";
import { useCC } from "../../../context/Context";

export const Emoji = ({ setMessage }) => {
  const {loginUser} = useCC();
  return (
    <>
      <div className="mw-5">
        <EmojiPicker
          theme={loginUser?.darkmode ? Theme.DARK : Theme.LIGHT}
          onEmojiClick={(emojiData) =>
            setMessage((prev) => prev + emojiData.emoji)
          }
        />
      </div>
    </>
  );
};
