class Shape {
  constructor(type) {
    this.type = type;
  }
  getArea() {
    // 강제화함(객체지향의 abstract class 처럼)
    throw new Error("getArea() 구현 해라잉");
  }
  getInfo() {
    throw new Error("getInfo() 구현 해라잉");
  }
  toString() {
    return `${this.type} - Area: ${this.getArea()} m²`;
  }
}

class Square extends Shape {
  constructor(width) {
    super("Square");
    this.width = width;
  }
  getArea() {
    return this.width * this.width;
  }
  getInfo() {
    return `Square with side length ${this.width}.`;
  }
}

class Triangle extends Shape {
  constructor(width, height) {
    super("Triangle");
    this.width = width;
    this.height = height;
  }
  getArea() {
    return (this.width * this.height) / 2;
  }
  getInfo() {
    return `Triangle with base ${this.width} and height ${this.height}.`;
  }
}
class Trapezium extends Shape {
  constructor(base1, base2, height) {
    super("Trapezium");
    this.base1 = base1;
    this.base2 = base2;
    this.height = height;
  }
  getArea() {
    return ((this.base1 + this.base2) * this.height) / 2;
  }

  getInfo() {
    return `Trapezium with base1 ${this.base1}, base2 ${this.base2}, and height ${this.height}.`;
  }
}

class Circle extends Shape {
  constructor(radius) {
    super("Circle");
    this.radius = radius;
  }
  getArea() {
    return this.radius * this.radius * Math.PI.toFixed(2);
  }
  getInfo() {
    return `Circle with radius ${this.radius}.`;
  }
}

const square = new Square(5);
const triangle = new Triangle(4, 3);
const trapezium = new Trapezium(4, 6, 5);
const circle = new Circle(3);

//미션1. 넓이 구하기 함수 추가 (getArea())
// 미션2. 객체들의 정보 출력  (getInfo())
//     - 나는 어떤 도형인가??
//     - 나는 어떤 속성을 갖고 있는가??
console.log(square.getInfo(), "Area:", square.getArea()); // 출력: Square with side length 5. Area: 25
console.log(triangle.getInfo(), "Area:", triangle.getArea()); // 출력: Triangle with base 4 and height 3. Area: 6
console.log(trapezium.getInfo(), "Area:", trapezium.getArea()); // 출력: Trapezium with base1 4, base2 6, and height 5. Area: 25
console.log(circle.getInfo(), "Area:", circle.getArea()); // 출력: Circle with radius 3. Area: 28.27

// 미션3. 이 객체를 출력해서 원하는 스트링 얻기
console.log(`${square}`); // 출력: Square - Area: 25.00 m²
console.log(`${triangle}`); // 출력: Triangle - Area: 6.00 m²
console.log(`${trapezium}`); // 출력: Trapezium - Area: 25.00 m²
console.log(`${circle}`); // 출력: Circle - Area: 28.27 m²
