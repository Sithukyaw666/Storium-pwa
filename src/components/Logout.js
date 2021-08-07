import React from "react";
import { useMutation } from "@apollo/client";
import { useRecoilState } from "recoil";
import { useHistory } from "react-router";
import { isLogin } from "../shared/user.state";
import { LOGOUT } from "../gql/mutation";

const Logout = () => {
  const [login, setLogin] = useRecoilState(isLogin);
  const history = useHistory();
  const [logout, { data }] = useMutation(LOGOUT);

  const onLogout = () => {
    logout();
  };
  const setLogout = () => {
    setLogin(!login);
    history.push("/");
  };
  data && setLogout();
  return (
    <button onClick={onLogout} className="w-36 h-8 bg-blue-400 text-white">
      logout
    </button>
  );
};
export default Logout;
