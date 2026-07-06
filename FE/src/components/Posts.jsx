import ModalPost from "@/page/comments/ModalPost";
import { postService } from "@/services/postService";
import {
  Bookmark,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Send,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

const PostImageCarousel = ({ images, caption }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images || images.length === 0) {
    return <p className="text-gray-500">Không có hình ảnh</p>;
  }

  return (
    <div className="relative w-full h-full overflow-hidden group/post-carousel select-none">
      {/* Slide Wrapper */}
      <div
        className="flex h-full w-full transition-transform duration-300 ease-out"
        style={{ transform: `translate3d(-${activeIndex * 100}%, 0, 0)` }}
      >
        {images.map((img, idx) => (
          <div key={idx} className="min-w-full h-full flex-shrink-0 flex items-center justify-center bg-zinc-900">
            <img
              src={img.url}
              alt={`${caption || "post"} ${idx}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Prev Button */}
      {activeIndex > 0 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setActiveIndex((prev) => prev - 1);
          }}
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-1.5 rounded-full cursor-pointer z-10 opacity-0 group-hover/post-carousel:opacity-100 transition-all duration-150"
        >
          <ChevronLeft size={18} />
        </button>
      )}

      {/* Next Button */}
      {activeIndex < images.length - 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setActiveIndex((prev) => prev + 1);
          }}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-1.5 rounded-full cursor-pointer z-10 opacity-0 group-hover/post-carousel:opacity-100 transition-all duration-150"
        >
          <ChevronRight size={18} />
        </button>
      )}

      {/* Dots indicator */}
      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1 z-10">
          {images.map((_, idx) => (
            <span
              key={idx}
              className={`w-1.5 h-1.5 rounded-full transition-all ${
                idx === activeIndex ? "bg-[#0095f6] scale-110" : "bg-gray-400/60"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
const Posts = ({ posts, refetchPosts, page, setPage, hasMore, loading }) => {
  const [openMenu, setOpenMenu] = useState(null);
  const likingRef = useRef({});
  const savedRef = useRef({});
  const [selectedPost, setSelectedPost] = useState(null);
  const [postList, setPostList] = useState(posts);

  const observerTarget = useRef(null);

  useEffect(() => {
    if (!setPage || !hasMore || loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      },
      {
        rootMargin: "100px",
      }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasMore, loading, setPage]);
  useEffect(() => {
    setPostList(posts);
    setSelectedPost((prevSelected) => {
      if (!prevSelected) return null;
      const updatedSelected = posts.find((p) => p._id === prevSelected._id);
      return updatedSelected || prevSelected;
    });
  }, [posts]);
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

  useEffect(() => {
    const handleClickOutside = () => setOpenMenu(null);

    document.addEventListener("click", handleClickOutside);

    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleDelete = async (postId) => {
    try {
      await postService.deletePost(postId);
      toast.success("Post deleted successfully!");
      await refetchPosts();
      setOpenMenu(null);
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error(
        "An error occurred while deleting the post. Please try again.",
      );
    }
  };
  const handleIncreaseLikePost = async (id) => {
    if (likingRef.current[id]) return;
    likingRef.current[id] = true;

    const oldPost = postList.find((p) => p._id === id);

    // optimistic update
    setPostList((prev) =>
      prev.map((post) =>
        post._id === id
          ? {
              ...post,
              liked: !post.liked,
              likeCount: post.liked ? post.likeCount - 1 : post.likeCount + 1,
            }
          : post,
      ),
    );
    setSelectedPost((prev) =>
      prev && prev._id === id
        ? {
            ...prev,
            liked: !prev.liked,
            likeCount: prev.liked ? prev.likeCount - 1 : prev.likeCount + 1,
          }
        : prev,
    );
    try {
      const updated = await postService.toggleLike(id);
      setPostList((prev) =>
        prev.map((post) => (post._id === id ? updated : post)),
      );
    } catch (err) {
      setPostList((prev) =>
        prev.map((post) => (post._id === id ? oldPost : post)),
      );
    } finally {
      likingRef.current[id] = false;
    }
  };
  const handleSavePost = async (id) => {
    if (savedRef.current[id]) return;
    savedRef.current[id] = true;

    const oldPost = postList.find((p) => p._id === id);

    // optimistic update
    setPostList((prev) =>
      prev.map((post) =>
        post._id === id
          ? {
              ...post,
              saved: !post.saved,
            }
          : post,
      ),
    );

    // nếu modal đang mở thì update luôn
    setSelectedPost((prev) =>
      prev && prev._id === id
        ? {
            ...prev,
            saved: !prev.saved,
          }
        : prev,
    );

    try {
      const updated = await postService.savedPost(id);
      setPostList((prev) =>
        prev.map((post) => (post._id === id ? updated : post)),
      );

      setSelectedPost((prev) => (prev && prev._id === id ? updated : prev));
    } catch {
      setPostList((prev) =>
        prev.map((post) => (post._id === id ? oldPost : post)),
      );

      setSelectedPost((prev) => (prev && prev._id === id ? oldPost : prev));
    } finally {
      savedRef.current[id] = false;
    }
  };

  const handleLikeToggleFromModal = (updatedPost) => {
    setPostList((prev) =>
      prev.map((p) => (p._id === updatedPost._id ? updatedPost : p))
    );
    setSelectedPost(updatedPost);
  };

  return (
    <>
      <div className="flex-1 p-4 ">
        {postList.map((post) => (
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
                <div className="text-sm text-gray-500">
                  {calculateTimeAgo(post.createdAt)}
                </div>
              </div>
              <div
                className="cursor-pointer relative"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenMenu(openMenu === post._id ? null : post._id);
                }}
              >
                <MoreHorizontal size={20} />
                {openMenu === post._id && (
                  <div className="absolute top-0 -right-1 mt-5 w-40 px-2  bg-[#000000] border border-gray-700 rounded-md shadow-lg z-10">
                    <ul className="py-2">
                      <li className="px-4 py-2 hover:bg-[rgba(255,255,255,0.1)] rounded-md cursor-pointer">
                        Edit
                      </li>
                      <li
                        className="px-4 py-2 hover:bg-[rgba(255,255,255,0.1)] rounded-md cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(post._id);
                        }}
                      >
                        Delete
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
            <div className="mt-4 bg-zinc-900 rounded-md overflow-hidden flex items-center justify-center h-128">
              <PostImageCarousel images={post.images} caption={post.caption} />
            </div>
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-2">
                  <button onClick={() => handleIncreaseLikePost(post._id)}>
                    <Heart
                      size={25}
                      fill={post.liked ? "#ef4444" : "none"}
                      stroke={post.liked ? "#ef4444" : "currentColor"}
                      className={`${iconHover}`}
                    />
                  </button>
                  <span className="text-sm font-semibold">
                    {post.likeCount}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle
                    size={24}
                    className={iconHover}
                    onClick={() => setSelectedPost(post)}
                  />
                  <span className="text-sm font-semibold">
                    {post.commentCount}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Send size={23} className={iconHover} />
                  <span className="text-sm font-semibold">36k</span>
                </div>
              </div>
              <button onClick={() => handleSavePost(post._id)}>
                <Bookmark
                  size={25}
                  className={`${iconHover} ml-auto`}
                  fill={post.saved ? "currentColor" : "none"}
                />
              </button>
            </div>
            <div className="flex items-center gap-1 pt-2">
              <div className="font-semibold">{post.author.username}</div>
              <span className="text-sm">{post.caption}</span>
            </div>
          </div>
        ))}

        {/* Sensor element for IntersectionObserver */}
        <div ref={observerTarget} className="h-10 w-full" />

        {/* Loading spinner indicator */}
        {loading && (
          <div className="flex justify-center items-center py-6">
            <div className="w-6 h-6 border-2 border-t-[#0095f6] border-zinc-700 rounded-full animate-spin"></div>
          </div>
        )}

        {/* Caught Up Feed End Message */}
        {!hasMore && postList && postList.length > 0 && (
          <div className="flex flex-col items-center justify-center py-10 text-zinc-500 text-sm gap-2 border-t border-zinc-800 mt-4">
            <div className="w-12 h-12 rounded-full border border-zinc-800 flex items-center justify-center mb-1 text-[#0095f6] bg-zinc-950 shadow-inner">
              ✓
            </div>
            <div className="font-semibold text-zinc-300">Bạn đã xem hết tất cả bài viết</div>
            <div className="text-xs text-zinc-500">Bạn đã cập nhật tất cả bài viết mới nhất</div>
          </div>
        )}
      </div>
      {selectedPost && (
        <ModalPost
          onClose={() => setSelectedPost(null)}
          post={selectedPost}
          refetchPosts={refetchPosts}
          onLikeToggle={handleLikeToggleFromModal}
        />
      )}
    </>
  );
};
export default Posts;
