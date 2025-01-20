class Animal {
  // 변수의 스코프
  // 컴파일 타임에 체크, readonlu-수정 불가
  // public: 다 접근 가능
  // private : 외부에서 접근 시도 불가능
  // protected : 상속받은 클래스 내에서 사용 가능
  // constructor(private readonly name: string) {} // 위에 선언 안하고 this.name = name 안해도 자동
  constructor(public readonly name: string) {} // 위에 선언 안하고 this.name = name 안해도 자동

  makeSound() {
    // console.log(`${this.name} 동물 소리. 멍멍/냐옹냐옹`);
    console.log("동물 소리. 멍멍/냐옹냐옹");
  }
}

class Dog extends Animal {
  // 상속, dog는 animal 모든 속성을 가지고 확장됨.
  constructor(name: string, public readonly breed: string) {
    super(name);
  }

  makeSound() {
    console.log(`${this.name}(이)가 멍멍`);
  }
}

const dog = new Dog("새싹", "골든 리트리버");
console.log(`이름: ${dog.name}, 품종: ${dog.breed}`);
dog.makeSound();
// dog.name = "새싹이"; // 불가
