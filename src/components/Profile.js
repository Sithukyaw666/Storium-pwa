import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { GET_USER_BY_ID } from "../gql/query";
import { useAuth } from "../hooks/auth";
import Logout from "./Logout";

const Profile = () => {
  const user = useAuth();
  const { id } = useParams();
  const { data, refetch } = useQuery(GET_USER_BY_ID, {
    variables: {
      id: id,
    },
  });
  useEffect(() => {
    refetch();
  }, []);
  return (
    <>
      {data && (
        <div className="container p-8 ">
          <div className="flex justify-around items-start mt-4">
            <div className="w-1/3  p-4 shadow-md rounded-lg bg-gray-100">
              <p className="text-5xl capitalize font-extrabold pb-8">
                Hello {data.getUserById.username}
              </p>
              <span className="capitalize font-medium text-md text-gray-500 ">
                Have a nice Editing
              </span>
              <div className="mt-4 mb-4">
                <p className="text-md capitalize font-semibold text-gray-700">
                  About
                </p>
                <p className="text-blue-500 font-bold">
                  <span className="text-gray-700">Email</span> :{" "}
                  {data.getUserById.email}
                </p>
                <p className="font-semibold text-base">
                  <span className="text-blue-500 font-bold text-lg">{0}</span>{" "}
                  followers
                </p>
                <p className="font-semibold text-base">
                  <span className="text-blue-500 font-bold text-lg">{0}</span>{" "}
                  followings
                </p>
              </div>
              {user === id && <Logout />}
            </div>
            <div className="w-1/2">
              <p className="text-gray-800 font-bold text-2xl  capitalize mb-8">
                stories by {data.getUserById.username}
              </p>
              {data.getUserById.stories.map((s) => (
                <Link key={s.id} to={`/story/${s.id}`}>
                  <div className="w-full  mr-auto ml-auto mb-4 px-4 py-2 flex justify-between rounded-md bg-yellow-50 flex-col border-2 ">
                    <p className="text-3xl font-extrabold font-sans mb-8 text-gray-800 cursor-pointer capitalize">
                      {s.title}
                    </p>
                    <div>
                      <p className="text-gray-600 text-sm font-semibold">
                        Published on :{" "}
                        {new Date(Number(s.createdAt)).toDateString()}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
