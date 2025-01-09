const numbers = [2, 3, 5, 4, 1];
console.log(numbers);

numbers.sort((a, b) => a - b);
console.log(numbers);
// 0: 같다, -1: b가 크다, 1: a가 크다

const fruits = ["banana", "apple", "orange", "342", "018", "사과", "바나나"];
console.log(fruits);

fruits.sort((a, b) => a.localeCompare(b.localeCompare)); // 문자열을 비교하는 함수
// fruits.sort((a, b) => (a > b ? 1 : -1));
console.log(fruits);
