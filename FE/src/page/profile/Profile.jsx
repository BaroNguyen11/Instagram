import { Camera, Plus } from "lucide-react";
import useProfile from "../../hooks/useProfile";
import Menu from "./Menu";
import { Link, Outlet, useOutletContext } from "react-router-dom";
import { useState } from "react";
import apiClient from "../../api/apiClient";
import toast from "react-hot-toast";
import useProfilePosts from "@/hooks/useProfilePosts";

const Profile = () => {
  const { profile } = useProfile();
  const context = useOutletContext();
  const { posts, loading, hasMore, refetchPosts } = useProfilePosts(
    profile?.User?._id,
  );
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const previewUrl = URL.createObjectURL(file);
    setAvatarPreview(previewUrl);
    const formData = new FormData();
    formData.append("avatar", file);
    try {
      setIsUploading(true);
      const response = await apiClient.post("/users/upload-avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const data = response.data;

      toast.success("Đã cập nhật ảnh đại diện thành công!");
    } catch (error) {
      console.log("Lỗi khi upload avatar:", error);
      toast.error("Có lỗi xảy ra, vui lòng thử lại!");
      setAvatarPreview(null);
    } finally {
      setIsUploading(false);
    }
  };

  const currentAvatar =
    avatarPreview ||
    profile?.User?.avatar ||
    "https://scontent.cdninstagram.com/v/t51.89012-19/573323465_1219825463302212_7278921664109726296_n.jpg?stp=dst-jpg_tt6&_nc_cat=1&ccb=7-5&_nc_sid=bf7eb4&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy5DMyJ9&_nc_ohc=_zrBf_yIeLcQ7kNvwFGrj0I&_nc_oc=Adosinr6K_o-xcoY62Agpa0Aw2_beJtShTp_fh7O_bIdCYpjy75HhhqRq83jwrhOFqRQfPwFOu3kX6MN4jOD3wRs&_nc_zt=24&_nc_ht=scontent.cdninstagram.com&_nc_gid=6RkWY1QbU0u1d3i-WrdxnA&_nc_ss=7b6a8&oh=00_AQBJOSRO0Qk3ksGfEIs2G-YnwtpMfvL73TwFTpbKOXTE3Q&oe=6A4AFEE2";
  return (
    <>
      <div className="flex justify-center">
        <div className="flex gap-6 mt-15 w-180 flex-col">
          <div className="flex items-center gap-5">
            <input
              type="file"
              id="avatar"
              className="hidden"
              accept="image/*"
              onChange={handleAvatarChange}
              disabled={isUploading}
            />
            <label htmlFor="avatar" className="cursor-pointer relative group">
              {/* blur */}
              <div className="absolute inset-0 group-hover:bg-black/50 transition-all duration-200 rounded-full">
                <Camera className="absolute top-1/2 left-1/2 -translate-x-1/2  -translate-y-1/2 w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-all duration-200" />
              </div>
              <img
                src={currentAvatar}
                alt="Avatar"
                className="w-35 h-35 rounded-full object-cover"
              />
            </label>

            <div className="flex gap-3 mb-4 text-sm flex-col">
              <div className="flex flex-col ">
                <div className="font-bold text-2xl">
                  {profile?.User?.username}
                </div>
                <div className="text-md text-gray-400 ">
                  {profile?.User?.fullName}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span>
                  <b>{profile?.User?.postsCount}</b> posts
                </span>
                <button className="cursor-pointer">
                  <b>{profile?.User?.followersCount || 0}</b> followers
                </button>
                <button className="cursor-pointer">
                  <b>{profile?.User?.followingCount || 0}</b> following
                </button>
              </div>
              <span>{profile?.User?.bio || "No bio available"}</span>
            </div>
          </div>
          <div className="flex gap-4">
            <Link
              to="/settings/edit"
              className="bg-[rgba(256,256,256,0.15)] flex justify-center items-center w-full py-2.5 rounded-lg cursor-pointer hover:bg-[rgba(256,256,256,0.25)] transition-all duration-200"
            >
              Edit profile
            </Link>
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
          <Menu />
          <Outlet
            context={{
              posts,
              loading,
              hasMore,
              refetchPosts,
            }}
          />
        </div>
      </div>
    </>
  );
};
export default Profile;
