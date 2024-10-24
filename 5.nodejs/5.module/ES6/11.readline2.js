const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("구구단의 단을 입력하시오 : ", (input) => {
  if (typeof input != "number" || input > 9 || input < 1) {
    // throw new Error("숫자가 아닌 문자가 입력되었습니다.");
    console.log("올바른 입력값이 아닙니다.");
    rl.close(); // 입출력 처리 종료
    return;
  }
  console.log(`${input} 단을 입력하였습니다.`);

  for (let i = 1; i < 10; i++) {
    console.log(`${input} * ${i} = ${input * i}`);
  }

  rl.close(); // 입출력 처리 종료
});
