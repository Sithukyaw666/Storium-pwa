import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { GET_USER_BY_ID } from "../gql/query";
import { isFollow } from "../shared/user.state";

export const useFollow = (id) => {
  const follow = useRecoilValue(isFollow);
  const { data, refetch } = useQuery(GET_USER_BY_ID, {
    variables: { id: id },
  });
  useEffect(() => {
    refetch();
  }, [follow]);
  return data?.getUserById;
};
