document.addEventListener("DOMContentLoaded", () => {
  fetchUser("", 1);
});

function fetchUser(name, currentPage) {
  fetch(`api/users?name=${encodeURIComponent(name)}&page=${currentPage}`)
    .then((response) => {
      if (!response.ok) {
        // 에러
        console.log("fetch에서 에러 발생");
      } else {
        return response.json();
      }
    })
    .then((data) => {
      console.log("data: ", JSON.stringify(data));
      const tableHeader = document.getElementById("table-header");
      const tableBody = document.getElementById("table-body");

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
            td.textContent = value;
            bodyRow.appendChild(td);
            if (key == "Id") {
              // html a 태그 설정
              //   td.addEventListener("click", () => {
              //     window.location = `/user/${row.Id}`;
              //   });
            }
          }
        }
        tableBody.appendChild(bodyRow);
      });
    });
}
