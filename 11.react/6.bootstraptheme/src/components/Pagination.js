const Pagination = () => {
  return (
    <div>
      <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center">
          <li class="page-item">
            <a class="page-link bg-dark text-light" href="#">
              &laquo;
            </a>
          </li>
          <li class="page-item">
            <a class="page-link bg-dark text-light" href="#">
              1
            </a>
          </li>
          <li class="page-item">
            <a class="page-link bg-dark text-light" href="#">
              2
            </a>
          </li>
          <li class="page-item">
            <a class="page-link bg-dark text-light" href="#">
              3
            </a>
          </li>
          <li class="page-item">
            <a class="page-link bg-dark text-light" href="#">
              &raquo;
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
