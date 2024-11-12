import { fetch_checkLoginStatus } from "./checkuser.js";

document.addEventListener("DOMContentLoaded", () => {
  fetch_checkLoginStatus();
  loadProduct();
});

function loadProduct() {
  fetch("/api/products")
    .then((response) => response.json())
    .then((products) => displayProducts(products));
}

function displayProducts(products) {
  const productTableBody = document.querySelector("#productTable tbody");

  products.forEach((product) => {
    const row = document.createElement("tr");
    row.innerHTML = `
          <td>${product.id}</td>
          <td>${product.name}</td>
          <td>${product.price}</td>
          <td><button class="add-to-cart-btn" data-product-id="${product.id}">담기</button></td>
      `;
    // <td><button onclick="addToCart(${product.id})">담기</button></td>
    productTableBody.appendChild(row);
  });

  document.querySelectorAll(".add-to-cart-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.getAttribute("data-product-id");
      addToCart(productId);
    });
  });
}

function addToCart(productId) {
  // fetch 구현필요...
  console.log(`FETCH 구현필요 ${productId} 를 담아서 보내기...`);

  fetch(`/api/cart/${productId}`, {
    method: "POST",
  }).then((response) => {
    if (response.ok) {
      // 장바구니 담기 성공
    } else if (response.status === 401) {
      // 장바구니 담기 실패
      response.json().then((data) => {
        alert(data.message);
        if (data.redirectUrl) {
          window.location.href = data.redirectUrl; // 반복적인 패턴 함수화
        }
      });
    }
  });
}
