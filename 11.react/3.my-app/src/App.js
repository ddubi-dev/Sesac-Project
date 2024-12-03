import React from "react";
import "./App.css";
import Header from "./Header.js";
import Footer from "./Footer.js";
import Counter from "./Counter.js";
import Message from "./Message.js";
import Input from "./Input.js";
import { useState } from "react";

const App = () => {
  const pageTitle = "Welcome to My Website";
  // 부모가 자식으로 props로 데이터를 전송했다.

  const [count, setCount] = useState(5); // State 선언, Hook, 상태관리
  const [message, setMessage] = useState(""); // 입력메시지 컬럼의 초기값(빈칸) 설정

  return (
    <div className="App">
      <Header title={pageTitle}></Header>
      <main className="App-header">
        <h1>Hello, World!</h1>
        <p>안녕하세요, 리액트 학습자 여러분</p>
        <Counter count={count} setCount={setCount}></Counter>
        {/* 함수를 인자로 넣어줌 */}
        <Message message={message} count={count}></Message>
        <Input setMessage={setMessage}></Input>
      </main>
      <Footer></Footer>
    </div>
  );
};

// 인풋을 통해 받아온 메시지로 message를 업데이트
// message 태그에 값

export default App;
