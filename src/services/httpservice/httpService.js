import axios from "axios";

let url = "";

if (process.env.NODE_ENV === "development") {
  url = "http://localhost:9090";
}
export default axios.create({
  baseURL: url
});
