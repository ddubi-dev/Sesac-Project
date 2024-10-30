class Calculator {
  add(num1, num2) {
    return num1 + num2;
  }

  sub(num1, num2) {
    return num1 - num2;
  }

  mul(num1, num2) {
    return num1 * num2;
  }

  div(num1, num2) {
    return num1 / num2;
  }

  calculate(num1, operator, num2) {
    // const q = `${num1} ${operator} ${num2}`;
    // return eval(q);

    switch (operator) {
      case "+":
        return this.add(num1, num2);
      case "-":
        return this.sub(num1, num2);
      case "*":
        return this.mul(num1, num2);
      case "/":
        return this.div(num1, num2);
      default:
        return "Invalid operator";
    }
  }
}

class UserInput {
  constructor(calculator) {
    this.calculator = calculator;
    this.readline = require("readline").createInterface({
      // 사용자로부터 입력 받음
      // 외부함수임, npm install
      input: process.stdin,
      output: process.stdout,
    });
  }

  getUserInput() {
    this.readline.question("첫번째 숫자를 입력하시오: ", (num1) => {
      this.readline.question("연산자를 입력하시오 (+,-,*,/): ", (operator) => {
        this.readline.question("두번째 숫자를 입력하시오: ", (num2) => {
          num1 = parseInt(num1);
          num2 = parseInt(num2);
          const result = this.calculator.calculate(num1, operator, num2);
          console.log("결과는", result);
          this.readline.close();
        });
      });
    });
  }

  start() {
    this.getUserInput();
  }
}

const calculator = new Calculator();
const userInput = new UserInput(calculator);

userInput.start();
