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
  Bell
} from 'lucide-react'
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <aside className="h-full transition-all duration-300 ease-in-out flex flex-col py-8 bg-black text-white group px-4">
            
            <div className="mb-10 flex items-center h-10 px-2">
                <MessageCircle size={30} fill="white" className="min-w-7.5" />
                <span className="ml-4 font-bold text-xl hidden group-hover:block whitespace-nowrap">
                    BaoGram
                </span>
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
                <Link to="/create">
                  <SidebarItem icon={<PlusSquare size={26} />} text="Tạo" />
                </Link>
                <Link to="/profile">
                  <SidebarItem icon={<UserCircle size={26} />} text="Hồ sơ" />
                </Link>
            </nav>

            <div className="mt-auto flex flex-col space-y-2">
                <SidebarItem icon={<Menu size={26} />} text="Xem thêm" />
            </div>
        </aside>
    )
}

const SidebarItem = ({ icon, text }) => (
    <div className="flex items-center p-3 cursor-pointer hover:bg-zinc-900 rounded-lg transition-all duration-200 group/item">
        <div className="min-w-7.5 flex justify-center group-hover/item:scale-110 transition-transform">
            {icon}
        </div>
        <span className="ml-4 overflow-hidden whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {text}
        </span>
    </div>
)

export default Sidebar;