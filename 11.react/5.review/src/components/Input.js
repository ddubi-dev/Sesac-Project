const Input = ({ setMessage }) => {
  function onChangeHandler(e) {
    console.log("e.target = ", e.target);
    console.log("e.target.value = ", e.target.value);
    setMessage(e.target.value);
  }

  return (
    <div>
      <label>메시지 입력: </label>
      <input type="text" onChange={(e) => onChangeHandler(e)} placeholder="글자 입력" />
      {/* <input type="text" onChange={(e) => setMessage(e.target.value)} placeholder="글자 입력" /> */}
      {/* JSX 문법 -> onChange 
            JS 문법 -> onchange */}
    </div>
  );
};

export default Input;
