const user = {};
document.addEventListener("DOMContentLoaded", () => {
  console.log("나의 JS 코드");

  const userTable = document.getElementById("userTable");
  const form = document.getElementById("form");
  // form 버튼을 클릭해서 post
  form.addEventListener("submit", (e) => {
    e.preventDefault(); // 폼 자체의 기본 기능 못하게 막기

    const data = document.getElementById("username").value;
    console.log(`data: ${data}`);

    fetch("/user", {
      // 서버의 /user 경로로 요청을 보냄
      method: "POST", // 요청 방식 지정
      header: { "Content-Type": "application/js", charset: "utf-8" },
      body: data,
    }).then(() => {
      // Dom element 가져다가 아래의 fetch를 다시 로딩
      fetchUserGet();
    });
  });

  // fetchUserGet();

  function fetchUserGet() {
    // 시작시 자동로딩
    fetch("/user", {
      method: "GET",
    })
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
      .then((data) => {
        // 위에서 리턴한 response.json의 결과를 받아서 처리하는 곳
        console.log(`넘어온 데이터 : ${JSON.stringify(data)}`);

        const div = document.getElementById("userTable");
        div.innerHTML = "";

        if (data) {
          for (const key in data) {
            // console.log(data[key]);
            // const user = data[key];
            const listItem = document.createElement("p");
            listItem.innerHTML = `<b>ID</b>:${key} <b>User</b>:${data[key]}`;
            div.appendChild(listItem);
          }

          // const user = parse(data);
          // console.log(Object.keys(user).length);

          // user.array.forEach((element) => {
          //   const data = user[element];
          //   const listItem = document.createElement("li");
          //   listItem.innerHTML = `<b>ID</b>:${element} <b>User</b>:${user[element]}`;
          // });
          // for (let i = 0; i < Object.keys(user).length; i++) {
          //   const listItem = document.createElement("li");
          //   listItem.textContent = userTable.appendChild();
          // }
        }
      });
  }
});
