import { useEffect, useState } from "react";
import Feed from "./Feed";
import api from "./api/journal-api";
//eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqYW1lc0BnbWFpbC5jb20iLCJleHAiOjE2NTM3OTc4OTh9.rLFbJB8Mx5Nls-8gO6lhzLuKAq1soyYRv6VpXEg0dsaP68Gqsb9SgYEAKMT5zQvaEQXsu1lsRj7Mfz3_mfHOVg
// const displayUser = async (credentials) => {
//   api({
//     method: "get",
//     url: "/users",
//     data: credentials,
//     headers: {
//       Accept: "multipart/form-data",
//       "Content-Type": "multipart/form-data",
//       Authorization: `Bearer ${localStorage.getItem("token")}`,
//     },
//   })
//     .then((data) => {
//       console.log("====================================");
//       console.log(data);
//       console.log("====================================");
//       data.json();
//     })
//     .catch((error) => {
//       if (error.response) {
//         console.log("====================================");
//         console.log(error.response);
//         console.log("====================================");
//         console.log(error.response.data);
//         console.log(error.response.status);
//         console.log(error.response.headers);
//       }
//     });
// };

// console.log("====================================");
// console.log(localStorage.getItem("token"));
// console.log("====================================");

const Home = ({ posts }) => {
  // const [login, setLogin] = useState(false);
  // const [errMsg, setErrMsg] = useState("");
  // var token = localStorage.getItem("token");
  // console.log("====================================");
  // console.log(token);
  // console.log("====================================");

  // useEffect(() => {
  //   async function makeGetRequest() {
  //     await api({
  //       method: "get",
  //       url: "/journals",
  //     })
  //       .then((res) => {
  //         let data = res.data;
  //         console.log("====================================");
  //         console.log(data);
  //         console.log("====================================");
  //       })
  //       .catch((err) => {
  //         if (!err?.response) {
  //           setErrMsg("No Server Response");
  //         } else if (err.response?.status === 400) {
  //           setErrMsg("Missing Username or Password");
  //         } else if (err.response?.status === 401) {
  //           setErrMsg("Unauthorized");
  //         } else if (err.response?.status === 403) {
  //           console.log(err.response.data);
  //           console.log(err.response.status);
  //           console.log(err.response.headers);
  //           console.log("====================================");
  //         } else {
  //           setErrMsg("Login Failed");
  //         }
  //       });
  //   }
  //   makeGetRequest();
  // }, []);
  console.log("====================================");
  console.log(posts);
  console.log("====================================");
  return (
    <main className="Home">
      {posts.length ? (
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
