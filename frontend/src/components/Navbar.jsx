import { Link } from "react-router-dom";

function Navbar({ cart }) {
  return (
    <nav className="navbar navbar-dark bg-dark px-3">
      <span className="navbar-brand">Konaseema Snacks</span>
      <Link to="/cart" className="btn btn-warning">
        🛒 Cart ({cart.length})
      </Link>
    </nav>
  );
}

export default Navbar;
