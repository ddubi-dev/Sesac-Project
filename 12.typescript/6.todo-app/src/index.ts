import { Todo } from "./todo";

const todo: Todo[] = [];
let currentId: number = 1;

function addTodo(id: number, title: string): void {
  const newTodo = { id: currentId++, title, completed: false }; // 객체 구조 설정
  todo.push(newTodo);
  console.log("Todo add: ", newTodo);
}

addTodo(1, "자바스크립트 공부");
addTodo(2, "타입스크립트 공부");
addTodo(3, "잠자기");

console.log("Todos: ", todo);
