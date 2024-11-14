document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const response = await fetch("/login", {
      method: "POST",
      // json
      // headers: { "Content-Type": "application/json" },
      // username:username, password:password인 json이야. 이걸 str로 바꿔서 보낼거야.
      // body: JSON.stringify({ username, password }),
      // 지금은 application/json => 미들웨어 : app.use(express.json())

      // form
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ username, password }),
      // 이전에는 form => 미들웨어 : app.use(express.urlencoded({extended: true}))
    });

    if (response.redirected) {
      console.log(response.url);
      // const data = await response.text();
      // document.getElementById("login-message").textContent = data;
      window.location.href = response.url; // redirect로 받은 url로 이동.
    } else {
      const data = await response.text(); // 응답이 어떤 형태인지 백엔드가 결정
      document.getElementById("login-message").textContent = data;
    }

    // if (response.ok) {
    //   window.location.href = "/profile";
    // } else {
    //   // 오류 발생
    // }
  });
});
