import { createPortal } from "react-dom";
import { X, Search, Link2, MessageCircle, Mail } from "lucide-react";

const actions = [
  { icon: <Link2 />, text: "Copy link" },
  { icon: <Link2 />, text: "Facebook" },
  { icon: <MessageCircle />, text: "Messenger" },
  { icon: <MessageCircle />, text: "WhatsApp" },
  { icon: <Mail />, text: "Email" },
];

const PostModalSend = ({ onClose, open = false, users = [] }) => {
  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 bg-black/10 flex items-center justify-center z-9999"  onClick={onClose} >
      <div className="w-162.5 h-140 bg-[#26282d] rounded-3xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="relative border-b border-white/10 py-4">
          <button
            onClick={onClose}
            className="absolute left-5 top-1/2 -translate-y-1/2 cursor-pointer"
          >
            <X size={32} />
          </button>

          <h2 className="text-center text-xl font-semibold">Share</h2>
        </div>

        {/* Search */}
        <div className="p-4">
          <div className="flex items-center bg-[#30333a] rounded-xl px-4 py-3">
            <Search className="text-gray-400" size={18} />

            <input
              placeholder="Search"
              className="bg-transparent ml-3 flex-1 outline-none"
            />
          </div>
        </div>

        {/* User list */}
        <div className="flex-1 overflow-y-auto px-6 custom-scroll">
          <div className="grid grid-cols-4 gap-y-7">
            {users.map((user) => (
              <div
                key={user.id}
                className="flex flex-col items-center gap-2 cursor-pointer hover:bg-[#69696a31] px-3 py-2 rounded-md"
              >
                <img
                  src={user.avatar}
                  className="w-18 h-18 rounded-full object-cover"
                />

                <span className="text-sm text-center line-clamp-2 w-20">
                  {user.username}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-white/10 px-5 py-4">
          <div className="flex gap-6 overflow-x-auto no-scrollbar">
            {actions.map((item) => (
              <div
                key={item.text}
                className="flex flex-col items-center gap-2 cursor-pointer shrink-0"
              >
                <div className="w-14 h-14 rounded-full bg-[#30333a] flex items-center justify-center">
                  {item.icon}
                </div>

                <span className="text-sm whitespace-nowrap">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default PostModalSend;
