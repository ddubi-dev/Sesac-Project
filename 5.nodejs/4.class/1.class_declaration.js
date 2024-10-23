class Car {
  // 실명으로, 호이스팅 가능, 초기화는 안됨 -> 정의된 이후에 사용해야함.
  constructor(make, model) {
    // 객체를 만들어내는 함수
    this.make = make;
    this.model = model;
  }

  drive() {
    return `${this.make}의 ${this.model}이 운항중입니다.`;
  }

  open() {
    return `${this.make}의 ${this.model}의 문이 열렸습니다.`;
  }
}

const myCar = new Car("현대", "K5");

console.log(myCar.make);
console.log(myCar.drive());
console.log(myCar.open());
