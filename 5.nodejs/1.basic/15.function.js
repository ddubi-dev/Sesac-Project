function sum_to_100() {
  let sum = 0;
  for (let i = 1; i < 101; i++) {
    sum += i;
  }
  return sum;
}

// 덧셈을 가장 빠르게 하는 알고리즘 - 가우스 덧셈공식
function sum2_to_100() {
  let n = 100;
  let sum = (n * (n + 1)) / 2;
  return sum;
}

console.time("for"); // 성능측정
console.log(sum_to_100());
console.timeEnd("for");

console.log(sum2_to_100());
