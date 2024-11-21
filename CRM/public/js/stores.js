document.addEventListener("DOMContentLoaded", () => {
  fetchStore(1);
});

async function fetchStore(page) {
  const response = await fetch(`/api/stores?page=${page}`);

  if (!response.ok) {
    //에러 발생
    console.log("DB 에러 발생");
    return;
  }

  const data = await response.json();

  // 헤더
  const tableHeader = document.getElementById("table-header");
  tableHeader.innerHTML = ``;

  const headerRow = document.createElement("tr");
  const fields = Object.keys(data.result[0]);
  fields.forEach((field) => {
    const th = document.createElement("th");

    if (field == "Id") {
      th.textContent = "id";
    } else if (field == "Name") {
      th.textContent = "name";
    } else if (field == "Type") {
      th.textContent = "type";
    } else if (field == "Address") {
      th.textContent = "address";
    }

    headerRow.appendChild(th);
  });

  tableHeader.appendChild(headerRow);

  // 바디
  const tableBody = document.getElementById("table-body");
  tableBody.innerHTML = ``;

  data.result.forEach((row) => {
    const bodyRow = document.createElement("tr");

    for (const [key, value] of Object.entries(row)) {
      const td = document.createElement("td");
      td.textContent = value;
      bodyRow.appendChild(td);

      if (key == "Id") {
        // a 태그 설정
      }
    }

    tableBody.appendChild(bodyRow);
  });

  displayPagination(parseInt(data.currentPage), parseInt(data.totalPage));
}

function displayPagination(currentPage, totalPage) {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = ``;

  // 이전 버튼
  const prevButton = document.createElement("button");
  prevButton.textContent = "이전";
  if (currentPage > 1) {
    prevButton.onclick = () => fetchStore(currentPage - 1);
  }
  pagination.appendChild(prevButton);

  // 내용
  const pageInfo = document.createElement("span");
  pageInfo.textContent = `${currentPage} / ${totalPage}`;
  pagination.appendChild(pageInfo);

  // 다음 버튼
  const nextButton = document.createElement("button");
  nextButton.textContent = "다음";
  if (currentPage < totalPage) {
    nextButton.onclick = () => {
      fetchStore(currentPage + 1);
    };
  }
  pagination.appendChild(nextButton);
}
