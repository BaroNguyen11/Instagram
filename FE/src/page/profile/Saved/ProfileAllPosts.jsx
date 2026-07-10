import { Bookmark, ChevronLeft } from "lucide-react";
import { useNavigate, useOutletContext, useLocation } from "react-router-dom";

const ProfileAllPosts = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { posts } = useOutletContext();
  const postsSaved = posts.filter((p) => p.saved === true);
  return (
    <div className="w-full flex items-center justify-center ">
      <div className="w-145 flex flex-col mt-10 h-screen relative">
        <div
          className="flex items-center gap-1 cursor-pointer"
          onClick={() => navigate("/profile/saved")}
        >
          <ChevronLeft />
          <span>Saved</span>
        </div>

        {postsSaved.length > 0 ? (
          <div className="grid grid-cols-3 gap-1 mt-5">
            {postsSaved.map((post) => (
              <div
                key={post._id}
                className="relative aspect-square overflow-hidden cursor-pointer group"
                onClick={() => navigate(`/p/${post._id}`, { state: { backgroundLocation: location } })}
              >
                <img
                  src={post.images?.[0]?.url}
                  alt={post.caption}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Overlay khi hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-8 text-white font-semibold">
                  <div className="flex items-center gap-2">
                    ❤️
                    <span>{post.likeCount}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    💬
                    <span>{post.commentCount}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/4 w-100">
            <div className="flex justify-center gap-2 flex-col items-center mt-6 cursor-pointer">
              <div className="w-15 h-15 border rounded-full relative flex justify-center items-center">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <Bookmark className="w-10 h-8" strokeWidth={0.5} />
                </div>
              </div>
              <h2 className="text-3xl font-bold">Start Saving</h2>
              <div>Save photos and videos to your collection.</div>
              <button className="text-blue-300">Add to collection</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileAllPosts;
