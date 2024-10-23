class Car {
  constructor(brand, model, color) {
    this.brand = brand;
    this.model = model;
    this.color = color;
  }

  start() {
    console.log(
      `${this.brand}의 ${this.color} ${this.model}이(가) 출발하였습니다.`
    );
  }
  stop() {
    console.log(
      `${this.brand}의 ${this.color} ${this.model}이(가) 멈추었습니다.`
    );
  }
  drive() {
    console.log(
      `${this.brand}의 ${this.color} ${this.model}이(가) 이동중입니다.`
    );
  }

  crash(car) {
    console.log(
      `${this.brand}의 ${this.color} ${this.model}이(가) ${car}와 사고가 났습니다.`
    );
  }
}

module.exports = Car;
