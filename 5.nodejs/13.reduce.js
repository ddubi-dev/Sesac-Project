// reduce() 함수: 전체 배열 배의 데이터를 합산(등)을 통해서 누계기(accumulator)
//                              이전 리턴값,     현재값    =>(       함수 연산        ), 초기값
// const sum = numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

const numbers = [1, 2, 3, 4, 5];

// 모든 수의 합
const sum = numbers.reduce(
  (accumulator, currentValue) => accumulator + currentValue,
  0
);
console.log(sum);

// 팩토리얼
const product = numbers.reduce(
  (accumulator, currentValue) => accumulator * currentValue,
  1
);
console.log(product);

// 가장 큰 값
const max = numbers.reduce(
  (accumulator, currentValue) =>
    accumulator < currentValue ? (accumulator = currentValue) : numbers[0],
  0
);
console.log(max);
console.log(Math.max(...numbers));

const numbers2 = [-10, -5, -20, -8, -15];

function my_max(numbers) {
  let max = numbers[0];
  for (let i = 0; i < numbers.length; i++) {
    if (max < numbers[i]) {
      max = numbers[i];
    }
  }
  return max;
}

console.log(my_max(numbers));
