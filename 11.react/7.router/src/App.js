import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import Navigation from "./Navigation";
import Users from "./Users";
import UserDetail from "./UserDetail";

const App = () => {
  return (
    <Router>
      <div>
        <h1>나의 웹사이트</h1>
        <Navigation></Navigation>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/about" element={<About></About>}></Route>
          <Route path="/contact" element={<Contact></Contact>}></Route>
          <Route path="/users" element={<Users></Users>}></Route>
          <Route path="/users/:userId" element={<UserDetail></UserDetail>}></Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
