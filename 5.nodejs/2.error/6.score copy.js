// const scores = [85, 90, 78, 88];
const scores = [85, 90, 78, 88, "invalid"];

let sum = 0;

for (let i = 0; i < scores.length; i++) {
  try {
    if (typeof scores[i] != "number") {
      throw new Error("숫자가 아닌 문자 발견!");
    }
    sum += scores[i];
  } catch (e) {
    console.log("발생한 오류는 ", e);
  }
}
console.log("합산은 ", sum);

const average = sum / scores.length;

if (average >= 80) {
  console.log("합격");
} else {
  console.log("불합격");
}

console.log("평균은 ", average);
