let person = {
  name: "John",
  age: 25,
  greet: function () {
    console.log("안녕하세요, 저는 " + this.name + " 입니다.");
  },
};

console.log("사람 이름은 : ", person.name);
person.greet();
person.name = "Tom";
person.greet();
