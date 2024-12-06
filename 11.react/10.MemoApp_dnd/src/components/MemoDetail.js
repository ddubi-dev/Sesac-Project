const MemoDetail = ({ onClose }) => {
  return (
    <div className="memo-detail-overlay">
      <div className="memo-detail">
        <h2>메모 상세보기</h2>
        <input className="memo-title-input" type="text" placeholder="제목을 입력하세요"></input>
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
