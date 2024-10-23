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

// Person 객체 생성 및 활용
const person1 = new Person("철수", 25, "남성");
person1.greet(); // "안녕, 나는 철수이고, 25살이야." 출력
person1.walk(); // "철수이(가) 걷고 있습니다." 출력
person1.eat(); // "철수이(가) 식사 중입니다." 출력

class Employee extends Person {
  constructor(name, age, gender, jobTitle, salary) {
    super(name, age, gender); // 상속 받은 부모의 변수로
    this.jobTitle = jobTitle;
    this.salary = salary;
  }

  displayInfo() {
    console.log(
      `직원 ${this.name}의 직위는 ${this.jobTitle}이며, 급여는 ${this.salary}원 입니다.`
    );
  }

  work() {
    console.log(`${this.name}이(가) 업무 중입니다.`);
  }
}

// Employee 객체 생성 및 활용
const employee1 = new Employee("영희", 30, "여성", "매니저", 50000);
employee1.greet(); // "안녕, 나는 영희이고, 30살이야." 출력
employee1.displayInfo(); // "직원 영희의 직위는 매니저이며, 급여는 50000원 입니다." 출력
employee1.work(); // "영희이(가) 업무 중입니다." 출력

// Person -> Employee -> Manager
// Person -> Student

console.log("------------------------------");

class Student extends Person {
  constructor(name, age, gender, studentId, major) {
    super(name, age, gender);
    this.studentId = studentId;
    this.major = major;
  }
  study() {
    console.log(
      `${this.name} 학생은 ${this.age} 이고, ${this.major}를 공부하고 있습니다.`
    );
  }
}

class Customer extends Person {
  constructor(name, age, gender, customerId, orderList) {
    super(name, age, gender);
    this.customerId = customerId;
    this.orderList = orderList;
  }

  placeOrder(product) {
    this.orderList.push(product);
    console.log(`${this.name} 고객이 ${product}를 주문하였습니다.`);
  }
  printOrderHistory() {
    console.log("<주문 목록>");
    this.orderList.forEach((list) => {
      console.log(`<li>${list}</li>`);
    });

    console.log(`주문내역 : ${this.orderList.join("<BR>")}`);

    // 변수명과 함수명이 동일하면 TypeError
  }
}

const student1 = new Student("지연", 20, "여성", "20200000", "컴퓨터공학");
student1.study();

const customer1 = new Customer("지민", 22, "여성", "C1001", ["커피", "라떼"]);
customer1.placeOrder("생크림케익");
customer1.placeOrder("밀크티");
customer1.printOrderHistory(); // 지금까지 주문한 메뉴 출력

const people = [student1, customer1, employee1];
introduce(people);

function introduce(people) {
  for (const person of people) {
    // 매우 많이 쓰이는 패턴
    person.greet();
  }

  for (let i = 0; i < people.length; i++) {
    people[i].walk(Math.floor(Math.random() * 10 + 1));
  }

  people.forEach((person) => {
    if (person instanceof Employee) {
      person.work();
    } else if (person instanceof Student) {
      person.study();
    }
  });
}
