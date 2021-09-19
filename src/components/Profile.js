import { useQuery } from "@apollo/client";
import React from "react";

import { useParams, Link, useHistory } from "react-router-dom";
import { GET_USER_BY_ID } from "../gql/query";
import { useAuth } from "../hooks/auth";
import { createProfile } from "../utils/profile";
import Follow from "./Follow";
import Logout from "./Logout";

const Profile = () => {
  const history = useHistory();
  const user = useAuth();
  const { id } = useParams();
  const svg = createProfile(id);
  const { data } = useQuery(GET_USER_BY_ID, {
    variables: {
      id: id,
    },
  });

  return (
    <>
      {data && (
        <div className="container px-8 pb-2 md:p-1 ">
          <div className="flex justify-around items-start mt-4 md:mt-0 md:flex-col">
            <div className="w-1/3  p-4 shadow-md rou border-2 flex flex-col items-center justify-between bg-gray-100 md:container md:mb-6">
              <div
                className="mx-8 w-40 border-2 p-1 shadow-lg rounded-full"
                dangerouslySetInnerHTML={{ __html: svg }}
              ></div>
              <p className="text-5xl capitalize font-extrabold py-4 pb-8 md:pb-4 md:text-2xl md:font-bold text-gray-800">
                {user === id && "Hello"} {data.getUserById.username}
              </p>
              {user === id && (
                <span className="capitalize font-medium text-md text-gray-500 md:text-base ">
                  Have a nice Editing
                </span>
              )}
              <div className="mt-4 mb-4">
                <p className="text-indigo-500 font-bold md:font-semibold md:text-base ">
                  <span className="text-gray-500 md:text-sm ">Email</span> :{" "}
                  {data.getUserById.email}
                </p>
                <Link to={`/${id}/followers`}>
                  <p className="font-semibold text-base md:text-sm text-gray-500">
                    <span className="text-indigo-500 font-bold text-lg md:text-base">
                      {data.getUserById.followers.length}
                    </span>{" "}
                    followers
                  </p>
                </Link>
                <Link to={`/${id}/followings`}>
                  <p className="font-semibold text-base md:text-sm   text-gray-500">
                    <span className=" text-indigo-500 font-bold text-lg md:text-base">
                      {data.getUserById.followings.length}
                    </span>{" "}
                    followings
                  </p>
                </Link>
              </div>
              {user ? (
                user.id === id ? (
                  <div className="flex container justify-around items-center">
                    <button
                      onClick={() => history.push("/editor")}
                      className=" w-36 md:w-32 md:h-8 h-9 bg-green-200 rounded-md font-semibold capitalize text-base hover:bg-green-300  text-green-700"
                    >
                      Create Story
                    </button>
                    <Logout />
                  </div>
                ) : (
                  <Follow id={id} user={user.id} data={data} />
                )
              ) : (
                ""
              )}
            </div>
            <div className="w-1/2 md:container">
              <p className="text-gray-800 font-bold text-2xl md:text-xl  capitalize mb-8 md:text-center">
                stories by {data.getUserById.username}
              </p>
              {data.getUserById.stories.length > 0 ? (
                data.getUserById.stories.map((s) => (
                  <Link key={s.id} to={`/story/${s.id}`}>
                    <div className="w-full  mr-auto ml-auto mb-4 px-4 py-2 flex justify-between rounded-md  flex-col border-2 border-blue-300">
                      <p className="text-3xl font-extrabold md:font-bold font-sans mb-6 md:mb-3 text-gray-800 cursor-pointer capitalize hover:text-yellow-800 md:text-xl">
                        {s.title}
                      </p>
                      <div>
                        <p className="text-gray-600 text-sm font-semibold pb-2">
                          Published on :{" "}
                          {new Date(Number(s.createdAt)).toDateString()}
                        </p>
                      </div>
                      <div className="flex container justify-around items-center  ">
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
                            {s.reactions.length}
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
                            {s.comments.length}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="container h-28 flex justify-center items-center">
                  <p className="font-bold text-lg capitalize text-gray-300">
                    Nothing to show here
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
