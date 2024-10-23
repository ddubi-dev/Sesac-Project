const Car = require("./car");

class SUV extends Car {
  constructor(brand, model, color, offRoad) {
    super(brand, model, color);
    this.offRoad = offRoad;
  }
  offRoad() {
    console.log(`${this.model}는 ${this.offRoad} 주행에 적합합니다.`);
  }
}

module.exports = SUV;
