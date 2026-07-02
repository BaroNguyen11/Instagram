import { useState } from "react";
import usePosts from "../../hooks/usePost";
import { Search } from "lucide-react";

const SearchPage = () => {
  const { posts, handleFilter, searchRef } = usePosts();
  const [search, setSearch] = useState("");
  return (
    <div className=" flex-1 p-4 relative  w-full">
      <Search
        size={18}
        className="absolute left-3/10 top-9 -translate-y-1/2 text-gray-400"
      />
      <input
        type="text"
        ref={searchRef}
        placeholder="Search"
        className="block w-150 text-sm p-2.5 mx-auto px-9 rounded-full bg-[rgba(255,255,255,0.1)] text-white focus:outline-none "
        value={search}
        onChange={(e) => {
          const value = e.target.value;
          setSearch(value);
          handleFilter(value);
        }}
      />
      <div className="grid grid-cols-4 gap-1 mt-6">
        {posts.map((post) => (
          <div
            key={post._id}
            className="relative aspect-square overflow-hidden cursor-pointer group"
          >
            <img
              src={post.images?.[0]?.url}
              alt={post.caption}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />

            {/* Overlay khi hover */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-8 text-white font-semibold">
              <div className="flex items-center gap-2">
                ❤️
                <span>{post.likeCount}</span>
              </div>

              <div className="flex items-center gap-2">
                💬
                <span>{post.commentCount}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default SearchPage;
