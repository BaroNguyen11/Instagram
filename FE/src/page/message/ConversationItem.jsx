const formatRelativeTime = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;

  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return "now";
  if (diffMins < 60) return `${diffMins}m`;

  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h`;

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${diffDays}d`;

  return date.toLocaleDateString("en-US", { day: "numeric", month: "short" });
};

const ConversationItem = ({ user, onClick, isSelected, currentUser }) => {

  return (
    <>
      <div
        className={`flex items-center gap-3 cursor-pointer p-2 rounded-md transition-colors   ${
          isSelected
            ? "bg-[rgba(255,255,255,0.15)] font-semibold"
            : "hover:bg-[rgba(255,255,255,0.08)]"
        }`}
        onClick={onClick}
      >
        <img
          src={user.avatar}
          alt=""
          className="w-13 h-13 rounded-full object-cover shrink-0"
        />

        <div className="flex flex-col gap-1 min-w-0 flex-1">
          <h4 className="text-sm font-bold truncate">{user.fullName}</h4>

          <div className="flex items-center gap-2 text-xs text-white/60 min-w-0 justify-between">
            <p
              className={`truncate flex-1 ${(user?.lastMessage?.receiver === currentUser?._id || user?.lastMessage?.receiver?._id === currentUser?._id) && !user?.lastMessage?.isRead ? " font-extrabold  text-white " : ""}`}
            >
              {user.lastMessage
                ? user.lastMessage.sender === currentUser?._id ||
                  user.lastMessage.sender?._id === currentUser?._id
                  ? `You: ${user.lastMessage.text}`
                  : user.lastMessage.text
                : "No messages yet"}
            </p>
            {user.lastMessage && (
              <span className="shrink-0 text-[10px] text-white/40">
                {formatRelativeTime(user.lastMessage.createdAt)}
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ConversationItem;
