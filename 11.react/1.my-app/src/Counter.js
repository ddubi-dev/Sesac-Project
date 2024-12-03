import { useState } from "react";
// import useState from "react"; // 에러
import Message from "./Message.js";

const Counter = () => {
  //   const count = 5;
  const [count, setCount] = useState(5); // State 선언, Hook, 상태관리

  //   const increment = () => setCount(count + 1);
  //   const decrement = () => setCount(count - 1);

  function increment() {
    setCount(count + 1);
  }
  function decrement() {
    setCount(count - 1);
  }

  return (
    <div>
      <h2>Counter: {count}</h2>
      <div>
        <button onClick={() => setCount(count + 1)}>증가</button>
        <button onClick={() => setCount(count - 1)}>감소</button>
      </div>

      <div>
        <button onClick={increment}>증가</button>
        <button onClick={decrement}>감소</button>
      </div>
      <Message count={count}></Message>
    </div>
  );
};

export default Counter;
