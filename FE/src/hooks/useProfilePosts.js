import { postService } from "@/services/postService";
import { useCallback, useEffect, useRef, useState } from "react";

const useProfilePosts = (userId) => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const loadingRef = useRef(false);
  const hasMoreRef = useRef(true);

  const fetchPost = useCallback(async (pageToFetch, isRefresh = false) => {
    if (loadingRef.current) return;
    if (!isRefresh && !hasMoreRef.current) return;

    loadingRef.current = true;
    setLoading(true);
    if (!userId) return;
    try {
      const data = await postService.getPostsByUser(userId, pageToFetch, 12);
      const newPosts = data?.posts || [];

      if (pageToFetch === 1 || isRefresh) {
        setPosts(newPosts);
      } else {
        setPosts((prev) => [...prev, ...newPosts]);
      }

      const next = data?.pagination?.hasNextPage ?? false;
      setHasMore(next);
      hasMoreRef.current = next;
    } catch (err) {
      console.error("Error fetching posts:", err);
    } finally {
      setLoading(false);
      loadingRef.current = false;
    }
  }, [userId]);

  useEffect(() => {
    if (!userId) return;

    fetchPost(1);
  }, [userId, fetchPost]);

  const refetchPosts = useCallback(async () => {
    hasMoreRef.current = true;
    setHasMore(true);
    setPage((prev) => {
      if (prev === 1) {
        fetchPost(1, true);
      }
      return 1;
    });
  }, [fetchPost]);

  return {
    posts,
    loading,
    hasMore,
    refetchPosts,
  };
};

export default useProfilePosts;
