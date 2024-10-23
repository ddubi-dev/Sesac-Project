function addNumbers(a, b) {
  return a + b;
}

function subNumbers(a, b) {
  return a - b;
}

// 모듈을 내보낼 때는 여러 개면 여러 줄
module.exports = {
  addNumbers,
  subNumbers,
};
// module.exports = subNumber; -- 이렇게 하면 안됨
