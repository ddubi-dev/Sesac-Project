// 돔이 준비 되었을 때 실행하겠다
document.addEventListener("DOMContentLoaded", () => {
  loadProfileData();
  document.getElementById("logoutButton").addEventListener("click", logout);
});

async function loadProfileData() {
  const response = await fetch("/profile-data");
  if (response.ok) {
    const data = await response.json(); // 비동기를 await로 동기로, 반환값은 promise 객체
    // console.log(`서버로부터 받아온 데이터: `, data);

    document.getElementById("username").textContent = data.username;
    document.getElementById("email").textContent = data.email;
    document.getElementById("created_at").textContent = data.created_at;
    document.getElementById("role").textContent = data.role;
  } else {
    console.log(response.status);
  }
}

async function logout() {
  // try-catch 넣어야 함.
  const response = await fetch("/logout");
  if (response.ok) {
    // 로그아웃 후 홈으로 이동
    // fetch로 한거면 front 단에서 이동(해결)해야함. => window
    window.location.href = "/";
  } else {
    console.error("로그아웃 실패");
  }
}
