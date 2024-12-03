import React from "react";
import "./App.css";
import Header from "./Header.js";
import Footer from "./Footer.js";
import Counter from "./Counter.js";

const App = () => {
  // function App(){
  const pageTitle = "Welcome to My Website";
  // 부모가 자식으로 props로 데이터를 전송했다.

  return (
    <div className="App">
      <Header title={pageTitle}></Header>
      <main className="App-header">
        <h1>Hello, World!</h1>
        <p>안녕하세요, 리액트 학습자 여러분</p>
        <Counter></Counter>
      </main>
      <Footer></Footer>
    </div>
  );
};

export default App;
