const Person = require("./Person"); //현재 파일에 있는 Person을 가져올거야

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

module.exports = Student;
