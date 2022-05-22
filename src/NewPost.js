import ReactPlayer from "react-player";
import ReactPLayer from "react-player";

const NewPost = ({
  handleSubmit,
  postTitle,
  setPostTitle,
  postBody,
  setPostBody,
  postAssetArea,
  handleAssetChange,
  shareImage,
  videoLink,
  setVideoLink,
}) => {
  return (
    <main className="NewPost">
      <h2>New Post</h2>
      <form className="newPostForm" onSubmit={handleSubmit}>
        {/* <label htmlFor="postTitle">Title:</label>
                <input
                    id="postTitle"
                    type="text"
                    required
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                /> */}
        <label htmlFor="postBody">Post:</label>
        <textarea
          id="postBody"
          required
          value={postBody}
          onChange={(e) => setPostBody(e.target.value)}
        />
        {postAssetArea === "image" ? (
          <>
            <input
              type="file"
              name="image"
              id="file"
              style={{ display: "none" }}
              onChange={handleAssetChange}
            />
            <p>
              <label htmlFor="file">Share With your friends</label>
            </p>
          </>
        ) : (
          postAssetArea === "media " && (
            <>
              <input
                type="text"
                placeholder="please input a video link "
                value={videoLink}
                onChange={(e) => setVideoLink(e.target.value)}
              />
              {videoLink && <ReactPlayer width={"100%"} url={videoLink} />}
            </>
          )
        )}
        <button type="submit">Submit</button>
      </form>
    </main>
  );
};

export default NewPost;
