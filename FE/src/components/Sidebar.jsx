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
} from "lucide-react";
import { Link } from "react-router-dom";
import BaoGramLogo from "./Logo";
import { useState } from "react";
import ModalUpload from "../page/upload/ModalUpload";

const Sidebar = ({ refetchPosts }) => {
  const [clicked, setClicked] = useState(false);
  return (
    <>
      <aside className="h-full  transition-all duration-300 ease-in-out flex flex-col py-8 bg-black text-white group px-4">
        <div className="mb-10 flex items-center px-3 h-12">
          <div className="flex justify-center">
            <BaoGramLogo size={30} />
          </div>
        </div>
        <nav className="flex flex-col space-y-2 flex-1">
          <Link to="/">
            <SidebarItem icon={<Home size={26} />} text="Trang chủ" />
          </Link>
          <Link to="/search">
            <SidebarItem icon={<Search size={26} />} text="Tìm kiếm" />
          </Link>
          <Link to="/explore">
            <SidebarItem icon={<Compass size={26} />} text="Khám phá" />
          </Link>
          <Link to="/messages">
            <SidebarItem icon={<Send size={26} />} text="Tin nhắn" />
          </Link>
          <Link to="/notifications">
            <SidebarItem icon={<Bell size={26} />} text="Thông báo" />
          </Link>
          <div onClick={() => setClicked(true)}>
            <SidebarItem icon={<PlusSquare size={26} />} text="Tạo" />
          </div>
          <Link to="/profile">
            <SidebarItem icon={<UserCircle size={26} />} text="Hồ sơ" />
          </Link>
        </nav>

        <div className="mt-auto flex flex-col space-y-2">
          <SidebarItem icon={<Menu size={26} />} text="Xem thêm" />
        </div>
      </aside>
      {clicked && <ModalUpload onClose={() => setClicked(false)} refetchPosts={refetchPosts} />}
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
