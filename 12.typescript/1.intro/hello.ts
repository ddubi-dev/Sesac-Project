// 각각의 인자와 리턴 "타입"을 정의해줌
// 타입 지정 안할거면 js 랑 동일함
function add(a: number, b: number): number {
  return a + b;
}
const sum = add(5, 10);

console.log(`hello, typescript, sum: ${sum}`);
