import { useMutation, useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";
import { GET_USER_BY_ID } from "../gql/query";
import { useAuth } from "../hooks/auth";
import Logout from "./Logout";

const Profile = () => {
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
          <p>{data.getUserById.username}</p>
          <p>{data.getUserById.email}</p>
          {user === id && <Logout />}
        </div>
      )}
    </>
  );
};

export default Profile;
