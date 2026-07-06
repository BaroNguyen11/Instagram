import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { postService } from "../services/postService";

const usePost = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef(null);
  const loadingRef = useRef(false);
  const hasMoreRef = useRef(true);

  const fetchPost = useCallback(async (pageToFetch, isRefresh = false) => {
    if (loadingRef.current) return;
    if (!isRefresh && !hasMoreRef.current) return;

    loadingRef.current = true;
    setLoading(true);

    try {
      const data = await postService.getAllPosts(pageToFetch, 10);
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
  }, []);

  useEffect(() => {
    fetchPost(page);
  }, [page, fetchPost]);

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

  const handleFilter = useCallback((keyword) => {
    setSearchKeyword(keyword);
  }, []);
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "/" && document.activeElement.tagName !== "INPUT") {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);
  const displayPost = useMemo(() => {
    return posts.filter((p) => {
      const searchLower = searchKeyword.toLowerCase();
      const matchKeyword = p.caption?.toLowerCase().includes(searchLower);

      return matchKeyword;
    });
  }, [posts, searchKeyword]);
  return {
    posts: displayPost,
    loading,
    hasMore,
    page,
    setPage,
    handleFilter,
    searchRef,
    refetchPosts,
  };
};
export default usePost;
