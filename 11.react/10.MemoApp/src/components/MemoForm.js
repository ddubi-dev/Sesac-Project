import { useState } from "react";

const MemoForm = ({ addMemo }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // 기본 폼 제출 방지
    addMemo(input); // 상위 컴포넌트로부터 받아온 함수(?) 사용
    setInput(""); // 입력 필드값 초기화
  };
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="메모를 입력하세요"></input>
      <button type="submit">추가</button>
    </form>
  );
};

export default MemoForm;
