class GenericCalculator {
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

class EngineeringCalculator extends GenericCalculator {
  // 추가적인 공학용 계산기 기능 구현
  exponential(num1, num2) {
    return num1 ** num2;
  }
  logarithm(num1, num2) {
    return log(num2) / log(num1);
  }

  calculate(num1, operator, num2) {
    switch (operator) {
      case "+":
        return this.add(num1, num2);
      case "-":
        return this.sub(num1, num2);
      case "*":
        return this.mul(num1, num2);
      case "/":
        return this.div(num1, num2);
      case "**":
        return this.exponential(num1, num2);
      case "log":
        return this.logarithm(num1, num2);
      default:
        return "Invalid operator";
    }
  }
}

class StandardCalculator extends GenericCalculator {
  // 제곱근, 반올림 등등...
}

class ProgrammerCalculator extends GenericCalculator {
  // 비트 연산, 논리 연산 등등...
}

class UserInput {
  constructor() {
    this.calculator;
    this.readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  getCalculator() {
    console.log("시작1");

    console.log("계산기 모드를 선택하세요.");
    console.log("1. 공학용 계산기");
    console.log("2. 일반 계산기");
    console.log("3. 프로그래머 계산기");

    this.readline.question(">>>", (num) => {
      switch (num) {
        case "1":
          this.calculator = new EngineeringCalculator();
          this.getUserInput(this.calculator);
          break;
        case "2":
          this.calculator = new StandardCalculator();
          this.getUserInput(this.calculator);
          break;
        case "3":
          this.calculator = new ProgrammerCalculator();
          this.getUserInput(this.calculator);
          break;
        default:
          "Invalid value";
          break;
      }
    });
  }

  getUserInput() {
    console.log("시작");
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
    this.getCalculator();
  }
}

// const calculator = new GenericCalculator();
const userInput = new UserInput();

userInput.start();
