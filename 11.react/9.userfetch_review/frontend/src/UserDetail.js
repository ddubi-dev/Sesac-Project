import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./UserDetail.css";

const UserDetail = () => {
  const { userId } = useParams(); // URL 에서 userId 추출

  // 유저 디테일, 백엔드가 있다고 가정, 물어봐서 받은 값
  // 굳이 백이 만들어질때까지 기다릴 필요 없음
  // const users = [
  //   { id: 1, name: "Alice", email: "alice@naver.com", age: 20 },
  //   { id: 2, name: "Bob", email: "bob@naver.com", age: 24 },
  //   { id: 3, name: "Charlie", email: "charlie@naver.com", age: 30 },
  // ];

  const [user, setUser] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/api/users/${userId}`)
      .then((response) => {
        if (!response.ok) {
          // 에러 처리
          throw new Error("User not found");
        } else {
          return response.json();
        }
      })
      .then((data) => {
        console.log(data);
        setUser(data);
      })
      .catch((error) => setError(error.message));
  }, [userId]);
  // userId가 변하면 실행

  if (error) {
    return <p className="error-message">오류: {error}</p>;
  }

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
