class Person {
  constructor(name, age, gender) {
    this.name = name;
    this.age = age;
    this.gender = gender;
  }

  greet() {
    console.log(`안녕, 나는 ${this.name}이고, ${this.age}살이야.`);
  }

  walk(distance) {
    console.log(`${this.name}이(가) ${distance}미터 걷고 있습니다.`);
  }

  eat() {
    console.log(`${this.name}이(가) 식사 중입니다.`);
  }

  // 기타 메서드: 일하기, 취미 활동, 특정한 행동 등을 추가할 수 있습니다.
}

module.exports = Person;
