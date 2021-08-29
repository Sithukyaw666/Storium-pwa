import React from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../hooks/auth";
import logo from "../assets/logo/logo.svg";
import { createProfile } from "../utils/profile";

const Header = () => {
  const user = useAuth();
  const svg = createProfile(user);

  return (
    <nav
      className={`sticky top-0 w-full h-16 bg-white flex justify-around items-center   px-4 z-10`}
    >
      <img className="w-20 " src={logo} alt="Storium" />
      {user ? (
        <Link
          to={`/profile/${user}`}
          dangerouslySetInnerHTML={{ __html: svg }}
          className="hidden md:flex items-center justify-center cursor-pointer outline-none sticky right-0 top-2 w-10 h-10 rounded-full  "
        ></Link>
      ) : (
        <Link
          to="/login"
          className="hidden md:flex text-blue-700 items-center justify-center cursor-pointer outline-none sticky right-0 top-2 w-8 h-8 rounded-full bg-blue-200  "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </Link>
      )}

      <ul
        className={`flex justify-between items-center w-1/2 md:-translate-x-full md:hidden `}
      >
        <li>
          <Link
            to="/"
            className="font-medium w-20 flex items-center justify-center text-gray-800 cursor-pointer hover:text-blue-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>{" "}
            Stories
          </Link>
        </li>
        {user && (
          <li>
            <Link
              to="/editor"
              className="font-medium flex w-32 justify-center items-center text-gray-800 cursor-pointer hover:text-blue-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>{" "}
              Create Story
            </Link>
          </li>
        )}
        {user ? (
          <li>
            <Link to={`/profile/${user}`}>
              <div
                className="w-9 h-9"
                dangerouslySetInnerHTML={{ __html: svg }}
              ></div>
            </Link>
          </li>
        ) : (
          <li>
            <Link to="/login">
              <button className=" flex items-center justify-center w-32 h-9 bg-blue-500 font-medium text-white rounded-md hover:bg-blue-700 cursor-pointer outline-none shadow-md ">
                Get Started
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </button>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};
export default Header;
