document.addEventListener("DOMContentLoaded", () => {
  // ★★★ 페이지 불러올 때 로그인이 되어있는 상태인지 체크하는 코드가 필요
  document.getElementById("loginButton").addEventListener("click", login);
  document.getElementById("logoutButton").addEventListener("click", logout);

  checkLoginStatus();
});

function checkLoginStatus() {
  fetch("/check-login")
    .then((response) => {
      if (!response.ok) {
        // showLoginForm();
        throw new Error("로그인 안 된 사용자");
      } else {
        return response.json(); // 비동기
      }
    })
    .then((data) => {
      // then :: 바로바로 들어감.
      // console.log(data.username);
      if (data && data.username) {
        // 로그인 된 사용자
        showProfile(data.username);
      } else {
        //  로그인 안됨
        showLoginForm();
      }
    })
    .catch((error) => {
      console.log("로그인 안 된 사용자였음");
      showLoginForm();
    });
}

async function checkLoginStatusAsyncAwait() {
  try {
    const response = await fetch("/check-login");
    const data = await response.data;

    if (data && data.username) {
      // console.log(data.name);
      showProfile(data.username);
    } else {
      showLoginForm();
    }
  } catch {
    // console.log("로그인 안 된 사용자였음");
    showLoginForm();
  }
}

function login(e) {
  e.preventDefault();
  // 필요. 기본으로 form 은 GET을 요청하기 때문.

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  fetch("/login", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ username, password }),
  })
    .then((response) => {
      if (!response.ok) {
        alert("로그인 중 오류 발생");
        throw new Error("서버 응답 오류: " + response.status);
      } else {
        console.log("로그인 성공");
        // window.location.href = "/profile";
        showProfile(username);
      }
    })
    .catch((error) => {
      console.error("로그인 중 오류 발생: ", error.message);
    });

  console.log("로그인 버튼 클릭");
}

function showProfile(username) {
  document.getElementById("loginFormContainer").style.display = "none";
  document.getElementById("profile").style.display = "block";
  document.getElementById("usernameSpan").innerHTML = username;
}

function showLoginForm() {
  document.getElementById("loginFormContainer").style.display = "block";
  document.getElementById("profile").style.display = "none";
}

function logout() {
  fetch("/logout").then((response) => {
    if (!response.ok) {
      // 오류 발생
    } else {
      showLoginForm();
    }
  });
}
