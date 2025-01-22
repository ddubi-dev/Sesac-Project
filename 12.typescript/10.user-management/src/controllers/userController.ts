import { User, users } from "../interfaces/user";

// API 서버(백엔드로 요청할 수 있는...프론트는 아직)
export class UserController {
  // CRUD 추가...
  static listUsers(): User[] {
    return users;
  }

  static addUser(name: string, email: string): User {
    const newUser: User = { id: Date.now(), name, email };
    users.push(newUser);
    return newUser;
  }

  static deleteUser(id: number): void {
    const index = users.findIndex((user) => user.id === id);
    if (index === -1) {
      throw new Error(`User with Id ${id} not found.`);
    }
    users.splice(index, 1);
  }
}
