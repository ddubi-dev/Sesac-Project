const MemoSearch = ({ search }) => {
  const handleSearch = (e) => {
    search(e.target.value);
    // 입력값이 변경될 때마다 바로바로 부모에게 해당 값 전달
  };

  return <input type="text" placeholder="검색어를 입력하세요" className="search-bar" onChange={handleSearch} />;
};

export default MemoSearch;

// -------------------------------------------------------------------------
// import { useState } from "react";

// const MemoSearch = ({ searchMemo }) => {
//   const [input, setInput] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     searchMemo(input);
//     setInput("");
//   };

//   return (
//     <form onChange={handleSubmit}>
//       <input type="text" value={input} placeholder="검색어를 입력하세요" className="search-bar"></input>
//       <button onClick={(e) => setInput(e.target.value)} type="submit">
//         검색
//       </button>
//     </form>
//   );
// };

// export default MemoSearch;
