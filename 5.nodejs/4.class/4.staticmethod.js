// static method
class MathOperations {
  static add(x, y) {
    return x + y;
  }

  static sub(x, y) {
    return x - y;
  }
}
console.log(MathOperations.add(2, 3));
console.log(MathOperations.sub(2, 3));

// const sum = new MathOperations(); // instantiation -> 객체 생성, 실체화
// initialization -> 초기화

// 객체지향을 사용하는 궁극적인 목적 : '상속'
