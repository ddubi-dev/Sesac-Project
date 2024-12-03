import { useState, useEffect } from "react";

const App = () => {
  const [loading, setLoading] = useState(false); // 초기값 false
  const [clearing, setClearing] = useState(false);
  const [count, setCount] = useState(1); // 초기값 설정(이것도 변경으로 침)
  const [data, setData] = useState(null);

  const loadData = async () => {
    setLoading(true);

    // 강제로 1초 대기
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // 가상돔, 실제돔 시간 맞추기(???)

    try {
      const randomNumber = Math.floor(Math.random() * 100) + 1;
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${randomNumber}`);
      // 유일한 서버^^!! & 오류 예외 처리 필요
      const result = await response.json();

      setData(result);
      // result : 객체타입!!!!
      // setData: 바뀔때마다 돔에 렌더링 되는걸 원하니까
    } catch (error) {
      setData({ error: true });
    } finally {
      setLoading(false);
    }
  };

  // Hook
  useEffect(() => {
    loadData();
  }, [count]);
  // 변수 값과 연동
  // [] 지켜볼 변수 => 이 변수가 변경될 때마다, 이 함수 안의 내용을 실행해라
  // 이 변수가 변경되었을 때 발생하는 side-effect를 해결하기 위한 함수를 정의하는 곳
  // => 지켜볼 변수 x, 최초 한 번만 실행됨
  // 최초 한 번 불리고, 나머지는 event-driven

  // 데이터 렌더링(js 문법 html 반환)
  const renderData = (data) => {
    return (data) => {
      if (!data) {
        return <p>No data loaded.</p>;
      }
      if (data.error) {
        return <p style={{ color: "red" }}>데이터 로딩에 실패하였습니다.</p>;
      }
      return (
        <div>
          <h3>{data.title}</h3>
          <p>{data.body}</p>
        </div>
      );
    };
  };

  // 데이터 리셋
  const clearHandler = async () => {
    setClearing(true);
    // console.log("클리어 클릭됨");
    // 1초 대기
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setData(null);
    setClearing(false);
  };
  return (
    <div style={{ padding: "20px" }}>
      <button onClick={() => setCount(count + 1)} disabled={loading || clearing}>
        Load Data({count})
      </button>
      {/* Event-driven */}

      <button onClick={clearHandler} disabled={clearing || loading || data === null}>
        Clear
      </button>
      {/* 함수형 변수 */}
      {/* or ()=>{   } : 익명 함수 안에 바로*/}

      {/* 결과를 출력할 공간 */}
      <div style={{ marginTop: "20px" }}>
        {/* HTML 구문 */}
        {/* {data ? (
          data.error ? (
            <p style={{ color: "red" }}>데이터 로딩에 실패하였습니다.</p>
          ) : (
            <div>
              <h3>{data.title}</h3>
              <p>{data.body}</p>
            </div>
          )
        ) : (
          <p>No data loaded.</p>
        )} */}

        {/* JS - if 구문 */}
        <div style={{ marginTop: "20px" }}>
          {(() => {
            if (!data) {
              return <p>No data loaded.</p>;
            }
            if (data.error) {
              return <p style={{ color: "red" }}>데이터 로딩에 실패하였습니다.</p>;
            }
            return (
              <div>
                <h3>{data.title}</h3>
                <p>{data.body}</p>
              </div>
            );
          })()}
        </div>

        {/* 함수로 전달(분리) */}
        {/* <div style={{ marginTop: "20px" }}>{renderData(data)}</div> */}
      </div>
    </div>
  );
};

export default App;
