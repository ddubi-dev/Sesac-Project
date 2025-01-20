let username: string = "John";
console.log(`Username: ${username}`);

let age: number = 30;
console.log(`age: ${age}`);

let isAdmin: boolean = true;
console.log(`관리자임?: ${isAdmin}`);

let unknownValue: any = "아무거나";
unknownValue = 5;
unknownValue = true;
console.log(`아무 타입: ${unknownValue}`);

// 실무적으로 쓸 일 없음
let undefinedValue: undefined = undefined;
// undefinedValue = 1 ; // 불가
// 해당 타입만 넣을 수 있음
console.log(`Undefined value: ${undefinedValue}`);

let nullValue: null = null;
// nullValue = undefined; // null <-> undefined (O)
console.log(`Null Value: ${nullValue}`);

// 타입 지정을 안하면? 최초 지정시 자동 할당 (null 예외)
let notype = 1;
// let notype = null; // 이건 됨
// notype = "a";
