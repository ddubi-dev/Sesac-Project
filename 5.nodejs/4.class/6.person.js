class Person {
  constructor(name, age, gender) {
    this.name = name;
    this.age = age;
    this.gender = gender;
  }

  greet(name) {
    if (name) {
      console.log(`안녕 ${name}님, 나는 ${this.name}이고, ${this.age}살이야.`);
    } else {
      console.log(`안녕, 나는 ${this.name}이고, ${this.age}살이야.`);
    }
  }
  walk(distance) {
    try {
      if (distance) {
        console.log(`${this.name}가 ${distance}미터를 걷고 있습니다.`);
      } else {
        throw new Error("미터 입력이 필요합니다.");
      }
    } catch (e) {
      console.log(e.message);
    }
  }
  eat() {
    console.log(`${this.name}이(가) 식사 중입니다.`);
  }
}

const person1 = new Person("철수", 25, "남성");
person1.greet("길동");
person1.walk();
person1.eat();

class Employee extends Person {
  constructor(name, age, gender, jobTitle, salary) {
    super(name, age, gender); // 자식에 만들지 않고, 부모에 변수 값 넣음
    this.jobTitle = jobTitle; // 추가사항
    this.salary = salary;
  }

  displayInfo() {
    console.log(
      `직원 ${this.name}의 직위는 ${this.jobTitle}이며, 급여는 ${this.salary}원입니다.`
    );
  }
  work() {
    console.log(`${this.name}이(가) 업무 중입니다.`);
  }
}

const employee1 = new Employee("영희", 30, "여성", "매니저", 50000);
employee1.greet();
employee1.displayInfo();
employee1.walk();
employee1.work();

console.log("직원1이 직원 객체인가요?", employee1 instanceof Employee);
console.log("직원1이 사람인가요?", employee1 instanceof Person);
console.log("직원1이 객체인가요?", employee1 instanceof Object);
console.log("직원1이 객체인가요?", person1 instanceof Employee); //false
console.log("직원1이 객체인가요?", person1 instanceof Person); //true

console.log("직원1이라는 변수는?", typeof employee1);
console.log("사람1이라는 변수는?", typeof person1);

class Manager extends Employee {
  constructor(name, age, gender, jobTitle, salary, team) {
    super(name, age, gender, jobTitle, salary);
    this.team = team;
  }

  assignTask() {
    console.log(
      `${this.name} 매니저가 ${this.team}에 업무를 배분하고 있습니다.`
    );
  }
}

const manager1 = new Manager("수현", 35, "남성", "팀장", 60000, "개발");
manager1.assignTask();
