const container = document.getElementById("scroll-container");
const itemPerLoad = 20;
let start = 0;
let end = start + itemPerLoad;
const maxItemsOnScreen = 100;

// 초기 데이터 로딩
fetchData();

function fetchData() {
  fetch(`/api/data?start=${start}&end=${end}`)
    .then((response) => response.json())
    .then((items) => {
      items.forEach((item) => {
        // 새로운 아이템 추가
        const itemElement = document.createElement("div");
        itemElement.classList.add("item");
        itemElement.textContent = item;
        container.appendChild(itemElement);
      });

      // 0~199개 유지, 오래된 데이터 삭제
      // maxItemsOnScreen 을 사용??
      //   if (document.querySelectorAll("div.item").length > 200) {
      //     document.querySelectorAll("div.item")[0].remove();
      //   }

      let itemsToRemove = container.children.length - maxItemsOnScreen;
      if (itemsToRemove > 0) {
        console.log("지워야할 갯수는? ", itemsToRemove);
        // for (let i = 0; i < itemsToRemove; i++) {
        // 옛날 스타일
        while (itemsToRemove-- > 0) {
          container.removeChild(container.firstElementChild);
        }
      }

      // 다음 데이터를 불러오기 위한 시작 위치를 변경
      //   start = end;
      //   end += itemPerLoad;
      start += items.length; // 받아온 갯수 다음부터 불러오도록 설정
      end = start + itemPerLoad;

      // 1초 내에는 다시 못 불러오게 잠시 기다렸다가 설정
      //   setTimeout(() => {
      loading = false;
      //   }, 1000);
    });
}

function fetchPrevData() {
  const firstItem = container.firstElementChild;
  console.log("firstItem: ", firstItem);

  const pend = firstItem ? parseInt(firstItem.textContent.replace("Item ", "")) - 1 : 0; // 현재 있는 데이터의 맨 앞의 -1
  const pstart = pend - itemPerLoad;

  console.log(`이전 데이터 로딩...${pstart}...${pend}`);
  fetch(`/api/data?start=${pstart}&end=${pend}`)
    .then((response) => response.json())
    .then((items) => {
      items.forEach((item) => {
        // 새로운 아이템 추가
        const itemElement = document.createElement("div");
        itemElement.classList.add("item");
        itemElement.textContent = item;
        container.insertBefore(itemElement, firstItem); // 맨 앞에 삽입하기
      });

      // 좌표를 계산해서 그만큼 스크롤바를 이동
      const firstItemHeight = firstItem.clientHeight;
      const beforeLoadingPos = firstItemHeight * items.length;
      window.scrollTo(0, beforeLoadingPos);

      let itemsToRemove = container.children.length - maxItemsOnScreen;
      if (itemsToRemove > 0) {
        console.log("지워야할 갯수는? ", itemsToRemove);
        while (itemsToRemove-- > 0) {
          container.removeChild(container.lastChild);
        }
      }
    });
}

window.addEventListener("scroll", () => {
  console.log(`전체 길이: ${window.innerHeight} | 스크롤 위치:  ${window.scrollY} | 문서 전체의 크기: ${document.body.offsetHeight}`);
  if (!loading && window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    //   if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    console.log("화면 끝");
    console.log(`시작: ${start}, 끝: ${end}`);
    fetchData();
  } else if (window.scrollY === 0) {
    console.log("맨 위");
    fetchPrevData();
  }
});
