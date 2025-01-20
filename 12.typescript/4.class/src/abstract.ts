abstract class Shape {
  abstract getArea(): number; // 이것을 상속 받은 클래스가 필수로 구현해야함.

  printArea() {
    console.log(`넓이: ${this.getArea()}`);
  }
}
// abstract : 필수 구현
// 오버라이드 : 해도 그만 안해도 그만. 상속 받은 것을 바꾸는 것

class Circle extends Shape {
  constructor(public radius: number) {
    super();
    // super : 나를 만들 때 부모도 그대로 만들어라.
  }

  // 추상 메소드를 필수로 구현해야함
  getArea(): number {
    return Math.PI * this.radius * this.radius;
  }
}

const circle = new Circle(10);
circle.printArea();
// public : 변경 가능

class Square extends Shape {
  constructor(private length: number) {
    super();
  }

  getArea(): number {
    return this.length * this.length;
  }
}

const square = new Square(10);
square.printArea();
// square.length = 20; // private: 변경 불가. 내부에서만 사용 가능.
