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

  // 월간 매출액 그래프
  drawGraph(data);
}

// 월간 매출액 그래프
async function drawGraph(data) {
  // 왼쪽 : 매출액
  // 오른쪽 : 아이템 개수
  // bottom : 날짜
  // Total Revenue, 월별 매출액
  // item count, 아이템 개수
  // Month, Total_Revenue, Item_Count

  const labels = data.map((d) => d.Month);
  const revenue = data.map((d) => d["Total Revenue"]);
  const count = data.map((d) => d["Item Count"]);

  // 최소, 최대
  const minValueR = Math.floor(Math.min(...revenue) / 10000) * 10000;
  const maxValueR = Math.max(...revenue);
  const minValueC = Math.floor(Math.min(...count) / 10) * 10;
  const maxValueC = Math.max(...count);

  const chart = document.getElementById("chart").getContext("2d");
  new Chart(chart, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Total Revenue",
          data: revenue,
          backgroundColor: "rgba(255, 99, 132, 0.5)", // 막대 색상
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
          yAxisID: "y", // 첫 번째 축에 연결
        },
        {
          label: "Item Count",
          data: count,
          type: "line", // 선형 차트
          borderColor: "rgba(54, 162, 235, 1)", // 선 색상
          backgroundColor: "rgba(54, 162, 235, 0.5)",
          borderWidth: 2,
          tension: 0.4, // 선의 곡선 정도
          yAxisID: "y1", // 두 번째 축에 연결
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          // min: minValueR,
          type: "linear",
          position: "left",
          title: {
            display: true,
            text: "총 매출액",
          },
        },
        y1: {
          // min: minValueC,
          type: "linear",
          position: "right",
          title: {
            display: true,
            text: "아이템 개수",
          },
          grid: {
            drawOnChartArea: false, // 두 번째 축의 그리드 제거
          },
        },
      },
    },
  });
}
