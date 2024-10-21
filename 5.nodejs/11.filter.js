// .filter(함수) -> filter에서 true를 반환하는 요소를 넘김

const numbers = [10, 15, 20, 25, 30];

function aboveTwentyCondition(n) {
  if (n > 20) {
    return true;
  } else {
    return false;
  }
}

function belowTwentyCondition(n) {
  if (n < 20) {
    return true;
  } else {
    return false;
  }
}

// const aboveTwenty = numbers.filter(aboveTwentyCondition); //조건에 해당하는 것을 넘김
// console.log(aboveTwenty);

// const belowTwenty = numbers.filter(belowTwentyCondition); //조건에 해당하는 것을 넘김
// console.log(belowTwenty);

//----------초과,미만----------
const aboveTwenty = numbers.filter((n) => n > 20); // 삼항연산자
const belowTwenty = numbers.filter((n) => n < 20);
console.log(aboveTwenty);
console.log(belowTwenty);

//----------홀,짝----------
const evenNumbers = numbers.filter((n) => n % 2 == 0);
const oddNumbers = numbers.filter((n) => n % 2 != 0);
console.log(evenNumbers);
console.log(oddNumbers);

//----------a 찾기----------
const words = ["apple", "banana", "grape", "blueberry", "avocado"];
const containsA = words.filter(containLetter); // a라는 글자를 포함한 것 담기

function containLetter(word) {
  for (let i = 0; i < word.length; i++) {
    if (word[i] == "a") {
      return true;
    }
  }
  return false;
}

// 빌트인 함수
const containsA2 = words.filter((word) => word.includes("a"));
const containsA3 = words.filter((word) => word.startsWith("a")); // 시작하는 거

console.log(containsA);
console.log(containsA2);
console.log(containsA3);

//----------객체 배열에서 무언가 꺼내기----------
const people = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 33 },
  { name: "Charlie", age: 31 },
  { name: "David", age: 39 },
];

const adults = people.filter((person) => person.age >= 30);
console.log(adults);

const people2 = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 33 },
  { name: "Charlie" },
  { name: "David", age: 39 },
];

const unknownAge = people2.filter((p) => p.age == null); // obj 안에 어떤 속성이 있는지 알아야 함! - mdn object
const unknownAge2 = people2.filter((p) => !p.hasOwnProperty("age"));
console.log(unknownAge);
console.log(unknownAge2);
