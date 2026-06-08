import { useState } from "react";
import usePosts from "../../hooks/usePost";

const Search = () => {
  const { posts,handleFilter,searchRef } = usePosts();
  const [search, setSearch] = useState("");
  return (
    <div className=" flex-1 p-4 ">
      <h1 className="text-2xl font-bold mb-4">Tìm kiếm</h1>
      <input
        type="text"
        ref={searchRef}
        placeholder="Tìm kiếm bạn bè, bài viết, hoặc hashtag..."
        className="w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={search}
        onChange={(e) =>{
            const value = e.target.value
            setSearch(value)
            handleFilter(value)
        }}
      />
      {posts.map((post) => (
        <div key={post.id} className="mt-4 p-4 bg-gray-700 rounded-lg">
          <div className="flex items-center mb-2">
            <div>
              <div className="font-bold">{post.author}</div>
              <div className="text-gray-400 text-sm">
                {new Date(post.createdAt).toLocaleString()}
              </div>
            </div>
          </div>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
};
export default Search;
