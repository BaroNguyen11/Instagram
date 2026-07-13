const ChatHeader = ({ user }) => {
  return (
    <div className="p-4 border-b border-[rgba(255,255,255,0.1)] flex items-center gap-3">
      <img src={user.avatar} alt="" className="h-10 w-10 rounded-full" />
      <div className="flex flex-col">
        <h3 className="font-bold text-lg">{user.fullName}</h3>
        <span className="text-sm text-[rgba(255,255,255,0.44)]">{user.username}</span>
      </div>
    </div>
  );
};

export default ChatHeader;
