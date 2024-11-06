document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form");
  // const userTable = document.getElementById("userTable");
  const username = document.getElementById("username");

  updateUsers();

  // form의 버튼을 클릭해서 post
  form.addEventListener("submit", (e) => {
    e.preventDefault(); // 폼 자체의 기본 기능 못하게 막기

    const name = username.value;
    if (!name) {
      alert("이름을 입력하세요.");
      return;
    }
    registerUsers(name);
  });
});

// 사용자 등록
function registerUsers(name) {
  // 입력 받은 이름을
  // 서버에 추가한다
  fetch("/user", {
    // 서버의 /user 경로로 요청을 보냄
    method: "POST", // 요청 방식 지정
    header: { "Content-Type": "application/js", charset: "utf-8" },
    body: name,
  })
    .then((response) => {
      if (response.ok) {
        alert("등록 성공");
        username.value = "";
        updateUsers();
      } else {
        alert("등록 실패");
      }
    })
    .catch((err) => {
      alert("등록 중에 오류가 발생했습니다.", err.message);
    });
}

// function refresh(){
//   fetch("/")
//   .then((response)=>response.json())
//   .then((users)=>{

//   })
// }

// 사용자 업데이트
function updateUsers() {
  // 현재 user 목록을 받아온다.
  // 현재의 dom에 리스트를 새로 추가한다.

  const userTable = document.getElementById("userTable");
  userTable.innerHTML = ``;

  fetch("/user")
    .then((response) => {
      // fetch 호출이 완료되면, 반환된 Promise는 Response 객체를 제공함(요청에 대한 응답 정보를 담고 있음)
      if (response.ok) {
        // response.ok 는 HTTP 응답의 상태 코드가 200대일 경우 true / 400,500대는 false 반환
        console.log("성공");

        // res.end(data)를 통해 받은 데이터

        return response.json(); // JSON으로 응답 데이터 파싱
      } else {
        console.log("에러");
        throw new Error("Network response was not ok");
      }
    })
    .then((users) => {
      // 위에서 리턴한 response.json의 결과를 받아서 처리하는 곳
      // console.log(`넘어온 데이터 : ${JSON.stringify(users)}`);

      if (Object.keys(users).length === 0) {
        const row = document.createElement("div");
        row.textContent = "등록된 사용자가 없습니다.";
        userTable.append(row);
      } else if (users) {
        for (const key in users) {
          const row = document.createElement("div");
          row.innerHTML = `<b>ID</b>:${key} <b>User</b>:${users[key]}`;

          const modifyButton = document.createElement("button");
          modifyButton.textContent = "수정";
          modifyButton.addEventListener("click", () => {
            modifyUser(key);
          });
          row.appendChild(modifyButton);

          const deleteButton = document.createElement("button");
          deleteButton.textContent = "삭제";
          deleteButton.addEventListener("click", () => {
            deleteUser(key);
          });
          row.appendChild(deleteButton);

          userTable.appendChild(row);
        }
      }
    });
}

function deleteUser(userId) {
  fetch(`/user/${userId}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.ok) {
        alert("삭제 성공");
        updateUsers();
      } else {
        alert("삭제 실패");
      }
    })
    .catch((error) => {
      console.error("삭제 중 오류", error.message);
      alert("삭제 중 오류가 발생했습니다.");
    });
}

function modifyUser(userId) {
  const userInput = prompt("수정할 이름을 입력하세요.");

  fetch(`/user/${userId}`, {
    method: "PUT",
    headers: { "Content-Type": "text/plain; charset=utf-8" },
    body: userInput,
  })
    .then((response) => {
      if (response.ok) {
        alert("수정 성공");
        updateUsers();
      } else {
        alert("수정 실패");
      }
    })
    .catch((error) => {
      console.error("수정 중 오류", error.message);
      alert("수정 중 오류가 발생했습니다.");
    });
}
