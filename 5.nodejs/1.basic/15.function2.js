function sum_to_n(num) {
  let sum = 0;
  for (let i = 1; i <= num; i++) {
    sum += i;
  }
  return sum;
}

//가우스 덧셈공식
function sum2_to_n(num) {
  let sum = (num * (num + 1)) / 2;
  return sum;
}

console.log(sum_to_n(100));
console.log(sum2_to_n(100));
