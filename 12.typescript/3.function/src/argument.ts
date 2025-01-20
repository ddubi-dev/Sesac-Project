function greet(name: string = "Guest", greeting?: string): string {
  // 둘다 가변일 수 있지만.
  // 필수 인자를 무조건 앞으로 넣어야 함. 가변 인자는 뒤로.
  if (greeting) {
    return `${greeting}, ${name}!`;
  }
  return `Hello, ${name}!`;
}

console.log(greet("Alice", "안녕"));
console.log(greet("Alice", "Hi"));
console.log(greet("Alice"));
console.log(greet());

// 변수를 할당하며, 익명함수를 넣음
const greet2 = (name: string = "Guest", age?: number): string => {
  return age ? `안녕, 나는 ${name} 이고, ${age} 살이야` : `안녕, 나는 ${name} 이야.`;
};

console.log(greet2());
console.log(greet2("bob"));
console.log(greet2("bob", 22));
// console.log(greet2(22));
