let car = {
  brand: "현대",
  year: 2024,
  start: function () {
    return "엔진 시작";
  },
  stop: function () {
    return "엔진 중지";
  },
};

console.log(car.start); // 변수를 호출
console.log(car.start()); // 변수 안에 담긴 함수를 호출

car.name = "K5"; // 내부에 속성 추가도 가능
console.log(car);

// class(attribute + method)로 객체를 찍어냄
// static method는 객체를 실체화 하지 않고, 언제든지 호출할 수 있는 함수
// Math 객체 -> Math.abs()

// static 함수, static 변수(Math.PI) -- 이건 그냥 암기
const today = new Date();
console.log(today);

let maxNum = Math.max(10, 20);
console.log("max: ", maxNum);

maxNum = Math.max(10, 20, 30);
console.log("max: ", maxNum);

console.log("반올림: ", Math.round(4.5)); // 반올림
console.log("반올림: ", Math.round(4.4)); // 반올림

console.log("내림: ", Math.floor(4.4)); //내림
console.log("올림: ", Math.ceil(4.4)); //올림
