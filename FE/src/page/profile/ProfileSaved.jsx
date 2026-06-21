import { Plus } from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";

const ProfileSaved = () => {
  const location = useLocation();
  const isSavedRoot = location.pathname === "/profile/saved" || location.pathname === "/profile/saved/";

  return (
    <>
      <div className="flex justify-center gap-2 flex-col items-center w-full">
        <div className="flex items-center justify-between w-full">
          <span className="text-xs text-gray-500 ">
            Only you can see what you've saved
          </span>
          <button className="flex items-center text-blue-400 font-bold text-sm cursor-pointer hover:underline">
            <Plus className="w-3 h-3 " strokeWidth={3} />
            <span>New Collection</span>
          </button>
        </div>
        {isSavedRoot && (
          <Link to="all-posts">
            <div className="w-30 h-30 border border-gray-400 flex items-center justify-center cursor-pointer">
              All posts
            </div>
          </Link>
        )}
        <Outlet />
      </div>
    </>
  );
};
export default ProfileSaved;
