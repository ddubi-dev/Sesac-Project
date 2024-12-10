import ViewCount from "./ViewCount";

const VideoList = ({ videos }) => {
  return (
    <div>
      <ul>
        {videos.map((video) => (
          <li key={video.id.videoId}>
            <img src={video.snippet.thumbnails.default.url} alt={video.snippet.title}></img>
            <div>
              <h3>{video.snippet.title}</h3>
              <p>{video.snippet.description}</p>
              <ViewCount></ViewCount>
            </div>
          </li>
        ))}
        <li></li>
      </ul>
    </div>
  );
};

export default VideoList;
