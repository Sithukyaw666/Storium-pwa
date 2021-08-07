import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { GET_ME } from "../gql/query";
import { isLogin } from "../shared/user.state";

export const useAuth = () => {
  const login = useRecoilValue(isLogin);
  const { data, refetch } = useQuery(GET_ME);
  useEffect(() => {
    refetch();
  }, [login]);
  return data?.me?.user;
};
