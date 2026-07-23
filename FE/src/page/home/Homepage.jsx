import { useOutletContext } from "react-router-dom";
import Story from "../../components/story/Story";
import useUsers from "../../hooks/useUsers";
import Aside from "./Aside";
import MainContent from "./MainContent";

const Homepage = () => {
  const { posts, refetchPosts, page, setPage, hasMore, loading } = useOutletContext();
  return (
    <div className="flex min-h-screen bg-black text-white w-full max-w-full overflow-hidden">
      <div className="flex flex-1 min-w-0 justify-center">
        <main className="w-full max-w-157.5 py-8 px-4 min-w-0">
          <Story />
          <div className="mt-8">
            <MainContent
              posts={posts}
              refetchPosts={refetchPosts}
              page={page}
              setPage={setPage}
              hasMore={hasMore}
              loading={loading}
            />
          </div>
        </main>

        <Aside />
      </div>
    </div>
  );
};

export default Homepage;
