import { useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";
import { GET_USER_BY_ID } from "../gql/query";
import { useAuth } from "../hooks/auth";
import UserContainer from "./UserContainer";

const Followings = () => {
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
        <div>
          <p className="text-xl text-gray-600 p-2 font-bold">Followings</p>
          {data.getUserById.followings.length > 0 ? (
            data.getUserById.followings.map((f) => (
              <UserContainer
                key={f}
                id={f}
                button={user === id ? true : false}
              />
            ))
          ) : (
            <div className="container h-96 flex items-center justify-center ">
              <p className="text-lg font-bold text-gray-500">
                Nothing to show here
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
};
export default Followings;
