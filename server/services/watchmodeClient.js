
import axios from "axios";

export const watchmode = axios.create({
  baseURL: "https://api.watchmode.com/v1",
  timeout: 100000,
});
