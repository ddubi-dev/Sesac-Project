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

async function getChatGPTResponse(userInput) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful assistant who can speak only english" },
        { role: "user", content: userInput }, // 사용자의 질문
      ],
      temperature: 0.7,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("오류 발생: ", error.message);
  }
}

async function chatWithUser() {
  const userInput = "안녕, 챗봇! 나 오늘 기분이 꿀꿀해";
  const aiResponse = await getChatGPTResponse(userInput);
  console.log("챗봇 응답: ", aiResponse);
}

chatWithUser();
