document.addEventListener("DOMContentLoaded", () => {
  fetch("/product")
    .then((response) => response.json())
    .then((products) => displayProducts(products));

  fetch("/cart")
    .then((response) => response.json())
    .then((products) => displayCart(products));
});

function displayProducts(products) {
  // 바디에 바로 달아도 전혀 상관 없음
  const productTableBody = document.querySelector("#productTable tbody");
  products.forEach((product) => {
    const row = document.createElement("tr");
    row.innerHTML = `
    <td>${product.id}</td>
    <td>${product.name}</td>
    <td>${product.price}</td>
    <td><button onclick="addToCart(${product.id})">담기</button></td>
    `;
    productTableBody.appendChild(row);
  });
}

// 내가 짠 거
// function displayProducts(products) {
//   const productBody = document.getElementById("productBody");
//   console.log(products);
//   console.log(products[0].name);

//   for (let product in products) {
//     const row = document.createElement("tr");

//     const td1 = document.createElement("td");
//     const td2 = document.createElement("td");
//     const td3 = document.createElement("td");
//     const button = document.createElement("button");

//     td1.innerHTML = products[product].id;
//     td2.innerHTML = products[product].name;
//     td3.innerHTML = products[product].price;

//     row.append(td1);
//     row.append(td2);
//     row.append(td3);

//     productBody.appendChild(row);
//   }
// }

// RESTful하게 고치기

function addToCart(productId) {
  fetch(`/add-to-cart/${productId}`, { method: "POST" });
  // TODO: 나중에 성공/실패 등등 확인하는 코드 작성
}

// =>
// function addToCart(productId) {
//     fetch("/add-to-cart",{
//         method:"POST",
//     })
// }

function displayCart(products) {
  //
}

// 구조적으로 좋은 코드는 아님
// 버튼마다 하드 코딩

// 버튼마다 id를 받아와 인자로 넘겨주는 것이 베스트
