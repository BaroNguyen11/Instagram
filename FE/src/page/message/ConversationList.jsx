import { Search } from "lucide-react";
import ConversationItem from "./ConversationItem";

const ConversationList = ({ selectedUser, setSelectedUser, users, currentUser }) => {
  return (
    <div className="w-[25%] border-r border-[rgba(255,255,255,0.1)] px-2 h-screen py-12 flex flex-col">
      <div className="flex flex-col gap-4 h-full">
        <div className="flex items-center justify-between text-sm font-bold">
          <h3>baro_211</h3>
          <button>Edit</button>
        </div>
        <div className="relative flex">
          <Search
            size={18}
            className="absolute left-3 top-4.5 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search"
            className="block w-full max-w-90 text-sm p-2 px-9 rounded-full bg-[rgba(255,255,255,0.1)] text-white focus:outline-none"
          />
        </div>
        <div className="flex flex-col gap-2 pt-10 relative px-4">
          <div className="absolute -top-1 -left-1 ">
            <div className="relative w-32 min-h-12 bg-[#2b2b2b] rounded-xl  flex items-center justify-center px-3">
              <input
                type="text"
                placeholder="First note in a while..."
                className="w-full bg-transparent text-xs text-center text-gray-300 placeholder:text-gray-500 focus:outline-none"
              />

              {/* Mũi nhọn */}
              <div className="absolute -bottom-1.5 left-5  w-3 h-3 bg-[#2b2b2b] rounded-full rotate-45"></div>
              <div className="absolute -bottom-2.5 left-7  w-1 h-1 bg-[#2b2b2b] rounded-full rotate-45"></div>
            </div>
          </div>

          <img
            src="https://avatarhub.edu.vn/wp-content/uploads/2025/12/avatar-mac-dinh-cua-fb-4.jpg"
            alt=""
            className="w-15 h-15 rounded-full"
          />
          <span className="w-15 text-center text-xs text-gray-400">
            Your note
          </span>
        </div>
        <div className="flex flex-col gap-4 flex-1 min-h-0">
          <div className="flex justify-between items-center text-sm font-bold">
            <h3>Messages</h3>
            <button>Requests</button>
          </div>
          <div className="flex-1 overflow-y-auto  custom-scroll">
            <div className="flex flex-col gap-2">
              {users.map((user) => (
                <ConversationItem
                  key={user._id}
                  user={user}
                  isSelected={selectedUser?._id === user._id}
                  onClick={() => setSelectedUser(user)}
                  currentUser={currentUser}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationList;
