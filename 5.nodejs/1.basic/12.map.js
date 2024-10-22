// map 은 배열의 멤버에게 공통적으로 원하는 함수 내용을 적용할 때
// filter: 요소 하나하나 가져와 검색하는 함수(true, false)

const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((n) => n * 2); // 각각의 개별 멤버에 이 함수가 적용됨
console.log(doubled);

function double(n) {
  return n * 2;
}
//numbers.map(double);

const people = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 33 },
  { name: "Charlie", age: 40 },
  { name: "David", age: 39 },
];

const names = people.map((p) => p.name);
const ages = people.map((p) => p.age);
console.log(names);
console.log(ages);

// 퀴즈1
const fruits = ["apple", "banana", "grape"];
const htmlTags = fruits.map((fruit) => `<li>${fruit}</li>`);
console.log(htmlTags);

// 퀴즈2
const apiData = [
  { id: 1, firstName: "John", lastName: "Doe" },
  { id: 2, firstName: "Jane", lastName: "Smith" },
];

const fullName = apiData.map((p) => `${p.firstName} ${p.lastName}`);
console.log(fullName);
