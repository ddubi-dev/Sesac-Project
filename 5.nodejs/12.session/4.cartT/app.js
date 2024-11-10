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

// 정적 폴더를 public으로 정의
// 사용자가 route르 요청해서, 그 중 없으면 여기를 뒤져서 있는 파일을 가져감
app.use(express.static(path.join(__dirname, "public"))); // get("/") 안해도 기본 파일(index.html)을 가져간다.
// app.use("static", express.static(path.join(__dirname, "public")));
// app.use(express.text());

// 세션 추가
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

app.get("/cart", (req, res) => {
  const cart = req.session.cart || [];
  console.log(`카트요청: ${JSON.stringify(cart)}`);
  res.json({ cart });
  // TODO: 카트 항목의 합산 가격도 반환

  // 모든 연산 로직은 가능한 백에서, 프론트는 어떻게 잘 뿌릴지
});

app.post("/add-to-cart/:productId", (req, res) => {
  const productId = parseInt(req.params.productId); // 모든 통신은 문자열로 한다~!!!
  //   console.log(productId);
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return res.status(404).json({ message: "상품이 없다!" });
  }

  const cart = req.session.cart || []; // 있으면 해당 세션의 카트 가져오고, 없으면 빈 배열로 초기화
  cart.push({
    id: product.id,
    name: product.name,
    price: product.price,
  });

  console.log(cart);

  req.session.cart = cart;

  res.json({ message: "상품이 장바구니에 담겼습니다" });
});

app.listen(PORT, () => {
  console.log("서버 레디");
});
