// curl 요청 반복적으로

import axios from "axios"; // 타입 따로 설치 안해도 됨

const baseURL = "http://localhost:3000/users";

async function runTests() {
  try {
    console.log("===사용자 추가 테스팅===");
    const createUser1 = await axios.post(baseURL, {
      name: "Alice",
      email: "alice@example.com",
    });
    console.log("사용자1 생성 완료: ", createUser1.data);

    const createUser2 = await axios.post(baseURL, {
      name: "Bob",
      email: "bob@example.com",
    });
    console.log("사용자2 생성 완료: ", createUser2.data);

    const createUser3 = await axios.post(baseURL, {
      name: "Charlie",
      email: "charlie@example.com",
    });
    console.log("사용자3 생성 완료: ", createUser3.data);

    console.log("\n=== 사용자 목록 조회 ===");
    const listUsers = await axios.get(baseURL);
    console.log("사용자 목록: ", listUsers.data);

    console.log("\n=== 사용자 삭제 ===");
    const user1id = createUser1.data.id;
    await axios.delete(`${baseURL}/${user1id}`);
    console.log(`사용자 삭제: ${user1id}`);

    console.log("\n=== 삭제 후 사용자 목록 조회 ===");
    const listUsers2 = await axios.get(baseURL);
    console.log("사용자 목록: ", listUsers2.data);
  } catch (error: any) {
    // 다양한 에러가 발생할 수 있기 때문에
    if (axios.isAxiosError(error)) {
      console.error("에러 발생: ", error.cause);
    }
  }
}

runTests();

// 서버 띄우고 : C:\src\SESAC\js\12.typescript\10.user-management>ts-node src/server.ts
// ts-node ... 로 실행하기 : C:\src\SESAC\js\12.typescript\10.user-management\src\test>ts-node test
