import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";

import { FOLLOW_USER } from "../gql/mutation";

const Follow = ({ id, user, data }) => {
  const [followUser] = useMutation(FOLLOW_USER);

  const [followed, isFollowed] = useState(false);

  useEffect(() => {
    if (data.getUserById.followers.indexOf(user) >= 0) {
      isFollowed(true);
    } else {
      isFollowed(false);
    }
  }, [data, user]);

  const onFollow = async () => {
    followUser({
      variables: { id: id },
    });
  };
  return (
    <button
      onClick={onFollow}
      className="w-36 md:w-28 md:h-8 h-9 bg-blue-200 rounded-md font-semibold capitalize text-base hover:bg-blue-300 text-blue-700"
    >
      {followed ? "unfollow" : "follow"}
    </button>
  );
};
export default Follow;
