import { useQuery } from "@apollo/client";
import React from "react";
import { Link } from "react-router-dom";

import { GET_STORY } from "../gql/query";
import { createProfile } from "../utils/profile";

const Feeds = () => {
  const { data } = useQuery(GET_STORY);

  return (
    <div className="w-1/2 m-auto  px-8 py-4 md:w-full md:px-2 ">
      {data ? (
        data.getAllStory.map((d) => (
          <Link to={`/story/${d.id}`}>
            <div className="w-full   mr-auto ml-auto mb-4 px-4 md:px-2 py-2 flex justify-between flex-col border-2 border-blue-400 rounded-md">
              <div className="mb-6 md:mb-1">
                <Link
                  to={`/profile/${d.authorID}`}
                  className="flex items-center md:flex-col md:items-start"
                >
                  <div className="container flex items-center">
                    <div
                      className="w-9 h-9 border-2 rounded-full border-gray-200 p-0.5 hover:border-blue-500"
                      dangerouslySetInnerHTML={{
                        __html: createProfile(d.authorID),
                      }}
                    ></div>
                    <p className="font-semibold capitalize md:text-sm text-md px-4 md:px-2 text-gray-800 hover:text-blue-500">
                      {d.author.username}
                    </p>
                  </div>
                </Link>
              </div>
              <p className="text-3xl font-extrabold md:font-bold font-sans  text-gray-700 cursor-pointer capitalize hover:text-blue-500 md:text-xl ">
                {d.title}
              </p>
              <p className="text-gray-500 text-sm font-semibold py-2">
                Published on : {new Date(Number(d.createdAt)).toDateString()}
              </p>

              <div className="flex container justify-around items-center ">
                <div className=" text-gray-700  flex">
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
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  <p className="font-medium text-base px-1">
                    {d.reactions.length}
                  </p>
                </div>
                <div className=" text-gray-700  flex ">
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
                      d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                    />
                  </svg>
                  <p className="text-base font-medium px-1">
                    {d.comments.length}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <>
          {[0, 0, 0, 0].map((d) => (
            <div className="w-full bg-blue-100  mr-auto ml-auto mb-4 animate-pulse px-4 py-2 flex justify-between flex-col border-2 rounded-md">
              <div className="container h-8 bg-blue-200 rounded-lg  mb-8"></div>
              <div>
                <div className="w-40 h-4 bg-blue-200 mb-2 rounded-sm"></div>
                <div className="w-36 h-6 bg-blue-200 rounded"></div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Feeds;
