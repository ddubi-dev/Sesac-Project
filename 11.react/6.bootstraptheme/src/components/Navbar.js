// import { useContext } from "react";
// import ThemeContext from "./ThemeContext";

import { useTheme } from "./ThemeContext";

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div>
      <nav className={`navbar ${isDarkMode ? "navbar-dark navbar-expand-sm bg-dark " : "navbar-light navbar-expand-sm "}`}>
        <div className="container-fluid">
          <span className="navbar-brand" href="#">
            마이CRM
          </span>
          {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button> */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <span className="nav-link active" aria-current="page" href="#">
                  User
                </span>
              </li>
              <li className="nav-item">
                <span className="nav-link">Order</span>
              </li>
              <li className="nav-item">
                <span className="nav-link">Order Item</span>
              </li>
              <li className="nav-item">
                <span className="nav-link">Item</span>
              </li>
              <li className="nav-item">
                <span className="nav-link">Store</span>
              </li>
            </ul>
            <button className="btn btn-outline-secondary" onClick={toggleTheme}>
              {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
