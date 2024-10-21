// 고차함수
// 함수를 인자로 받는 고차함수(많이 쓰임)
function doSomething(func) {
  console.log("내가 하고 싶은 일 먼저...");
  func();
}

function sayHello() {
  console.log("hi");
}

doSomething(sayHello);

//----------함수를 반환하는 고차함수----------
function createMultiplier(multiplier) {
  return function (x) {
    return x * multiplier;
  };
}

const double = createMultiplier(2); // 2의 배수를 만들어주는 함수 만듦
console.log(double(5));

const quad = createMultiplier(4); // 4의 배수를 만들어주는 함수 만듦
console.log(quad(5));
