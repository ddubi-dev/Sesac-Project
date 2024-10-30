console.log("1. 타이머를 통한 비동기처리");

function setTimeoutSync(message, delay) {
  return new Promise((resolve) => {
    //  지연 처리할 작업을 담아놓는 공간
    setTimeout(() => {
      console.log(message);
      resolve();
    }, delay);
  });
}

// const result = setTimeoutSync("(1. 첫번째 작업: 1초 후 실행", 1000);
// console.log(result); // 대기 pending, 이행 fulfilled(성공 완료), 거부 rejected(실패 완료)

// setTimeoutSync("(1. 첫번째 작업: 1초 후 실행", 1000); 1초 후
// setTimeoutSync("(2. 두번째 작업: 2초 후 실행", 2000); 2초 후
// setTimeoutSync("(3. 세번째 작업: 3초 후 실행", 3000); 3초 후

// Promise
setTimeoutPromise("1. 첫번째 작업: 1초 후 실행", 1000) // 1초 후
  .then(() => setTimeoutPromise("2. 두번째 작업: 2초 후 실행", 2000)) // 3초 후
  .then(() => setTimeoutPromise("3. 세번째 작업: 3초 후 실행", 3000)) // 6초 후
  .then(() => {
    console.log("4. 모든 작업이 완료되었습니다.");
  });

// async, await
async function executeTask() {
  await setTimeoutSync("1. 첫번째 작업: 1초 후 실행", 1000);
  await setTimeoutSync("2. 두번째 작업: 2초 후 실행", 2000);
  await setTimeoutSync("3. 세번째 작업: 3초 후 실행", 3000);
  console.log("4. 작업이 완료되었습니다.");
}

executeTask();
