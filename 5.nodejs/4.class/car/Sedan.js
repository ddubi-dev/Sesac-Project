const Car = require("./car");

class Sedan extends Car {
  constructor(brand, model, color, trunk, price) {
    super(brand, model, color);
    this.trunk = trunk;
    this.price = price;
  }

  openTrunk() {
    console.log(
      `${this.brand}의 ${this.color} ${this.model}의 트렁크가 열렸습니다.`
    );
  }
  checkTrunk() {
    console.log(
      `${this.brand}의 ${this.color} ${this.model}의 트렁크에 ${this.trunk}가 담겨있습니다.`
    );
  }
}

module.exports = Sedan;
