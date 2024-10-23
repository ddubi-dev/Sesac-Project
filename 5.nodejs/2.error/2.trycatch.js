// 1. ReferenceError
try {
  console.log(undefinedVar);
} catch (error) {
  if (error instanceof ReferenceError) {
    console.log("참조 오류 발생", error.message);
  } else {
    console.log("알 수 없는 오류 발생", error.message);
  }
}

// 2. SyntaxError
try {
  sum = eval("1 ++ 2");
  console.log(sum);
} catch (error) {
  if (error instanceof SyntaxError) {
    console.log("입력 받은 문법에 오류가 있습니다.");
  } else {
    console.log("알 수 없는 오류가 발생했습니다.");
  }
}

// 3. TypeError
try {
  let obj = { a: 1 };
  obj.method(); // 선언되지 않은 함수 호출
} catch (e) {
  if (e instanceof TypeError) {
    console.log("타입 오류가 발생했습니다", e.message);
  } else {
    console.log("알 수 없는 오류가 발생했습니다", e.message);
  }
}

// 4. RangeError
try {
  let array = new Array(10);
} catch (e) {
  if (e) {
    if (e instanceof RangeError) {
      console.log("범위 오류가 발생", e.message);
    } else {
      console.log("알 수 없는 오류가 발생했습니다", e.message);
    }
  }
}
