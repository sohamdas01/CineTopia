// server/services/omdbClient.js
import axios from "axios";

export const omdb = axios.create({
  baseURL: "https://www.omdbapi.com/",
  timeout: 100000,
});
