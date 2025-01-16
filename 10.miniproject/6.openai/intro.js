// API 요청을 편하게 하는 라이브러리
const axios = require("axios");
require("dotenv").config();

const openaiApiKey = process.env.OPENAI_API_KEY;
const url = "https://api.openai.com/v1/chat/completions";

async function getChatGPTResponse(userInput) {
  const response = await axios.pose(url, {
    //
  });
}

async function chatWithUser() {
  const userInput = "안녕, 챗봇!";
  const aiResponse = await getChatGPTResponse(userInput);
  console.log("챗봇 응답: ", aiResponse);
}

chatWithUser();
