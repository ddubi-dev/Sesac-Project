import { useEffect } from "react";

import Navbar from "./Navbar";
import Table from "./Table";
import Pagination from "./Pagination";
import { useTheme } from "./ThemeContext";

const App = () => {
  const { isDarkMode } = useTheme();
  // 추가 작업
  useEffect(() => {
    document.body.className = isDarkMode ? "bg-dart text-light" : "bg-light text-dark";
  }, [isDarkMode]);
  // 하위 컴포넌트에서 사용 가능하기 때문에 -> ThemeSelector를 윗단으로 보내기
  // 철학에 위배(?) 왜냐면.. nav가 app 전체 위에 있기 때문??

  return (
    <div>
      <Navbar></Navbar>
      <Table></Table>
      <Pagination></Pagination>
    </div>
  );
};

export default App;
