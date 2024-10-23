try {
  // 실제 여러 코드 발생
} catch (e) {
  if (e instanceof TypeError) {
  } else if (e instanceof ReferenceError) {
    console.log("타입 오류 발생", e.message);
  } else if (e instanceof RangeError) {
    console.log("범위 오류 발생", e.message);
  } else if (e instanceof SyntaxError) {
    console.log("문법 오류 발생", e.message);
  } else {
    console.log("알 수 없는 오류 발생", e.message);
  }
}

// 주의 사항
// 1. 에러 처리 필수
// 2. 나의 코드를 통째로 try-catch
// 3. 기본 룰: 꼭 필요한 곳에 필요한 오류처리를 한다
