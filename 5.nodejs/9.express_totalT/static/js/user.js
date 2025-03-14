document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form");
  const username = document.getElementById("username");

  updateUsers(); // DOM이 로딩 되자마자, 사용자 가져와서 화면에 출력한다

  // 새로운 사용자를 추가한다.
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = username.value;
    if (!name) {
      alert("이름을 입력하세요"); // 실무에서는 안씀, 디자인도 못 넣고.
      return;
    }

    registerUser(name);
  });
});

function registerUser(name) {
  fetch("/user", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
    // name = name (앞은 변수명, 뒤는 실제 값)
    // body: JSON.stringify({ "name" : name }),
  })
    .then((response) => {
      if (response.ok) {
        // alert("등록 성공");
        username.value = ""; // 성공했으면 위의 username DOM 비우기
        updateUsers();
      } else {
        alert("등록 실패");
      }
    })
    .catch((error) => {
      alert("등록 중에 오류가 발생했습니다.", error.message);
    });
}

function updateUsers() {
  // fetch("/user").then((response) => {
  //   return response.json(); // 리턴 값 promise
  // });

  const userTable = document.getElementById("userTable");
  userTable.innerHTML = ``;

  fetch("/user")
    .then((response) => response.json())
    .then((users) => {
      // console.log(users);

      if (Object.keys(users).length === 0) {
        // 사용자 0명
        const row = document.createElement("div");
        row.textContent = "등록된 사용자가 없습니다.";
        userTable.appendChild(row);
      } else {
        // 사용자 1명 이상
        for (const key in users) {
          const row = document.createElement("div");
          row.innerText = `ID: ${key}, Name: ${users[key]}`;

          const modifyButton = document.createElement("button");
          modifyButton.textContent = "수정";
          modifyButton.addEventListener("click", () => {
            modifyUsers(key);
          });
          row.appendChild(modifyButton);

          const deleteButton = document.createElement("button");
          deleteButton.textContent = "삭제";
          deleteButton.addEventListener("click", () => {
            deleteUsers(key);
            // 더 부드럽게 하려면 해당 돔만 찾아서 삭제...!
            // 현재의 방법은 -> user에서 지워주고 화면을 다시 부름 updateUsers()
          });
          row.appendChild(deleteButton);

          userTable.appendChild(row);
        }
      }
    });
}

function deleteUsers(userId) {
  fetch(`/user/${userId}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.ok) {
        // alert("삭제 성공");
      } else {
        alert("삭제 실패");
      }
    })
    .catch((error) => {
      console.error("삭제 중 오류?", error.message);
      alert("삭제 중 오류가 발생했습니다.");
    });

  updateUsers();
}

function modifyUsers(userId) {
  const newName = prompt("수정할 이름을 입력하세요");
  if (newName !== null) {
    fetch(`/user/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: newName }),
    })
      .then((response) => {
        if (response.ok) {
          // alert("수정 성공");
          updateUsers();
        } else {
          alert("수정 실패");
        }
      })
      .catch((error) => {
        console.error("수정 중 오류 발생:", error);
        alert("수정 중에 오류가 발생했습니다.");
      });
  }
}
