import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const usePost = () => {
  const [posts, setPosts] = useState([]);
  const [search,setSearch] = useState('')
  const [searchKeyword,setSearchKeyword] = useState('')
  const searchRef = useRef(null)
  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch("http://localhost:8080/posts");
      const data = await res.json();

      setPosts(data);
    };
    fetchPost();
  }, []);

  const handleFilter = useCallback((keyword)=>{
    setSearchKeyword(keyword)
  },[])
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
  const displayPost = useMemo(()=>{
    return posts.filter((p)=>{
      const searchLower = searchKeyword.toLowerCase()
      const matchKeyword = p.title?.toLowerCase().includes(searchLower)

      return matchKeyword
    })
  })
  return { posts:displayPost,handleFilter,searchRef };
};
export default usePost;
