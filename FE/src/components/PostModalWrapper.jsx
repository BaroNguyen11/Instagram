import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { postService } from "../services/postService";
import ModalPost from "../page/comments/ModalPost";
import toast from "react-hot-toast";

const PostModalWrapper = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        setLoading(true);
        const data = await postService.getPostById(id);
        setPost(data);
      } catch (error) {
        console.error("Error fetching post detail for modal:", error);
        toast.error("Failed to load post");
        // Navigate back if post doesn't exist
        navigate(-1);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPostDetail();
    }
  }, [id, navigate]);

  const handleClose = () => {
    navigate(-1);
  };

  const handleLikeToggle = (updatedPost) => {
    setPost(updatedPost);
    // Dispatch global event so the feed background page is updated immediately
    window.dispatchEvent(new CustomEvent("post-updated", { detail: updatedPost }));
  };

  const handleRefetch = () => {
    // Dispatch global event so any mounted lists reload their data
    window.dispatchEvent(new CustomEvent("refetch-posts"));
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-999 flex items-center justify-center bg-black/50">
        <div className="w-10 h-10 border-4 border-t-[#0095f6] border-zinc-700 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!post) return null;

  return (
    <ModalPost
      onClose={handleClose}
      post={post}
      onLikeToggle={handleLikeToggle}
      refetchPosts={handleRefetch}
    />
  );
};

export default PostModalWrapper;
