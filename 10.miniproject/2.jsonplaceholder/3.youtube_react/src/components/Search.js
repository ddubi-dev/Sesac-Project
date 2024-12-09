const Search = ({ search }) => {
  const handleSearch = (e) => {
    search(e.target.value); // 입력값 변경될 때마다...
  };
  return (
    <div>
      <input type="text" name="q" placeholder="검색어를 입력하세요." />
      <button type="submit" onClick={handleSearch}></button>
    </div>
  );
};

export default Search;
