import React from "react";

const Header = ({ title }) => {
  //부모로부터 가져온 인자값
  return (
    <div>
      <p style={{ color: "orange" }}>My Website Header</p>
      <h1>{title}</h1>
    </div>
  );
};

export default Header;
