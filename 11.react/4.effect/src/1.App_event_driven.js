import { useState } from "react";

const App = () => {
  const [data, setData] = useState(null); // 초기값

  const loadData = async () => {
    // TODO. 맨 뒤에 1을 랜덤으로 생성하시오 (1~10)
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${randomNumber}`);
    const result = await response.json();
    // console.log(result);
    // result : 객체타입!!!!=>
    setData(result);
    // 바뀔때마다 돔에 렌더링 되는걸 원하니까
  };

  //   loadData();
  // 서버가 싫어함.
  // 사이드 이펙트

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={loadData}>Load Data</button>
      {/* Event-driven */}

      {/* 결과를 출력할 공간 */}
      <div style={{ marginTop: "20px" }}>
        {data ? (
          <div>
            <h3>{data.title}</h3>
            <p>{data.body}</p>
          </div>
        ) : (
          <p>No data loaded.</p>
        )}
      </div>
    </div>
  );
};

export default App;
