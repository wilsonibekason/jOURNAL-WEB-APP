import Post from "./Post";

const Feed = ({ posts }) => {
  console.log("====================================");
  console.log(posts);
  console.log("====================================");
  return (
    <>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </>
  );
};

export default Feed;
