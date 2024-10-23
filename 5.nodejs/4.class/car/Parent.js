const Person = require("./Person");

class Parent extends Person {
  constructor(name, age, gender) {
    super(name, age, gender);
  }
  driveCar(car) {
    console.log(`${this.name}은 ${car.model}을(를) 운전중입니다.`);
  }
}

module.exports = Parent;
