// console.log("원하는 작업을 선택하세요:");
// console.log(`=> 현재 잔액은 ${}원입니다.`);
// console.log(`=> 잔액이 부족합니다.`);
// console.log(`${}원이 입금되었습니다.`);
// console.log(`${}원이 인출되었습니다.`);
// console.log(`ATM을 종료합니다.`);

import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = rl.question("원하는 작업을 선택하세요: ");

const ATM = () => {
  console.log("ATM 메뉴:");
  console.log("1. 잔액 확인");
  console.log("2. 입금");
  console.log("입금할 금액을 입력하세요 : ");
  console.log("3. 인출");
  console.log("인출할 금액을 입력하세요 : ");
  console.log("4. 종료");
  question();
};
