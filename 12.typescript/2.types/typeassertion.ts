let someValue: any = "Hello, TypeScript";
let stringLength: number = (someValue as string).length;
console.log(`문자열 길이는: ${stringLength}`);

// angle bracket <> 문법 = jsx 문법이랑 겹침... 그래서 react 같은 데서는 비추
// 백엔드 개발자라면 ok
let stringLength2: number = (<string>someValue).length;
console.log(`문자열 길이는: ${stringLength2}`);
