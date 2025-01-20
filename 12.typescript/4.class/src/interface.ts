// Person에 대한 인터페이스 정의 (데이터 속성과 타입)
interface Person2 {
  name: string;
  age: number;
  isEmployed: boolean;
}

// 변수 타입 강제화
const alice: Person2 = {
  name: "Alice",
  age: 30,
  isEmployed: true,
};

console.log(`Name: ${alice.name}, age:${alice.age}`);

interface Product {
  id: number; // 필수, 읽기 전용 (변경 불가)
  name: string; // 필수
  price?: number; // 선택
}

const laptop: Product = {
  id: 1,
  name: "Levono",
  // price 아직 미정
};

console.log(`상품 ID: ${laptop.id}, name: ${laptop.name}, price: ${laptop.price}`);
laptop.name = "Lenovo A5";
laptop.price = 1000;

// laptop.id = 2; // 불가
console.log(`상품 ID: ${laptop.id}, name: ${laptop.name}, price: ${laptop.price}`);
