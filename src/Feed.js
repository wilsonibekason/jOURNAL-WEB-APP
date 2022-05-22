import Post from "./Post";

const Feed = ({ posts }) => {
  console.log("====================================");
  console.log(posts);
  console.log("====================================");
  return (
    <>
      {posts.map((post, index) => (
        <Post key={post.body + index} post={post} />
      ))}
    </>
  );
};

export default Feed;