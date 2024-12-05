import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Users from "./Users";
import UserDetail from "./UserDetail";

const App = () => {
  return (
    <Router>
      <div>
        <h1>사용자 정보 요청 웹사이트</h1>
        <Routes>
          <Route path="/" element={<Navigate to="/users"></Navigate>}></Route>
          <Route path="/users" element={<Users></Users>}></Route>
          <Route path="/users/:userId" element={<UserDetail></UserDetail>}></Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
