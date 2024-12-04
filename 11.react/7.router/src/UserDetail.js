import { useParams } from "react-router-dom";

const UserDetail = () => {
  const { userId } = useParams(); // URL 에서 userId 추출

  // 유저 디테일, 백엔드가 있다고 가정, 물어봐서 받은 값
  const users = [
    { id: 1, name: "Alice", email: "alice@naver.com", age: 20 },
    { id: 2, name: "Bob", email: "bob@naver.com", age: 24 },
    { id: 3, name: "Charlie", email: "charlie@naver.com", age: 30 },
  ];

  const user = users.find((u) => u.id === parseInt(userId));

  return (
    <div>
      <h2>User Detail</h2>
      <p>유저 상세 페이지:{userId}</p>

      <p>
        <strong>이름:</strong> {user.name}
      </p>
      <p>
        <strong>이메일:</strong> {user.email}
      </p>
      <p>
        <strong>나이:</strong> {user.age}
      </p>
    </div>
  );
};

export default UserDetail;
