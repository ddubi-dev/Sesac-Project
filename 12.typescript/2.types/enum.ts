enum Direction {
  Up,
  Down,
  Left,
  Right,
}

// type을 받을 수 있는 변수
let move: Direction = Direction.Up;
console.log(`이동하는 방향은? ${Direction[move]}`);
