// try {
//     // 예외가 발생할 수 있는 코드, 이 블록 어디서든 오류 발생 가능
// } catch {
//     // 예외 처리 구문
// }

// const undefinedVariable = 10;

try {
  //예외가 발생할 수 있는 코드, 이 블록 어디서든 오류 발생 가능
  console.log("1");
  const result = undefinedVariable * 2;
  console.log(result);
  console.log("1-2");
} catch (e) {
  // 예외 처리 구문
  console.error("오류가 발생했음...", e.message);
}

console.log("2");

// try 블록을 실행하다가 오류가 나면 블록 나감
// catch로 이동, 오류 메세지 실행
