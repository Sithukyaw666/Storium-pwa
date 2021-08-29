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
      className="w-36 md:w-28 md:h-8 h-9 bg-blue-200 rounded-md font-semibold capitalize text-base hover:bg-blue-300 text-blue-700"
    >
      {data.followers.indexOf(user) >= 0 ? "unfollow" : "follow"}
    </button>
  );
};
export default Follow;
