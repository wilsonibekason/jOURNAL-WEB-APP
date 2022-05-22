import Header from "./Header";
import Nav from "./Nav";
import Footer from "./Footer";
import Home from "./Home";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import EditPost from "./EditPost";
import About from "./About";
import Missing from "./Missing";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import api from "./api/journal-api";
import Register from "./register";
import Login from "./login";

function App() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [sharedImage, setSharedImage] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [postAssetArea, setPostAssetArea] = useState("");

  const history = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        console.log("fetching journals");
        const response = await api.get("/journals");
        console.log("====================================");
        console.log(response.data);
        console.log("====================================");
        console.log(response.data.body);
        setPosts(response.data.body);
      } catch (err) {
        if (err.response) {
          // Not in the 200 response range
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.log(`Error: ${err.message}`);
        }
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const filteredResults = posts.filter(
      (post) =>
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.user.email.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(filteredResults.reverse());
  }, [posts, search]);

  console.log("====================================");
  console.log(searchResults);
  console.log("====================================");

  const ShowPostArea = (area) => {
    setSharedImage("");
    setVideoLink("");
    setPostAssetArea(area);
  };

  const handleAssetChange = (e) => {
    const image = e.target.files[0];
    if (image === "" || image === undefined) {
      alert(`Not an image, the file is ${typeof image}`);
    }
    setSharedImage(image);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const images = [];
    const date = "1618632106290";
    const dbId = Math.floor(Math.random() * 400000000) + 1000000000;
    // console.log(dbIds);
    // const dbIds = 543211233;
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    //const newPosts = { id, title: postTitle, datetime, body: postBody };
    const newPost = { id, images: sharedImage, body: postBody, dbId, date };
    console.log("====================================");
    console.log(newPost);
    console.log("====================================");
    //?images=ssklsskss&body=snjajkjjj&dbId=1622037629003&date=1618632106290
    try {
      const response = await api.post("/journals", newPost, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredientials: true,
      });
      console.log("====================================");
      console.log(response?.data);
      console.log("====================================");
      console.log("====================================");
      console.log(" POSTING DATA");
      console.log("====================================");
      const allPosts = [...posts, response.data.body];
      setPosts(allPosts);
      setPostTitle("");
      setPostBody("");
      history.push("/");
    } catch (error) {
      if (error.response) {
        // Request made and server responded
        console.log(error.response.data);
        const errorMessages = error.response?.data?.errors;
        Object.entries(errorMessages).forEach((errorValue, value) => {
          console.log(errorValue);
          errorValue.map((value) => console.log(value));
        });
        setErrMsg(error.response?.data?.errors);
        console.log(error.response?.data?.errors);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
    }
  };

  const handleEdit = async (id) => {
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const images = [""];
    const date = "1618632106290";
    const updatedPost = { id, images, body: editBody, date };
    console.log("====================================");
    console.log(updatedPost);
    console.log("====================================");
    try {
      const response = await api.patch(`/journals/${id}`, updatedPost, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredientials: true,
      });
      setPosts(
        posts.map((post) => (post.id === id ? { ...response.data } : post))
      );
      setEditTitle("");
      setEditBody("");
      history.push("/");
    } catch (error) {
      if (error.response) {
        // Request made and server responded
        console.log(error.response.data);
        const errorMessages = error.response?.data?.errors;

        setErrMsg(error.response?.data?.errors);
        console.log(error.response?.data?.errors);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/journals/${id}`, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredientials: true,
      });
      const postsList = posts.filter((post) => post.id !== id);
      setPosts(postsList);
      history.push("/");
    } catch (error) {
      if (error.response) {
        // Request made and server responded
        console.log(error.response.data);
        const errorMessages = error.response?.data?.errors;
        setErrMsg(error.response?.data?.errors);
        console.log(error.response?.data?.errors);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
    }
  };

  return (
    <div className="App">
      <Header title="JOURNAL WEB APP" />
      <Nav search={search} setSearch={setSearch} />
      <Routes>
        <Route exact path="/" element={<Home posts={searchResults} />}></Route>
        <Route
          exact
          path="/post"
          element={
            <NewPost
              handleSubmit={handleSubmit}
              postTitle={postTitle}
              setPostTitle={setPostTitle}
              postBody={postBody}
              setPostBody={setPostBody}
              handleAssetChange={handleAssetChange}
              sharedImage={sharedImage}
              videoLink={videoLink}
              setVideoLink={setVideoLink}
            />
          }
        ></Route>
        <Route
          path="/edit/:id"
          element={
            <EditPost
              posts={posts}
              handleEdit={handleEdit}
              editTitle={editTitle}
              setEditTitle={setEditTitle}
              editBody={editBody}
              setEditBody={setEditBody}
            />
          }
        ></Route>
        <Route
          path="/post/:id"
          element={<PostPage posts={posts} handleDelete={handleDelete} />}
        ></Route>
        <Route path="/about" component={About} element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" component={Missing} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
