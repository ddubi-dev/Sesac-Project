import { useState } from "react";
import SearchBar from "./components/SearchBar";
import SearchResult from "./components/SearchResult";

const App = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);

  // useEffect
  const handleSearch = async (query) => {
    setQuery(query);

    try {
      const response = await fetch(`/search/blog?query=${encodeURIComponent(query)}`);
      const data = await response.json();
      console.log("data: ", data);

      if (data.items) {
        setResult(data.items);
        console.log("result: ", result);
      } else {
        setResult([]);
      }
    } catch (error) {
      console.log("에러 발생 : ", error.message);
    }
  };

  return (
    <div>
      <h1>네이버 블로그 검색</h1>
      <SearchBar onSearch={handleSearch}></SearchBar>
      <SearchResult result={result}></SearchResult>
    </div>
  );
};

export default App;
