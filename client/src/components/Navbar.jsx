import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContexProvider";

function Navbar() {
  const { logout, currentUser } = useContext(AuthContext);
  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img src="/img/logo.png" />
          </Link>
        </div>
        <div className="links">
          <Link className="link" to="/?cat=art">
            <h6>ART</h6>
          </Link>
          <Link className="link" to="/?cat=science">
            <h6>SCIENCE</h6>
          </Link>
          <Link className="link" to="/?cat=technology">
            <h6>TECHNOLOGY</h6>
          </Link>
          <Link className="link" to="/?cat=cinema">
            <h6>CINEMA</h6>
          </Link>
          <Link className="link" to="/?cat=design">
            <h6>DESIGN</h6>
          </Link>
          <Link className="link" to="/?cat=food">
            <h6>FOOD</h6>
          </Link>

          {currentUser ? (
            <>
              {" "}
              <span>{currentUser.username}</span>{" "}
              <span onClick={() => logout()}>Logout</span>
            </>
          ) : (
            <Link className="link" to={"/login"}>
              login
            </Link>
          )}
          <span className="write">
            <Link className="link" to="/write">
              Write
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
