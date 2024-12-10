document.getElementById("search-form").addEventListener("submit", async (e) => {
  e.preventDefault(); // 기본동작 비활성화

  const query = document.getElementById("query").value.trim();
  const resultsElement = document.getElementById("results");
  resultsElement.innerHTML = "<li>로딩중...</li>";

  // 나중에 여기 try-catch 넣기
  const response = await fetch(`/search/blog?query=${encodeURIComponent(query)}`);
  const data = await response.json();
  resultsElement.innerHTML = ""; // 로딩이 끝났으면 지우기

  // 잘 왔다고 가정하고(실제로는 체크 꼭 해야함)
  if (data.items && data.items.length > 0) {
    data.items.forEach((item) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <h3><a href="${item.link}" target="_blank">${item.title}</a></h3>
        <p>${item.description}</p>
        <small>Post Data: ${item.postdate}</small>
        `;
      resultsElement.appendChild(li);
    });
  } else {
    resultsElement.innerHTML = `검색 결과가 없습니다.`;
  }
});
