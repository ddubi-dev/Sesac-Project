const express = require("express");
const session = require("express-session");
const path = require("path");

const app = express();
const PORT = 3000;

const products = [
  { id: 1, name: "바나나", price: 2000 },
  { id: 2, name: "망고", price: 5000 },
  { id: 3, name: "오렌지", price: 3000 },
];

app.use(express.text());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "my-secret-1234",
    resave: false,
    saveUninitialized: true,
  })
);

app.get("/product", (req, res) => {
  res.json(products); // json 형식 줄게.
});

// 장바구니 정보 요청
app.get("/cart", (req, res) => {
  const cart = req.session.cart || [];
  console.log(`cart: ${JSON.stringify(cart)}`);

  let sum = 0;
  cart.forEach((product) => {
    sum += parseInt(product.price);
  });

  res.json({ cart, sum });

  // 모든 연산 로직은 가능한 백에서, 프론트는 어떻게 잘 뿌릴지
});

// 장바구니에 추가
app.post("/cart/:productId", (req, res) => {
  const productId = parseInt(req.params.productId); // 모든 통신은 문자열로 한다~!!!
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return res.status(404).json({ message: "상품이 없다!" });
  }

  const cart = req.session.cart || []; // 있으면 해당 세션의 카트 가져오고, 없으면 빈 배열로 초기화

  // 겹치는 id가 있으면 +1
  const p = cart.find((p) => p.id === productId);

  if (p) {
    p.number += 1;
    const product = products.find((item) => item.id === p.id);
    p.price = parseInt(product.price) * p.number;
  } else {
    // 아니면
    cart.push({
      id: product.id,
      // id: cart.length + 1, // 카트 아이디
      name: product.name,
      number: 1,
      price: product.price,
    });
  }

  req.session.cart = cart;

  res.json({ message: "상품이 장바구니에 담겼습니다" });
});

app.delete("/cart", (req, res) => {
  console.log(`삭제할래요: ${req.body}`);
  const cart = req.session.cart;
  console.log(`삭제 전 cart: ${JSON.stringify(req.session.cart)}`);
  // delete cart[parseInt(req.body)];
  const index = parseInt(req.body);
  if (index >= 0 && index < cart.length) {
    cart.splice(index, 1); // 해당 인덱스의 요소를 완전히 제거
  }
  req.session.cart = cart;

  console.log(`삭제 후 cart: ${JSON.stringify(req.session.cart)}`);
  res.status(200).send("cart에서 삭제 성공");
});

app.listen(PORT, () => {
  console.log("서버 레디");
});
