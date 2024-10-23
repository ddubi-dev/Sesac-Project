// 필요한 곳에 try-catch

const scores = [85, 90, 78, 88, "invalid"];
let sum = 0;
let validNum = 0;

try {
  for (let i = 0; i < scores.length; i++) {
    if (typeof scores[i] !== "number") {
      throw new Error(
        `${i}번째 값이 ${scores[i]}로 숫자가 아닌 값이 입력되었습니다.`
      );
    }
    sum += scores[i];
    validNum++;
  }
  console.log("합산은 ", sum);

  const average = sum / validNum;

  if (average >= 80) {
    console.log("합격");
  } else {
    console.log("불합격");
  }

  console.log("평균은 ", average);
} catch (e) {
  console.log(e.message);
}
