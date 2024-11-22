// const params = new URLSearchParams(window.location.search);
// const userId = params.get("userId");
// console.log("userId: ", userId);

const userId = window.location.pathname.split("/").pop();

fetchUserDetail(userId);
fetchOrderDetail(userId);
fetchStoreTop5(userId);
fetchItemTop5(userId);

async function fetchUserDetail(userId) {
  const response = await fetch(`/api/user/${userId}`);

  if (!response.ok) {
    // 에러 처리
    console.log("에러 발생");
    return;
  }

  const data = await response.json();

  // header
  const tableHeader = document.querySelector("#userTable thead");
  const fields = Object.keys(data);
  const headerRow = document.createElement("tr");
  fields.forEach((field) => {
    const th = document.createElement("th");
    th.textContent = field;

    headerRow.appendChild(th);
  });
  tableHeader.appendChild(headerRow);

  // body
  const tableBody = document.querySelector("#userTable tbody");
  const bodyRow = document.createElement("tr");
  for (const [key, value] of Object.entries(data)) {
    const td = document.createElement("td");
    td.textContent = value;
    bodyRow.appendChild(td);
  }
  tableBody.appendChild(bodyRow);
}

async function fetchOrderDetail(userId) {
  // 데이터 받아오기
  const response = await fetch(`/api/user/${userId}/orderInfo`);

  if (!response.ok) {
    // 에러 처리
    return;
  }

  const data = await response.json();
  console.log(data);

  // header
  const tableHeader = document.querySelector("#orderTable thead");
  const headerRow = document.createElement("tr");
  const fields = Object.keys(data[0]);
  fields.forEach((field) => {
    const th = document.createElement("th");
    th.textContent = field;
    headerRow.appendChild(th);
  });
  tableHeader.appendChild(headerRow);

  // body
  const tableBody = document.querySelector("#orderTable tbody");

  data.forEach((row) => {
    const bodyRow = document.createElement("tr");

    for (const [key, value] of Object.entries(row)) {
      const td = document.createElement("td");
      if (key == "order id") {
        td.innerHTML = `<a href=/orderItem/${value}>${value}</a>`;
      } else if (key == "purchased location") {
        td.innerHTML = `<a href="/store/${value}">${value}</a>`;
      } else {
        td.textContent = value;
      }
      bodyRow.appendChild(td);
    }
    tableBody.appendChild(bodyRow);
  });
}

async function fetchStoreTop5(userId) {
  const response = await fetch(`/api/user/store/${userId}`);
  if (!response.ok) {
    // 에러 처리
    return;
  }
  const data = await response.json();
  const ul = document.getElementById("visitTop5");
  data.forEach((row) => {
    const li = document.createElement("li");
    li.textContent = `${row.name} (${row.count}번 방문)`;
    ul.appendChild(li);
  });
}

async function fetchItemTop5(userId) {
  const response = await fetch(`/api/user/item/${userId}`);
  if (!response.ok) {
    // 에러 처리
    return;
  }
  const data = await response.json();
  const ul = document.getElementById("orderTop5");
  data.forEach((row) => {
    const li = document.createElement("li");
    li.textContent = `${row.name} (${row.count}번 주문)`;
    ul.appendChild(li);
  });
}
