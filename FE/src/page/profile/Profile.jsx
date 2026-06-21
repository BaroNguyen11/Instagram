import { Plus } from "lucide-react";
import useProfile from "../../hooks/useProfile";
import Menu from "./Menu";
import { Outlet } from "react-router-dom";

const Profile = () => {
  const { profile } = useProfile();
  return (
    <>
      <div className="flex justify-center">
        <div className="flex gap-6 mt-15 w-180 flex-col">
          <div className="flex items-center gap-5">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFBo6bythwEPQHLVrQUDTLl-bVfJ4MnxRDWQ&s"
              alt=""
              className="w-35 h-35 rounded-full"
            />
            <div className="flex gap-3 mb-4 text-sm flex-col">
              <div className="flex flex-col ">
                <div className="font-bold text-2xl">
                  {profile?.User?.username}
                </div>
                <div className="text-md text-gray-400 ">
                  {profile?.User?.fullname}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span>
                  {" "}
                  <b>0</b> posts
                </span>
                <span>
                  <b>36k</b> followers
                </span>
                <span>
                  <b>18k</b> following
                </span>
              </div>
              <span>yêu đơn phương liệu có tốt?</span>
            </div>
          </div>
          <div className="flex gap-4">
            <button className="bg-[rgba(256,256,256,0.15)] w-full py-2.5 rounded-lg cursor-pointer hover:bg-[rgba(256,256,256,0.25)] transition-all duration-200">
              Edit profile
            </button>
            <button className="bg-[rgba(256,256,256,0.15)] w-full py-2.5 rounded-lg cursor-pointer hover:bg-[rgba(256,256,256,0.25)] transition-all duration-200">
              View archive
            </button>
          </div>
          {/* outstanding story */}

          <div className="flex items-start">
            <div className="flex flex-col items-center gap-2">
              <div className="w-24 h-24 bg-[rgba(256,256,256,0.15)] rounded-full mt-10 relative cursor-pointer">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black w-22 h-22 rounded-full"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="w-20 h-20 bg-[rgba(256,256,256,0.15)] rounded-full relative">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Plus
                      className="w-15 h-15 text-[#767676] "
                      strokeWidth={1.3}
                    />
                  </div>
                </div>
              </div>
            </div>
            <span className="text-xs font-bold">New</span>
            </div>
          </div>
          <Menu/>
          <Outlet />
        </div>
      </div>
    </>
  );
};
export default Profile;
