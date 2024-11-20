const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-name");

searchButton.addEventListener("click", () => {
  const searchName = searchInput.value;
  fetchUsers(searchName);
});

function fetchUsers(name) {
  // async/await or promise
  fetch(`/api/users/${name}`)
    .then((response) => response.json())
    .then((data) => {
      renderTable(data);
      //   console.log(JSON.stringify(data));
      // 렌더링 코드 작성 => 함수로
    });

  // const response = await fetch(`api/users`);
  // const data = await response.json();
}

function renderTable(data) {
  // 데이터가 왔는지 에러체크
  const tableHeader = document.getElementById("table-header");
  const tableBody = document.getElementById("table-body");

  // 초기화하고 시작
  tableHeader.innerHTML = ``;
  tableBody.innerHTML = ``;

  // 헤더 그리기 tr 안에 th
  const headerRow = document.createElement("tr");
  const fields = Object.keys(data[0]);
  fields.forEach((field) => {
    if (field !== "Id" && field !== "Address") {
      const th = document.createElement("th");
      th.textContent = field;
      headerRow.appendChild(th);
    }
  });
  tableHeader.appendChild(headerRow);

  // 바디 그리기 tr 안에 td 그리기
  //   const bodyRow = document.createElement("tr");
  //   const values = Object.entries(data[0]);
  //   values.forEach((value) => {
  //     console.log("value", value);
  //     const td = document.createElement("td");
  //     td.textContent = value[1];
  //     bodyRow.appendChild(td);
  //   });
  //   tableBody.appendChild(bodyRow);

  data.forEach((row) => {
    const bodyRow = document.createElement("tr");
    bodyRow.addEventListener("click", () => {
      window.location = `/user/${row.Id}`; // 사용자가 볼 것
      // 받아다가 다른 파일에서 fetch
    });

    for (const [key, value] of Object.entries(row)) {
      if (key !== "Id" && key !== "Address") {
        const td = document.createElement("td");
        td.textContent = value;
        bodyRow.appendChild(td);
      }
    }
    tableBody.appendChild(bodyRow);
  });
}

fetchUsers(""); // 시작할 때는 그냥 빈 값으로 검색. 모든 사용자 출력
