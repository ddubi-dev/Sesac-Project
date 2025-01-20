interface Calculate {
  (a: number, b: number): number;
  // 두 개의 숫자(인자)를 받아서 하나의 숫자를 반환하는 함수
  // 이런 함수라는 걸 정의하는 거임
}

// 해당 형태의 함수를 갖는 변수라는 의미
const add: Calculate = (x, y) => x + y;
console.log(`덧셈: ${add(5, 10)}`);

const sub: Calculate = (x, y) => x - y;
console.log(`뺄셈: ${sub(5, 10)}`);

const multiply: Calculate = (x, y) => x * y;
console.log(`곱셈: ${multiply(5, 10)}`);
