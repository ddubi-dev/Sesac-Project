import "./Message.css";

const Message = ({ count, message }) => {
  return (
    <div>
      <p className="message">
        {message} 값은 : {count}입니다
      </p>
      {count >= 10 && <p>10번 넘게 클릭하였습니다</p>}
    </div>
  );
};
// 하나의 컴포넌트로 리턴해야함(<div></div>)

export default Message;
