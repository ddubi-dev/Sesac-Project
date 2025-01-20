type Feedback = "Too Low!" | "Too High!" | "Correct!";

const FEEDBACK_MESSAGE: Record<Feedback, string> = {
  "Too Low!": "숫자가 너무 작아요",
  "Too High!": "숫자가 너무 커요",
  "Correct!": "정답입니다.",
};

type statusType = "success" | "error" | "loading";
const statusMessage: Record<statusType, string> = {
  success: "성공",
  error: "실패",
  loading: "로딩중",
};

const userPermission: Record<number, string> = {
  1: "admin",
  2: "editor",
  3: "viewer",
};

function guessNumber(target: number, guess: number): "Too Low!" | "Too High!" | "Correct!" {
  // 리터럴을 통한 강력한 ...
  // function guessNumber(target: number, guess: number): string {
  if (guess < target) return "Too Low!";
  if (guess > target) return "Too High!";

  return "Correct!";
}

const targetNumber: number = Math.floor(Math.random() * 100) + 1; // 1~100 까지의 숫자 생성
console.log(`Target Number: ${targetNumber}`);

const userGuess = 50;
console.log(guessNumber(targetNumber, userGuess));

const feedback: Feedback = guessNumber(targetNumber, userGuess);
console.log(FEEDBACK_MESSAGE[feedback]);
