try {
  let response = fetch("https://api.example.com/data");
  if (!response.ok) {
    throw new Error(`HTTP 오류: ${reponse.status}`);
  }
} catch (error) {
  console.log("요청 오류...");
}
