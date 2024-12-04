import { useEffect } from "react";

const Message = ({ count, message }) => {
  useEffect(() => {
    document.title = message;
  }, [message]);
  // message 가 변경되는 걸 감지해서
  // side-effect, message 변경으로 변경할 사항 담기!!

  // 여기는 최초 1회, 페이지가 렌더링 될 때, 호출되는 것
  useEffect(() => {
    console.log("컴포넌트 mounting");
    return () => {
      console.log("컴포넌트 unmounting");
    };
  }, []);

  // 카운트의 홀짝에 따라
  useEffect(() => {
    document.body.style.backgroundColor = count % 2 === 0 ? "lightblue" : "lightcoral";
    return () => {
      // 배경색 초기화
      document.body.style.backgroundColor = "";
    };
  }, [count]);

  return (
    <div>
      <h3>메시지: {message}</h3>
      {count > 10 && <p>많이 클릭하셨네요.</p>}
      {count < 0 && <p>음수입니다. 잘못 클릭하셨나요?</p>}
    </div>
  );
};

export default Message;
