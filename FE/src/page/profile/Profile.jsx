import { Camera, Plus } from "lucide-react";
import useProfile from "../../hooks/useProfile";
import Menu from "./Menu";
import { Link, Outlet, useOutletContext } from "react-router-dom";
import { useMemo, useState } from "react";
import apiClient from "../../api/apiClient";
import toast from "react-hot-toast";
import useProfilePosts from "@/hooks/useProfilePosts";
import ModalFollow from "./ViewProfile/ModalFollow";
import { userService } from "@/services/userService";
import { authService } from "@/services/authService";

const Profile = () => {
  const { profile, setProfile, isOwnProfile } = useProfile();
  const [openFollowers, setOpenFollowers] = useState(false);
  const [openFollowing, setOpenFollowing] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isFollowed, setFollowed] = useState("Following");
  const [users, setUsers] = useState([]);
  const { posts, loading, hasMore, refetchPosts } = useProfilePosts(
    profile?.User?._id,
  );
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFollowToggle = async () => {
    try {
      const res = await authService.toggleFollow(profile?.User?._id);
      setProfile((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          isFollowing: res.following,
          User: {
            ...prev.User,
            followersCount: prev.User.followersCount + (res.following ? 1 : -1),
          },
        };
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to update follow status");
    }
  };

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

  const handleOpenFollowers = async () => {
    setOpenFollowers(true);
    setFollowed("Follower");
    const res = await userService.getFollowers(profile?.User?._id);

    setUsers(res);
  };

  const handleOpenFollowing = async () => {
    setOpenFollowing(true);
    setFollowed("Following");
    const res = await userService.getFollowing(profile?.User?._id);

    setUsers(res);
  };

  const displayUser = useMemo(() => {
    return users.filter((u) => {
      const searchLower = searchKeyword.toLowerCase();
      const matchKeyword = u.username?.toLowerCase().includes(searchLower);

      return matchKeyword;
    });
  }, [users, searchKeyword]);

  const currentAvatar =
    avatarPreview ||
    profile?.User?.avatar ||
    "https://avatarhub.edu.vn/wp-content/uploads/2025/12/avatar-mac-dinh-cua-fb-4.jpg";
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
              disabled={isUploading || !isOwnProfile}
            />
            <label
              htmlFor={isOwnProfile ? "avatar" : undefined}
              className={isOwnProfile ? "cursor-pointer relative group" : "relative"}
            >
              {/* blur */}
              {isOwnProfile && (
                <div className="absolute inset-0 group-hover:bg-black/50 transition-all duration-200 rounded-full">
                  <Camera className="absolute top-1/2 left-1/2 -translate-x-1/2  -translate-y-1/2 w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-all duration-200" />
                </div>
              )}
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
                <button
                  className="cursor-pointer"
                  onClick={handleOpenFollowers}
                >
                  <b>{profile?.User?.followersCount || 0}</b> followers
                </button>
                <button
                  className="cursor-pointer"
                  onClick={handleOpenFollowing}
                >
                  <b>{profile?.User?.followingCount || 0}</b> following
                </button>
              </div>
              <span>{profile?.User?.bio || "No bio available"}</span>
            </div>
          </div>
          {isOwnProfile ? (
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
          ) : (
            <div className="flex gap-4">
              <button
                onClick={handleFollowToggle}
                className={`w-full py-2.5 rounded-lg cursor-pointer transition-all duration-200 font-semibold ${
                  profile?.isFollowing
                    ? "bg-[rgba(256,256,256,0.15)] hover:bg-[rgba(256,256,256,0.25)] text-white"
                    : "bg-blue-500 hover:bg-blue-600 text-white"
                }`}
              >
                {profile?.isFollowing ? "Unfollow" : "Follow"}
              </button>
              <button className="bg-[rgba(256,256,256,0.15)] w-full py-2.5 rounded-lg cursor-pointer hover:bg-[rgba(256,256,256,0.25)] transition-all duration-200">
                Message
              </button>
            </div>
          )}
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
          <Menu isOwnProfile={isOwnProfile} userId={profile?.User?._id} />
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
      <ModalFollow
        isOpen={openFollowers}
        onClose={() => setOpenFollowers(false)}
        title="Followers"
        users={users}
        displayUser={displayUser}
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
        isFollowed={isFollowed}
      />

      <ModalFollow
        isOpen={openFollowing}
        onClose={() => setOpenFollowing(false)}
        title="Following"
        users={users}
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
        displayUser={displayUser}
        isFollowed={isFollowed}
      />
    </>
  );
};
export default Profile;
