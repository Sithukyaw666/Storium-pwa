import { useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";
import { GET_USER_BY_ID } from "../gql/query";
import { useAuth } from "../hooks/auth";
import UserContainer from "./UserContainer";

const Followers = () => {
  const user = useAuth();
  const { id } = useParams();
  const { data } = useQuery(GET_USER_BY_ID, {
    variables: {
      id: id,
    },
  });
  return (
    <>
      {data && (
        <div className="w-1/2 md:container m-auto">
          <p className="text-xl text-gray-600 p-2 font-bold">Followers</p>
          {data.getUserById.followers.length > 0 ? (
            data.getUserById.followers.map((f) => (
              <UserContainer
                key={f}
                id={f}
                button={user === id ? true : false}
              />
            ))
          ) : (
            <div>
              <p>nothing to show here</p>
            </div>
          )}
        </div>
      )}
    </>
  );
};
export default Followers;
