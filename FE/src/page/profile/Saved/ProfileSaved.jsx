import { Plus } from "lucide-react";
import { Link, Outlet, useLocation, useOutletContext } from "react-router-dom";

const ProfileSaved = () => {
  const { posts } = useOutletContext();
  const postsSaved = posts.filter((p) => p.saved === true);
  return (
    <>
      <div className="flex justify-center gap-2 flex-col items-center w-full pb-12">
        <div className="flex items-center justify-between w-full">
          <span className="text-xs text-gray-500 ">
            Only you can see what you've saved
          </span>
          <button className="flex items-center text-blue-400 font-bold text-sm cursor-pointer hover:underline">
            <Plus className="w-3 h-3 " strokeWidth={3} />
            <span>New Collection</span>
          </button>
        </div>
        <Link to="all-posts">
          <div className="w-70 h-70  border border-gray-400 overflow-hidden rounded-xs cursor-pointer">
            {postsSaved.length > 0 ? (
              <div className="grid grid-cols-2 grid-rows-2 w-full h-full">
                {postsSaved.slice(0, 4).map((post) => (
                  <div
                    key={post._id}
                    className=" overflow-hidden p-0.5"
                  >
                    {post.images?.[0]?.url ? (
                      <img
                        src={post.images[0].url}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-zinc-800"></div>
                    )}
                  </div>
                ))}

                {/* Nếu ít hơn 4 post thì tự thêm ô trống */}
                {Array.from({ length: 4 - Math.min(postsSaved.length, 4) }).map(
                  (_, index) => (
                    <div
                      key={`empty-${index}`}
                      className=" bg-zinc-900"
                    />
                  ),
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center w-full h-full text-sm text-gray-500">
                All posts
              </div>
            )}
          </div>
        </Link>
      </div>
    </>
  );
};
export default ProfileSaved;
