import {
  Bookmark,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Send,
} from "lucide-react";
const Posts = ({ posts }) => {
  const iconHover =
    "cursor-pointer hover:scale-109 transition-all duration-200";
    const calculateTimeAgo = (createdAt) => {
      const now = new Date();
      const postDate = new Date(createdAt);
      const diffInSeconds = Math.floor((now - postDate) / 1000);
        if (diffInSeconds < 60) {
            return `${diffInSeconds} giây trước`;
        } else if (diffInSeconds < 3600) {
            const minutes = Math.floor(diffInSeconds / 60);
            return `${minutes} phút trước`;
        } else if (diffInSeconds < 86400) {
            const hours = Math.floor(diffInSeconds / 3600);
            return `${hours} giờ trước`;
        } else {
            const days = Math.floor(diffInSeconds / 86400);
            return `${days} ngày trước`;
        }
    };
  return (
    <>
      <div className="flex-1 p-4 ">
        {posts.map((post) => (
          <div key={post._id} className="mb-7">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src={post.author.avatar}
                  alt=""
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="font-semibold">{post.author.username}</div>
                <span>•</span>
                <div className="text-sm text-gray-500">{calculateTimeAgo(post.createdAt)    }</div>
              </div>
              <div>
                <MoreHorizontal size={20} />
              </div>
            </div>
            <div className="mt-4 bg-zinc-900 rounded-md overflow-hidden flex items-center justify-center h-128">
              {post.images?.[0]?.url ? (
                <img
                  src={post.images[0].url}
                  alt={post.caption}
                  className="w-full h-full object-cover"
                />
              ) : (
                <p className="text-gray-500">Không có hình ảnh</p>
              )}
            </div>
            <div className="flex items-center mt-2">
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-2">
                  <Heart
                    size={25}
                    fill="currentColor"
                    className={`${iconHover} text-red-500 `}
                  />
                  <span className="text-sm font-semibold">
                    {post.likeCount}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle size={25} className={iconHover} />
                  <span className="text-sm font-semibold">
                    {post.commentCount}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Send size={24} className={iconHover} />
                  <span className="text-sm font-semibold">36k</span>
                </div>
              </div>
              <Bookmark size={25} className={`${iconHover} ml-auto`} />
            </div>
            <div className="flex items-center gap-1 pt-2">
                <div className="font-semibold">{post.author.username}</div>
                <span className="text-sm">{post.caption}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default Posts;
