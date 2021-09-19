import { useQuery } from "@apollo/client";
import React from "react";
import { Link } from "react-router-dom";
import { GET_USER_BY_ID } from "../gql/query";
import { createProfile } from "../utils/profile";
import Follow from "./Follow";

const UserContainer = ({ id, button }) => {
  const { data } = useQuery(GET_USER_BY_ID, {
    variables: { id },
  });
  const svg = createProfile(id);
  return (
    <>
      {data && (
        <div className="container p-2 mb-2 shadow rounded flex justify-between items-center">
          <div className="space-y-2">
            <Link to={`/profile/${id}`}>
              <div className="container flex items-center space-x-3">
                <div
                  className="w-10 h-10"
                  dangerouslySetInnerHTML={{ __html: svg }}
                ></div>
                <p className="font-medium text-lg">
                  {data.getUserById.username}
                </p>
              </div>
            </Link>
            <div className="flex space-x-5">
              <p className="text-sm font-medium">
                {data.getUserById.followers.length}{" "}
                <span className="text-gray-600">followers</span>
              </p>
              <p className="text-sm font-medium">
                {data.getUserById.followings.length}{" "}
                <span className="text-gray-600">followings</span>
              </p>
            </div>
          </div>
          {button && <Follow id={id} data={data} />}
        </div>
      )}
    </>
  );
};
export default UserContainer;
