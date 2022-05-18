import axios from "axios";

const token = localStorage.getItem("token");
export default axios.create({
  //baseURL: 'http://localhost:3500'
  baseURL: "https://myjournserver.herokuapp.com",
  timeout: 30000,
  headers: {
    // Accept: "multipart/form-data",
    //"Content-Type": "multipart/form-data",
    Authorization: `Bearer ${token}`,
  },
});
