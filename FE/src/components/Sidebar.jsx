import {
  MessageCircle,
  Home,
  Search,
  Heart,
  PlusSquare,
  UserCircle,
  Menu,
  LayoutGrid,
  Send,
  Compass,
  Bell,
  Dot,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import BaoGramLogo from "./Logo";
import { useEffect, useState } from "react";
import ModalUpload from "../page/upload/ModalUpload";
import useNotifications from "@/hooks/useNotifications";

const Sidebar = ({ refetchPosts }) => {
  const [clicked, setClicked] = useState(false);

  const { notifications } = useNotifications();
  const isRead = notifications.find((i) => i.isRead === false);
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  useEffect(() => {
    window.scrollTo(0, 0);
    refetchPosts();
  }, [location]);
  const BellIcon = () => (
    <div className="relative w-7 h-7 flex items-center justify-center">
      <Bell size={26} />

      {isRead && (
        <div className="absolute -top-6 -right-6 ">
          <Dot className="w-14 h-14" stroke="#ef4444" />
        </div>
      )}
    </div>
  );
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex h-full transition-all duration-300 ease-in-out flex-col py-8 bg-black text-white group px-4">
        <div className="mb-10 flex items-center px-3 h-12">
          <div className="flex justify-center">
            <BaoGramLogo size={30} />
          </div>
        </div>
        <nav className="flex flex-col space-y-2 flex-1">
          <Link to="/" className={isActive("/")}>
            <SidebarItem icon={<Home size={26} />} text="Trang chủ" />
          </Link>
          <Link to="/search" className={isActive("/search")}>
            <SidebarItem icon={<Search size={26} />} text="Tìm kiếm" />
          </Link>
          <Link to="/explore" className={isActive("/explore")}>
            <SidebarItem icon={<Compass size={26} />} text="Khám phá" />
          </Link>
          <Link to="/messages" className={isActive("/messages")}>
            <SidebarItem icon={<Send size={26} />} text="Tin nhắn" />
          </Link>
          <Link to="/notifications">
            <SidebarItem icon={<BellIcon />} text="Thông báo" />
          </Link>
          <div onClick={() => setClicked(true)}>
            <SidebarItem icon={<PlusSquare size={26} />} text="Tạo" />
          </div>
          <Link to="/profile" className={isActive("/profile")}>
            <SidebarItem icon={<UserCircle size={26} />} text="Hồ sơ" />
          </Link>
        </nav>

        <div className="mt-auto flex flex-col space-y-2">
          <SidebarItem icon={<Menu size={26} />} text="Xem thêm" />
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-black border-t border-zinc-850 flex justify-around items-center z-50 px-2">
        <Link to="/" className="text-white p-2">
          <Home size={24} />
        </Link>
        <Link to="/search" className="text-white p-2">
          <Search size={24} />
        </Link>
        <Link to="/explore" className="text-white p-2">
          <Compass size={24} />
        </Link>
        <div
          onClick={() => setClicked(true)}
          className="text-white p-2 cursor-pointer"
        >
          <PlusSquare size={24} />
        </div>
        <Link to="/messages" className="text-white p-2">
          <Send size={24} />
        </Link>
        <Link to="/notifications" className="text-white p-2">
          <Bell size={24} />
        </Link>
        <Link to="/profile" className="text-white p-2">
          <UserCircle size={24} />
        </Link>
      </nav>

      {clicked && (
        <ModalUpload
          onClose={() => setClicked(false)}
          refetchPosts={refetchPosts}
        />
      )}
    </>
  );
};

const SidebarItem = ({ icon, text }) => (
  <div className="flex items-center p-3 cursor-pointer hover:bg-zinc-900 rounded-lg transition-all duration-200 group/item">
    <div className="min-w-7.5 flex justify-center group-hover/item:scale-110 transition-transform">
      {icon}
    </div>
    <span className="ml-4 overflow-hidden whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      {text}
    </span>
  </div>
);

export default Sidebar;
