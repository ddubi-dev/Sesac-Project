window.onload = () => {
  const quoteElement = document.getElementById("quote");
  const button = document.getElementById("new-quote");

  const fetchQuote = async () => {
    try {
      const response = await fetch("/api/quote");
      const data = await response.json();
      quoteElement.textContent = data.quote;
    } catch (error) {
      quoteElement.textContent = `가져오는 데 실패`;
    }
  };
  button.addEventListener("click", fetchQuote);
};

// http://localhost:3000/
