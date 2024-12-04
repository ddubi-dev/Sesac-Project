import { useEffect } from "react";

const Counter = ({ count, setCount }) => {
  const incHandler = () => setCount(count + 1);
  const decHandler = () => setCount(count - 1);

  // 여기에는 특정 변수값이 바뀌었을 때 하고싶은 행동 정의
  useEffect(() => {
    console.log(`카운트 변수 변경됨: ${count}`);

    // Cleanup 함수,이 변화가 발생했을 때, 선행해서 실행할 것
    return () => {
      console.log(`나는 클린업 함수(count: ${count})`);
    };
  }, [count]);

  return (
    <div>
      <h2>카운터</h2>
      <p>변수값 : {count}</p>
      <button onClick={decHandler}>-1 감소</button>
      <button onClick={incHandler}>+1 증가</button>
    </div>
  );
};

export default Counter;
