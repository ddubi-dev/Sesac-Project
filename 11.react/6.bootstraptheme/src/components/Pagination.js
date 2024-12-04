import { useTheme } from "./ThemeContext";

const Pagination = () => {
  const { isDarkMode } = useTheme();

  return (
    <div>
      <nav aria-label="Page navigation example ">
        <ul className={`pagination justify-content-center  ${isDarkMode ? "bg-dark" : "bg-light"}`}>
          <li className="page-item">
            <a className={`page-link ${isDarkMode ? "bg-dark text-light" : "bg-light text-dark"}`} href="#">
              &laquo;
            </a>
          </li>
          <li className="page-item">
            <a className={`page-link ${isDarkMode ? "bg-dark text-light" : "bg-light text-dark"}`} href="#">
              1
            </a>
          </li>
          <li className="page-item">
            <a className={`page-link ${isDarkMode ? "bg-dark text-light" : "bg-light text-dark"}`} href="#">
              2
            </a>
          </li>
          <li className="page-item">
            <a className={`page-link ${isDarkMode ? "bg-dark text-light" : "bg-light text-dark"}`} href="#">
              3
            </a>
          </li>
          <li className="page-item">
            <a className={`page-link ${isDarkMode ? "bg-dark text-light" : "bg-light text-dark"}`} href="#">
              &raquo;
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
