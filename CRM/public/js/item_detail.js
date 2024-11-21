// itemTable
// monthlySalesTable

const itemId = window.location.pathname.split("/").pop();

fetchItem(itemId);
fetchSales(itemId);

// 상품 정보
async function fetchItem(itemId) {
  const response = await fetch(`/api/item/${itemId}`);

  if (!response.ok) {
    // 에러 처리
    return;
  }

  const data = await response.json();

  // header
  const tableHeader = document.querySelector("#itemTable thead");
  const fields = Object.keys(data);
  const headerRow = document.createElement("tr");
  fields.forEach((field) => {
    const th = document.createElement("th");
    th.textContent = field;
    headerRow.appendChild(th);
  });
  tableHeader.appendChild(headerRow);

  // body
  const tableBody = document.querySelector("#itemTable tbody");
  const bodyRow = document.createElement("tr");
  for (const [key, value] of Object.entries(data)) {
    const td = document.createElement("td");
    td.textContent = value;
    bodyRow.appendChild(td);
  }
  tableBody.appendChild(bodyRow);
}

// 월간 매출액
async function fetchSales(itemId) {
  const response = await fetch(`/api/item/month/${itemId}`);

  if (!response.ok) {
    // 에러 처리
    return;
  }

  const data = await response.json();

  // header
  const tableHeader = document.querySelector("#monthlySalesTable thead");
  const fields = Object.keys(data[0]);
  const headerRow = document.createElement("tr");
  fields.forEach((field) => {
    const th = document.createElement("th");
    th.textContent = field;
    headerRow.appendChild(th);
  });
  tableHeader.appendChild(headerRow);

  // body
  const tableBody = document.querySelector("#monthlySalesTable tbody");

  data.forEach((row) => {
    const bodyRow = document.createElement("tr");
    for (const [key, value] of Object.entries(row)) {
      const td = document.createElement("td");
      td.textContent = value;
      bodyRow.appendChild(td);
    }
    tableBody.appendChild(bodyRow);
  });
}
