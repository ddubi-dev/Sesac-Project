// 1
function leftTriangle(n) {
  let star = "";
  for (let row = 1; row <= n; row++) {
    star = "*".repeat(i);
    console.log(star);
  }
}

// 2
function rightTriangle(n) {
  let star = "";
  for (let i = n; i >= 1; i--) {
    star = "*".repeat(i);
    console.log(star);
  }
}

// 3
function leftInvertTriangle(n) {
  for (let row = 1; row <= n; row++) {
    let space = " ".repeat(n - row); // space
    let star = "*".repeat(row); // star
    console.log(space + star);
    star++;
  }
}

// 4
function rightInvertTriangle(n) {
  for (let row = 0; row < n; row++) {
    let star = "*".repeat(n - row);
    let space = " ".repeat(row);
    console.log(space + star);
  }
}

function equalTriangle(n) {
  let maxStar = 1 + (n - 1) * 2;

  for (let row = 1; row <= n; row++) {
    let shape = "";
    totalStar = 1 + (row - 1) * 2;
    let space = (maxStar - totalStar) / 2;
    //space
    for (let i = 0; i < space; i++) {
      shape += " ";
    }
    //star
    for (let j = 0; j < totalStar; j++) {
      shape += "*";
    }

    //space
    for (let i = 0; i < space; i++) {
      shape += " ";
    }

    console.log(shape);
  }
}

function equalInvertTriangle(n) {
  let maxStar = 1 + (n - 1) * 2;
  let totalStar = maxStar;

  for (let row = 1; row <= n; row++) {
    let shape = "";
    totalStar -= 2;

    let space = (maxStar - totalStar) / 2;
    //space
    for (let i = 0; i < space; i++) {
      shape += " ";
    }
    //star
    for (let j = 0; j < totalStar; j++) {
      shape += "*";
    }

    //space
    for (let i = 0; i < space; i++) {
      shape += " ";
    }

    console.log(shape);
  }
}

function heart(n) {
  // 상
  let maxStar = 2 * n + 1;

  for (let row = 1; row <= n; row++) {
    let shape = "";
    totalStar = 1 + (row - 1) * 2;
    let space = (maxStar - totalStar) / 2;
    //space
    for (let i = 0; i < space; i++) {
      shape += " ";
    }
    //star
    for (let j = 0; j < totalStar; j++) {
      shape += "*";
    }
    //space
    for (let i = 0; i < space; i++) {
      shape += " ";
    }
    //space
    for (let i = 0; i < space; i++) {
      shape += " ";
    }
    //star
    for (let j = 0; j < totalStar; j++) {
      shape += "*";
    }
    //space
    for (let i = 0; i < space; i++) {
      shape += " ";
    }
    console.log(shape);
  }

  // 중
  let middleStar = 2 * maxStar;
  shape = "*".repeat(middleStar);
  console.log(shape);

  // 하
  totalStar = middleStar - 1;

  for (let row = 1; row <= n; row++) {
    let shape = "";
    totalStar -= 4;

    let space = (middleStar - totalStar) / 2;
    //space
    for (let i = 0; i < space; i++) {
      shape += " ";
    }
    //star
    for (let j = 0; j < totalStar; j++) {
      shape += "*";
    }

    //space
    for (let i = 0; i < space; i++) {
      shape += " ";
    }

    console.log(shape);
  }
}
