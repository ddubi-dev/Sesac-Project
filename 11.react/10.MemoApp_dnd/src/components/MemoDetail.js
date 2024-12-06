const MemoDetail = ({ memo, onClose }) => {
  // 1. 내부에서 메모 제목과 상세내용을 관리한다.
  // 2. 메모를 저장하는 함수 받아오기
  // 3. 내부에 저장된 내용을 2번의 함수를 통해서 다시 바깥으로 저장해준다.

  return (
    <div className="memo-detail-overlay">
      <div className="memo-detail">
        <h2>메모 상세보기</h2>
        <input className="memo-title-input" type="text" value={memo.text} placeholder="제목을 입력하세요"></input>
        <textarea className="memo-textarea" placeholder="상세 내용을 입력하세요"></textarea>
        <div className="memo-detail-buttons">
          <button>저장</button>
          <button onClick={onClose}>닫기</button>
        </div>
      </div>
    </div>
  );
};

export default MemoDetail;
