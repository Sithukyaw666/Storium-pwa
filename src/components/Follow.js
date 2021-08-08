import { useMutation } from "@apollo/client";
import React from "react";
import { useRecoilState } from "recoil";
import { FOLLOW_USER } from "../gql/mutation";
import { useAuth } from "../hooks/auth";
import { useFollow } from "../hooks/follow";
import { isFollow } from "../shared/user.state";

const Follow = ({ id }) => {
  const [followUser] = useMutation(FOLLOW_USER);
  const [follow, setFollow] = useRecoilState(isFollow);
  const user = useAuth();
  const data = useFollow(id);
  const onFollow = async () => {
    await followUser({
      variables: { id: id },
    });
    try {
      setFollow(!follow);
    } catch {}
  };
  return (
    <button
      onClick={onFollow}
      className="w-36 h-9 bg-blue-500 rounded-md font-bold capitalize text-base hover:bg-blue-600 text-white"
    >
      {data.followers.indexOf(user) >= 0 ? "followed" : "follow"}
    </button>
  );
};
export default Follow;
