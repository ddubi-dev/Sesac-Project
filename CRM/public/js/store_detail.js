const storeId = window.location.pathname.split("/").pop();

fetchStore(storeId);
fetchSales(storeId);
fetchPatrons(storeId);

const backButton = document.getElementById("back");
backButton.addEventListener("click", () => {
  fetchStore(storeId);
  fetchSales(storeId);
  fetchPatrons(storeId);
});

async function fetchStore(storeId) {
  const response = await fetch(`/api/store/${storeId}`);

  if (!response.ok) {
    // 에러 처리
    return;
  }

  const data = await response.json();

  // header
  const tableHeader = document.querySelector("#storeTable thead");
  tableHeader.innerHTML = ``;
  const fields = Object.keys(data);
  const headerRow = document.createElement("tr");
  fields.forEach((field) => {
    const th = document.createElement("th");
    th.textContent = field;
    headerRow.appendChild(th);
  });
  tableHeader.appendChild(headerRow);

  // body
  const tableBody = document.querySelector("#storeTable tbody");
  tableBody.innerHTML = ``;
  const bodyRow = document.createElement("tr");

  for (const [key, value] of Object.entries(data)) {
    const td = document.createElement("td");
    if (key == "order_id") {
      td.innerHTML = `<a href='/order/${value}'>${value}</a>`;
    } else if (key == "item_id") {
      td.innerHTML = `<a href='/item/${value}'>${value}</a>`;
    } else {
      td.textContent = value;
    }
    bodyRow.appendChild(td);
  }

  tableBody.appendChild(bodyRow);
}

async function fetchSales(storeId) {
  const response = await fetch(`/api/store/month/${storeId}`);

  if (!response.ok) {
    // 에러 처리
    return;
  }

  const data = await response.json();

  // header
  const tableHeader = document.querySelector("#monthlySalesTable thead");
  tableHeader.innerHTML = ``;
  const headerRow = document.createElement("tr");
  const fields = Object.keys(data[0]);
  fields.forEach((field) => {
    const th = document.createElement("th");
    th.textContent = field;
    headerRow.appendChild(th);
  });
  tableHeader.appendChild(headerRow);

  // body
  const tableBody = document.querySelector("#monthlySalesTable tbody");
  tableBody.innerHTML = ``;

  data.forEach((row) => {
    const bodyRow = document.createElement("tr");

    for (const [key, value] of Object.entries(row)) {
      if (key == "month") {
        const link = document.createElement("a");
        link.textContent = value;
        console.log(value);

        link.addEventListener("click", (e) => {
          e.preventDefault();

          // 월간 매출액 업데이트(월별 상세)
          updateMonthlySalesTable(storeId, value);

          // 단골 고객 업데이트(월별 상세)
          updatePatronsTable(storeId, value);
        });

        const td = document.createElement("td");
        td.appendChild(link);
        bodyRow.appendChild(td);
      } else {
        const td = document.createElement("td");
        td.textContent = value;
        bodyRow.appendChild(td);
      }
    }
    tableBody.appendChild(bodyRow);
  });
}

async function fetchPatrons(storeId) {
  const response = await fetch(`/api/store/users/${storeId}`);

  if (!response.ok) {
    // 에러 처리
    return;
  }

  const data = await response.json();

  const fields = Object.keys(data[0]);

  // header
  const tableHeader = document.querySelector("#patronsTable thead");
  tableHeader.innerHTML = ``;

  const headerRow = document.createElement("tr");
  fields.forEach((field) => {
    const th = document.createElement("th");
    th.textContent = field;
    headerRow.appendChild(th);
  });
  tableHeader.appendChild(headerRow);

  // body
  const tableBody = document.querySelector("#patronsTable tbody");
  tableBody.innerHTML = ``;

  data.forEach((row) => {
    const tableRow = document.createElement("tr");

    for (const [key, value] of Object.entries(row)) {
      const td = document.createElement("td");
      if (key == "user_id") {
        td.innerHTML = `<a href="/user/${value}">${value}</a>`;
      } else {
        td.textContent = value;
      }
      tableRow.appendChild(td);
    }

    tableBody.appendChild(tableRow);
  });
}

// 월간 매출액 상세
async function updateMonthlySalesTable(storeId, value) {
  const response = await fetch(`/api/store/month/detail/${storeId}?date=${value}`);

  if (!response.ok) {
    // 에러 처리
    return;
  }

  const data = await response.json();

  // body 다시 생성
  const tableBody = document.querySelector("#monthlySalesTable tbody");
  tableBody.innerHTML = ``; // 초기화

  data.forEach((row) => {
    const tableRow = document.createElement("tr");

    for (const [key, value] of Object.entries(row)) {
      const td = document.createElement("td");
      td.textContent = value;
      tableRow.appendChild(td);
    }
    tableBody.appendChild(tableRow);
  });
}

async function updatePatronsTable(storeId, value) {
  const response = await fetch(`/api/store/users/detail/${storeId}?date=${value}`);
  if (!response.ok) {
    // 에러 처리
    return;
  }

  const data = await response.json();
  console.log(data);

  // body 값 업데이트
  const tableBody = document.querySelector("#patronsTable tbody");
  tableBody.innerHTML = ``;

  data.forEach((row) => {
    const bodyRow = document.createElement("tr");
    for (const [key, value] of Object.entries(row)) {
      const td = document.createElement("td");
      if (key == "user_id") {
        // user
        td.innerHTML = `<a href="/user_detail/${value}">${value}</a>`;
      } else {
        td.textContent = value;
      }
      bodyRow.appendChild(td);
    }
    tableBody.appendChild(bodyRow);
  });
}
