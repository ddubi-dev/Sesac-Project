const questionInput = document.getElementById("questionInput");
const sendButton = document.getElementById("sendButton");
const chatContainer = document.getElementById("chatContainer");

// 프론트 html, 함수 먼저
// 프론트 js
// 백엔드 js

async function convertCurrency() {
  const amount = document.getElementById("amountInput").value;
  const from = document.getElementById("currencyFromSelect").value;
  const to = document.getElementById("currencyToSelect").value;

  try {
    const response = await fetch("/api/chat-currency", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount, from, to }),
    });

    const result = await response.json();
    console.log(result);

    addMessage(result.message, false);
  } catch (error) {
    console.log("에러 발생: ", error.message);
  }
}

function addMessage(content, isUser = true) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message");

  if (isUser) {
    messageDiv.classList.add("user-message");
  } else {
    messageDiv.classList.add("bot-message");
  }
  messageDiv.innerHTML = `
  <div class="sender">${isUser ? "사용자" : "AI챗봇"}</div>
    <div class="content">${content}</div>`;

  chatContainer.appendChild(messageDiv);
  chatContainer.scrollTop = chatContainer.scrollHeight;
  if (!isUser) {
    readText(content);
  }
}

// 읽기
function readText(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "ko-KR"; // zh-CN, en-US, ja-JP
  speechSynthesis.speak(utterance);
}

async function sendMessage() {
  const question = questionInput.value.trim();
  addMessage(question);
  questionInput.value = ``;

  try {
    const response = await fetch("/api/chat", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    });

    const data = await response.json();
    console.log(data.answer);
    if (data.answer) {
      addMessage(data.answer, false);
    }
  } catch (error) {
    console.error("에러 발생", error.message);
  }
}

sendButton.addEventListener("click", sendMessage);
questionInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

amountInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") convertCurrency();
});
