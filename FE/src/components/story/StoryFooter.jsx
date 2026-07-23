import React, { useState } from "react";
import { Heart, Send } from "lucide-react";

const StoryFooter = ({ username, onSendMessage, onLikeStory }) => {
  const [message, setMessage] = useState("");
  const [isLiked, setIsLiked] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    if (onSendMessage) onSendMessage(message);
    setMessage("");
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    if (onLikeStory) onLikeStory(!isLiked);
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 px-4 py-4 z-30 flex items-center gap-4 bg-gradient-to-t from-black/80 to-transparent">
      <form onSubmit={handleSubmit} className="flex-1">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={`Reply to ${username || "author"}...`}
          className="w-full bg-transparent text-white text-sm outline-none border border-white/35 hover:border-white/50 focus:border-white/80 rounded-full px-4 py-2 transition-colors duration-200"
        />
      </form>

      <button
        onClick={handleLike}
        className="text-white hover:scale-110 active:scale-90 transition-transform duration-150 cursor-pointer p-1"
        aria-label={isLiked ? "Unlike story" : "Like story"}
      >
        <Heart
          size={24}
          className={`${isLiked ? "fill-red-500 text-red-500" : "text-white"}`}
        />
      </button>

      <button
        onClick={handleSubmit}
        className="text-white hover:scale-110 active:scale-90 transition-transform duration-150 cursor-pointer p-1"
        aria-label="Send message"
      >
        <Send size={24} className="text-white -rotate-12" />
      </button>
    </div>
  );
};

export default StoryFooter;
