function gugudan() {
  for (let i = 2; i < 10; i++) {
    console.log(`=== ${i}단 ===`);
    for (let j = 1; j < 10; j++) {
      console.log(`${i} * ${j} = ${i * j}`);
    }
    console.log();
  }
}

function gugudan_n(dan) {
  console.log(`=== ${dan}단 ===`);
  for (let j = 1; j < 10; j++) {
    console.log(`${i} * ${j} = ${i * j}`);
  }
  console.log();
}

gugudan();
