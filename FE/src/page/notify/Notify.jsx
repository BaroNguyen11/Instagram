import useNotifications from "@/hooks/useNotifications";
import { useState } from "react";

const Notify = () => {
  const { notifications, notificationsUnread } = useNotifications();
  const calculateTimeAgo = (createdAt) => {
    const now = new Date();
    const postDate = new Date(createdAt);
    const diffInSeconds = Math.floor((now - postDate) / 1000);
    if (diffInSeconds < 60) {
      return `${diffInSeconds}s`;
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes}m`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours}h`;
    } else {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days}d`;
    }
  };

  const [isActive, setActive] = useState("Tất cả");
  return (
    <div className="flex-1 p-4 max-w-160 bg-[rgba(256,256,256,0.1)] m-auto mt-5 rounded-md">
      <h1 className="text-2xl font-bold mb-4">Thông báo</h1>
      <div className="flex gap-1 text-sm font-bold pb-4">
        <button
          className={`${isActive === "Tất cả" ? "bg-[#2b5af42f] text-[#1395ff] " : ""}  py-1 px-4 rounded-2xl cursor-pointer`}
          onClick={() => setActive("Tất cả")}
        >
          Tất cả ({notifications.length})
        </button>
        <button
          className={`${isActive === "Chưa đọc" ? "bg-[#2b5af42f] text-[#1395ff] " : ""}  py-1 px-4 rounded-2xl cursor-pointer`}
          onClick={() => setActive("Chưa đọc")}
        >
          Chưa đọc ({notificationsUnread.count})
        </button>
      </div>
      <div className="flex flex-col gap-3">
        {isActive === "Tất cả" &&
          notifications.map((noti) => (
            <div key={noti._id}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={noti?.sender?.avatar}
                    alt=""
                    className="h-10 w-10 rounded-full"
                  />
                  <div className="flex text-sm gap-1">
                    <span className="font-bold ">{noti?.sender?.username}</span>
                    <p>started following you.</p>
                    <span className="text-gray-500">
                      {calculateTimeAgo(noti.createdAt)}
                    </span>
                  </div>
                </div>
                <button className="bg-[#1395ff] text-sm rounded-sm px-2 py-1 cursor-pointer">
                  Follow back
                </button>
              </div>
            </div>
          ))}
        {isActive === "Chưa đọc" &&
          notificationsUnread.notifications.map((noti) => (
            <div key={noti._id}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={noti?.sender?.avatar}
                    alt=""
                    className="h-10 w-10 rounded-full"
                  />
                  <div className="flex text-sm gap-1">
                    <span className="font-bold ">{noti?.sender?.username}</span>
                    <p>started following you.</p>
                    <span className="text-gray-500">
                      {calculateTimeAgo(noti.createdAt)}
                    </span>
                  </div>
                </div>
                <button className="bg-[#1395ff] text-sm rounded-sm px-2 py-1 cursor-pointer">
                  Follow back
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
export default Notify;
