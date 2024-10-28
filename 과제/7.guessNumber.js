const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let ranNum = Math.floor(Math.random() * 100);
let tryNum = 0;

const question = rl.question("1부터 100 사이의 숫자를 맞춰보세요: ");
while (1) {
  tryNum++;
  if (input < ranNum) {
    console.log("더 큰 숫자입니다.");
  } else if (input > ranNum) {
    console.log("더 작은 숫자입니다.");
  } else {
    console.log(`정답입니다! ${tryNum}번만에 맞췄습니다.`);
    rl.close();
    return;
  }
}

question();

// const question = () => {
//   rl.question("1부터 100 사이의 숫자를 맞춰보세요: ", (input) => {
//     tryNum++;
//     if (input < ranNum) {
//       console.log("더 큰 숫자입니다.");
//       question();
//     } else if (input > ranNum) {
//       console.log("더 작은 숫자입니다.");
//       question();
//     } else {
//       console.log(`정답입니다! ${tryNum}번 만에 맞췄습니다.`);
//       rl.close();
//       return;
//     }
//   });
// };
