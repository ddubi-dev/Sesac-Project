import { useState, useEffect } from "react";
import axios from "axios";

const ViewCount = ({ videoId, onViewCountFetched }) => {
  const [viewCount, setViewCount] = useState(null);
  const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
  const BASE_URL = "https://www.googleapis.com/youtube/v3/videos";
  //   https://developers.google.com/youtube/v3/docs/videos/insert?hl=ko

  useEffect(() => {
    const fetchViewCount = async () => {
      try {
        const response = await axios.get(`${BASE_URL}`, {
          params: {
            part: "statistics",
            id: videoId,
            key: API_KEY,
          },
        });

        // console.log("response: ", response);
        const count = response.data.items[0]?.statistics.viewCount;

        if (count) {
          setViewCount(count);
          onViewCountFetched(count); // 조회수 업데이트 시 부모 컴포넌트로 전달
        }
      } catch (error) {
        console.log("에러: ", error);
      }
    };

    fetchViewCount();
  }, [videoId]);

  return (
    <div>
      <p>{viewCount ? `👁️👁️ 조회수: ${viewCount}회` : ""}</p>
    </div>
  );
};

export default ViewCount;
