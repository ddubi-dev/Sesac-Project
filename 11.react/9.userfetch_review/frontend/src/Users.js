import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Users = () => {
  // mock 데이터
  // const users = [
  //   { id: 1, name: "Alice" },
  //   { id: 2, name: "Bob" },
  //   { id: 3, name: "Charlie" },
  // ];

  // 함수화(?)
  // const userList = [];
  // users.forEach((user) => {
  //   userList.push(
  //     <li key={user.id}>
  //       <Link to={`/users/${user.id}`}>{user.name}</Link>
  //     </li>
  //   );
  // });

  const [users, setUsers] = useState([]); // 초기 값은 빈 배열

  // 서버로부터 데이터 가져옴.
  useEffect(() => {
    fetch(`http://localhost:3000/api/users`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUsers(data);
        // 데이터 가져와 users 값 설정
      })
      .catch((error) => {
        console.log("데이터 못 가져옴: ", error);
      });
  }, []);

  return (
    <div>
      <h2>유저 목록</h2>
      {/* 방법1 */}
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link to={`/users/${user.id}`}>{user.name}</Link>
            {/* 클릭시 해당 URL 요청? */}
          </li>
        ))}
      </ul>

      {/* 방법2 */}
      {/* <ul>{userList}</ul> */}
    </div>
  );
};

export default Users;
