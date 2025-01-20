import readlineSync from "readline-sync";
// 애초에 동기 라이브러리 사용

class GuessNumberGame {
  private targetNumber: number;
  private attempts: number;
  private maxAttempts: number;
  // private로 변경 불가하게 만듦.
  // 초기 선언시 값 그대로 사용해야함.

  constructor(maxAttempts: number = 10) {
    this.targetNumber = Math.floor(Math.random() * 100) + 1;
    this.attempts = 0;
    this.maxAttempts = maxAttempts;
  }

  private getFeedback(guess: number): string {
    if (guess < this.targetNumber) return "Too Low!";
    if (guess > this.targetNumber) return "Too High!";
    return "Correct!";
  }

  public play(): void {
    console.log("안녕하세요, 숫자 맞추기 게임에 오신 것을 환영합니다.");
    console.log(`최대 ${this.maxAttempts} 까지 1~100 까지의 숫자를 맞출 기회가 주어집니다.`);

    while (this.attempts < this.maxAttempts) {
      const input = readlineSync.questionInt(`Trial ${this.attempts + 1}: GuessNumber?`);

      this.attempts++;

      const feedback = this.getFeedback(input);

      if (feedback === "Correct!") {
        console.log(`Correct! ${this.attempts}/${this.maxAttempts} 번만에 맞췄습니다.`);
        return;
      } else {
        console.log(`Wrong: ${feedback}`);
      }
    }
    console.log(`최대 시도 횟수 ${this.maxAttempts}가 초과하였습니다. 안녕~~~`);
  }
}

// 객체 지향 설계

const myGame = new GuessNumberGame();
myGame.play();
