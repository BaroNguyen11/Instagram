import "./App.css";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import usePost from "./hooks/usePost";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { socket } from "./socket/socket";
import { useAuth } from "./context/AuthContext";

function App() {
  const { posts, page, setPage, hasMore, refetchPosts, loading } = usePost();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) return;

    socket.emit("join", currentUser._id);

    const handleNotification = (data) => {
      const content = {
        follow: {
          text: "started following you.",
          icon: "👤",
        },
        like: {
          text: "liked your post.",
          icon: "❤️",
        },
        comment: {
          text: "commented on your post.",
          icon: "💬",
        },
      };

      const item = content[data.type] || {
        text: "sent you a notification.",
        icon: "🔔",
      };

      toast.custom(
        (t) => (
          <div
            className={`${
              t.visible ? "animate-enter" : "animate-leave"
            } max-w-sm w-full bg-[#1c1c1e] border border-zinc-700 rounded-2xl shadow-xl pointer-events-auto flex items-center gap-3 p-4`}
          >
            <img
              src={data.sender.avatar}
              alt=""
              className="w-11 h-11 rounded-full object-cover"
            />

            <div className="flex-1">
              <p className="text-sm text-white leading-5">
                <span className="font-semibold">{data.sender.username}</span>{" "}
                {item.text}
              </p>
            </div>

            <div className="text-xl">{item.icon}</div>
          </div>
        ),
        {
          position: "bottom-right",
          duration: 3500,
        },
      );
    };
    socket.on("notification", handleNotification);

    return () => {
      socket.off("notification", handleNotification);
    };
  }, [currentUser]);

  return (
    <>
      <Toaster
        className="z-9999"
        position="bottom-right"
        reverseOrder={false}
        gutter={8}
      />

      {/* Mobile Bottom Navigation Container (outside flex to prevent layout offset) */}
      <div className="md:hidden">
        <Sidebar refetchPosts={refetchPosts} />
      </div>

      <div className="flex min-h-screen bg-black text-white">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-20 hover:w-64 transition-all duration-300 ease-in-out z-9999 overflow-hidden h-screen fixed left-0 top-0 self-start">
          <Sidebar refetchPosts={refetchPosts} />
        </aside>

        <main className="flex-1 min-w-0 ml-0 md:ml-25 pb-20 md:pb-0">
          <Outlet
            context={{ posts, refetchPosts, page, setPage, hasMore, loading }}
          />
        </main>
      </div>
    </>
  );
}

export default App;
