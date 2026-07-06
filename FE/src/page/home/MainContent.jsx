import Posts from "../../components/Posts";


const MainContent = ({ posts, refetchPosts, page, setPage, hasMore, loading }) => {
  return (
    <>
      <Posts
        posts={posts}
        refetchPosts={refetchPosts}
        page={page}
        setPage={setPage}
        hasMore={hasMore}
        loading={loading}
      />
    </>
  );
};
export default MainContent;
