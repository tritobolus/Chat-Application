import React from 'react'
import EmojiPicker from "emoji-picker-react"

export const Emoji = ({setMessage}) => {
  return (
    <>
        <div className='mw-5'>
          <EmojiPicker
            onEmojiClick={(emojiData) =>setMessage((prev) => prev + emojiData.emoji)}
          />
        </div>
    </>
  )
}
