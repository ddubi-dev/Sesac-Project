class Animal {
  constructor(name) {
    this.name = name;
  }

  makeSound() {
    return "동물 소리";
  }

  walk() {
    return `${this.name}는 걷는중`;
  }
}

class Dog extends Animal {
  makeSound() {
    return "멍멍";
  }

  walk() {
    return `${this.name}는 폴짝폴짝 걷는중`;
  }
}

const myDog = new Dog("멍멍이");
console.log(myDog.makeSound());
console.log(myDog.walk());
