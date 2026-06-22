import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { postService } from "../services/postService";

const usePost = () => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('')
  const [searchKeyword, setSearchKeyword] = useState('')
  const searchRef = useRef(null)

  const fetchPost = useCallback(async () => {
    try {
      const data = await postService.getAllPosts();
      console.log(data);
      setPosts(data);
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  }, []);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  const handleFilter = useCallback((keyword) => {
    setSearchKeyword(keyword)
  }, [])
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
      const searchLower = searchKeyword.toLowerCase()
      const matchKeyword = p.caption?.toLowerCase().includes(searchLower)

      return matchKeyword
    })
  })
  return { posts: displayPost, handleFilter, searchRef, refetchPosts: fetchPost };
};
export default usePost;
