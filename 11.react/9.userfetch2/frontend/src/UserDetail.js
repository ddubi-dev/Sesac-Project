import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./UserDetail.css";

const UserDetail = () => {
  const { userId } = useParams(); // URL 에서 userId 추출

  // 백엔드가 없다고 놀고 있을거냐?? ㄴㄴ.
  // mock 데이터...
  // 직접 백엔드 짤 순 있지만 오버~~
  // const users = [
  //   { id: 1, name: "Alice", email: "alice@example.com", age: 25 },
  //   { id: 2, name: "Bob", email: "bob@example.com", age: 30 },
  //   { id: 3, name: "Charlie", email: "charlie@example.com", age: 35 },
  // ];
  // const user = users.find((u) => u.id === parseInt(userId));

  // 상태 변수
  const [user, setUser] = useState([]); // 초기값 빈 배열 선언
  const [error, setError] = useState(null); // 초기에는 에러 null(없음)

  useEffect(() => {
    fetch(`http://localhost:3000/api/users/${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("User not found");
        }
        return response.json();
      })
      .then((data) => setUser(data))
      .catch((error) => setError(error.message));
  }, [userId]);

  if (error) {
    // return <p>오류: {error}</p>;
    // return <p style={{ color: "red", fontWeight: "bold" }}>오류: {error}</p>;
    return <p className="error-message">오류: {error}</p>;
  }

  return (
    <div>
      <h2>User Detail</h2>
      <p>유저 상세 페이지: {userId}</p>

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
