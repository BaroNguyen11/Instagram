import { useOutletContext } from "react-router-dom";
import Story from "../../components/Story";
import useUsers from "../../hooks/useUsers";
import Aside from "./Aside";
import MainContent from "./MainContent";

const Homepage = () => {
  const { posts, refetchPosts, page, setPage, hasMore, loading } = useOutletContext();
  return (
    <div className="flex min-h-screen bg-black text-white">
      <div className="flex flex-1 justify-center">
        <main className="w-full max-w-157.5 py-8 px-4">
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
