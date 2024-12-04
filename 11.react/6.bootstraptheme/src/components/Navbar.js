const Navbar = () => {
  return (
    <div>
      <nav class="navbar navbar-dark navbar-expand-sm">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            마이CRM
          </a>
          {/* <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button> */}
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">
                  User
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Order
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Order Item
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Item
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Store
                </a>
              </li>
            </ul>
            {/* <button class="btn btn-outline-secondary" id="theme-toggle">
              Switch to 라이트모드
            </button> */}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
