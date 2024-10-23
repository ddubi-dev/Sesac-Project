function leftTriangleT(n) {
  let row = 5;
  let currentRow = 1;
  while (currentRow <= row) {
    let stars = "";
    let starCount = 1;
    while (starCount <= currentRow) {
      star += "*";
      starCount++;
    }
    console.log("*");
    currentRow++;
  }
}

function rightTriangle(n) {
  let row = 5;
  let currentRow = 1;
  while (currentRow <= row) {
    let stars = "";
    let starCount = 1;
    while (starCount <= currentRow) {
      star += "*";
      starCount++;
    }
    console.log("*");
    currentRow++;
  }
}

// -------------------------------------------------------------------------------------

function leftTriangle(n) {
  let star = "";
  for (let i = 1; i <= 5; i++) {
    star += "*";
    console.log(star);
  }
}

function rightTriangle(n) {
  let star = "";
  let row = n;
  let currentRow = 1;

  //   for (let i = n; i > 0; i--) {
  //     star = "*".repeat(i);
  //     console.log(star);
  //   }
  // n개의 줄
  // max -> min
  //   for(;currentRow<n;currentRow++){
  //     for()

  //   }
  for (; row > 0; row--) {
    for (; row > 0; row--) {
      star += "*";
    }
    console.log(star);
  }
}

function leftInvertTriangle(n) {
  let star = 1;
  for (; star <= n; star++) {
    let shape = "";
    let space = n - star;
    for (let i = 0; i < space; i++) {
      shape += " ";
    }
    for (let j = 0; j < star; j++) {
      shape += "*";
    }
    console.log(shape);
  }
}

function rightInvertTriangle(n) {
  let star = n;
  for (; star >= 1; star--) {
    let shape = "";
    let space = n - star;
    for (let i = 0; i < space; i++) {
      shape += " ";
    }
    for (let j = 0; j < star; j++) {
      shape += "*";
    }
    console.log(shape);
  }
}

function equalTriangle(n) {
  maxStar = 1 + (n - 1) * 2;

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
