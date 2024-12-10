import { useState, useEffect } from "react";
import axios from "axios";

const YoutubeApp = () => {
  const [videos, setVideos] = useState([]);
  const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
  // react는 dotenv 필요 없음. react에서 .env 파일 처리 알아서 함.
  const BASE_URL = "https://www.googleapis.com/youtube/v3/videos";

  useEffect(() => {
    const fetchYoutube = async () => {
      try {
        const response = await axios.get(`${BASE_URL}`, {
          params: {
            part: "snippet, contentDetails, statistics",
            chart: "mostPopular",
            regionCode: "KR",
            maxResults: 10,
            key: API_KEY,
          },
        });

        setVideos(response.data.items);
      } catch (error) {
        console.log("에러: ", error);
      }
    };

    fetchYoutube();
  }, [API_KEY]);
  // 시작할 때 최초 한 번, 외부에 요청해서 결과를 받아옴.
  // useEffect 안에 변수가 쓰였고
  // 외부에서 받아오는 변수이기 때문에, => vscode의 lint가 잡아주는 것

  return (
    <div>
      <h1>유튜브 현재 실시간 top10</h1>
      <ul>
        {videos.map((video) => (
          <li key={video.id}>
            <h2>{video.snippet.title}</h2>
            <img src={video.snippet.thumbnails.default.url} alt={video.snippet.title}></img>
            <p>{video.snippet.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default YoutubeApp;
// 여러 개면 이름 맞춰야하지만
// export 하나니까 이름 다르게 가능
