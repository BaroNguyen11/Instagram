import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { postService } from "../../services/postService";
import { commentServices } from "../../services/commentService";
import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  SendHorizonal,
} from "lucide-react";
import toast from "react-hot-toast";

const PostDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const postLikingRef = useRef(false);
  const likingRef = useRef({});
  const commentRef = useRef(null);

  const handleRef = (e) => {
    e.preventDefault();
    commentRef.current?.focus();
  };

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        setLoading(true);
        const postData = await postService.getPostById(id);
        setPost(postData);
        setActiveImageIndex(0);

        const commentData = await commentServices.getCommentsByPost(id);
        setComments(commentData);
      } catch (error) {
        console.error("Error fetching post data:", error);
        toast.error("Failed to load post details");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPostData();
    }
  }, [id]);

  const handleLikePost = async () => {
    if (postLikingRef.current || !post?._id) return;
    postLikingRef.current = true;

    const oldPost = post;

    // optimistic update
    setPost((prev) => ({
      ...prev,
      liked: !prev.liked,
      likeCount: prev.liked ? prev.likeCount - 1 : prev.likeCount + 1,
    }));

    try {
      const updated = await postService.toggleLike(post._id);
      setPost(updated);
      window.dispatchEvent(new CustomEvent("post-updated", { detail: updated }));
    } catch (error) {
      console.error("Error toggling like:", error);
      setPost(oldPost);
      toast.error("Failed to like post");
    } finally {
      postLikingRef.current = false;
    }
  };

  const handleSavePost = async () => {
    if (!post?._id) return;
    const oldPost = post;

    setPost((prev) => ({
      ...prev,
      saved: !prev.saved,
    }));

    try {
      const updated = await postService.savedPost(post._id);
      setPost(updated);
      window.dispatchEvent(new CustomEvent("post-updated", { detail: updated }));
    } catch (error) {
      console.error("Error saving post:", error);
      setPost(oldPost);
      toast.error("Failed to save post");
    }
  };

  const handleIncreaseLikeComment = async (commentId) => {
    if (likingRef.current[commentId]) return;
    likingRef.current[commentId] = true;

    const oldComment = comments.find((c) => c._id === commentId);

    setComments((prev) =>
      prev.map((c) => {
        if (c._id !== commentId) return c;
        return {
          ...c,
          liked: !c.liked,
          likeCounts: c.liked ? c.likeCounts - 1 : c.likeCounts + 1,
        };
      }),
    );

    try {
      const updated = await commentServices.updateComment(commentId);
      setComments((prev) =>
        prev.map((c) => (c._id === commentId ? updated : c)),
      );
    } catch (err) {
      setComments((prev) =>
        prev.map((c) => (c._id === commentId ? oldComment : c)),
      );
    } finally {
      likingRef.current[commentId] = false;
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      const newComment = await commentServices.createComment(post._id, content);
      setComments((prev) => [...prev, newComment]);
      setContent("");
      
      // Update local comment count
      setPost((prev) => ({
        ...prev,
        commentCount: (prev.commentCount || 0) + 1,
      }));

      // Notify globally
      window.dispatchEvent(new CustomEvent("refetch-posts"));
      toast.success("Comment added successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to post comment");
    }
  };

  const calculateTimeAgo = (createdAt) => {
    const now = new Date();
    const postDate = new Date(createdAt);
    const diffInSeconds = Math.floor((now - postDate) / 1000);
    if (diffInSeconds < 60) return `${diffInSeconds}s`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`;
    return `${Math.floor(diffInSeconds / 86400)}d`;
  };

  const calculateTimeAgoPost = (createdAt) => {
    const now = new Date();
    const postDate = new Date(createdAt);
    const diffInSeconds = Math.floor((now - postDate) / 1000);
    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[80vh] bg-black">
        <div className="w-10 h-10 border-4 border-t-[#0095f6] border-zinc-700 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-[80vh] bg-black text-zinc-400 gap-4">
        <h2 className="text-xl font-bold text-white">Post Not Found</h2>
        <p>The link you followed may be broken, or the post may have been removed.</p>
        <Link to="/" className="text-[#0095f6] hover:underline font-semibold">
          Go back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="flex justify-center py-6 px-4 md:py-10 bg-black min-h-[calc(100vh-80px)] w-full">
      <div className="w-full max-w-5xl bg-[#1c1c1e] rounded-xl overflow-hidden flex flex-col md:flex-row max-h-[85vh] border border-zinc-800 shadow-2xl">
        
        {/* Left Side - Image Carousel */}
        <div className="bg-black relative group/carousel select-none flex-1 flex items-center justify-center overflow-hidden min-h-[300px] md:min-h-0 aspect-square md:aspect-auto">
          <div
            className="flex h-full w-full transition-transform duration-300 ease-out"
            style={{ transform: `translate3d(-${activeImageIndex * 100}%, 0, 0)` }}
          >
            {post.images.map((img, idx) => (
              <div
                key={idx}
                className="min-w-full h-full flex-shrink-0 flex items-center justify-center bg-zinc-950"
              >
                <img
                  src={img.url}
                  alt={`post-img-${idx}`}
                  className="max-h-[45vh] md:max-h-[80vh] w-full object-contain"
                />
              </div>
            ))}
          </div>

          {/* Prev Button */}
          {activeImageIndex > 0 && (
            <button
              onClick={() => setActiveImageIndex((prev) => prev - 1)}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/85 text-white p-2 rounded-full cursor-pointer transition-colors z-10 opacity-0 group-hover/carousel:opacity-100"
            >
              <ChevronLeft size={20} />
            </button>
          )}

          {/* Next Button */}
          {activeImageIndex < post.images.length - 1 && (
            <button
              onClick={() => setActiveImageIndex((prev) => prev + 1)}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/85 text-white p-2 rounded-full cursor-pointer transition-colors z-10 opacity-0 group-hover/carousel:opacity-100"
            >
              <ChevronRight size={20} />
            </button>
          )}

          {/* Dots Indicator */}
          {post.images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              {post.images.map((_, idx) => (
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

        {/* Right Side - Post Details and Comments */}
        <div className="w-full md:w-[420px] border-t md:border-t-0 md:border-l border-zinc-800 flex flex-col max-h-[50vh] md:max-h-[85vh]">
          
          {/* Header (Author Info) */}
          <div className="flex items-center gap-3 p-4 border-b border-zinc-800">
            <Link to={`/users/${post.author._id}`} className="flex items-center gap-3 hover:underline">
              <img
                src={post.author.avatar}
                alt={post.author.username}
                className="w-8 h-8 rounded-full object-cover border border-zinc-700"
              />
              <span className="text-sm font-bold text-white">
                {post.author.username}
              </span>
            </Link>
          </div>

          {/* Caption & Comments List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Caption */}
            <div className="flex items-start gap-3 pb-2 border-b border-zinc-900/50">
              <Link to={`/users/${post.author._id}`} className="shrink-0">
                <img
                  src={post.author.avatar}
                  alt={post.author.username}
                  className="w-8 h-8 rounded-full object-cover border border-zinc-700"
                />
              </Link>
              <div className="text-sm text-white">
                <Link to={`/users/${post.author._id}`} className="font-bold hover:underline mr-2">
                  {post.author.username}
                </Link>
                <span>{post.caption}</span>
                <div className="text-xs text-zinc-500 mt-1">
                  {calculateTimeAgo(post.createdAt)}
                </div>
              </div>
            </div>

            {/* Comments */}
            {comments.length === 0 ? (
              <div className="text-center py-10 text-sm text-zinc-500">
                No comments yet. Start the conversation!
              </div>
            ) : (
              comments.map((comment) => (
                <div key={comment._id} className="flex items-start gap-3">
                  <Link to={`/users/${comment.user._id}`} className="shrink-0">
                    <img
                      src={comment.user.avatar}
                      alt={comment.user.username}
                      className="w-8 h-8 rounded-full object-cover border border-zinc-700"
                    />
                  </Link>

                  <div className="flex items-center justify-between w-full">
                    <div className="text-sm text-white max-w-[85%]">
                      <div>
                        <Link to={`/users/${comment.user._id}`} className="font-bold hover:underline mr-2">
                          {comment.user.username}
                        </Link>
                        <span>{comment.content}</span>
                      </div>
                      <div className="flex items-center gap-4 text-xs font-bold text-zinc-500 mt-1">
                        <span>{calculateTimeAgo(comment.createdAt)}</span>
                        <span>{comment.likeCounts || 0} like</span>
                        <button onClick={handleRef} className="hover:text-zinc-300">
                          reply
                        </button>
                      </div>
                    </div>

                    <button
                      className="cursor-pointer active:scale-90 transition-transform duration-75 text-zinc-400 hover:text-white"
                      type="button"
                      onClick={() => handleIncreaseLikeComment(comment._id)}
                    >
                      <Heart
                        size={16}
                        fill={comment.liked ? "#ef4444" : "none"}
                        stroke={comment.liked ? "#ef4444" : "currentColor"}
                      />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Action Bar (Likes, Comments, Share, Saves) */}
          <div className="border-t border-zinc-800 p-4 bg-zinc-900/20">
            <div className="flex items-center justify-between pb-3">
              <div className="flex gap-4 items-center">
                <button
                  className="cursor-pointer active:scale-90 transition-transform duration-75 text-zinc-200 hover:text-white"
                  onClick={handleLikePost}
                >
                  <Heart
                    size={24}
                    fill={post.liked ? "#ef4444" : "none"}
                    stroke={post.liked ? "#ef4444" : "currentColor"}
                  />
                </button>
                <button
                  className="cursor-pointer active:scale-90 transition-transform duration-75 text-zinc-200 hover:text-white"
                  onClick={handleRef}
                >
                  <MessageCircle size={23} />
                </button>
                <button className="cursor-pointer active:scale-90 transition-transform duration-75 text-zinc-200 hover:text-white">
                  <SendHorizonal size={23} />
                </button>
              </div>

              <button
                className="cursor-pointer active:scale-90 transition-transform duration-75 text-zinc-200 hover:text-white"
                onClick={handleSavePost}
              >
                <Bookmark
                  size={23}
                  fill={post.saved ? "currentColor" : "none"}
                />
              </button>
            </div>

            <div className="flex flex-col text-left">
              <span className="font-bold text-white text-sm">
                {post.likeCount} likes
              </span>
              <span className="text-[10px] text-zinc-500 uppercase tracking-wide mt-0.5">
                {calculateTimeAgoPost(post.createdAt)}
              </span>
            </div>
          </div>

          {/* Comment Input */}
          <form onSubmit={handleComment} className="border-t border-zinc-800 relative bg-zinc-900/40">
            <input
              ref={commentRef}
              type="text"
              className="w-full py-3.5 pl-4 pr-16 bg-transparent focus:outline-none text-white text-sm placeholder-zinc-500"
              placeholder="Add a comment..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <button
              type="submit"
              disabled={!content.trim()}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-[#0095f6] hover:text-[#1877f2] disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
            >
              Post
            </button>
          </form>

        </div>
      </div>
    </div>
  );
};

export default PostDetailPage;
