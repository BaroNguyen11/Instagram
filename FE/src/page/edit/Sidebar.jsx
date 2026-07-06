import { Bell, Search, User } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
    const [activeLink, setActiveLink] = useState('edit');
    const handleLinkClick = (link) => {
        setActiveLink(link);
    }
  return (
    <>
      <div className="p-6 flex flex-col gap-4">
        <h2 className="font-bold">Settings</h2>
        <div className="relative flex">
          <Search
            size={18}
            className="absolute left-3 top-5 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search"
            className="block w-90 text-sm p-2.5  px-9 rounded-full bg-[rgba(255,255,255,0.1)] text-white focus:outline-none "
          />
        </div>

        <div>
          <span className="text-xs text-gray-400 font-semibold">
            How you use Baogram
          </span>
          <Link
            to="/settings/edit"
            className={`flex items-center mt-2 text-sm font-semibold hover:bg-[rgba(255,255,255,0.1)] p-2 rounded-md transition-all duration-200 ${activeLink === 'edit' ? 'bg-[rgba(255,255,255,0.08)]' : ''}`}
            onClick={() => handleLinkClick('edit')}
          >
            <User size={16} className="inline-block mr-2" />
            Edit Profile
          </Link>
          <Link
            to="/settings/notifications"
            className={`flex items-center mt-2 text-sm font-semibold hover:bg-[rgba(255,255,255,0.1)] p-2 rounded-md transition-all duration-200 ${activeLink === 'notifications' ? 'bg-[rgba(255,255,255,0.08)]' : ''}`}
            onClick={() => handleLinkClick('notifications')}
          >
            <Bell size={16} className="inline-block mr-2" />
            Notifications
          </Link>
        </div>
      </div>
    </>
  );
};
export default Sidebar;
