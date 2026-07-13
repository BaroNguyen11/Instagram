import { Camera, Send } from "lucide-react";

const EmptyChat = () => {
  return (
    <div className="flex-1 flex items-center justify-center flex-col gap-4">
      <div className="w-20 h-20 rounded-full border-3 border-gray-400 flex items-center justify-center ">
        <Send
          className="-translate-x-0.5 translate-y-px rotate-20"
          size={40}
          strokeWidth={2}
        />
      </div>
      <div className="flex flex-col items-center gap-2">
        <h2>Your messages</h2>
        <p className="text-xs text-[rgba(255,255,255,0.49)]"> Send a message to start a chat.</p>
        <button className="bg-[#475ff6] text-xs font-bold px-4 py-2 rounded-md cursor-pointer">Send message</button>
      </div>
    </div>
  );
};

export default EmptyChat;
