import { Link } from "react-router-dom";

const Post = ({ post }) => {
  return (
    <article className="post">
      <Link to={`/post/${post.id}`}>
        <h2>{post.user["email"]}</h2>
        <p className="postDate">{post.date && post.dbId}</p>
      </Link>
      <p className="postBody">
        {post.body.length <= 25 ? post.body : `${post.body.slice(0, 25)}...`}
      </p>
    </article>
  );
};

export default Post;
