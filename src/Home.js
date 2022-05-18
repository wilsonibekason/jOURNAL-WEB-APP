import { useEffect, useState } from "react";
import Feed from "./Feed";
import api from "./api/posts";
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
  const [login, setLogin] = useState(false);
  var token = localStorage.getItem("token");
  console.log("====================================");
  console.log(token);
  console.log("====================================");

  useEffect(() => {
    // async function getUser() {
    //   try {
    //     const response = await api.get("/users");
    //     localStorage.getItem("token");
    //     console.log(response);
    //     console.log(JSON.stringify(response?.data));
    //   } catch (error) {
    //     console.error(error);
    //   }
    // }
    // getUser();
    async function makeGetRequest() {
      let res = await api.get("/users");
      setLogin(true);
      let data = res.data;
      console.log(data);
    }

    makeGetRequest();
  }, []);
  return (
    <main className="Home">
      {!login ? (
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
