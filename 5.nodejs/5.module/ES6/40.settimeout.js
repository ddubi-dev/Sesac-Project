function sayHello() {
  console.log("안녕하세요");
}

console.log("시작");
setTimeout(sayHello, 2000); //2000ms = 2초, 2초 후에 실행, 나의 할일: 2초 흐르는거. 그 다음 callback함수 호출
console.log("끝");
