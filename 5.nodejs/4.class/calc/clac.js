// 사용자로부터 입력 받음
const readline = require("readline").createInterface({
  // 외부함수임, npm install
  input: process.stdin,
  output: process.stdout,
});

const add = (num1, num2) => {
  return num1 + num2;
};
const sub = (num1, num2) => {
  return num1 - num2;
};
const mul = (num1, num2) => {
  return num1 * num2;
};
const div = (num1, num2) => {
  return num1 / num2;
};

const calculator = (num1, operator, num2) => {
  // const q = `${num1} ${operator} ${num2}`;
  // return eval(q);

  switch (operator) {
    case "+":
      return add(num1, num2);
    case "-":
      return sub(num1, num2);
    case "*":
      return mul(num1, num2);
    case "/":
      return div(num1, num2);
    default:
      return "Invalid operator";
  }
};

readline.question("첫번째 숫자를 입력하시오: ", (num1) => {
  readline.question("연산자를 입력하시오 (+,-,*,/): ", (operator) => {
    readline.question("두번째 숫자를 입력하시오: ", (num2) => {
      num1 = parseInt(num1);
      num2 = parseInt(num2);
      const result = calculator(num1, operator, num2);
      console.log("결과는", result);
      readline.close();
    });
  });
});
