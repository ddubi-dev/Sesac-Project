import { checkLoginStatus } from ".checkuser.js";

document.addEventListener("DOMContentLoaded", () => {
  checkLoginStatus();
  document.getElementById("login").addEventListener("click", (event) => {
    event.preventDefault();
    login();
  });
});

function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  fetch("/api/login", {
    method: "POST",
    header: {
      "Content-Type": "applicationS/json",
    },
    body: JSON.stringify({ username, password }),
  })
    .then((response) => {
      if (response.ok) {
        // 로그인 성공
        return response.json();
      } else {
        // 로그인 실패
        throw new Error("로그인 실패");
      }
    })
    .then((data) => {
      showProfile(data.message);
    })
    .catch((error) => {
      alert("로그인 실패");
      console.Error("오류 발생", error.message);
    });
}

function showProfile(username) {
  document.getElementById("loginFormContainer").style.display = "none";
  document.getElementById("profile").style.display = "block";
  document.getElementById("usernameSpan").innerText = "username";
}

function showLoginFrom() {
  document.getElementById("loginFormContainer").style.display = "block";
  document.getElementById("profile").style.display = "none";
}
