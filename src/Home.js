import { useEffect, useState } from "react";
import Feed from "./Feed";
import api from "./api/posts";

const displayUser = async (credentials) => {
  api({
    method: "get",
    url: "/users",
    data: credentials,
    headers: {
      Accept: "multipart/form-data",
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem(
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqYW1lc0BnbWFpbC5jb20iLCJleHAiOjE2NTM3OTc4OTh9.rLFbJB8Mx5Nls-8gO6lhzLuKAq1soyYRv6VpXEg0dsaP68Gqsb9SgYEAKMT5zQvaEQXsu1lsRj7Mfz3_mfHOVg"
      )}`,
    },
  })
    .then((data) => {
      console.log("====================================");
      console.log(data);
      console.log("====================================");
      data.json();
    })
    .catch((error) => {
      if (error.response) {
        console.log("====================================");
        console.log(error.response);
        console.log("====================================");
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
    });
};

console.log("====================================");
console.log(localStorage.getItem("token"));
console.log("====================================");

const Home = ({ posts }) => {
  const [login, setLogin] = useState(false);

  useEffect(() => {
    const response = displayUser({})
      .then((res) => {
        console.log(res);
        setLogin(true);
      })
      .catch((er) => {
        console.log("SignUp: " + er);
      });
  }, []);
  return (
    <main className="Home">
      {login ? (
        <>
          <h1>hello</h1>
          <Feed posts={posts} />
        </>
      ) : (
        <p style={{ textAlign: "center", marginTop: "3rem" }}>
          No posts to display.
        </p>
      )}
    </main>
  );
};

export default Home;
