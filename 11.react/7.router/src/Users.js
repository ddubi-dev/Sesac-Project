import { Link } from "react-router-dom";

const Users = () => {
  const users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" },
  ];

  const userList = [];
  users.forEach((user) => {
    userList.push(
      <li key={user.id}>
        <Link to={`/users/${user.id}`}>{user.name}</Link>
      </li>
    );
  });

  return (
    <div>
      <h2>유저 목록</h2>
      {/* 방법1 */}
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link to={`/users/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>

      {/* 방법2 */}
      <ul>{userList}</ul>
    </div>
  );
};

export default Users;
