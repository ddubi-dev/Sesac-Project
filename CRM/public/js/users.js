document.addEventListener("DOMContentLoaded", () => {
  fetchUser("", "", 1);

  document.getElementById("submit").addEventListener("click", () => {
    const name = document.getElementById("inputName").value;
    const gender = document.getElementById("gender").value;

    fetchUser(name, gender, 1);
  });
});

async function fetchUser(name, gender, currentPage) {
  const response = await fetch(`api/users?name=${encodeURIComponent(name)}&gender=${encodeURIComponent(gender)}&page=${currentPage}`);
  if (!response.ok) {
    console.log("fetch에서 에러 발생");
    const result = document.getElementById("result");

    try {
      const errorData = await response.json();
      result.innerHTML = `<p>${errorData.message}</p>`;
    } catch (err) {
      console.log("JSON 파싱 실패:", err);
      result.innerHTML = `알 수 없는 오류 발생`;
    }

    return;
  }

  const data = await response.json();

  const tableHeader = document.getElementById("table-header");
  tableHeader.innerHTML = ``;
  const tableBody = document.getElementById("table-body");
  tableBody.innerHTML = ``;

  // 헤더 그리기
  const headerRow = document.createElement("tr");
  const fields = Object.keys(data.result[0]);
  fields.forEach((field) => {
    if (field !== "Address") {
      const th = document.createElement("th");

      if (field == "Birthdate") {
        th.textContent = "Birthday";
      } else {
        th.textContent = field;
      }

      headerRow.appendChild(th);
    }
  });
  tableHeader.appendChild(headerRow);

  // body 그리기
  data.result.forEach((row) => {
    const bodyRow = document.createElement("tr");

    for (const [key, value] of Object.entries(row)) {
      if (key !== "Address") {
        const td = document.createElement("td");

        if (key == "Id") {
          td.innerHTML = `<a href=./user_detail/${row.Id}>${value}</a>`;
        } else {
          td.textContent = value;
        }

        bodyRow.appendChild(td);
      }
    }
    tableBody.appendChild(bodyRow);
  });

  // pagination
  displayPagination(name, gender, parseInt(data.currentPage), parseInt(data.totalPage));
}

function displayPagination(name, gender, currentPage, totalPage) {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = ``;

  // 이전 버튼
  const prevButton = document.createElement("button");
  prevButton.textContent = "이전";
  if (currentPage > 1) {
    prevButton.onclick = () => fetchUser(name, gender, currentPage - 1);
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
      fetchUser(name, gender, currentPage + 1);
    };
  }
  pagination.appendChild(nextButton);
}
