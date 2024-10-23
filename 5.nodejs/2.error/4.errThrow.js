// throw
// 강제로 오류 유발

// 1. 문자열을 통한 에러 처리 방식 - 아주 별로
function divide(a, b) {
  try {
    if (b === 0) {
      throw "0으로 나눌 수 없습니다.";
    }
    return a / b;
  } catch (error) {
    return "오류 발생: " + error;
  }
}
// console.log(divide(5, 0));

// 2. error객체를 만들어서 던짐
function divide2(a, b) {
  try {
    if (b === 0) {
      throw new Error("0으로 나눌 수 없습니다.");
    }
    return a / b;
  } catch (error) {
    return "오류 발생: " + error.message;
  } finally {
    // 실무에선 잘 안씀
    console.log("오류가 나건 안나건 무조건 호출됨");
  }
}
console.log(divide2(5, 0));
console.log(divide2(10, 2));
console.log(divide2(30, 6));
