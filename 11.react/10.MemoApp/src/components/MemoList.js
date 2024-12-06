const MemoList = ({ memos, deleteMemo, editMemo, toggleDone }) => {
  return (
    <div>
      {memos.map((memo) => {
        console.log(memo);
        return (
          <div className="memo-item" key={memo.id}>
            {/* React의 리스트를 렌더링할 때 각 요소에 고유한 key를 지정해야 함. */}

            {/* 완료 체크박스 */}
            <input type="checkbox" onChange={() => toggleDone(memo.id)} className="check-box" />

            {/* 메모 텍스트 */}
            <input type="text" value={memo.text} disabled={memo.completed} onChange={(e) => editMemo(memo.id, e.target.value)} />
            {/* 완료된 메모는 수정 불가 */}

            {/* 버튼이 클릭 되었을 때, 받아온 함수 호출 */}
            <button onClick={() => deleteMemo(memo.id)}>삭제</button>
            {/*???다시보기 onClick 이 받는 건 인자(보통은 e) */}
          </div>
        );
      })}
    </div>
  );
};

export default MemoList;

// memos.map((memo) => (
//     // return 이 포함된 것 ()
//     <div className="memo-item" key={memo.id}>

//       {/* 완료 체크박스 */}
//       <input type="checkbox" onChange={() => toggleDone(memo.id)} />

//       {/* 메모 텍스트 */}
//       <input type="text" value={memo.text} onChange={(e) => editMemo(memo.id, e.target.value)} />

//       {/* 버튼이 클릭 되었을 때, 받아온 함수 호출 */}
//       <button onClick={() => deleteMemo(memo.id)}>삭제</button>
//     </div>
//   ))
