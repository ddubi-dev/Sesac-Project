const myPromise = new Promise((resolve, reject) => {
  // 비동기 작업을 수행하는데
  // 성공하면 resolve()를 호출해줌
  // 실패하면 reject()를 호출해줌
});

myPromise
  .then((result) => {
    // 성공 했을 때의 코드
  })
  .catch((error) => {
    // 실패 했을 때의 코드
  });
