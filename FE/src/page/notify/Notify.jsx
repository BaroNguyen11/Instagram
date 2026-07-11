import useNotifications from "@/hooks/useNotifications";
import { notificationService } from "@/services/notificationService";
import { Dot, Heart } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const Notify = () => {
  const { notifications, unread } = useNotifications();
  const [isActive, setActive] = useState("Tất cả");
  const navigate = useNavigate();
  console.log(notifications);
  const notificationsUnread = notifications.filter(
    (notifications) => notifications.isRead === false,
  );
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
  const getMessage = (noti) => {
    switch (noti.type) {
      case "follow":
        return "started following you.";
      case "like":
        return "liked your post.";
      case "comment":
        return "commented your post.";
      default:
        return "";
    }
  };
  const handleClick = async (noti) => {
    await notificationService.notificationIsRead(noti._id);
    switch (noti.type) {
      case "follow":
        return navigate(`/users/${noti.sender._id}`);

      case "like":
        return navigate(`/p/${noti.post._id}`);

      case "comment":
        return navigate(`/p/${noti.post._id}`);

      default:
        return null;
    }
  };
  const renderAction = (noti) => {
    switch (noti.type) {
      case "follow":
        return (
          <button className="bg-[#1356ff] font-bold text-xs rounded-md px-4 py-2 cursor-pointer w-30">
            Follow back
          </button>
        );

      case "like":
        return (
          <button className="bg-[#ff1352] rounded-full p-2  cursor-pointer">
            <Heart fill="white" stroke="white" />
          </button>
        );

      case "comment":
        return (
          <button className="bg-[#1356ff] font-bold text-xs rounded-md px-4 py-2 cursor-pointer">
            View
          </button>
        );

      default:
        return null;
    }
  };
  const displayNotifications = useMemo(() => {
    const list =
      isActive === "Tất cả"
        ? notifications
        : notifications.filter((n) => !n.isRead);

    return [...list].sort((a, b) => {
      if (a.isRead !== b.isRead) {
        return a.isRead - b.isRead;
      }
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  }, [notifications, isActive]);

  return (
    <div className="flex-1 py-4 px-1 max-w-160 bg-[rgba(256,256,256,0.1)] m-auto mt-5 rounded-md">
      <h1 className="text-2xl font-bold mb-4">Thông báo</h1>
      <div className="flex gap-1 text-sm font-bold pb-4">
        <button
          className={`${isActive === "Tất cả" ? "bg-[#2b5af42f] text-[#1395ff] " : ""}  py-1 px-4 rounded-2xl cursor-pointer`}
          onClick={() => setActive("Tất cả")}
        >
          Tất cả ({notifications.length})
        </button>
        <button
          className={`${isActive === "Chưa đọc" ? "bg-[rgba(43,90,244,0.18)] text-[#1395ff] " : ""}  py-1 px-4 rounded-2xl cursor-pointer`}
          onClick={() => setActive("Chưa đọc")}
        >
          Chưa đọc ({unread})
        </button>
      </div>
      <div className="flex flex-col gap-3">
        {displayNotifications.map((noti) => (
          <div
            key={noti._id}
            className={`cursor-pointer hover:bg-[rgba(256,256,256,0.1)] py-2 px-5 rounded-md relative ${noti.isRead === false ? "bg-[rgba(256,256,256,0.08)]" : ""}`}
            onClick={() => handleClick(noti)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={noti.sender?.avatar}
                  alt=""
                  className="w-10 h-10 rounded-full"
                />

                <div className="flex text-sm gap-1">
                  <span className="font-bold">{noti.sender?.username}</span>

                  <p>{getMessage(noti)}</p>

                  <span className="text-gray-500">
                    {calculateTimeAgo(noti.createdAt)}
                  </span>
                </div>
              </div>

              {renderAction(noti)}
            </div>

            {!noti.isRead && (
              <div className="absolute -right-3 top-1/2 -translate-y-1/2">
                <Dot className="w-10 h-10" stroke="#1395ff" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default Notify;
