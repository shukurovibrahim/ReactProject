import { Link } from "react-router-dom";

import "./header.css";

export const Header = ({ onRedirect, children }) => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">MustSee</div>
      <div className="navbar-links">
        <Link to="/" className="navbar-link" onClick={onRedirect}>
          Home
        </Link>
        <Link to="/basket" className="navbar-link" onClick={onRedirect}>
          Basket
        </Link>
      </div>
      <div className="navbar-search">{children}</div>
    </nav>
  );
};
