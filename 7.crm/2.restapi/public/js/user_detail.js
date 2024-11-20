const userDetail = document.getElementById("user-detail");

const userId = window.location.pathname.split("/").pop();
// 다 슬래쉬로 구분하고, 마지막 꺼 pop
console.log("userId: ", userId);

function fetchUserDetail() {
  fetch(`/api/users/${userId}`)
    .then((response) => response.json())
    .then((data) => {
      renderUserDetail(JSON.stringify(data));
    });
}

function renderUserDetail(user) {
  console.log("user: ", user);

  const row = document.createElement("p"); // 대충, 테이블 tr 대신 p
  row.textContent = user;

  userDetail.appendChild(row);
}

fetchUserDetail();
