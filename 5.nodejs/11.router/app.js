const express = require("express");
const app = express();
const PORT = 3000;

const userRouter = require("./route/userRouter");
const productRouter = require("./route/productRouter");
const cartRouter = require("./route/cartRouter");

app.use("/user", userRouter); // 여기로 온 모든 경로는 저기로 들어가
app.use("/product", productRouter); //
app.use("/cart", cartRouter); //

app.get("/", (req, res) => {
  res.send("웰컴");
});

app.listen(PORT, () => {
  console.log("서버 레디");
});
