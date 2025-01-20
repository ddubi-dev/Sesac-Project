let reviews = [];

async function submitReview() {
  const rating = document.querySelector("input[name='rating']:checked").value;
  const comment = document.getElementById("comment").value;

  try {
    const response = await fetch("/api/review", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rating, comment }),
    });

    console.log("response: ", response);
    await getReview();
    await fetchAISummary();
  } catch (error) {
    console.error("에러 발생: ", error);
  }
}

async function getReview() {
  try {
    const response = await fetch("/api/review");
    // if(!response.ok)
    const data = await response.json();
    reviews = data.reviews;
    console.log("reviews: ", reviews);
    displayReviews();
  } catch (error) {
    console.error("에러 발생: ", error);
  }
}

// addEventListener, domloaded
window.onload = async () => {
  // 기다렸다가 받아올 것
  await getReview();
  await fetchAISummary();
};

function displayReviews() {
  const reviewsContainer = document.getElementById("reviews-container");

  // 현재 있는 거부터 삭제
  reviewsContainer.querySelectorAll(".review-box").forEach((box) => box.remove());

  // 새로 추가
  reviews.forEach((review) => {
    const reviewBox = document.createElement("div");
    reviewBox.className = "review-box";
    reviewBox.innerHTML = `
        <p>Rating: ${review.rating}</p>
        <p>${review.comment}</p>
    `;
    reviewsContainer.appendChild(reviewBox);
  });
}

async function fetchAISummary() {
  try {
    const response = await fetch("/api/ai-summary");
    const data = await response.json();
    const aiSummary = data.summary;
    displayAIReviews(aiSummary, data.averageRating);
  } catch (error) {
    console.error("에러 발생: ", error);
  }
}

function displayAIReviews(summary, score) {
  const summaryContainer = document.getElementById("ai-summary");
  summaryContainer.innerHTML = `<p><strong>AI 요약: </strong> ${summary}</p><p><strong>평균 평점: </strong>${score.toFixed(2)}</p>`;
}
