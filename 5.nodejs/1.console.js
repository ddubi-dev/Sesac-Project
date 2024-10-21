const greeting = "hello, world!";
console.log(greeting);

const a = 10;
const b = 20;
const c = "text";
console.log(a, b, c);

// 백틱
console.log(`입력값들: a=${a}, b=${b}`);

// 객체
const person = { name: "soohyun", age: 30 };
console.log("person: ", person);
console.log("name: ", person.name);

// 배열
const fruit = ["애플", "바나나"];
console.log(fruit[0]);

// 성능 측정
console.time("test");
console.log("복잡한 로직");
console.timeEnd("test The End");

// 불리언
let isLogged = false;

// 변수의 scope
var globalA = 10; // FE에서 변수를 어디에서나 쉽게 선언해서 쓸려고 (쓰지 말아라)
let globalB = 20; // BE에서의 글로벌 변수

function myFunction() {
  let localC = 30;
  console.log(`글로벌A : ${globalA}, 글로벌B: ${globalB}, 로컬C: ${localC}`);

  // let과 const 만 있다고 생각해라. var -> 오류 많아짐

  globalA = 50;
}

myFunction();
