const car = class {
  // 익명/실명으로, 호이스팅 X
  constructor(make, model) {
    this.make = make;
    this.model = model;
  }

  drive() {
    return `${this.make}의 ${this.model}이 운항중입니다.`;
  }
};

const myCar = new car("현대차", "k5");
const status = myCar.drive();
console.log(status);

// 잠깐 쓸거면 익명, 변수로 선언
// 계속 쓸거면 실명으로
