// array

const numbers = [1, 2, 3, 4, 5];
const fruits = ["사과", "배"];
const mixed = [1, "hello", true, null, { key: "value" }];

console.log(numbers[0]);
console.log("과일 몇개?", fruits.length);
console.log(fruits[fruits.length - 1]);

fruits[1] = "망고";
fruits[2] = "망고스틴";
console.log("과일 몇개?", fruits.length);

//---------------------------------------------

// 1)
// 배열 순회
for (i = 0; i < 10; i++) {
  console.log(`${i}`);
}

// 2)
// 순회하면서 무엇을 할거야? callback함수
function print_fruit(fruit) {
  console.log(fruit);
}
fruits.forEach(print_fruit);

// 3)
// 익명함수 빌트인(화살표 함수)
// 최근에 많이 사용됨
fruits.forEach((fruit) => {
  console.log(fruit);
});

//--------------push, pop------------------

console.log("현재: ", numbers);
numbers.push(1);
console.log("push후: ", numbers);
let i1 = numbers.pop();
console.log("pop 후: ", numbers);
console.log(i1);

//--------------slice, splice------------------

// slice는 원본을 건드르지 않음. 복제본을 생성.
const slicedArray = fruits.slice(1, 3); // [1]부터 [3]전까지(1~2)
console.log(slicedArray);
console.log(fruits);

const slicedNum = numbers.slice(1, 3); // [1]부터 [3]전까지(1~2)
console.log(slicedNum);
console.log(numbers);

// splice는 원본을 건드림.
const removedElement = numbers.splice(1, 2);
console.log(removedElement);
console.log(numbers);

//-----------------배열 합치기, concat------------------
const array1 = [1, 2, 3];
const array2 = [4, 5, 6];
const array3 = [7, 8, 9];

const mergedArray = array1.concat(array3, array3); // 복제본 생성
console.log(array1);
console.log(array1);
console.log(array2);
console.log(mergedArray);

const mergedArrayWithSpread = [...array1, ...array2];
console.log(mergedArrayWithSpread);

const originalArray = [1, 2, 3];
const elementsToInsert = [4, 5, 6];

originalArray.splice(1, 2, ...elementsToInsert); // XXXX, 1번 인덱스부터 2개를 삭제후, 중간에 삽입
console.log(originalArray);

//-----------------배열 합치기, concat------------------
