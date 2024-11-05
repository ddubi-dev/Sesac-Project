import readline from "readline";

class Bank {
  constructor() {
    this.money = 0;
  }

  menu() {
    console.log("ATM 메뉴:");
    console.log("1. 잔액 확인");
    console.log("2. 입금");
    // console.log("입금할 금액을 입력하세요 : ");
    // console.log(`${}원이 입금되었습니다.`);
    console.log("3. 인출");
    // console.log("인출할 금액을 입력하세요 : ");
    // console.log(`${}원이 인출되었습니다.`);
    // console.log(`=> 잔액이 부족합니다.`);
    console.log("4. 종료");
    // console.log(`ATM을 종료합니다.`);
  }
}

// 루프
// 1. 메뉴 출력
// 2. 입력 받음
// 3. 입력에 따른 처리
// 4. 만약 4가 입력되었을시 종료

function menu() {
  console.log("ATM 메뉴:");
  console.log("1. 잔액 확인");
  console.log("2. 입금");
  // console.log("입금할 금액을 입력하세요 : ");
  // console.log(`${}원이 입금되었습니다.`);
  console.log("3. 인출");
  // console.log("인출할 금액을 입력하세요 : ");
  // console.log(`${}원이 인출되었습니다.`);
  // console.log(`=> 잔액이 부족합니다.`);
  console.log("4. 종료");
  // console.log(`ATM을 종료합니다.`);
}

menu();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let money = 0;

const question = rl.question("원하는 작업을 선택하세요: ", (input) => {
  switch (input) {
    case "1":
      console.log(`=> 현재 잔액은 ${money}원입니다.`);
      break;
    case "2":
      
      let 
      console.log("입금할 금액을 입력하세요 : ");
      console.log(`${}원이 입금되었습니다.`);
      break;
    case "3":
      break;
    case "4":
      return;
  }
});

// function menu()

// function checkBalance(){}
