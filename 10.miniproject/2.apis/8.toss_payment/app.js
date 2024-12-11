require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const axios = require("axios"); // OR node-fetch
const path = require("path");

const app = express();
const PORT = 3000;

app.use(morgan("dev"));
app.use(express.json());
app.use(express.static("public"));

// 백엔드가 PG사에 confirm을 받기 위한 변수들..
// 프로세스와 흐름들을 이해하면 어렵지 않음.
const apiSecretKey = process.env.TOSS_SECRET_KEY;
const encodedApiSecretKey = "Basic " + Buffer.from(apiSecretKey + ":").toString("base64");
// :
// base64로 인코딩한 값을 넣어라.
// console.log(encodedApiSecretKey);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "product.html"));
});

// 최종 결제 승인 요청을 토스에게 보내기 (받은 정보가 이건데, 이거 맞아? PG사로)
// 이걸 하려고 express.json 한것임.
app.post("/confirm/payment", async (req, res) => {
  console.log("서버측, confirm/payment , 여기야!!");
  const { paymentKey, orderId, amount } = req.body;
  console.log("paymentKey: ", paymentKey, "orderId: ", orderId, "amount: ", amount);

  // try/catch 해야함!!!
  try {
    const response = await axios.post(
      "https://api.tosspayments.com/v1/payments/confirm",
      {
        paymentKey,
        orderId,
        amount,
      },
      {
        headers: {
          Authorization: encodedApiSecretKey, // 인코딩된 키를 넣어야 함!!!
          "Content-Type": "application/json",
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error("최종 결제 승인 요청 실패 : ", error.message);
    res.status(400).json({ error: "결제 승인 실패" });

    // 사용자 결제는 성공 (success.html) && 내부적으로는 실패 코드 오면
    // (최종 컨펌 안됨)
    // 사용자의 돈은 빠져나갔지만, 결제는 실패되었으니, 상품 안 보냄.
  }
});

app.listen(PORT, () => {
  console.log("서버 레디 on ", PORT);
});
