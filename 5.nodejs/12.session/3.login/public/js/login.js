document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = usernameInput.value;
    const password = passwordInput.value;

    // console.log(`username: ${username}`);
    // console.log(`password: ${password}`);

    fetch("/login", {
      method: "POST",
      headers: { "Content-type": "application/json" }, // 서버가 json 형식으로 처리하도록
      body: JSON.stringify({ username: username, password: password }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("로그인 오류 발생");
        }
      })
      .catch((error) => {
        console.error("로그인 중 오류", error.message);
        alert("로그인 중 오류가 발생했습니다.");
      });
  });
});
