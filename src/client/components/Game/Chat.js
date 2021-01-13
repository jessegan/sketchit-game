import React, { Component } from 'react'

import ChatLog from './ChatLog'
import ChatInput from './ChatInput'

export class Chat extends Component {
  render() {
    return (
      <div className="game-chat grid">
        <ChatLog />
        <ChatInput />
      </div>
    )
  }
}

export default Chat
