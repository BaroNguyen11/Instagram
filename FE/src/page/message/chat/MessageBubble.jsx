const MessageBubble = ({ message, currentUser, isLast }) => {
  const isMe = message.sender._id === currentUser._id;

  return (
    <div className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}>
      <div
        className={`max-w-[70%] px-4 py-2 rounded-2xl ${
          isMe ? "bg-blue-500" : "bg-zinc-700"
        }`}
      >
        {message.text}
      </div>

      {isMe && isLast && (
        <span className="text-[11px] text-gray-400 mt-1 px-1">
          {message.isRead ? "Seen" : "Sent"}
        </span>
      )}
    </div>
  );
};
export default MessageBubble;
