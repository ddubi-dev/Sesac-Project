document.addEventListener("DOMContentLoaded", function () {
  // 미션1)
  // 1. 랜덤 숫자를 1~100까지 생성
  let randomNumber = (Math.floor(Math.random() * 100) + 1) % 101;
  console.log(randomNumber);

  // 2. Guess 버튼을 통해 입력한 숫자와 내 숫자가 맞는지 비교
  const button = document.getElementById("guessButton");

  button.addEventListener("click", checkNum);

  function checkNum() {
    const historyList = document.getElementById("historyList");

    const input = document.getElementById("guessNumber").value; //이때 받아오게 해야함
    const result = document.getElementById("result");
    console.log(input);

    if (parseInt(input, 10) == randomNumber) {
      result.innerHTML = "<b>Correct</b>";
      // result.textContent = "Correct";
      randomNumber = (Math.floor(Math.random() * 100) + 1) % 101;
    } else if (parseInt(input, 10) > randomNumber) {
      result.innerHTML = "<b>Too High</b>";
    } else if (parseInt(input, 10) < randomNumber) {
      result.innerHTML = "<b>Too Low</b>";
    }

    // 삼항 연산자
    //   result.innerHTML =
    //     parseInt(input, 10) < randomNumber
    //       ? "Too Low"
    //       : parseInt(input, 10) > randomNumber
    //       ? "Too High"
    //       : "Correct";

    // 미션2)
    // 3. 입력한 값들의 로그를 출력하기
    const listItem = document.createElement("li");
    listItem.textContent = `예측숫자:${input}`;
    historyList.appendChild(listItem);
  }
});
