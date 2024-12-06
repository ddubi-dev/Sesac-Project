import { useState } from "react";
import MemoForm from "./components/MemoForm";
import MemoList from "./components/MemoList";
import MemoSearch from "./components/MemoSearch";
import MemoSort from "./components/MemoSort";
import "./styles.css";

const App = () => {
  const [memos, setMemos] = useState([]);

  const addMemo = (text) => {
    const newMemo = { id: Date.now(), text, completed: false }; // 고유 ID와 텍스트값으로 메모 객체 생성
    setMemos([...memos, newMemo]); // 기존 메모 배열에 새 메모 추가
  };

  const deleteMemo = (id) => {
    const newMemo = memos.filter((i) => i.id !== id);
    setMemos(newMemo);
  };

  const editMemo = (id, newText) => {
    setMemos(memos.map((memo) => (memo.id === id ? { ...memo, text: newText } : memo)));
  };

  const toggleComplete = (id) => {
    setMemos(memos.map((memo) => (memo.id === id ? { ...memo, completed: !memo.completed } : memo)));
    // id 같은거 상태 변경, 다른 것들은 그대로 유지
  };

  // const searchMemo = (text) => {
  //   const value = memos.filter((memo) => memo.text.includes(text));
  //   //  memos.map((memo) => {
  //   //   memo.filter((i) => i.text.includes(text));
  //   // });
  //   setMemos(value);
  // };

  const [searchQuery, setSearchQuery] = useState("");

  const filteredMemo = memos.filter((memo) => {
    return memo.text.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div>
      <h1>메모앱 (투두리스트)</h1>
      <MemoSearch search={setSearchQuery}></MemoSearch>
      {/* <MemoSearch searchMemo={searchMemo}></MemoSearch> */}
      {/* 1. 개별 컴포넌트로 구현 */}
      {/* 2. 검색 함수 구현 */}
      {/* 3. 검색 내용을 담은 상태 변수 구현 */}
      {/* 4. 필터된 내용을 MemoList에 전달 */}

      {/* <MemoSort></MemoSort> */}
      {/* 변수 만들어 소팅, 만들어진 리스트 전달. */}

      <MemoForm addMemo={addMemo}></MemoForm>
      <MemoList memos={filteredMemo} deleteMemo={deleteMemo} editMemo={editMemo} toggleDone={toggleComplete}></MemoList>
    </div>
  );
};

export default App;
