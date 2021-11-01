import axios from "axios";

export default async function get(url) {
  return await axios.get(`.../${url}`)
}