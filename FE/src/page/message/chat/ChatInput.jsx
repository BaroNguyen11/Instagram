import { socket } from "@/socket/socket";
import { useState } from "react";

const ChatInput = ({ currentUser, user }) => {
  const [text, setText] = useState("");
  const handleSendMessage = () => {
    if (!text.trim()) return;

    socket.emit("sendMessage", {
      sender: currentUser._id,
      receiver: user._id,
      text,
    });

    setText("");
  };
  return (
    <div className="p-4 border-t border-[rgba(255,255,255,0.1)]">
      <input
        type="text"
        placeholder="Start a message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full bg-[rgba(255,255,255,0.1)] text-white text-sm rounded-full py-3 px-6 focus:outline-none focus:ring-1 focus:ring-white/20"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSendMessage();
          }
        }}
      />
    </div>
  );
};

export default ChatInput;
