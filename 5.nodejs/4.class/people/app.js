const Employee = require("./Employee");
const Student = require("./Student");

const employee = new Employee("철수", 20, "남자", "사원", 20000);
const student = new Student("영희", 23, "여자", "20200000", "법학");

employee.greet();
student.greet();
