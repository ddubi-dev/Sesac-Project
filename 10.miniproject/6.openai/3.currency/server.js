const express = require("express");
const morgan = require("morgan");
const OpenAI = require("openai");
require("dotenv").config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// 무결성 체크
if (!openai.apiKey) {
  console.log("키 오류");
  process.exit(1);
}

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));

const exchangeRate = {
  USD: 1.0, // 기준 통화
  KRW: 1400,
  EUR: 0.8,
};

function convertCurrency(amount, from, to) {
  const baseAmount = amount / exchangeRate[from];
  const convertedAmount = baseAmount * exchangeRate[to];
  return convertedAmount.toFixed(2); // 소숫점 2자리까지
}

// 환율 조회
app.post("/api/chat-currency", async (req, res) => {
  const { amount, from, to } = req.body;
  console.log("사용자 입력: ", amount, from, to);

  const convertedAmount = convertCurrency(amount, from, to);
  const message = `${amount} ${from} 은 ${convertedAmount} ${to} 와 같습니다.`;

  // res.json({ convertedAmount, message });

  try {
    // 한국어, 영어, 중국어 등 언어를 입력 받을 수도 있다.
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "너는 환전소에서 근무하는 은행원이야. 답변을 부산 사투리로 해줘. " },
        { role: "user", content: message },
      ],
      temperature: 0.7,
    });

    const answer = response.choices[0].message.content;
    console.log("챗봇 응답: ", answer);

    res.json({ message: answer });
  } catch (error) {
    console.error("오류 발생: ", error.message);
    res.status(500).json({ error: "알 수 없는 오류" });
  }
});

// 챗봇
app.post("/api/chat", async (req, res) => {
  const { question } = req.body;
  console.log("사용자 입력: ", question);

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful assistant who can speak only korean" },
        { role: "user", content: question },
      ],
      temperature: 0.7,
    });

    const answer = response.choices[0].message.content;
    console.log("챗봇 응답: ", answer);

    res.json({ answer });
  } catch (error) {
    console.error("오류 발생: ", error.message);
    res.status(500).json({ error: "알 수 없는 오류" });
  }
});

app.listen(3000, () => {
  console.log("서버 레디");
});
