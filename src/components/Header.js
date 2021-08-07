import React from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../hooks/auth";

const Header = () => {
  const user = useAuth();

  return (
    <nav className=" sticky top-0 w-full h-14 bg-white flex justify-around items-center px-4 z-10 ">
      <h1 className="text-2xl font-extrabold text-blue-500 font-sans">
        Storium
      </h1>
      <ul className="flex justify-between items-center w-1/2 md:hidden">
        <li>
          <Link
            to="/"
            className="font-medium text-gray-800 cursor-pointer hover:text-blue-500"
          >
            Feeds
          </Link>
        </li>
        {user && (
          <li>
            <Link
              to="/editor"
              className="font-medium text-gray-800 cursor-pointer"
            >
              Editor
            </Link>
          </li>
        )}
        {user ? (
          <li>
            <Link to={`/profile/${user}`}>
              <button className=" w-32 h-9 bg-blue-500 font-medium text-white rounded-md hover:bg-blue-700 cursor-pointer outline-none shadow-md">
                Profile
              </button>
            </Link>
          </li>
        ) : (
          <li>
            <Link to="/login">
              <button className=" w-32 h-9 bg-blue-500 font-medium text-white rounded-md hover:bg-blue-700 cursor-pointer outline-none shadow-md ">
                Get Started
              </button>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};
export default Header;
