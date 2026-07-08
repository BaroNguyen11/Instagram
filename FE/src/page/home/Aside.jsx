import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import useProfile from "../../hooks/useProfile";
import useUsers from "../../hooks/useUsers";
import { userService } from "@/services/userService";
import { authService } from "@/services/authService";

const Aside = () => {
  const { isAuthenticated } = useAuth();
  const { profile } = useProfile();
  const { users, setUsers } = useUsers();
  const user = users.filter((follow) => follow.isFollowing === false);
  console.log(user)
  const handleFollow = async (id) => {
    try {
      const data = await authService.toggleFollow(id);

      setUsers((prev) =>
        prev.map((user) =>
          user._id === id
            ? {
                ...user,
                isFollowing: data.following,
              }
            : user,
        ),
      );
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <aside className="hidden lg:block w-90 py-10 px-8">
        <div className="sticky top-10">
          {isAuthenticated && (
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={profile?.User?.avatar}
                  alt=""
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex flex-col">
                  <div className="font-bold text-sm">
                    {profile?.User?.username}
                  </div>
                  <div className="text-sm text-gray-400 ">
                    {profile?.User?.fullName}
                  </div>
                </div>
              </div>
              <button className="text-blue-300 text-xs font-bold cursor-pointer">
                Switch
              </button>
            </div>
          )}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-gray-400 font-bold">Gợi ý cho bạn</h2>
            <button className=" text-xs font-bold cursor-pointer">
              See All
            </button>
          </div>
          {user.map((item) => (
            <div
              className="flex items-center justify-between gap-2 mb-1"
              key={item._id}
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={item?.avatar}
                  alt=""
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <div className="font-bold">{item.username}</div>
                  <div className="text-gray-400 text-xs">Suggest for you</div>
                </div>
              </div>
              <button
                className="text-blue-400 text-xs font-bold cursor-pointer"
                onClick={() => handleFollow(item._id)}
              >
                {item.isFollowing ? "Following" : "Follow"}
              </button>
            </div>
          ))}
        </div>
      </aside>
    </>
  );
};
export default Aside;
