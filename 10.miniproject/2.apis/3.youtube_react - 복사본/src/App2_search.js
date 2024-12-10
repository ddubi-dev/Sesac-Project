import { useState } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import VideoList from "./components/VideoList";

const YoutubeApp = () => {
  const [videos, setVideos] = useState([]);
  const [query, setQuery] = useState("");

  const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
  const BASE_URL = "https://www.googleapis.com/youtube/v3/search";

  const handleSearch = async () => {
    try {
      const response = await axios.get(`${BASE_URL}`, {
        params: {
          part: "snippet",
          q: query,
          maxResults: 10,
          key: API_KEY,
        },
      });

      setVideos(response.data.items);
    } catch (error) {
      console.log("에러: ", error);
    }
  };

  return (
    <div>
      <h1>유튜브 검색기</h1>
      <SearchBar query={query} onInputChange={setQuery} onSearch={handleSearch}></SearchBar>
      <VideoList videos={videos}></VideoList>
    </div>
  );
};

export default YoutubeApp;
