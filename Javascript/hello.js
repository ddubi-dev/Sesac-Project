console.log("hello");

let score = 80;

if (score >= 90) {
  console.log("A");
} else if (score >= 80) {
  console.log("B");
} else {
  console.log("C");
}

// 익명함수
let sum2 = function (a, b) {
  return a + b;
};

// Arrow 함수
let sum3 = (a, b) => {
  return a + b;
};

let sum4 = (a, b) => a + b;
