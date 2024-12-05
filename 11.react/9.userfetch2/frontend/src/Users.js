import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Users = () => {
  // const users = [
  //   { id: 1, name: "Alice" },
  //   { id: 2, name: "Bob" },
  //   { id: 3, name: "Charlie" },
  // ];

  const [users, setUsers] = useState([]); // 초기값은 빈 배열

  useEffect(() => {
    fetch("http://localhost:3000/api/users")
      .then((response) => response.json())
      .then((data) => {
        // 디버깅을 원하면
        console.log(data);
        setUsers(data);
      })
      .catch((error) => {
        console.error("데이터 못 가져옴: ", error);
      });
  }, []); // 디펜던시 변수 누락하지 않도록 주의(무한로딩됨)

  // const userList = [];
  // users.forEach((user) => {
  //   userList.push(
  //     <li key={user.id}>
  //       <Link to={`/users/${user.id}`}>{user.name}</Link>
  //     </li>
  //   );
  // });

  return (
    <div>
      <h2>유저 목록</h2>
      {/* 방법1. */}
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link to={`/users/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>

      {/* 방법2. */}
      {/* <ul>{userList}</ul> */}
    </div>
  );
};

export default Users;
