import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import App2 from "./App2";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    <App2 />
    {/* // app 이라는 컴포넌트를 불러와서 */}
  </React.StrictMode>
);
// njk와 같은 패턴
// res.render(html파일)
// 여기 안의 {% %} html로 랜더링 해줌
// jsx라는 문법임 -> <xml>태그로 구성되어있고, 그 안에 js 가
// 뒤죽박죽 섞여있음
