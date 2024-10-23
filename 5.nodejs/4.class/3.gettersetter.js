class Circle {
  constructor(radius) {
    // 엄밀히 하면 객체지향이 아니라 스코프가 없음
    // 통념, 내부에서만 쓸거면 밑줄
    // 내부 변수니 함부로 건드리지 마시오!!!!
    this._radius = radius;
  }
  get diameter() {
    // 함수처럼 생겼지만, 변수처럼 취급함...
    return this._radius * 2;
  }
  set diameter(diameter) {
    this._radius = diameter / 2;
  }
}

const myCircle = new Circle(5);
console.log(myCircle.diameter);
// console.log(myCircle.diameter());  XXXXX

myCircle.diameter = 14;
console.log(myCircle.diameter);
