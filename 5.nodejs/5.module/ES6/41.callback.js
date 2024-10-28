function greet(name, callback) {
  const message = `안녕, ${name}`; // 이름을 받아서 포맷팅
  callback(message);
}

function displayGreeting1(greeting) {
  console.log(greeting);
}
function displayGreeting2(greeting) {
  console.log(`<h1>${greeting}</h1>`);
}

greet("홍길동", displayGreeting1); // 포맷팅 된 문자를 받아서 다르게 출력
greet("홍길동", displayGreeting2);

function add(a, b, callback) {
  const sum = a + b;
  callback(a, b, sum);
}

function printSum(a, b, sum) {
  console.log(`${a} + ${b} = sum: ${sum}`);
}
add(3, 4, printSum);
