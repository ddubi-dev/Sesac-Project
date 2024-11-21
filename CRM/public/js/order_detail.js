const orderId = window.location.pathname.split("/").pop();

fetchOrder(orderId);

async function fetchOrder(orderId) {
  const response = await fetch(`/api/order/${orderId}`);

  if (!response.ok) {
    // 에러 처리
    return;
  }

  const data = await response.json();

  // header
  const tableHeader = document.querySelector("#orderTable thead");
  const fields = Object.keys(data);
  const headerRow = document.createElement("tr");
  fields.forEach((field) => {
    const th = document.createElement("th");
    th.textContent = field;
    headerRow.appendChild(th);
  });
  tableHeader.appendChild(headerRow);

  // body
  const tableBody = document.querySelector("#orderTable tbody");
  const bodyRow = document.createElement("tr");
  for (const [key, value] of Object.entries(data)) {
    const td = document.createElement("td");
    if (key == "store_id") {
      td.innerHTML = `<a href="/store/${value}">${value}</a>`;
    } else if (key == "user_id") {
      td.innerHTML = `<a href="/user/${value}">${value}</a>`;
    } else {
      td.textContent = value;
    }
    bodyRow.appendChild(td);
  }
  tableBody.appendChild(bodyRow);
}
