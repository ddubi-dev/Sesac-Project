import React from "react";
import ReactDOM from "react-dom/client"; // React 18부터의 문법임

import App from "./App.js";

// React 17까지는

// function App(){
//   return <h1>Hello, World!</h1>;
// }

// const App = () => {
//   return <h1>Hello, World!</h1>;
// };

//
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App></App>
  </React.StrictMode>
);
