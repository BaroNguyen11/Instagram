import React from "react";
import { X } from "lucide-react";

const StoryHeader = ({ user, createdAt, onClose }) => {
  // Human readable time difference
  const timeSince = (dateString) => {
    const date = new Date(dateString);
    const seconds = Math.floor((new Date() - date) / 1000);
    let interval = seconds / 31536000;

    if (interval > 1) return Math.floor(interval) + "y";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + "mo";
    interval = seconds / 864000;
    if (interval > 1) return Math.floor(interval) + "d";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + "h";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + "m";
    return Math.floor(seconds) + "s";
  };

  return (
    <div className="absolute top-5 left-0 right-0 px-3 py-2 flex items-center justify-between z-30 bg-gradient-to-b from-black/50 to-transparent">
      <div className="flex items-center gap-2">
        <img
          src={user?.avatar || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFBo6bythwEPQHLVrQUDTLl-bVfJ4MnxRDWQ&s"}
          alt={user?.username}
          className="w-8 h-8 rounded-full object-cover border border-white/20"
        />
        <span className="text-white font-semibold text-sm drop-shadow-sm">
          {user?.username}
        </span>
        <span className="text-white/60 text-xs drop-shadow-sm">
          {timeSince(createdAt)}
        </span>
      </div>
      <button
        onClick={onClose}
        className="text-white/70 hover:text-white transition-colors duration-200 cursor-pointer p-1 rounded-full hover:bg-white/5"
        aria-label="Close stories"
      >
        <X size={20} />
      </button>
    </div>
  );
};

export default StoryHeader;
