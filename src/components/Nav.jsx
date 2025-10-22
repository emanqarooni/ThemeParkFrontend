import { Link } from "react-router-dom"

const Navbar = () => (
  <nav className="navbar">
    <Link to="/" className="logo">
      Theme Parks
    </Link>
    <div className="nav-links">
      <Link to="/">Home</Link>
      <Link to="/create">Add Park</Link>
    </div>
  </nav>
)

export default Navbar
