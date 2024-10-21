// add
function add(a, b) {
  return a + b;
}

let add2 = (a, b) => a + b;

// sub
function sub(a, b) {
  return a - b;
}

let sub2 = (a, b) => a - b;

// mul
function mul(a, b) {
  return a * b;
}

let mul2 = (a, b) => a * b;

// division
function div(a, b) {
  if (b == 0) {
    console.log("분모는 0일 수 없습니다.");
  } else {
    return a / b;
  }
}

let div2 = (a, b) => a / b;

console.log(div2(6, 3));
