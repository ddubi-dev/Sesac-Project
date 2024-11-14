document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("loginButton").addEventListener("click", login);
});

async function login(e) {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const response = await fetch("/login", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ username, password }),
  });

  if (response.ok) {
    //로그인 완료
    // console.log("로그인 성공");
    // console.log(response.body);
    // const message = response.json();
    // console.log(JSON.stringify(message));
    // alert("로그인 완료");
    window.location.href = "/profile";
  } else {
    // 로그인 오류 발생
  }
}
