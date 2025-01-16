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

app.post("/api/chat", async (req, res) => {
  const { question } = req.body;
  console.log("사용자 입력: ", question);

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful assistant who can speak only english" },
        { role: "user", content: question }, // 사용자의 질문
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
