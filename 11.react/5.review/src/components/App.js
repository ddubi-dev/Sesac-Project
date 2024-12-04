import { useState, useEffect } from "react";
import Header from "./Header.js";
import Footer from "./Footer.js";
import Counter from "./Counter.js";
import Input from "./Input.js";
import Message from "./Message.js";

const App = () => {
  // props, 일방향 데이터 전달(부모 -> 자식)
  const pageTitle = "Welcome to My WebSite";
  const [count, setCount] = useState(0); // 변하는 변수값을 DOM에 그려줄 변수
  const [message, setMessage] = useState(""); // 입력 받은 메세지 저장할 변수
  const [showComponent, setShowComponent] = useState(true);

  const MyComponent = () => {
    useEffect(() => {
      console.log(`컴포넌트 등장(mount)`);
      return () => {
        console.log("컴포넌트 삭제(?) (unmounting");
      };
    }, []);

    return <div>내 새로운 컴포넌트</div>;
  };

  return (
    <div>
      <Header title={pageTitle}></Header>
      <h1>Hello, world!</h1>
      <main>
        <p>여기가 메인 글자가 쓰이는 곳</p>
        <Counter count={count} setCount={setCount}></Counter>
        <Input setMessage={setMessage} />
        <Message count={count} message={message}></Message>
        <button onClick={() => setShowComponent(!showComponent)}>MyComponent토글</button>
        {showComponent}
      </main>
      <Footer></Footer>
    </div>
  );
};

export default App;
