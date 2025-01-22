import { User, users } from "./interfaces/user";

function addUser(name: string, email: string): void {
  const newUser: User = { id: Date.now(), name, email };
  users.push(newUser);
  console.log("User added: ", newUser);
}

function listUsers(): void {
  console.log("Current users: ", users);
}

addUser("Alice", "alice@example.com");
addUser("Bob", "bob@example.com");
// listUser();

const myUsers: User[] = listUsers();
// 라우터를 만들어서 사용자에 대한 CRUD 를 하도록
