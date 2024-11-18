document.getElementById("searchForm").addEventListener("submit", (e) => {
  e.preventDefault();
  // 기본 폼 기능 비활성화, GET/POST  폼이 직접 요청하는 것 못하게 함.

  // 1. 폼 대신 내가 할 일 - 입력값 가져옴
  const searchQuery = document.getElementById("searchQuery").value;
  //   console.log(searchQuery);

  const choice = document.getElementById("choices").value;
  // 아티스트, 앨범, 트랙, 작곡가, 장르, 고객이름
  // const selectList = [{ artists }];

  search(choice, searchQuery, 1); // 검색의 시작은 1페이지부터 한다.
});

async function search(choice, searchQuery, page) {
  // 2. 요청
  //   const response = await fetch("/api/search", {
  //     method: "GET",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ searchQuery }),
  //     // get방식에는 body를 담지 않음XXX. 되지만 하지 않는 걸 권장.
  //     // get- parameter. 헤더는 필요 없음
  //     // post - body를 담음
  //   });

  const response = await fetch(`/api/search?choice=${choice}&searchQuery=${encodeURIComponent(searchQuery)}&page=${page}`);
  // body가 없으니 headers도 필요 없음
  // fetch : 비동기
  // response.ok 해야함
  const data = await response.json();
  console.log("받은 데이터: ", data);

  // 3. 받아온 걸 DOM에 렌더링
  const results = document.getElementById("results");
  results.innerHTML = ""; // 기존에 있는 것 초기화

  if (data.results && data.results.length > 0) {
    data.results.forEach((datum) => {
      const li = document.createElement("li");
      if (choice == "artists") {
        li.textContent = datum.Name;
      } else if (choice == "albums") {
        li.textContent = datum.Title;
      } else if (choice == "tracks") {
        li.textContent = datum.Name;
      } else if (choice == "composer") {
        li.textContent = datum.Composer;
      } else if (choice == "genre") {
        li.textContent = datum.Name;
      } else if (choice == "customer") {
        li.textContent = datum.Name;
      }
      results.append(li);
    });
  } else {
    const li = document.createElement("li");
    li.textContent = "검색 결과가 없습니다.";
    results.append(li);
  }

  // 4. 페이징 처리를 한다.
  const currentPage = parseInt(data.currentPage);
  const totalPage = parseInt(data.totalPage);
  displayPagination(choice, searchQuery, currentPage, totalPage);
}

function displayPagination(choice, searchQuery, currentPage, totalPage) {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = ""; // 리셋하고 시작하기

  // 이전 버튼 추가
  const prevButton = document.createElement("button");
  prevButton.textContent = "이전";
  if (currentPage > 1) {
    prevButton.onclick = () => search(choice, searchQuery, currentPage - 1);
  }
  pagination.appendChild(prevButton);

  // 내용 출력
  const pageInfo = document.createElement("span");
  pageInfo.textContent = ` 페이지 ${currentPage} / ${totalPage} `;
  pagination.appendChild(pageInfo);

  // 다음 버튼 추가
  const nextButton = document.createElement("button");
  nextButton.textContent = "다음";
  if (currentPage < totalPage) {
    nextButton.onclick = () => search(choice, searchQuery, currentPage + 1);
  }
  pagination.appendChild(nextButton);
}
