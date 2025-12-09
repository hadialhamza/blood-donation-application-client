import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import BloodLineLogo from "../logo/BloodLineLogo";
import { FaMoon, FaRegSun } from "react-icons/fa";
import Container from "../container/Container";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "cupcake"
  );

  const handleToggle = (e) => {
    if (e.target.checked) {
      setTheme("night");
    } else {
      setTheme("cupcake");
    }
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };

  const navOptions = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/public-donation-requests">Donation Requests</NavLink>
      </li>
      <li>
        <NavLink to="/blog">Blog</NavLink>
      </li>

      {user && (
        <li>
          <NavLink to="/funding">Funding</NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="shadow-sm sticky top-0 z-50 bg-base-100">
      <Container>
        <div className="navbar">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-1 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navOptions}
          </ul>
        </div>
        <Link to="/">
          <BloodLineLogo />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">{navOptions}</ul>
      </div>
      <div className="navbar-end gap-2">
        {/* Theme Toggle */}
        <label className="swap swap-rotate">
          <input
            type="checkbox"
            className="theme-controller"
            onChange={handleToggle}
            checked={theme === "night"}
          />
          <FaRegSun className="swap-off h-6 w-6 fill-current" />
          <FaMoon className="swap-on h-6 w-6 fill-current" />
        </label>

        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="User" src={user?.photoURL} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-1 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/dashboard" className="justify-between">
                  Dashboard
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <button onClick={handleLogOut}>Logout</button>
              </li>
            </ul>
          </div>
        ) : (
          <Link to="/login" className="btn btn-primary btn-sm">
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
