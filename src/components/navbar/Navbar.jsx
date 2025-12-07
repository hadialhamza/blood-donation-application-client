import { FaMoon, FaRegSun } from "react-icons/fa";
import Container from "../container/Container";
import { Link } from "react-router";

import { useAuth } from "../../hooks/useAuth";
import { TbTruckLoading } from "react-icons/tb";
import { AiOutlineLoading } from "react-icons/ai";

const Navbar = () => {
  const { loading, user, logOut } = useAuth();
  return (
    <div className="sticky top-0 glass shadow-sm z-50">
      <Container>
        <div className="navbar">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {" "}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />{" "}
                </svg>
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to="dashboard">Dashboard</Link>
                </li>
                <li>
                  <a>Parent</a>
                  <ul className="p-2">
                    <li>
                      <a>Submenu 1</a>
                    </li>
                    <li>
                      <a>Submenu 2</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a>Item 3</a>
                </li>
              </ul>
            </div>
            <Link to="/" className="btn btn-ghost text-xl">
              Home
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <li>
                <Link to="dashboard">Dashboard</Link>
              </li>
              <li>
                <details>
                  <summary>Parent</summary>
                  <ul className="p-2 bg-base-100 w-40 z-1">
                    <li>
                      <a>Submenu 1</a>
                    </li>
                    <li>
                      <a>Submenu 2</a>
                    </li>
                  </ul>
                </details>
              </li>
              <li>
                <a>Item 3</a>
              </li>
            </ul>
          </div>
          <div className="navbar-end">
            <label className="swap swap-rotate mr-2">
              <input
                type="checkbox"
                className="theme-controller"
                value="cupcake"
              />

              {/* sun icon */}
              <FaRegSun className="swap-off h-5 w-5 fill-current" />

              {/* moon icon */}
              <FaMoon className="swap-on h-5 w-5 fill-current" />
            </label>
            {loading ? (
              <AiOutlineLoading className="animate-spin" />
            ) : user ? (
              <div className="flex gap-2 items-center">
                <div
                  className="tooltip tooltip-bottom"
                  data-tip={user.displayName}
                >
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-base-content/20">
                    <img
                      className="w-full h-full object-cover"
                      src={user.photoURL}
                      referrerPolicy="no-referrer"
                      alt={user.displayName}
                    />
                  </div>
                </div>
                <button onClick={logOut} className="btn btn-neutral">
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="btn btn-primary">
                Login
              </Link>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
