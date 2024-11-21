const orderId = window.location.pathname.split("/").pop();

fetchOrderItem(orderId);

async function fetchOrderItem(orderId) {
  const response = await fetch(`/api/orderItem/${orderId}`);

  if (!response.ok) {
    // 에러 처리
    console.log("에러 발생");
    return;
  }

  const data = await response.json();

  // header
  const tableHeader = document.querySelector("#orderTable thead");
  const fields = Object.keys(data[0]);
  const headerRow = document.createElement("tr");
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
  });
}
