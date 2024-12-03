const Input = ({ setMessage }) => {
  const onChangeHandler = (e) => {
    const newValue = e.target.value;
    // console.log("뉴벨류");  // 뭔 값을 가지고 올 때마다 update
    setMessage(newValue);
  };
  return (
    <div>
      <label>메시지 입력: </label>
      <input
        type="text"
        placeholder="메시지를 입력하세요"
        // onChange={(e) => {
        //   setMessage(e.target.value);
        //   //   onChange이벤트 발생시, 그 이벤트를 읽어다가 위 함수 실행
        // }}
        onChange={onChangeHandler}
      />
    </div>
  );
};

export default Input;
