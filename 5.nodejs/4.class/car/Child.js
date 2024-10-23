const Person = require("./Person");

class Child extends Person {
  constructor(name, age, gender, grade) {
    super(name, age, gender);
    this.grade = grade;
  }

  playInCar() {
    console.log(`${this.name}은 차에서 놀고 있습니다.`);
  }
  sing() {
    console.log(`${this.name}은 차에서 노래를 부릅니다.`);
  }
}

module.exports = Child;
