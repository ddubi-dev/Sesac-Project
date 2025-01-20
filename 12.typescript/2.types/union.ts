let id: number | string;

id = 123; // 숫자 할당
console.log(`아이디는: ${id}`);

id = "ABC"; // 문자열 할당
console.log(`아이디는: ${id}`);

// literal type
let direction: "left" | "right" | "up" | "down";

direction = "left"; // 위의 값 중에서만 넣을 수 있음(지정)
console.log(`Direction: ${direction}`);
