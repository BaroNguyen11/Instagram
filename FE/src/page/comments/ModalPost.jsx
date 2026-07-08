import { createPortal } from "react-dom";
import {
  ArrowLeft,
  Bookmark,
  Heart,
  MessageCircle,
  Send,
  SendHorizonal,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import toast from "react-hot-toast";
import { commentServices } from "@/services/commentService";
import { postService } from "@/services/postService";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

const ModalPost = ({ onClose, post, refetchPosts, onLikeToggle }) => {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const [currentPost, setCurrentPost] = useState(post);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const postLikingRef = useRef(false);
  const likingRef = useRef({});
  const commentRef = useRef(null);
  const handleRef = (e) => {
    e.preventDefault();
    commentRef.current?.focus();
  };

  useEffect(() => {
    setCurrentPost(post);
    setActiveImageIndex(0);
  }, [post]);

  const handleLikePost = async () => {
    if (postLikingRef.current || !currentPost?._id) return;
    postLikingRef.current = true;

    const oldPost = currentPost;

    // optimistic update
    setCurrentPost((prev) => ({
      ...prev,
      liked: !prev.liked,
      likeCount: prev.liked ? prev.likeCount - 1 : prev.likeCount + 1,
    }));

    try {
      const updated = await postService.toggleLike(currentPost._id);
      setCurrentPost(updated);
      onLikeToggle?.(updated);
      refetchPosts?.();
    } catch (error) {
      console.error("Error toggling like:", error);
      setCurrentPost(oldPost);
      toast.error("Failed to like post");
    } finally {
      postLikingRef.current = false;
    }
  };

  const calculateTimeAgo = (createdAt) => {
    const now = new Date();
    const postDate = new Date(createdAt);
    const diffInSeconds = Math.floor((now - postDate) / 1000);
    if (diffInSeconds < 60) {
      return `${diffInSeconds}s`;
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes}m`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours}h`;
    } else {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days}d`;
    }
  };
  const calculateTimeAgoPost = (createdAt) => {
    const now = new Date();
    const postDate = new Date(createdAt);
    const diffInSeconds = Math.floor((now - postDate) / 1000);
    if (diffInSeconds < 60) {
      return `${diffInSeconds} seconds ago`;
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} minutes ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} hours ago`;
    } else {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} days ago`;
    }
  };
  useEffect(() => {
    const getComments = async () => {
      try {
        const data = await commentServices.getCommentsByPost(post._id);
        setComments(data);
      } catch (error) {
        console.error(error);
      }
    };
    if (post?._id) {
      getComments();
    }
  }, [post]);
  const handleIncreaseLike = async (id) => {
    if (likingRef.current[id]) return;

    likingRef.current[id] = true;

    const oldComment = comments.find((c) => c._id === id);

    // optimistic update

    setComments((prev) =>
      prev.map((comment) => {
        if (comment._id !== id) return comment;

        return {
          ...comment,

          liked: !comment.liked,

          likeCounts: comment.liked
            ? comment.likeCounts - 1
            : comment.likeCounts + 1,
        };
      }),
    );

    try {
      const updated = await commentServices.updateComment(id);

      setComments((prev) =>
        prev.map((comment) => (comment._id === id ? updated : comment)),
      );
    } catch (err) {
      // rollback

      setComments((prev) =>
        prev.map((comment) => (comment._id === id ? oldComment : comment)),
      );
    } finally {
      likingRef.current[id] = false;
    }
  };
  const handleComment = async (id) => {
    try {
      const newComment = await commentServices.createComment(id, content);
      setComments((prev) => [...prev, newComment]);
      setContent("");
      refetchPosts?.();
      toast.success("Upload comment successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Fail to upload comment!");
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-999 flex items-center justify-center px-4 ">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20" onClick={onClose} />

      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 text-white hover:text-gray-300 cursor-pointer"
      >
        <X size={32} />
      </button>

      {/* Modal */}
      <div
        className={` relative
    w-fit
    max-w-[85vw]
    max-h-[85vh]
    bg-[#282727]
    rounded-2xl
    overflow-hidden
    z-10
    flex transition-all duration-300`}
      >
        <div className="flex flex-1 overflow-hidden">
          {/* Left */}
          <div className="flex items-center justify-center bg-black relative group/modal-carousel select-none overflow-hidden max-h-[90vh] max-w-[70vw]">
            <div
              className="flex h-full transition-transform duration-300 ease-out w-full"
              style={{ transform: `translate3d(-${activeImageIndex * 100}%, 0, 0)` }}
            >
              {currentPost.images.map((img, idx) => (
                <div
                  key={idx}
                  className="min-w-full h-full flex-shrink-0 flex items-center justify-center"
                >
                  <img
                    src={img.url}
                    alt={`preview ${idx}`}
                    className="max-h-[90vh] max-w-[70vw] object-contain block"
                  />
                </div>
              ))}
            </div>

            {/* Prev Button */}
            {activeImageIndex > 0 && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setActiveImageIndex((prev) => prev - 1);
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full cursor-pointer transition-colors z-10 opacity-0 group-hover/modal-carousel:opacity-100"
              >
                <ChevronLeft size={20} />
              </button>
            )}

            {/* Next Button */}
            {activeImageIndex < currentPost.images.length - 1 && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setActiveImageIndex((prev) => prev + 1);
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full cursor-pointer transition-colors z-10 opacity-0 group-hover/modal-carousel:opacity-100"
              >
                <ChevronRight size={20} />
              </button>
            )}

            {/* Dots indicator */}
            {currentPost.images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                {currentPost.images.map((_, idx) => (
                  <span
                    key={idx}
                    className={`w-1.5 h-1.5 rounded-full transition-all ${
                      idx === activeImageIndex ? "bg-[#0095f6] scale-125" : "bg-gray-400/60"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Right */}
          <div className="w-105 border-l border-[#363636] flex flex-col max-h-[90vh]">
             <div className="flex items-center gap-3 p-4">
              <Link to={`/users/${currentPost.author._id}`} onClick={onClose} className="flex items-center gap-3 hover:underline text-white">
                <img
                  src={currentPost.author.avatar}
                  alt=""
                  className="w-8 h-8 rounded-full object-cover"
                />

                <div className="flex flex-col text-white">
                  <span className="text-sm font-bold">
                    {currentPost.author.username}
                  </span>
                </div>
              </Link>
            </div>

            <div className="flex items-center gap-3 p-4">
              <Link to={`/users/${currentPost.author._id}`} onClick={onClose} className="shrink-0">
                <img
                  src={currentPost.author.avatar}
                  alt=""
                  className="w-8 h-8 rounded-full object-cover"
                />
              </Link>

              <div className="flex items-center gap-2 text-white">
                <Link to={`/users/${currentPost.author._id}`} onClick={onClose} className="text-sm font-bold hover:underline">
                  {currentPost.author.username}
                </Link>
                <p className="text-sm">{currentPost.caption}</p>
              </div>
            </div>
            {/* comment */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {comments.map((comment) => (
                <div key={comment._id}>
                  <div className="flex items-center gap-3">
                    <Link to={`/users/${comment.user._id}`} onClick={onClose} className="shrink-0">
                      <img
                        src={comment.user.avatar}
                        alt=""
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    </Link>

                    <div className="flex items-center justify-between w-full">
                      <div>
                        <div className="flex items-center gap-2">
                          <Link to={`/users/${comment.user._id}`} onClick={onClose} className="font-bold text-sm text-white hover:underline">
                            {comment.user.username}
                          </Link>

                          <p className="text-sm">{comment.content}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-xs font-bold text-gray-400 mt-1">
                            {calculateTimeAgo(comment.createdAt)}
                          </div>
                          <span className="text-xs font-bold text-gray-400 mt-1">
                            {comment.likeCounts || 0} like
                          </span>
                          <p className="text-xs font-bold text-gray-400 mt-1 cursor-pointer">
                            reply
                          </p>
                        </div>
                      </div>
                      <button
                        className="cursor-pointer active:scale-90 transition-all duration-75 "
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          handleIncreaseLike(comment._id);
                        }}
                      >
                        <Heart
                          fill={comment.liked ? "#ef4444" : "none"}
                          stroke={comment.liked ? "#ef4444" : "currentColor"}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className=" text-gray-500 text-right  border-[#363636]">
              <div className="flex items-center justify-between pb-3 px-3">
                <div className="flex gap-3 items-center">
                  <button
                    className="cursor-pointer active:scale-90 transition-all duration-75 "
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      handleLikePost();
                    }}
                  >
                    <Heart
                      size={24}
                      fill={currentPost.liked ? "#ef4444" : "none"}
                      stroke={currentPost.liked ? "#ef4444" : "currentColor"}
                    />
                  </button>
                  <button
                    className="cursor-pointer active:scale-90 transition-all duration-75 "
                    type="button"
                    onClick={handleRef}
                  >
                    <MessageCircle size={23} />
                  </button>
                  <button
                    className="cursor-pointer active:scale-90 transition-all duration-75 "
                    type="button"
                  >
                    <SendHorizonal size={23} />
                  </button>
                </div>

                <button
                  className="cursor-pointer active:scale-90 transition-all duration-75 "
                  type="button"
                >
                  <Bookmark size={23} />
                </button>
              </div>
              <div className="flex flex-col justify-center items-start  px-4 pb-3">
                <span className="font-bold    text-white">
                  {currentPost.likeCount} likes
                </span>
                <p className="text-xs  ">
                  {calculateTimeAgoPost(currentPost.createdAt)}
                </p>
              </div>
              <hr />
              <div className="relative">
                <input
                  ref={commentRef}
                  type="text"
                  className="w-full py-3 px-5 focus:outline-none text-white text-sm"
                  placeholder="Add your comment..."
                  value={content}
                  onChange={(e) => {
                    e.stopPropagation();
                    setContent(e.target.value);
                  }}
                />
                <div className="absolute top-1/2 right-3 -translate-y-1/2">
                  <button
                    className=" hover:underline  cursor-pointer text-white text-sm"
                    onClick={() => handleComment(currentPost._id, content)}
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default ModalPost;
